
import { api } from './api';
import type { Course } from '../types/course';

const COURSES_ENDPOINT = 'https://e-learning-c2dfe-default-rtdb.asia-southeast1.firebasedatabase.app/courses.json';


export const getAllCourses = async (page: number = 1, limit: number = 9): Promise<{
  courses: Course[];
  total: number;
  skip: number;
  limit: number;
  page: number;
  totalPages: number;
}> => {
  const response = await api.get(COURSES_ENDPOINT);
  type UnknownObject = Record<string, unknown>;
  const list: unknown[] = Array.isArray(response)
    ? response as unknown[]
    : (response && typeof response === 'object')
      ? (Array.isArray(Object.values(response as UnknownObject)[0])
          ? (Object.values(response as UnknownObject)[0] as unknown[])
          : [])
      : [];
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const courses = (list.slice(startIndex, endIndex) as unknown[]) as Course[];

  return {
    courses,
    total: list.length,
    skip: startIndex,
    limit,
    page,
    totalPages: Math.ceil(list.length / limit)
  };
};

export const getCourseById = async (id: string): Promise<Course> => {
  const response = await api.get(COURSES_ENDPOINT);
  type UnknownObject = Record<string, unknown>;
  const list: UnknownObject[] = Array.isArray(response)
    ? (response as UnknownObject[])
    : (response && typeof response === 'object')
      ? (Array.isArray(Object.values(response as UnknownObject)[0])
          ? ((Object.values(response as UnknownObject)[0] as unknown[]) as UnknownObject[])
          : [])
      : [];
  const course = list.find((c) => {
    const courseId = (c as { id?: string | number }).id;
    return courseId !== undefined && courseId.toString() === id;
  });
  if (!course) {
    throw new Error('Course not found');
  }
  return course as unknown as Course;
};

