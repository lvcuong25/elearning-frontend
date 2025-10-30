import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Result
        status="404"
        title="404"
        subTitle="Trang bạn truy cập không tồn tại hoặc đã được di chuyển."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>Về trang chủ</Button>
        }
      />
    </div>
  );
};

export default NotFound;


