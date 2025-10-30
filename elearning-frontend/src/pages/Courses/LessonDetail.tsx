import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Space, Tag, Button } from 'antd';
import { theme, Icons } from '../../theme';
import { getCourseById } from '../../services/courseService';
import type { Course, Lesson } from '../../types/course';
// import { useAuth } from '../../hooks/useAuth';
import { useProgress } from '../../hooks/useProgress';

const { Title, Text, Paragraph } = Typography;

const LessonDetail = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  // auth removed for now; add back when syncing with server
  const { getLessonStatus, setLessonStatus } = useProgress();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const isPending = false;

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) return;
      try {
        setLoading(true);
        const data = await getCourseById(courseId);
        const courseData: Course = {
          id: data.id.toString(),
          title: data.title,
          description: data.description,
          thumbnail: data.thumbnail,
          level: data.level,
          kindOfCourse: data.kindOfCourse,
          totalLessons: data.totalLessons,
          progress: data.progress,
          status: data.status,
          lessons: data.lessons || []
        };
        setCourse(courseData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  const lesson: Lesson | undefined = useMemo(() => {
    if (!course || !lessonId) return undefined;
    return course.lessons.find(l => l.id.toString() === lessonId);
  }, [course, lessonId]);

  const effectiveStatus: Lesson['status'] | 'in-progress' = (() => {
    if (!courseId || !lessonId) return (lesson?.status as any) || 'not-started';
    return getLessonStatus(String(courseId), String(lessonId), (lesson?.status as any) || 'not-started') as any;
  })();

  const handleBack = () => {
    navigate(`/courses/${courseId}`);
  };

  const handleMarkCompleted = () => {
    if (!courseId || !lessonId) return;
    setLessonStatus(String(courseId), String(lessonId), 'completed' as any);
    setCourse(prev => {
      if (!prev) return prev;
      const updatedLessons: Lesson[] = prev.lessons.map(l =>
        l.id.toString() === lessonId ? { ...l, status: 'completed' } : l
      );
      return { ...prev, lessons: updatedLessons };
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Icons.Loading style={{ fontSize: 24 }} />
      </div>
    );
  }

  if (!course || !lesson) {
    return (
      <div style={{ textAlign: 'center', padding: theme.spacing['2xl'] }}>
        <Text>Không tìm thấy bài học</Text>
        <div style={{ marginTop: theme.spacing.md }}>
          <Button onClick={handleBack} icon={<Icons.ArrowLeft />}>Quay lại khóa học</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background.tertiary }}>
      <div className="px-4 md:px-6 lg:px-8" style={{ maxWidth: 900, margin: '0 auto', padding: theme.spacing.lg }}>
        <Button icon={<Icons.ArrowLeft />} onClick={handleBack} style={{ marginBottom: theme.spacing.lg }}>
          Quay lại khóa học
        </Button>

        <Card style={{ borderRadius: theme.borderRadius.lg }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space align="center" wrap>
              <Tag color="blue">#{lesson.order}</Tag>
              <Title level={3} className="text-lg md:text-xl lg:text-2xl" style={{ margin: 0 }}>{lesson.title}</Title>
            </Space>

            <Space>
              <Icons.Clock style={{ color: theme.colors.text.secondary }} />
              <Text type="secondary">{lesson.duration} phút</Text>
              <Tag color={effectiveStatus === 'completed' ? 'success' : effectiveStatus === 'in-progress' ? 'processing' : 'default'}>
                {effectiveStatus === 'completed' ? 'Hoàn thành' : effectiveStatus === 'in-progress' ? 'Đang học' : 'Chưa bắt đầu'}
              </Tag>
            </Space>

            <Paragraph className="text-sm md:text-base" style={{ lineHeight: theme.typography.lineHeight.relaxed }}>
              {lesson.description}
            </Paragraph>

            <Space>
              <Button type="primary" icon={<Icons.CheckSimple />} onClick={handleMarkCompleted} loading={isPending} disabled={effectiveStatus === 'completed'}>
                Đánh dấu hoàn thành
              </Button>
              <Button icon={<Icons.ArrowLeft />} onClick={handleBack}>Quay lại khóa học</Button>
            </Space>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default LessonDetail;


