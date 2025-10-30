import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '../components/Header';

const { Content } = Layout;

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content className="px-4 md:px-6 lg:px-8" style={{ background: '#f5f5f5' }}>
        {children}
      </Content>
    </Layout>
  );
};

export default LayoutWrapper;
