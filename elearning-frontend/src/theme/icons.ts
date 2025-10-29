import {
  HomeOutlined,
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  BookOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  RightOutlined,
  LeftOutlined,
  CloseOutlined,
  LoadingOutlined,
  FileTextOutlined,
  CheckOutlined,
  FileDoneOutlined,
  ReadOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

// Ant Design Icons cho Course
export const Icons = {
  // Navigation
  Home: HomeOutlined,
  Menu: MenuOutlined,
  
  // User & Auth
  User: UserOutlined,
  Logout: LogoutOutlined,
  
  // Course & Learning
  Book: BookOutlined,
  Play: PlayCircleOutlined,
  Video: VideoCameraOutlined,
  FileText: FileTextOutlined,
  FileDone: FileDoneOutlined,
  Read: ReadOutlined,
  Trophy: TrophyOutlined,
  
  // Actions
  Search: SearchOutlined,
  Filter: FilterOutlined,
  
  // Status & Progress
  Check: CheckCircleOutlined,
  CheckSimple: CheckOutlined,
  Clock: ClockCircleOutlined,
  
  // UI Elements
  ArrowRight: RightOutlined,
  ArrowLeft: LeftOutlined,
  Close: CloseOutlined,
  
  // Loading
  Loading: LoadingOutlined,
} as const;

export type IconName = keyof typeof Icons;
