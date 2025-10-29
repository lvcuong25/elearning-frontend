import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Form, Input, Button, Card, Typography, Avatar, Space, Divider } from 'antd';
import { UserOutlined, LockOutlined, BookOutlined } from '@ant-design/icons';
import type { LoginCredentials } from '../../types/auth';
import { useAuth } from '../../hooks/useAuth';

const { Title, Text, Paragraph } = Typography;

const Login = () => {
  const { user, login, logout, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const hasLoggedInRef = useRef(false);
  const prevUserRef = useRef(user);

  // Redirect to courses when login successful (only when user changes from null to user)
  useEffect(() => {
    if (user && !prevUserRef.current && hasLoggedInRef.current) {
      toast.success('Đăng nhập thành công!');
      navigate('/courses');
    }
    prevUserRef.current = user;
  }, [user, navigate]);

  // Show error toast when login fails
  useEffect(() => {
    if (error) {
      toast.error('Đăng nhập thất bại: ' + error);
    }
  }, [error]);

  const onFinish = (values: LoginCredentials) => {
    hasLoggedInRef.current = true;
    login(values);
  };

  if (user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        <Card
          style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
            <Avatar
              size={80}
              style={{
                backgroundColor: '#1890ff',
                fontSize: '32px',
                fontWeight: 'bold'
              }}
            >
              {user.firstName?.[0]?.toUpperCase() || 'U'}
            </Avatar>
            <div>
              <Title level={2} style={{ margin: 0, color: '#262626' }}>
                Chào mừng, {user.firstName} {user.lastName}!
              </Title>
              <Text type="secondary" style={{ fontSize: '16px' }}>
                {user.email}
              </Text>
            </div>
            <Button type="default" size="large" block onClick={logout}>
              Đăng xuất
            </Button>
          </Space>
        </Card>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}
      >
        {/* Header */}
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            boxShadow: '0 8px 16px rgba(24, 144, 255, 0.3)'
          }}>
            <BookOutlined style={{ fontSize: '32px', color: 'white' }} />
          </div>
          <div>
            <Title level={2} style={{ margin: 0, color: '#262626' }}>
              Đăng nhập
            </Title>
            <Paragraph style={{ margin: '8px 0 0 0', color: '#8c8c8c' }}>
              Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục
            </Paragraph>
          </div>
        </Space>

        {/* Form */}
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          initialValues={{
            email: '',
            password: '',
            expiresInMins: 30
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
              { min: 5, message: 'Email phải có ít nhất 5 ký tự!' }
            ]}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Nhập email của bạn"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
              { max: 50, message: 'Mật khẩu không được quá 50 ký tự!' },
              { 
                pattern: /^(?=.*[a-zA-Z])(?=.*\d)/, 
                message: 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số!' 
              }
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Nhập mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: '32px' }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isLoading}
              disabled={isLoading}
              style={{
                height: '48px',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)'
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ margin: '24px 0' }} />

        {/* Footer */}
        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">
            Bạn chưa có tài khoản?{' '}
            <Text
              style={{
                color: '#1890ff',
                fontWeight: '500',
                cursor: 'pointer'
              }}
              onClick={() => {
                // TODO: Navigate to register page
                console.log('Navigate to register');
              }}
            >
              Đăng ký ngay
            </Text>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login