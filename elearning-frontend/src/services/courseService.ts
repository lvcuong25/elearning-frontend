
import { get } from './api';

const COURSES_ENDPOINT = '/c/227a-8f09-4533-82b6';

export const getAllCourses = async (page: number = 1, limit: number = 9) => {
  // Fetch all courses from custom collection
  const response = await get(COURSES_ENDPOINT);
  
  // Client-side pagination since custom collection doesn't support limit/skip
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
  // Fetch all courses and find by id
  const response = await get(COURSES_ENDPOINT);
  const course = response.courses.find((c: any) => c.id.toString() === id);
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  return course;
};
