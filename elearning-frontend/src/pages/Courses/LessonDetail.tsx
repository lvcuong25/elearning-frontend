import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Space, Tag, Button } from 'antd';
import { theme, Icons } from '../../theme';
import { getCourseById } from '../../services/courseService';
import type { Course, Lesson } from '../../types/course';
import { useAuth } from '../../hooks/useAuth';
import { useMarkLessonComplete } from '../../services/progressService';

const { Title, Text, Paragraph } = Typography;

const LessonDetail = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const { mutate: markComplete, isPending } = useMarkLessonComplete();

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

  const handleBack = () => {
    navigate(`/courses/${courseId}`);
  };

  const handleMarkCompleted = () => {
    if (!user?.id || !courseId || !lessonId || !lesson) return;
    setCourse(prev => {
      if (!prev) return prev;
      const updatedLessons: Lesson[] = prev.lessons.map(l =>
        l.id.toString() === lessonId ? { ...l, status: 'completed' } : l
      );
      return { ...prev, lessons: updatedLessons };
    });
    markComplete({ userId: String(user.id), courseId: String(courseId), lessonId: String(lessonId) });
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
      <div style={{ maxWidth: 900, margin: '0 auto', padding: theme.spacing.lg }}>
        <Button icon={<Icons.ArrowLeft />} onClick={handleBack} style={{ marginBottom: theme.spacing.lg }}>
          Quay lại khóa học
        </Button>

        <Card style={{ borderRadius: theme.borderRadius.lg }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space align="center" wrap>
              <Tag color="blue">#{lesson.order}</Tag>
              <Title level={3} style={{ margin: 0 }}>{lesson.title}</Title>
            </Space>

            <Space>
              <Icons.Clock style={{ color: theme.colors.text.secondary }} />
              <Text type="secondary">{lesson.duration} phút</Text>
              <Tag color={lesson.status === 'completed' ? 'success' : 'default'}>
                {lesson.status === 'completed' ? 'Hoàn thành' : 'Chưa bắt đầu'}
              </Tag>
            </Space>

            <Paragraph style={{ fontSize: theme.typography.fontSize.base, lineHeight: theme.typography.lineHeight.relaxed }}>
              {lesson.description}
            </Paragraph>

            <Space>
              <Button type="primary" icon={<Icons.CheckSimple />} onClick={handleMarkCompleted} loading={isPending} disabled={lesson.status === 'completed'}>
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


