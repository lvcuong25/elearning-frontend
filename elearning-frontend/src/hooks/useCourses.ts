import { useState, useEffect } from 'react';
import { getAllCourses } from '../services/courseService';
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
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getAllCourses(currentPage, limit);

            // Use courses directly from custom collection (already transformed)
            setCourses(response.courses);
            setTotalPages(response.totalPages);
            setTotal(response.total);
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải danh sách khóa học');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [currentPage]);

    return {
        courses,
        loading,
        error,
        totalPages,
        total,
        currentPage,
        setCurrentPage,
        refetch: fetchCourses
    };
};
