import { Layout, Typography, Space, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AntHeader
      className="px-4 md:px-6 lg:px-8"
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        height: '64px'
      }}
    >
      {/* User Section */}
      {user ? (
        <Space size="middle">
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Xin chào, <Text strong>{user.firstName}</Text>!
          </Text>
          <Button 
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{
              borderRadius: '8px',
              height: '44px',
              padding: '0 16px',
              fontWeight: '500'
            }}
          >
            Đăng xuất
          </Button>
        </Space>
      ) : (
        <Button 
          type="primary" 
          onClick={() => navigate('/login')}
          style={{
            background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
            border: 'none',
            borderRadius: '8px',
            height: '44px',
            padding: '0 16px',
            fontWeight: '500'
          }}
        >
          Đăng nhập
        </Button>
      )}
    </AntHeader>
  );
};

export default Header;