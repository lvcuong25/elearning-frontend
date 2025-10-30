import { useState } from 'react';
import { Input, Select, Card, Pagination, Spin, Empty, Row, Col, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../../hooks/useCourses';
import CourseCard from '../../components/CourseCard';
import type { Course } from '../../types/course';
import { Icons, theme } from '../../theme';

const { Title, Text } = Typography;
const { Option } = Select;

const CoursesList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedKind, setSelectedKind] = useState('all');
  
  const { courses, loading, totalPages, total, setCurrentPage: setPage } = useCourses(currentPage, 9);
  
  const filteredCourses = courses.filter(course => {
    const matchSearch = !searchTerm || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.duration?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchKind = selectedKind === 'all' || course.kindOfCourse === selectedKind;
    return matchSearch && matchLevel && matchKind;
  });
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPage(page);
  };

  const handleViewDetails = (course: Course) => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background.tertiary }}>
      <div className="px-4 md:px-6 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto', padding: theme.spacing.lg }}>
        {/* Header */}
        <div style={{ marginBottom: theme.spacing.lg }}>
          <Space align="center" style={{ marginBottom: theme.spacing.sm }}>
            <Icons.Book style={{ fontSize: theme.typography.fontSize['2xl'], color: theme.colors.primary }} />
            <Title level={2} className="text-xl md:text-2xl lg:text-3xl" style={{ margin: 0, color: theme.colors.text.primary }}>
              Khóa học
            </Title>
          </Space>
          
        </div>

        {/* Search and Filter */}
        <Card style={{ marginBottom: theme.spacing.lg, borderRadius: theme.borderRadius.md }}>
          <Row gutter={16} align="middle">
            <Col xs={24} sm={24} md={12} lg={14}>
              <Input
                placeholder="Tìm kiếm khóa học..."
                prefix={<Icons.Search />}
                size="large"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={10} style={{ marginTop: 8 }}>
              <Space className="w-full md:flex-row" style={{ width: '100%' }} direction="horizontal" size={16}>
                <Select
                  placeholder="Cấp độ"
                  size="large"
                  value={selectedLevel}
                  onChange={setSelectedLevel}
                  suffixIcon={<Icons.Filter />}
                  style={{ flex: 1 }}
                >
                  <Option value="all">Tất cả cấp độ</Option>
                  <Option value="S">S</Option>
                  <Option value="Pres">Pres</Option>
                  <Option value="TC">TC</Option>
                  <Option value="MTC">MTC</Option>
                </Select>
                <Select
                  placeholder="Loại khóa học"
                  size="large"
                  value={selectedKind}
                  onChange={setSelectedKind}
                  suffixIcon={<Icons.Filter />}
                  style={{ flex: 1 }}
                >
                  <Option value="all">Tất cả loại</Option>
                  <Option value="IELTS">IELTS</Option>
                  <Option value="TOEIC">TOEIC</Option>
                  <Option value="4SKILLS">4SKILLS</Option>
                  <Option value="VSTEP">VSTEP</Option>
                </Select>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: `${theme.spacing['2xl']} 0` }}>
            <Spin size="large" indicator={<Icons.Loading style={{ fontSize: 24 }} />} />
            <div style={{ marginTop: theme.spacing.md }}>
              <Text type="secondary">Đang tải khóa học...</Text>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && (
          <>
            {filteredCourses.length > 0 ? (
              <>
                <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                  {filteredCourses.map((course) => (
                    <Col xs={24} sm={12} lg={8} key={course.id}>
                      <CourseCard 
                        course={course} 
                        onViewDetails={handleViewDetails}
                        showStatusTag
                      />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ textAlign: 'center', marginTop: theme.spacing.lg }}>
                    <Pagination
                      current={currentPage}
                      total={total}
                      pageSize={9}
                      showSizeChanger={false}
                      showTotal={(total, range) => 
                        `${range[0]}-${range[1]} của ${total} khóa học`
                      }
                      itemRender={(_page, type, originalElement) => {
                        if (type === 'prev') {
                          return (
                            <Space>
                              <Icons.ArrowLeft />
                              <span>Trước</span>
                            </Space>
                          );
                        }
                        if (type === 'next') {
                          return (
                            <Space>
                              <span>Sau</span>
                              <Icons.ArrowRight />
                            </Space>
                          );
                        }
                        return originalElement;
                      }}
                      onChange={(page) => handlePageChange(page)}
                    />
                  </div>
                )}
              </>
            ) : (
              <Empty
                description={
                  <span>
                    <Text strong>Không tìm thấy khóa học</Text>
                    <br />
                    <Text type="secondary">Hãy thử với từ khóa hoặc bộ lọc khác</Text>
                  </span>
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesList;