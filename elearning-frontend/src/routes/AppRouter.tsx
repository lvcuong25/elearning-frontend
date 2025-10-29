import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import CoursesList from '../pages/Courses/CoursesList';
import CourseDetail from '../pages/Courses/CourseDetail';
import ProtectedRoute from './ProtectedRoute';
import LayoutWrapper from './LayoutWrapper';

const AppRouter = () => {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <CoursesList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/courses" 
          element={
            <ProtectedRoute>
              <CoursesList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/courses/:courseId" 
          element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </LayoutWrapper>
  );
};

export default AppRouter;