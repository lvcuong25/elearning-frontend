
import { useQuery } from '@tanstack/react-query';
import { api } from './api';

const COURSES_ENDPOINT = '/c/227a-8f09-4533-82b6';

// Keep original function names for external usage
export const getAllCourses = async (page: number = 1, limit: number = 9) => {
  const response = await api.get(COURSES_ENDPOINT);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const courses = response.courses.slice(startIndex, endIndex);

  return {
    courses,
    total: response.courses.length,
    skip: startIndex,
    limit,
    page,
    totalPages: Math.ceil(response.courses.length / limit)
  };
};

export const getCourseById = async (id: string) => {
  const response = await api.get(COURSES_ENDPOINT);
  const course = response.courses.find((c: any) => c.id.toString() === id);
  if (!course) {
    throw new Error('Course not found');
  }
  return course;
};

// React Query hooks
export const useCourses = (page: number = 1, limit: number = 9) => {
  return useQuery({
    queryKey: ['courses', page, limit],
    queryFn: () => getAllCourses(page, limit)
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourseById(id),
    enabled: !!id
    
  });
};
