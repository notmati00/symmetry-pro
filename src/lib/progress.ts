'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Exercise } from '@/lib/exercises';

export interface ExerciseSession {
  id: string;
  exerciseId: string;
  date: Date;
  duration: number;
  repetitions: number;
  completed: boolean;
  side?: 'left' | 'right' | 'both';
}

export interface DailyProgress {
  date: string;
  sessions: ExerciseSession[];
  totalDuration: number;
  completedExercises: number;
}

export interface ProgressStats {
  totalSessions: number;
  totalDuration: number;
  currentStreak: number;
  bestStreak: number;
  symmetryScore: number;
  consistencyScore: number;
  lastWorkoutDate: Date | null;
}

interface ProgressState {
  sessions: ExerciseSession[];
  stats: ProgressStats;

  addSession: (session: Omit<ExerciseSession, 'id' | 'date'>) => void;
  updateSession: (id: string, updates: Partial<ExerciseSession>) => void;
  deleteSession: (id: string) => void;
  getDailyProgress: (date: string) => DailyProgress | undefined;
  getWeeklyProgress: () => DailyProgress[];
  getMonthlyProgress: () => DailyProgress[];
  getExerciseHistory: (exerciseId: string) => ExerciseSession[];
  calculateSymmetryScore: () => number;
  calculateConsistencyScore: () => number;
  updateStreak: () => void;
  clearAllProgress: () => void;
}

const calculateStreak = (sessions: ExerciseSession[]): { current: number; best: number } => {
  if (sessions.length === 0) {
    return { current: 0, best: 0 };
  }

  const dates = [...new Set(sessions.map(s => new Date(s.date).toDateString()))];
  dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;

  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (dates[0] === today || dates[0] === yesterday) {
    currentStreak = 1;
  }

  for (let i = 0; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const nextDate = i < dates.length - 1 ? new Date(dates[i + 1]) : null;

    tempStreak++;

    if (nextDate) {
      const diffDays = Math.floor((currentDate.getTime() - nextDate.getTime()) / 86400000);

      if (diffDays === 1) {
        continue;
      } else if (diffDays > 1) {
        if (tempStreak > bestStreak) {
          bestStreak = tempStreak;
        }
        tempStreak = 0;
      }
    } else {
      if (tempStreak > bestStreak) {
        bestStreak = tempStreak;
      }
    }

    if (i < dates.length - 1) {
      const nextDateStr = dates[i + 1];
      const nextDateObj = new Date(nextDateStr);
      const currentDateObj = new Date(dates[i]);
      const daysDiff = Math.floor((currentDateObj.getTime() - nextDateObj.getTime()) / 86400000);

      if (daysDiff === 1 && (dates[0] === today || dates[0] === yesterday)) {
        if (i < currentStreak) {
          currentStreak++;
        }
      }
    }
  }

  if (tempStreak > bestStreak) {
    bestStreak = tempStreak;
  }

  return { current: currentStreak, best: bestStreak };
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      sessions: [],
      stats: {
        totalSessions: 0,
        totalDuration: 0,
        currentStreak: 0,
        bestStreak: 0,
        symmetryScore: 50,
        consistencyScore: 0,
        lastWorkoutDate: null,
      },

      addSession: (sessionData) => {
        const newSession: ExerciseSession = {
          ...sessionData,
          id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          date: new Date(),
        };

        const updatedSessions = [...get().sessions, newSession];
        const totalDuration = updatedSessions.reduce((sum, s) => sum + s.duration, 0);
        const streakData = calculateStreak(updatedSessions);

        const consistencyScore = calculateConsistencyScoreHelper(updatedSessions);
        const symmetryScore = calculateSymmetryScoreHelper(updatedSessions, consistencyScore, streakData.current);

        set({
          sessions: updatedSessions,
          stats: {
            totalSessions: updatedSessions.length,
            totalDuration,
            currentStreak: streakData.current,
            bestStreak: streakData.best,
            symmetryScore,
            consistencyScore,
            lastWorkoutDate: new Date(),
          },
        });
      },

      updateSession: (id, updates) => {
        const updatedSessions = get().sessions.map((session) =>
          session.id === id ? { ...session, ...updates } : session
        );

        const totalDuration = updatedSessions.reduce((sum, s) => sum + s.duration, 0);

        const consistencyScore = calculateConsistencyScoreHelper(updatedSessions);
        const symmetryScore = calculateSymmetryScoreHelper(updatedSessions, consistencyScore, get().stats.currentStreak);

        set({
          sessions: updatedSessions,
          stats: {
            ...get().stats,
            totalDuration,
            symmetryScore,
            consistencyScore,
          },
        });
      },

      deleteSession: (id) => {
        const updatedSessions = get().sessions.filter((session) => session.id !== id);
        const totalDuration = updatedSessions.reduce((sum, s) => sum + s.duration, 0);
        const streakData = calculateStreak(updatedSessions);

        const consistencyScore = calculateConsistencyScoreHelper(updatedSessions);
        const symmetryScore = calculateSymmetryScoreHelper(updatedSessions, consistencyScore, streakData.current);

        set({
          sessions: updatedSessions,
          stats: {
            totalSessions: updatedSessions.length,
            totalDuration,
            currentStreak: streakData.current,
            bestStreak: streakData.best,
            symmetryScore,
            consistencyScore,
            lastWorkoutDate: updatedSessions.length > 0 ? get().stats.lastWorkoutDate : null,
          },
        });
      },

      getDailyProgress: (date: string) => {
        const sessions = get().sessions;
        const dailySessions = sessions.filter(
          (session) => new Date(session.date).toDateString() === date
        );

        if (dailySessions.length === 0) {
          return undefined;
        }

        return {
          date,
          sessions: dailySessions,
          totalDuration: dailySessions.reduce((sum, s) => sum + s.duration, 0),
          completedExercises: dailySessions.filter((s) => s.completed).length,
        };
      },

      getWeeklyProgress: () => {
        const sessions = get().sessions;
        const weeklyProgress: DailyProgress[] = [];

        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toDateString();

          const dailySessions = sessions.filter(
            (session) => new Date(session.date).toDateString() === dateStr
          );

          weeklyProgress.push({
            date: dateStr,
            sessions: dailySessions,
            totalDuration: dailySessions.reduce((sum, s) => sum + s.duration, 0),
            completedExercises: dailySessions.filter((s) => s.completed).length,
          });
        }

        return weeklyProgress;
      },

      getMonthlyProgress: () => {
        const sessions = get().sessions;
        const monthlyProgress: DailyProgress[] = [];

        for (let i = 29; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toDateString();

          const dailySessions = sessions.filter(
            (session) => new Date(session.date).toDateString() === dateStr
          );

          monthlyProgress.push({
            date: dateStr,
            sessions: dailySessions,
            totalDuration: dailySessions.reduce((sum, s) => sum + s.duration, 0),
            completedExercises: dailySessions.filter((s) => s.completed).length,
          });
        }

        return monthlyProgress;
      },

      getExerciseHistory: (exerciseId: string) => {
        return get().sessions
          .filter((session) => session.exerciseId === exerciseId)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },

      calculateSymmetryScore: () => {
        const sessions = get().sessions;
        const consistencyScore = get().stats.consistencyScore;
        const currentStreak = get().stats.currentStreak;
        return calculateSymmetryScoreHelper(sessions, consistencyScore, currentStreak);
      },

      calculateConsistencyScore: () => {
        const sessions = get().sessions;
        return calculateConsistencyScoreHelper(sessions);
      },

      updateStreak: () => {
        const sessions = get().sessions;
        const streakData = calculateStreak(sessions);

        set({
          stats: {
            ...get().stats,
            currentStreak: streakData.current,
            bestStreak: streakData.best,
          },
        });
      },

      clearAllProgress: () => {
        set({
          sessions: [],
          stats: {
            totalSessions: 0,
            totalDuration: 0,
            currentStreak: 0,
            bestStreak: 0,
            symmetryScore: 50,
            consistencyScore: 0,
            lastWorkoutDate: null,
          },
        });
      },
    }),
    {
      name: 'symmetryPro_progress',
      partialize: (state) => ({
        sessions: state.sessions,
        stats: state.stats,
      }),
    }
  )
);

