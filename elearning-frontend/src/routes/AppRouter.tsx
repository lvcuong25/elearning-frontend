import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import CoursesList from '../pages/Courses/CoursesList';
import CourseDetail from '../pages/Courses/CourseDetail';
import LessonDetail from '../pages/Courses/LessonDetail';
import ProtectedRoute from './ProtectedRoute';
import LayoutWrapper from './LayoutWrapper';
import NotFound from '../pages/NotFound';

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
        <Route path="*" element={<NotFound />} />
        <Route 
          path="/courses/:courseId/lessons/:lessonId" 
          element={
            <ProtectedRoute>
              <LessonDetail />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </LayoutWrapper>
  );
};

export default AppRouter;