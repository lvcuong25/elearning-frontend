import { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Tag, 
  Space, 
  Row, 
  Col, 
  Button, 
  Progress, 
  Badge
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { Icons, theme } from '../../theme';
import { getCourseById } from '../../services/courseService';
import type { Course } from '../../types/course';
import LessonItem from '../../components/LessonItem';
import { useProgress } from '../../hooks/useProgress';

const { Title, Text, Paragraph } = Typography;

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const { getCourseProgressPercent, getLessonStatus, getCourseStatus } = useProgress();

  // Fetch course data from API
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      
      try {
        setLoading(true);
        const response = await getCourseById(courseId);
        
        // Transform API response to Course format
        const courseData: Course = {
          id: response.id.toString(),
          title: response.title,
          description: response.description,
          thumbnail: response.thumbnail,
          level: response.level,
          kindOfCourse: response.kindOfCourse,
          totalLessons: response.totalLessons,
          progress: response.progress,
          status: response.status,
          lessons: response.lessons || []
        };
        
        setCourse(courseData);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleBackToCourses = () => {
    navigate('/courses');
  };

  // navigation handled inside LessonItem via onOpen

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      default:
        return 'Chưa bắt đầu';
    }
  };

  // removed unused formatDuration

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <Icons.Loading style={{ fontSize: 24 }} />
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ textAlign: 'center', padding: theme.spacing['2xl'] }}>
        <Text>Không tìm thấy khóa học</Text>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background.tertiary }}>
      <div className="px-4 md:px-6 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto', padding: theme.spacing.lg }}>
        {/* Back Button */}
        <Button 
          icon={<Icons.ArrowLeft />} 
          onClick={handleBackToCourses}
          style={{ marginBottom: theme.spacing.lg }}
        >
          Quay lại danh sách
        </Button>

        {/* Course Header */}
        <Card style={{ marginBottom: theme.spacing.lg, borderRadius: theme.borderRadius.lg }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: theme.colors.background.secondary, borderRadius: theme.borderRadius.md }}>
                <img
                  alt={course.title}
                  src={course.thumbnail}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: theme.borderRadius.md
                  }}
                />
              </div>
            </Col>
            <Col xs={24} lg={16}>
              <div style={{ padding: theme.spacing.md }}>
                {/* Course Type and Level */}
                <Space size={8} style={{ marginBottom: theme.spacing.sm }}>
                  <Tag color="blue" style={{ borderRadius: theme.borderRadius.sm }}>
                    {course.kindOfCourse}
                  </Tag>
                  <Tag color="green" style={{ borderRadius: theme.borderRadius.sm }}>
                    {course.level}
                  </Tag>
                  {course.status && (
                    <Tag color={getStatusColor(course.status)} style={{ borderRadius: theme.borderRadius.sm }}>
                      {getStatusText(course.status)}
                    </Tag>
                  )}
                </Space>

                {/* Course Title */}
                <Title level={2} className="text-xl md:text-2xl lg:text-3xl" style={{ marginBottom: theme.spacing.sm, color: theme.colors.text.primary }}>
                  {course.title}
                </Title>

                {/* Progress */}
                <div style={{ marginBottom: theme.spacing.md }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.sm }}>
                    <Text strong>Tiến độ khóa học</Text>
                    <Text>{getCourseProgressPercent(course.id, course.totalLessons)}%</Text>
                  </div>
                  <Progress 
                    percent={getCourseProgressPercent(course.id, course.totalLessons)} 
                    strokeColor={theme.colors.primary}
                    style={{ marginBottom: theme.spacing.sm }}
                  />
                  <Space>
                    <Icons.Book style={{ color: theme.colors.text.secondary }} />
                    <Text type="secondary">{course.totalLessons} bài học</Text>
                  </Space>
                </div>

                {/* Action Buttons */}
                <Space>
                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<Icons.Play />}
                    onClick={() => {
                      if (!course || !course.lessons.length) return;
                      // Prefer first not-started; then any in-progress; else first lesson
                      const notStarted = course.lessons.find(l => getLessonStatus(course.id, l.id, (l.status as any) || 'not-started') === 'not-started');
                      const inProgress = course.lessons.find(l => getLessonStatus(course.id, l.id, (l.status as any) || 'not-started') === 'in-progress');
                      const target = notStarted || inProgress || course.lessons[0];
                      navigate(`/courses/${course.id}/lessons/${target.id}`);
                    }}
                  >
                    {(() => {
                      const st = getCourseStatus(course.id, course.totalLessons);
                      if (st === 'not-started') return 'Bắt đầu học';
                      if (st === 'completed') return 'Hoàn thành';
                      return 'Tiếp tục học';
                    })()}
                  </Button>
                  <Button size="large" icon={<Icons.Video />} style={{ height: 44, padding: '0 16px' }}>
                    Xem trước
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Course Description */}
        <Card 
          title={
            <Space>
              <Icons.FileText />
              <span>Mô tả khóa học</span>
            </Space>
          }
          style={{ marginBottom: theme.spacing.lg, borderRadius: theme.borderRadius.lg }}
        >
          <Paragraph className="text-sm md:text-base" style={{ lineHeight: theme.typography.lineHeight.relaxed }}>
            {course.description}
          </Paragraph>
        </Card>

        {/* Lessons List */}
        <Card 
          title={
            <Space>
              <Icons.Book />
              <span>Danh sách bài học</span>
              <Badge count={course.lessons.length} style={{ backgroundColor: theme.colors.primary }} />
            </Space>
          }
          style={{ borderRadius: theme.borderRadius.lg }}
        >
          <Row gutter={[16, 16]}>
            {course.lessons.map((l, index) => (
              <Col xs={24} key={l.id}>
                <LessonItem
                  courseId={course.id}
                  lessonId={l.id}
                  title={l.title}
                  description={l.description}
                  duration={l.duration}
                  order={index + 1}
                  initialStatus={(l.status as any) || 'not-started'}
                  onOpen={() => navigate(`/courses/${course.id}/lessons/${l.id}`)}
                />
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetail;