import { Card, Tag, Progress, Typography, Space } from 'antd';
import type { Course } from '../types/course';
import { Icons, theme } from '../theme';
// Button removed; entire card is clickable
import { useProgress } from '../hooks/useProgress';

const { Title, Text, Paragraph } = Typography;

interface CourseCardProps {
  course: Course;
  onViewDetails?: (course: Course) => void;
  showStatusTag?: boolean; // show Đang học/Hoàn thành tag
  showProgressBar?: boolean; // show % bar
}

const CourseCard = ({ course, onViewDetails, showStatusTag = false, showProgressBar = false }: CourseCardProps) => {
  const { getCourseProgressPercent, getCourseStatus } = useProgress();
  const computedPercent = showProgressBar ? getCourseProgressPercent(course.id, course.totalLessons) : 0;
  const computedStatus = (showStatusTag || showProgressBar) ? getCourseStatus(course.id, course.totalLessons) : undefined as any;
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(course);
    }
  };

  return (
    <Card
      hoverable
      onClick={handleViewDetails}
      style={{ height: '100%', borderRadius: theme.borderRadius.md, cursor: 'pointer' }}
      cover={
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: theme.colors.background.secondary }}>
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
              borderRadius: `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`
            }}
          />
        </div>
      }
    >
      {/* Course Type and Level Tags */}
      <Space size={8} style={{ marginBottom: theme.spacing.sm }}>
        <Tag color="blue" style={{ borderRadius: theme.borderRadius.sm }}>
          {course.kindOfCourse}
        </Tag>
        <Tag color="green" style={{ borderRadius: theme.borderRadius.sm }}>
          {course.level}
        </Tag>
      </Space>

      {/* Course Title */}
      <Title 
        level={5} 
        style={{ 
          marginBottom: theme.spacing.sm, 
          minHeight: '48px',
          color: theme.colors.text.primary,
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.semibold
        }}
      >
        {course.title}
      </Title>

      {/* Description - Truncated to 2 lines */}
      <Paragraph 
        ellipsis={{ rows: 2 }} 
        style={{ 
          marginBottom: theme.spacing.md, 
          color: theme.colors.text.secondary, 
          fontSize: theme.typography.fontSize.sm,
          lineHeight: theme.typography.lineHeight.normal
        }}
      >
        {course.description}
      </Paragraph>

      {/* Lessons Count */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: theme.spacing.sm
      }}>
        <Space>
          <Icons.Book style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.sm }} />
          <Text type="secondary" style={{ fontSize: theme.typography.fontSize.sm }}>
            {course.totalLessons} bài học
          </Text>
        </Space>
        {showStatusTag && (
          <Space>
            <Tag color={computedStatus === 'completed' ? 'success' : computedStatus === 'in-progress' ? 'processing' : 'default'}>
              {computedStatus === 'completed' ? 'Hoàn thành' : computedStatus === 'in-progress' ? 'Đang học' : 'Chưa bắt đầu'}
            </Tag>
          </Space>
        )}
      </div>

      {/* Progress Bar hidden by default */}
      {showProgressBar && (
        <Progress 
          percent={computedPercent} 
          size="small" 
          strokeColor={theme.colors.primary}
          showInfo={false}
          style={{ marginTop: theme.spacing.sm }}
        />
      )}
    </Card>
  );
};

export default CourseCard;
