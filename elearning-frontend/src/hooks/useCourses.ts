import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllCourses } from '../services/courseService';


export const useCourses = (initialPage: number = 1, limit: number = 9) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    
    const { 
        data, 
        isLoading, 
        error, 
        refetch 
    } = useQuery({
        queryKey: ['courses', currentPage, limit],
        queryFn: () => getAllCourses(currentPage, limit)
    });

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
