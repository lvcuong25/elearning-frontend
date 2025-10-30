export type LessonStatus = 'not-started' | 'in-progress' | 'completed';

const STORAGE_KEY = 'lessonProgress';

const readStore = (): Record<string, Record<string, LessonStatus>> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Record<string, LessonStatus>>) : {};
  } catch {
    return {};
  }
};

const writeStore = (data: Record<string, Record<string, LessonStatus>>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
};

export const useProgress = () => {
  const getLessonStatus = (
    courseId: string,
    lessonId: string,
    fallback: LessonStatus = 'not-started'
  ): LessonStatus => {
    const store = readStore();
    return store[courseId]?.[lessonId] ?? fallback;
  };

  const setLessonStatus = (
    courseId: string,
    lessonId: string,
    status: LessonStatus
  ) => {
    const store = readStore();
    store[courseId] = { ...(store[courseId] || {}), [lessonId]: status };
    writeStore(store);
  };

  const getCourseCompletedCount = (courseId: string): number => {
    const store = readStore();
    const map = store[courseId] || {};
    return Object.values(map).filter((s) => s === 'completed').length;
  };

  const getCourseProgressPercent = (
    courseId: string,
    totalLessons: number
  ): number => {
    if (!totalLessons || totalLessons <= 0) return 0;
    const completed = getCourseCompletedCount(courseId);
    return Math.min(100, Math.round((completed / totalLessons) * 100));
  };

  const getCourseStatus = (
    courseId: string,
    totalLessons: number
  ): 'not-started' | 'in-progress' | 'completed' => {
    if (!totalLessons || totalLessons <= 0) return 'not-started';
    const store = readStore();
    const progMap = store[courseId] || {};
    const values = Object.values(progMap);
    if (values.length === 0 || values.every((s) => s === 'not-started')) return 'not-started';
    if (values.length === totalLessons && values.every((s) => s === 'completed')) return 'completed';
    return 'in-progress';
  };

  return {
    getLessonStatus,
    setLessonStatus,
    getCourseCompletedCount,
    getCourseProgressPercent,
    getCourseStatus,
  };
};