const calculateSymmetryScoreHelper = (sessions: ExerciseSession[], consistencyScore: number, currentStreak: number): number => {
  if (sessions.length === 0) {
    return 50;
  }

  const baseScore = 50;
  const improvementFactor = Math.min(sessions.length * 0.5, 40);
  const consistencyBonus = consistencyScore * 0.1;
  const streakBonus = Math.min(currentStreak * 2, 10);

  return Math.min(Math.round(baseScore + improvementFactor + consistencyBonus + streakBonus), 100);
};

const calculateConsistencyScoreHelper = (sessions: ExerciseSession[]): number => {
  if (sessions.length === 0) {
    return 0;
  }

  const dates = [...new Set(sessions.map(s => new Date(s.date).toDateString()))];
  const last7Days: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    last7Days.push(date.toDateString());
  }

  const activeDays = dates.filter(date => last7Days.includes(date)).length;
  const consistencyPercentage = (activeDays / 7) * 100;

  return Math.round(consistencyPercentage);
};

export function useExerciseProgress(exerciseId: string) {
  const sessions = useProgressStore((state) => state.getExerciseHistory(exerciseId));
  const addSession = useProgressStore((state) => state.addSession);

  const totalSessions = sessions.length;
  const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
  const lastCompleted = sessions.length > 0 ? new Date(sessions[0].date) : null;

  return {
    sessions,
    totalSessions,
    totalDuration,
    lastCompleted,
    addSession,
  };
}

export function useDailyGoal() {
  const stats = useProgressStore((state) => state.stats);

  const todayProgress = useProgressStore((state) =>
    state.getDailyProgress(new Date().toDateString())
  );

  const dailyGoalDuration = 300;
  const completedDuration = todayProgress?.totalDuration || 0;
  const goalProgress = Math.min((completedDuration / dailyGoalDuration) * 100, 100);

  return {
    dailyGoalDuration,
    completedDuration,
    goalProgress,
    isGoalMet: goalProgress >= 100,
  };
}
