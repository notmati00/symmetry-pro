'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '@/lib/language';
import { useProgressStore } from '@/lib/progress';
import { allExercises, getExerciseById, getExercisesByType, getFacialCategories, getBodyCategories } from '@/lib/exercises';
import { ExerciseAnimation } from '@/components/ExerciseAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Activity,
  Target,
  Trophy,
  Clock,
  Flame,
  TrendingUp,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Settings as SettingsIcon,
  BookOpen,
  BarChart3,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Volume2,
  VolumeX,
  Info,
  AlertTriangle,
  Sparkles,
  Zap,
  Heart,
  Brain,
  Dumbbell,
  LayoutDashboard,
  Languages,
} from 'lucide-react';

type View = 'landing' | 'dashboard' | 'facial' | 'body' | 'exercise' | 'progress' | 'education' | 'settings';

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const stats = useProgressStore((state) => state.stats);
  const sessions = useProgressStore((state) => state.sessions);
  const clearAllProgress = useProgressStore((state) => state.clearAllProgress);

  const weeklyProgress = useMemo(() => {
    const last7Days: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toDateString());
    }

    const progress = last7Days.map(dateStr => {
      const dailySessions = sessions.filter(
        (session) => new Date(session.date).toDateString() === dateStr
      );

      return {
        date: dateStr,
        sessions: dailySessions,
        totalDuration: dailySessions.reduce((sum, s) => sum + s.duration, 0),
        completedExercises: dailySessions.filter((s) => s.completed).length,
      };
    });

    return progress;
  }, [sessions]);

  const monthlyProgress = useMemo(() => {
    const last30Days: string[] = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last30Days.push(date.toDateString());
    }

    return last30Days.map(dateStr => {
      const dailySessions = sessions.filter(
        (session) => new Date(session.date).toDateString() === dateStr
      );

      return {
        date: dateStr,
        sessions: dailySessions,
        totalDuration: dailySessions.reduce((sum, s) => sum + s.duration, 0),
        completedExercises: dailySessions.filter((s) => s.completed).length,
      };
    });
  }, [sessions]);

  const dailyGoal = useMemo(() => {
    const todayStr = new Date().toDateString();
    const todaySessions = sessions.filter(
      (session) => new Date(session.date).toDateString() === todayStr
    );

    const dailyGoalDuration = 300;
    const completedDuration = todaySessions.reduce((sum, s) => sum + s.duration, 0);
    const goalProgress = Math.min((completedDuration / dailyGoalDuration) * 100, 100);

    return {
      dailyGoalDuration,
      completedDuration,
      goalProgress,
      isGoalMet: goalProgress >= 100,
    };
  }, [sessions]);

  const [currentView, setCurrentView] = useState<View>('landing');
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [isExerciseRunning, setIsExerciseRunning] = useState(false);
  const [exerciseTimeLeft, setExerciseTimeLeft] = useState(0);
  const [exerciseSide, setExerciseSide] = useState<'left' | 'right'>('left');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [difficultyLevel, setDifficultyLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [darkMode, setDarkMode] = useState(true);

  const timerRef = useRef<NodeJS.Timeout>();
  const animationRef = useRef<number>();

  useEffect(() => {
    const savedDisclaimer = localStorage.getItem('symmetryPro_disclaimerAccepted');
    if (savedDisclaimer) {
      setShowDisclaimer(false);
    }

    const savedTheme = localStorage.getItem('symmetryPro_theme');
    if (savedTheme === 'light') {
      setDarkMode(false);
    }

    const savedDifficulty = localStorage.getItem('symmetryPro_difficulty');
    if (savedDifficulty && ['beginner', 'intermediate', 'advanced'].includes(savedDifficulty)) {
      setDifficultyLevel(savedDifficulty as any);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('symmetryPro_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('symmetryPro_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('symmetryPro_difficulty', difficultyLevel);
  }, [difficultyLevel]);

  const handleStartJourney = () => {
    setCurrentView('dashboard');
  };

  const handleSelectExercise = (exercise: any) => {
    setSelectedExercise(exercise);
    setExerciseTimeLeft(exercise.duration);
    setIsExerciseRunning(false);
    setCurrentView('exercise');
  };

  const handleStartExercise = () => {
    if (!selectedExercise) return;
    setIsExerciseRunning(true);

    timerRef.current = setInterval(() => {
      setExerciseTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsExerciseRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePauseExercise = () => {
    setIsExerciseRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleResetExercise = () => {
    if (!selectedExercise) return;
    setIsExerciseRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setExerciseTimeLeft(selectedExercise.duration);
  };

  const handleCompleteExercise = () => {
    if (!selectedExercise) return;

    useProgressStore.getState().addSession({
      exerciseId: selectedExercise.id,
      duration: selectedExercise.duration - exerciseTimeLeft,
      repetitions: selectedExercise.repetitions || 1,
      completed: true,
      side: selectedExercise.sideControl,
    });

    handleResetExercise();
    setIsExerciseRunning(false);
  };

  const handleSwitchSide = () => {
    setExerciseSide(exerciseSide === 'left' ? 'right' : 'left');
  };

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('symmetryPro_disclaimerAccepted', 'true');
    setShowDisclaimer(false);
  };

  const handleClearData = () => {
    if (confirm(t('clearData') + '?')) {
      clearAllProgress();
    }
  };

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showDisclaimer) {
    return <DisclaimerView onAccept={handleAcceptDisclaimer} t={t} />;
  }

  switch (currentView) {
    case 'landing':
      return <LandingView onStartJourney={handleStartJourney} t={t} />;
    case 'dashboard':
      return (
        <DashboardView
          t={t}
          stats={stats}
          dailyGoal={dailyGoal}
          onSelectFacial={() => setCurrentView('facial')}
          onSelectBody={() => setCurrentView('body')}
          onViewProgress={() => setCurrentView('progress')}
          onViewEducation={() => setCurrentView('education')}
          onOpenSettings={() => setCurrentView('settings')}
          onLanguageChange={handleLanguageChange}
          language={language}
        />
      );
    case 'facial':
      return (
        <FacialView
          t={t}
          onBack={() => setCurrentView('dashboard')}
          onSelectExercise={handleSelectExercise}
        />
      );
    case 'body':
      return (
        <BodyView
          t={t}
          onBack={() => setCurrentView('dashboard')}
          onSelectExercise={handleSelectExercise}
        />
      );
    case 'exercise':
      return (
        <ExerciseView
          t={t}
          exercise={selectedExercise}
          isRunning={isExerciseRunning}
          timeLeft={exerciseTimeLeft}
          side={exerciseSide}
          onStart={handleStartExercise}
          onPause={handlePauseExercise}
          onReset={handleResetExercise}
          onComplete={handleCompleteExercise}
          onSwitchSide={handleSwitchSide}
          onBack={() => setCurrentView('dashboard')}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />
      );
    case 'progress':
      return (
        <ProgressView
          t={t}
          stats={stats}
          weeklyProgress={weeklyProgress}
          monthlyProgress={monthlyProgress}
          onBack={() => setCurrentView('dashboard')}
        />
      );
    case 'education':
      return <EducationView t={t} onBack={() => setCurrentView('dashboard')} />;
    case 'settings':
      return (
        <SettingsView
          t={t}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          difficultyLevel={difficultyLevel}
          onDifficultyChange={setDifficultyLevel}
          language={language}
          onLanguageChange={handleLanguageChange}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onClearData={handleClearData}
          onBack={() => setCurrentView('dashboard')}
        />
      );
    default:
      return <LandingView onStartJourney={handleStartJourney} t={t} />;
  }
}

function DisclaimerView({ onAccept, t }: { onAccept: () => void; t: any }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gray-900/50 backdrop-blur-xl border-gray-800">
        <CardHeader className="text-center space-y-4">
          <AlertTriangle className="w-16 h-16 mx-auto text-amber-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-white">{t('disclaimerTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-amber-900/50 bg-amber-950/20">
            <AlertDescription className="text-gray-300 leading-relaxed">
              {t('disclaimerText')}
            </AlertDescription>
          </Alert>
          <div className="space-y-3 text-sm text-gray-400">
            <p className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {t('medicalAdviceWarning')}
            </p>
            <p className="flex items-start gap-2">
              <Flame className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {t('consistencyNote')}
            </p>
            <p className="flex items-start gap-2">
              <Brain className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {t('geneticsNote')}
            </p>
            <p className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {t('resultsVary')}
            </p>
          </div>
          <Button
            onClick={onAccept}
            className="w-full h-12 text-lg bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white"
          >
            {t('acceptDisclaimer')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function LandingView({ onStartJourney, t }: { onStartJourney: () => void; t: any }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500 mb-4">
            {t('appName')}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 font-light mb-2">{t('tagline')}</p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 space-y-4">
              <Target className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-200">{t('facialSymmetry')}</h3>
              <p className="text-sm text-gray-500">
                {t('moduleDesc')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 space-y-4">
              <Activity className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-200">{t('bodySymmetry')}</h3>
              <p className="text-sm text-gray-500">
                {t('bodyModuleDesc')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 space-y-4">
              <TrendingUp className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-200">{t('progress')}</h3>
              <p className="text-sm text-gray-500">
                {t('consistencyKey')}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 mt-12">
          <Button
            onClick={onStartJourney}
            size="lg"
            className="h-16 px-12 text-xl bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white"
          >
            {t('startJourney')}
          </Button>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {t('beginner')} Friendly
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Quick Sessions
            </span>
            <span className="flex items-center gap-2">
              <Languages className="w-4 h-4" />
              {t('language')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardView({
  t,
  stats,
  dailyGoal,
  onSelectFacial,
  onSelectBody,
  onViewProgress,
  onViewEducation,
  onOpenSettings,
  onLanguageChange,
  language,
}: {
  t: any;
  stats: any;
  dailyGoal: any;
  onSelectFacial: () => void;
  onSelectBody: () => void;
  onViewProgress: () => void;
  onViewEducation: () => void;
  onOpenSettings: () => void;
  onLanguageChange: () => void;
  language: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <header className="border-b border-gray-800 bg-gray-900/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-gray-400" />
              <h1 className="text-2xl font-bold text-gray-200">{t('appName')}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onLanguageChange}>
                <Languages className="w-5 h-5 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onOpenSettings}>
                <SettingsIcon className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <h2 className="text-4xl font-bold text-gray-200">{t('welcomeBack')}</h2>
          <p className="text-gray-500">{language === 'en' ? new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <Flame className="w-8 h-8 text-orange-500" />
                <Badge variant="outline" className="border-orange-900/50 text-orange-400">
                  {stats.currentStreak} {t('days')}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{t('currentStreak')}</p>
              <p className="text-3xl font-bold text-gray-200">{stats.currentStreak}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <Activity className="w-8 h-8 text-blue-500" />
                <Badge variant="outline" className="border-blue-900/50 text-blue-400">
                  {stats.totalSessions}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{t('totalSessions')}</p>
              <p className="text-3xl font-bold text-gray-200">{stats.totalSessions}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <Clock className="w-8 h-8 text-green-500" />
                <Badge variant="outline" className="border-green-900/50 text-green-400">
                  {Math.floor(stats.totalDuration / 60)}m
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{t('totalMinutes')}</p>
              <p className="text-3xl font-bold text-gray-200">{Math.floor(stats.totalDuration / 60)}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <Target className="w-8 h-8 text-purple-500" />
                <Badge variant="outline" className="border-purple-900/50 text-purple-400">
                  {stats.symmetryScore}/100
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{t('symmetryScore')}</p>
              <p className="text-3xl font-bold text-gray-200">{stats.symmetryScore}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-200">{t('dailyGoal')}</CardTitle>
              <Badge className="bg-gradient-to-r from-green-900/50 to-green-800/50 text-green-400 border-green-700">
                {Math.round(dailyGoal.goalProgress)}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={dailyGoal.goalProgress} className="h-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{Math.round(dailyGoal.completedDuration / 60)} / {Math.round(dailyGoal.dailyGoalDuration / 60)} {t('minutes')}</span>
              {dailyGoal.isGoalMet ? (
                <span className="text-green-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('completed')}
                </span>
              ) : (
                <span className="text-gray-500">{Math.round((dailyGoal.dailyGoalDuration - dailyGoal.completedDuration) / 60)} {t('minutes')} remaining</span>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border-gray-700 hover:border-gray-600 transition-all cursor-pointer group"
            onClick={onSelectFacial}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                  <Zap className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-gray-200 group-hover:text-white transition-colors">{t('facialModule')}</CardTitle>
                  <CardDescription className="text-gray-500">{t('moduleDesc')}</CardDescription>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
              </div>
            </CardHeader>
          </Card>

          <Card
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border-gray-700 hover:border-gray-600 transition-all cursor-pointer group"
            onClick={onSelectBody}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                  <Dumbbell className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-gray-200 group-hover:text-white transition-colors">{t('bodyModule')}</CardTitle>
                  <CardDescription className="text-gray-500">{t('bodyModuleDesc')}</CardDescription>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card
            className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all cursor-pointer group"
            onClick={onViewProgress}
          >
            <CardContent className="p-6 space-y-4">
              <BarChart3 className="w-10 h-10 text-gray-400 group-hover:text-gray-300 transition-colors" />
              <div>
                <h3 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">{t('progress')}</h3>
                <p className="text-sm text-gray-500 mt-1">{t('overallProgress')}</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all cursor-pointer group"
            onClick={onViewEducation}
          >
            <CardContent className="p-6 space-y-4">
              <BookOpen className="w-10 h-10 text-gray-400 group-hover:text-gray-300 transition-colors" />
              <div>
                <h3 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">{t('education')}</h3>
                <p className="text-sm text-gray-500 mt-1">{t('aboutSymmetry')}</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all cursor-pointer group"
            onClick={onOpenSettings}
          >
            <CardContent className="p-6 space-y-4">
              <SettingsIcon className="w-10 h-10 text-gray-400 group-hover:text-gray-300 transition-colors" />
              <div>
                <h3 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">{t('settings')}</h3>
                <p className="text-sm text-gray-500 mt-1">{t('preferences')}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-gray-800 mt-12 bg-gray-900/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">{t('disclaimerTitle')}</p>
            <p className="text-sm text-gray-600">© 2024 {t('appName')}. {t('resultsVary')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FacialView({ t, onBack, onSelectExercise }: { t: any; onBack: () => void; onSelectExercise: (exercise: any) => void }) {
  const facialCategories = getFacialCategories();
  const facialExercises = getExercisesByType('facial');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <header className="border-b border-gray-800 bg-gray-900/30 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-200">{t('facialSymmetry')}</h1>
              <p className="text-sm text-gray-500">{facialExercises.length} {t('exercises')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facialCategories.map((category) => {
              const categoryExercises = facialExercises.filter(ex => ex.category === category);
              const categoryKey = category === 'jawline' ? 'jawlineExercises' :
                               category === 'cheeks' ? 'cheekExercises' :
                               category === 'eyes' ? 'eyeExercises' :
                               category === 'neck' ? 'neckExercises' :
                               category === 'headPosture' ? 'headPosture' : 'facePostureExercises';

              return (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-300 sticky top-0 bg-gray-950/90 backdrop-blur-xl py-2 z-10">
                    {t(categoryKey)}
                  </h3>
                  {categoryExercises.map((exercise) => (
                    <Card
                      key={exercise.id}
                      className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all cursor-pointer group"
                      onClick={() => onSelectExercise(exercise)}
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                              {t(exercise.nameKey)}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {t(exercise.descriptionKey)}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0" />
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-4 h-4" />
                            {exercise.duration}{t('seconds')}
                          </span>
                          {exercise.repetitions && (
                            <span className="flex items-center gap-1 text-gray-500">
                              <Activity className="w-4 h-4" />
                              {exercise.repetitions} {t('reps')}
                            </span>
                          )}
                        </div>
                        <Badge variant="outline" className="border-gray-700 text-gray-400">
                          {exercise.sideControl === 'both' ? t('bothSides') : exercise.sideControl === 'left' ? t('leftSide') : t('rightSide')}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

function BodyView({ t, onBack, onSelectExercise }: { t: any; onBack: () => void; onSelectExercise: (exercise: any) => void }) {
  const bodyCategories = getBodyCategories();
  const bodyExercises = getExercisesByType('body');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <header className="border-b border-gray-800 bg-gray-900/30 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-200">{t('bodySymmetry')}</h1>
              <p className="text-sm text-gray-500">{bodyExercises.length} {t('exercises')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bodyCategories.map((category) => {
              const categoryExercises = bodyExercises.filter(ex => ex.category === category);
              const categoryKey = category === 'shoulders' ? 'shoulderExercises' :
                               category === 'back' ? 'backExercises' :
                               category === 'posture' ? 'bodyPosture' :
                               category === 'imbalance' ? 'leftRightImbalance' : 'neckPosture';

              return (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-300 sticky top-0 bg-gray-950/90 backdrop-blur-xl py-2 z-10">
                    {t(categoryKey)}
                  </h3>
                  {categoryExercises.map((exercise) => (
                    <Card
                      key={exercise.id}
                      className="bg-gray-900/30 backdrop-blur-xl border-gray-800 hover:border-gray-700 transition-all cursor-pointer group"
                      onClick={() => onSelectExercise(exercise)}
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                              {t(exercise.nameKey)}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {t(exercise.descriptionKey)}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0" />
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-4 h-4" />
                            {exercise.duration}{t('seconds')}
                          </span>
                          {exercise.repetitions && (
                            <span className="flex items-center gap-1 text-gray-500">
                              <Activity className="w-4 h-4" />
                              {exercise.repetitions} {t('reps')}
                            </span>
                          )}
                        </div>
                        <Badge variant="outline" className="border-gray-700 text-gray-400">
                          {exercise.sideControl === 'both' ? t('bothSides') : exercise.sideControl === 'left' ? t('leftSide') : t('rightSide')}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

function ExerciseView({
  t,
  exercise,
  isRunning,
  timeLeft,
  side,
  onStart,
  onPause,
  onReset,
  onComplete,
  onSwitchSide,
  onBack,
  soundEnabled,
  onToggleSound,
}: {
  t: any;
  exercise: any;
  isRunning: boolean;
  timeLeft: number;
  side: 'left' | 'right';
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onComplete: () => void;
  onSwitchSide: () => void;
  onBack: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}) {
  if (!exercise) return null;

  const progress = ((exercise.duration - timeLeft) / exercise.duration) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col">
      <header className="border-b border-gray-800 bg-gray-900/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-200">{t(exercise.nameKey)}</h1>
              <p className="text-sm text-gray-500">{exercise.type === 'facial' ? t('facialSymmetry') : t('bodySymmetry')}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onToggleSound}>
              {soundEnabled ? <Volume2 className="w-5 h-5 text-gray-400" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
              <CardContent className="p-6">
                <div className="aspect-square bg-gray-950/50 rounded-lg flex items-center justify-center">
                  <ExerciseAnimation exercise={exercise} isPlaying={isRunning} side={side} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">{t('timeRemaining')}</span>
                  <span className="text-3xl font-bold text-gray-200">{formatTime(timeLeft)}</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{t('duration')}: {exercise.duration} {t('seconds')}</span>
                  <span className="text-gray-500">{Math.round(progress)}%</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {exercise.sideControl === 'both' && (
                <Button
                  onClick={onSwitchSide}
                  variant="outline"
                  className="h-12 border-gray-700 hover:border-gray-600"
                >
                  {side === 'left' ? t('rightSide') : t('leftSide')}
                </Button>
              )}
              {timeLeft === 0 && (
                <Button
                  onClick={onComplete}
                  className="h-12 bg-gradient-to-r from-green-900/50 to-green-800/50 hover:from-green-800/50 hover:to-green-700/50 text-green-400 border-green-700"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  {t('complete')}
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {!isRunning ? (
                <Button onClick={onStart} size="lg" className="flex-1 h-14 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500">
                  <Play className="w-6 h-6 mr-2" />
                  {t('start')}
                </Button>
              ) : (
                <Button onClick={onPause} size="lg" className="flex-1 h-14 bg-gradient-to-r from-amber-900/50 to-amber-800/50 hover:from-amber-800/50 hover:to-amber-700/50 text-amber-400 border-amber-700">
                  <Pause className="w-6 h-6 mr-2" />
                  {t('pause')}
                </Button>
              )}
              <Button onClick={onReset} size="lg" variant="outline" className="h-14 border-gray-700 hover:border-gray-600">
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>

            <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-200">{t('description')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">{t(exercise.descriptionKey)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-200">{t('benefits')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {exercise.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-200">{t('warnings')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="border-amber-900/50 bg-amber-950/20">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-gray-400">
                    {t(exercise.warningsKeys[0])}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-200">{t('technique')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {exercise.technique.map((step: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-400">
                      <span className="flex-shrink-0 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-xs font-semibold text-gray-300">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProgressView({
  t,
  stats,
  weeklyProgress,
  monthlyProgress,
  onBack,
}: {
  t: any;
  stats: any;
  weeklyProgress: any[];
  monthlyProgress: any[];
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState('weekly');

  const completedDays = weeklyProgress.filter((day) => day.completedExercises > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col">
      <header className="border-b border-gray-800 bg-gray-900/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-200">{t('progress')}</h1>
              <p className="text-sm text-gray-500">{t('overallProgress')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
            <CardContent className="p-6 space-y-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <p className="text-sm text-gray-500">{t('bestStreak')}</p>
              <p className="text-3xl font-bold text-gray-200">{stats.bestStreak}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
            <CardContent className="p-6 space-y-2">
              <Activity className="w-8 h-8 text-blue-500" />
              <p className="text-sm text-gray-500">{t('completedExercises')}</p>
              <p className="text-3xl font-bold text-gray-200">{stats.totalSessions}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
            <CardContent className="p-6 space-y-2">
              <Target className="w-8 h-8 text-green-500" />
              <p className="text-sm text-gray-500">{t('consistencyScore')}</p>
              <p className="text-3xl font-bold text-gray-200">{stats.consistencyScore}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
            <CardContent className="p-6 space-y-2">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <p className="text-sm text-gray-500">{t('symmetryScore')}</p>
              <p className="text-3xl font-bold text-gray-200">{stats.symmetryScore}/100</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-gray-200">{t('weeklyProgress')}</CardTitle>
            <CardDescription className="text-gray-500">
              {completedDays}/7 {t('days')} active
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weeklyProgress.map((day, index) => {
                const isActive = day.completedExercises > 0;
                const intensity = Math.min(day.completedExercises / 5, 1);

                return (
                  <div
                    key={index}
                    className="aspect-square bg-gray-800/50 rounded-lg flex flex-col items-center justify-center gap-1 p-2"
                  >
                    <span className="text-xs text-gray-600">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full ${
                        isActive
                          ? 'bg-gradient-to-br from-gray-600 to-gray-700'
                          : 'bg-gray-800'
                      }`}
                      style={{ opacity: isActive ? 0.5 + intensity * 0.5 : 0.3 }}
                    />
                    <span className="text-xs text-gray-500">{day.completedExercises}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-200">{t('monthlyProgress')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {monthlyProgress.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-800/30 transition-colors"
                  >
                    <span className="text-xs text-gray-600 w-16 flex-shrink-0">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gray-600 to-gray-700 transition-all"
                        style={{ width: `${Math.min(day.totalDuration / 300 * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-16 text-right flex-shrink-0">
                      {day.completedExercises} {t('completedExercises')}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function EducationView({ t, onBack }: { t: any; onBack: () => void }) {
  const sections = [
    {
      key: 'aboutSymmetry',
      title: 'About Facial & Body Symmetry',
      content: 'Facial and body symmetry play important roles in perceived attractiveness and overall appearance. Symmetry is often associated with health, genetic fitness, and developmental stability. While genetics influence your baseline symmetry, targeted exercises, proper posture, and consistent practice can help maximize your potential within your genetic framework.',
    },
    {
      key: 'whySymmetryMatters',
      title: 'Why Symmetry Matters',
      content: 'Symmetrical features are subconsciously perceived as more attractive and healthy. Research suggests that symmetry may indicate genetic quality and developmental stability. Beyond aesthetics, improving symmetry can enhance facial expressions, balance muscle development, and promote better posture.',
    },
    {
      key: 'scienceBehind',
      title: 'The Science Behind Symmetry',
      content: 'Symmetry develops during embryonic growth and can be influenced by environmental factors. Asymmetries often result from uneven muscle development, posture habits, or minor injuries. Targeted exercises can help balance muscle strength on both sides, gradually improving overall symmetry.',
    },
    {
      key: 'biomechanics',
      title: 'Biomechanics of Posture',
      content: 'Proper posture is fundamental to facial and body symmetry. Forward head posture, rounded shoulders, and spinal misalignments can create or exacerbate asymmetries. By strengthening postural muscles and maintaining neutral alignment, you create a foundation for symmetrical development.',
    },
    {
      key: 'muscleBalance',
      title: 'Muscle Balance Theory',
      content: 'Muscle balance occurs when opposing muscle groups have equal strength and flexibility. Imbalances can lead to asymmetries and discomfort. Unilateral exercises, where you work each side independently, help identify and correct strength differences between left and right sides.',
    },
    {
      key: 'consistencyKey',
      title: 'Why Consistency is Key',
      content: 'Symmetry improvement requires consistent practice over time. Muscle adaptation takes weeks to months, and results compound with regular training. Daily practice, even for short durations, is more effective than occasional long sessions. Aim for at least 15-20 minutes of exercise per day.',
    },
    {
      key: 'tipsSuccess',
      title: 'Tips for Success',
      content: '1. Practice daily, even if only for a few minutes. 2. Use a mirror to check your form and symmetry. 3. Start with easier exercises and progress gradually. 4. Focus on quality over quantity. 5. Listen to your body and avoid pain. 6. Take photos to track progress over time. 7. Combine exercises with good posture throughout the day.',
    },
    {
      key: 'commonMistakes',
      title: 'Common Mistakes to Avoid',
      content: '1. Overexerting and causing muscle strain. 2. Skipping warm-up stretches. 3. Performing exercises too quickly without control. 4. Neglecting the weaker side. 5. Only doing exercises sporadically. 6. Expecting overnight results. 7. Comparing yourself to others rather than your own progress.',
    },
    {
      key: 'whenSeeResults',
      title: 'When Will You See Results?',
      content: 'Results vary based on consistency, genetics, starting point, and effort. Most people notice subtle improvements within 4-6 weeks of daily practice. Significant changes typically require 3-6 months of consistent training. Remember that small improvements accumulate over time. Focus on gradual progress rather than immediate transformation.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col">
      <header className="border-b border-gray-800 bg-gray-900/30 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-200">{t('education')}</h1>
              <p className="text-sm text-gray-500">{t('aboutSymmetry')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-200">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed whitespace-pre-line">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

function SettingsView({
  t,
  darkMode,
  onToggleDarkMode,
  difficultyLevel,
  onDifficultyChange,
  language,
  onLanguageChange,
  soundEnabled,
  onToggleSound,
  onClearData,
  onBack,
}: {
  t: any;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  onDifficultyChange: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  language: string;
  onLanguageChange: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onClearData: () => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col">
      <header className="border-b border-gray-800 bg-gray-900/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-200">{t('settings')}</h1>
              <p className="text-sm text-gray-500">{t('preferences')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-200">{t('language')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Languages className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-200">{t('language')}</p>
                    <p className="text-sm text-gray-500">{language === 'en' ? 'English' : 'Español'}</p>
                  </div>
                </div>
                <Button onClick={onLanguageChange} variant="outline" className="border-gray-700">
                  {language === 'en' ? 'Switch to Español' : 'Cambiar a English'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-200">{t('theme')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SettingsIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-200">{darkMode ? t('darkMode') : t('lightMode')}</p>
                    <p className="text-sm text-gray-500">{darkMode ? 'Dark theme enabled' : 'Light theme enabled'}</p>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={onToggleDarkMode} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-200">{t('difficultyLevel')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-200">{t('difficultyLevel')}</p>
                    <p className="text-sm text-gray-500">{t(difficultyLevel)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <Button
                      key={level}
                      variant={difficultyLevel === level ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onDifficultyChange(level)}
                      className={difficultyLevel === level ? 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500' : 'border-gray-700'}
                    >
                      {t(level)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-200">{t('preferences')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {soundEnabled ? <Volume2 className="w-5 h-5 text-gray-400" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
                  <div>
                    <p className="font-medium text-gray-200">{t('enableNotifications')}</p>
                    <p className="text-sm text-gray-500">{soundEnabled ? 'Sound enabled' : 'Sound disabled'}</p>
                  </div>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={onToggleSound} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 backdrop-blur-xl border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-200">{t('dataManagement')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-red-900/50 bg-red-950/20">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-gray-400">
                  This action cannot be undone. All progress and settings will be permanently deleted.
                </AlertDescription>
              </Alert>
              <Button
                onClick={onClearData}
                variant="outline"
                className="w-full border-red-900/50 text-red-400 hover:bg-red-950/20"
              >
                <XCircle className="w-4 h-4 mr-2" />
                {t('clearData')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
