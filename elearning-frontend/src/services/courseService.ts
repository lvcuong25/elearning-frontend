
import { api } from './api';

const COURSES_ENDPOINT = 'https://e-learning-c2dfe-default-rtdb.asia-southeast1.firebasedatabase.app/courses.json';


export const getAllCourses = async (page: number = 1, limit: number = 9) => {
  const response = await api.get(COURSES_ENDPOINT);
  const list = Array.isArray(response)
    ? response
    : (response && typeof response === 'object')
      ? (Array.isArray(Object.values(response)[0])
          ? (Object.values(response)[0] as any[])
          : [])
      : [];
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const courses = list.slice(startIndex, endIndex);

  return {
    courses,
    total: list.length,
    skip: startIndex,
    limit,
    page,
    totalPages: Math.ceil(list.length / limit)
  };
};

export const getCourseById = async (id: string) => {
  const response = await api.get(COURSES_ENDPOINT);
  const list = Array.isArray(response)
    ? response
    : (response && typeof response === 'object')
      ? (Array.isArray(Object.values(response)[0])
          ? (Object.values(response)[0] as any[])
          : [])
      : [];
  const course = list.find((c: any) => c?.id?.toString() === id);
  if (!course) {
    throw new Error('Course not found');
  }
  return course;
};

