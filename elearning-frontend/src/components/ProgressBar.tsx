import { Progress } from 'antd';

interface ProgressBarProps {
  percent: number;
  showInfo?: boolean;
}

const ProgressBar = ({ percent, showInfo = false }: ProgressBarProps) => {
  return (
    <Progress
      percent={percent}
      showInfo={showInfo}
      strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
    />
  );
};

export default ProgressBar;


