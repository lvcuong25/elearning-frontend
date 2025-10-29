import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './api';

// API functions
export const getProgress = async (userId: string) => {
  return await api.get(`/progress/${userId}`);
};

export const updateProgress = async (userId: string, courseId: string, lessonId: string, progress: number) => {
  return await api.put(`/progress/${userId}`, { courseId, lessonId, progress });
};

export const markLessonComplete = async (userId: string, courseId: string, lessonId: string) => {
  return await api.post(`/progress/${userId}/complete`, { courseId, lessonId });
};

// React Query hooks
export const useProgress = (userId: string) => {
  return useQuery({
    queryKey: ['progress', userId],
    queryFn: () => getProgress(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, courseId, lessonId, progress }: {
      userId: string;
      courseId: string;
      lessonId: string;
      progress: number;
    }) => updateProgress(userId, courseId, lessonId, progress),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['progress', variables.userId] });
    },
  });
};

export const useMarkLessonComplete = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, courseId, lessonId }: {
      userId: string;
      courseId: string;
      lessonId: string;
    }) => markLessonComplete(userId, courseId, lessonId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['progress', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};
