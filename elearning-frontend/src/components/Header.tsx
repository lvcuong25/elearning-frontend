import { Layout, Typography, Space, Button, Segmented } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Icons } from '../theme';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AntHeader
      className="px-4 md:px-6 lg:px-8"
      style={{
        background: theme === 'dark' ? '#141414' : '#ffffff',
        borderBottom: theme === 'dark' ? '1px solid #1f1f1f' : '1px solid #f0f0f0',
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
          <Segmented
            value={theme}
            onChange={(val) => setTheme(val as 'light' | 'dark')}
            aria-label="Chuyển giao diện"
            options={[
              { label: <span><Icons.Sun /> Light</span>, value: 'light' },
              { label: <span><Icons.Moon /> Dark</span>, value: 'dark' }
            ]}
            style={{ borderRadius: 999, background: theme === 'dark' ? '#1f1f1f' : '#f0f0f0' }}
          />
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
        <Space size="middle">
          <Segmented
            value={theme}
            onChange={(val) => setTheme(val as 'light' | 'dark')}
            aria-label="Chuyển giao diện"
            options={[
              { label: <span><Icons.Sun /> Light</span>, value: 'light' },
              { label: <span><Icons.Moon /> Dark</span>, value: 'dark' }
            ]}
            style={{ borderRadius: 999, background: theme === 'dark' ? '#1f1f1f' : '#f0f0f0' }}
          />
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
        </Space>
      )}
    </AntHeader>
  );
};

export default Header;