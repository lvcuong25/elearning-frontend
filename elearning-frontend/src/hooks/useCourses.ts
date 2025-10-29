import { useState } from 'react';
import { useCourses as useCoursesQuery } from '../services/courseService';
import type { Course } from '../types/course';

interface UseCoursesReturn {
    courses: Course[];
    loading: boolean;
    error: string | null;
    totalPages: number;
    total: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    refetch: () => void;
}

export const useCourses = (initialPage: number = 1, limit: number = 9): UseCoursesReturn => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    
    const { 
        data, 
        isLoading, 
        error, 
        refetch 
    } = useCoursesQuery(currentPage, limit);

    return {
        courses: data?.courses || [],
        loading: isLoading,
        error: error?.message || null,
        totalPages: data?.totalPages || 1,
        total: data?.total || 0,
        currentPage,
        setCurrentPage,
        refetch: () => refetch()
    };
};
