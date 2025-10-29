import { Card, Tag, Progress, Typography, Space } from 'antd';
import type { Course } from '../types/course';
import { Icons, theme } from '../theme';
import Button from './Custom/Button';

const { Title, Text, Paragraph } = Typography;

interface CourseCardProps {
  course: Course;
  onViewDetails?: (course: Course) => void;
}

const CourseCard = ({ course, onViewDetails }: CourseCardProps) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(course);
    }
  };

  return (
    <Card
      hoverable
      style={{ height: '100%', borderRadius: theme.borderRadius.md }}
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
      actions={[
        <Button 
          variant="primary" 
          block 
          onClick={handleViewDetails}
        >
          Xem chi tiết
        </Button>
      ]}
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
        
        {/* Progress if available */}
        {course.progress !== undefined && (
          <Space>
            <Icons.Trophy style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.sm }} />
            <Text type="secondary" style={{ fontSize: theme.typography.fontSize.sm }}>
              {course.progress}%
            </Text>
          </Space>
        )}
      </div>

      {/* Progress Bar - Only show if progress exists */}
      {course.progress !== undefined && (
        <Progress 
          percent={course.progress} 
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
