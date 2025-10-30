import { Card, Row, Col, Avatar, Space, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import { useProgress } from '../hooks/useProgress';

const { Title, Text } = Typography;

type LessonStatus = 'not-started' | 'in-progress' | 'completed';

interface LessonItemProps {
  courseId: string;
  lessonId: string;
  title: string;
  description: string;
  duration: number;
  order: number;
  initialStatus?: LessonStatus;
  onOpen?: () => void;
}

const LessonItem = ({
  courseId,
  lessonId,
  title,
  description,
  duration,
  order,
  initialStatus = 'not-started',
  onOpen,
}: LessonItemProps) => {
  const { getLessonStatus, setLessonStatus } = useProgress();
  const [status, setStatus] = useState<LessonStatus>(() => getLessonStatus(courseId, lessonId, initialStatus));

  useEffect(() => {
    setStatus(getLessonStatus(courseId, lessonId, initialStatus));
  }, [courseId, lessonId, initialStatus]);

  const percentByStatus: Record<LessonStatus, number> = {
    'not-started': 0,
    'in-progress': 50,
    'completed': 100,
  };

  const handleCardClick = () => {
    onOpen?.();
  };

  const getStatusColor = (s: LessonStatus) => {
    switch (s) {
      case 'completed': return 'success';
      case 'in-progress': return 'processing';
      default: return 'default';
    }
  };

  const getStatusText = (s: LessonStatus) => {
    switch (s) {
      case 'completed': return 'Hoàn thành';
      case 'in-progress': return 'Đang học';
      default: return 'Chưa bắt đầu';
    }
  };

  return (
    <Card style={{ borderRadius: 8, border: status === 'completed' ? '2px solid #52c41a' : '1px solid #d9d9d9' }} onClick={handleCardClick}>
      <Row gutter={16} align="middle">
        <Col xs={2} sm={1}>
          <Avatar size={40} style={{ backgroundColor: status === 'completed' ? '#52c41a' : '#bfbfbf' }}>
            {status === 'completed' ? '✓' : order}
          </Avatar>
        </Col>
        <Col xs={22} sm={15}>
          <div>
            <Title level={5} style={{ margin: 0 }}>{title}</Title>
            <Text type="secondary">{description}</Text>
            <div style={{ marginTop: 8 }}>
              <ProgressBar percent={percentByStatus[status]} />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={8}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, alignItems: 'center' }}>
            <Space>
              <Tag color={getStatusColor(status)}>
                {getStatusText(status)}
              </Tag>
              <Text type="secondary">{duration} phút</Text>
            </Space>
          </div>
          {/* Action buttons removed; card click handles start/complete */}
        </Col>
      </Row>
    </Card>
  );
};

export default LessonItem;


