'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // App
    appName: 'Symmetry Pro',
    tagline: 'Unlock Your True Potential',
    subtitle: 'Professional Facial & Body Symmetry Training',
    startJourney: 'Start Your Journey',
    getStarted: 'Get Started',

    // Navigation
    dashboard: 'Dashboard',
    facialSymmetry: 'Facial Symmetry',
    bodySymmetry: 'Body Symmetry',
    progress: 'Progress',
    education: 'Education',
    settings: 'Settings',

    // Dashboard
    welcomeBack: 'Welcome Back',
    dailyGoal: 'Daily Goal',
    streak: 'Day Streak',
    totalSessions: 'Total Sessions',
    symmetryScore: 'Symmetry Score',
    overallProgress: 'Overall Progress',
    todayExercises: 'Today\'s Exercises',
    startWorkout: 'Start Workout',
    viewAll: 'View All',

    // Modules
    facialModule: 'Facial Symmetry Module',
    bodyModule: 'Body Symmetry Module',
    moduleDesc: 'Comprehensive exercises to improve facial balance and definition',
    bodyModuleDesc: 'Targeted exercises for posture and body alignment',

    // Facial Exercises
    jawlineExercises: 'Jawline Exercises',
    cheekExercises: 'Cheek Exercises',
    eyeExercises: 'Eye Exercises',
    neckExercises: 'Neck Exercises',
    headPosture: 'Head Posture',
    facePostureExercises: 'Facial Posture Exercises',

    // Body Exercises
    shoulderExercises: 'Shoulder Exercises',
    backExercises: 'Back Exercises',
    neckPosture: 'Neck Posture',
    bodyPosture: 'Body Posture',
    leftRightImbalance: 'Left-Right Imbalance Correction',

    // Exercise Details
    description: 'Description',
    benefits: 'Benefits',
    duration: 'Duration',
    repetitions: 'Repetitions',
    sideControl: 'Side Control',
    warnings: 'Warnings',
    technique: 'Technique',
    visualDemo: 'Visual Demonstration',
    leftSide: 'Left Side',
    rightSide: 'Right Side',
    bothSides: 'Both Sides',
    seconds: 'seconds',
    reps: 'reps',
    holdFor: 'Hold for',
    repeat: 'Repeat',
    times: 'times',

    // Specific Exercises - Jawline
    jawlineClench: 'Jawline Clench',
    jawlineClenchDesc: 'Tense your jaw muscles by clenching your teeth and holding the position. Focus on the masseter muscles on both sides.',
    jawlineClenchBenefits: 'Strengthens jawline, defines facial contours, improves masseter muscle tone',
    jawlineClenchWarnings: 'Do not clench too tightly, avoid grinding teeth, stop if you feel jaw pain',
    jawlineResistance: 'Jawline Resistance',
    jawlineResistanceDesc: 'Use your hand to apply gentle resistance against your jaw as you open and close your mouth.',
    jawlineResistanceBenefits: 'Builds jaw strength, improves muscle definition, enhances lower face structure',
    jawlineResistanceWarnings: 'Use gentle pressure only, avoid overextension of the jaw joint',
    tonguePosture: 'Tongue Posture (Mewing)',
    tonguePostureDesc: 'Press the entire surface of your tongue against the roof of your mouth, keeping teeth slightly apart.',
    tonguePostureBenefits: 'Defines jawline, improves facial structure, promotes proper tongue positioning',
    tonguePostureWarnings: 'Do not force the tongue, ensure comfortable placement, practice gradually',

    // Specific Exercises - Cheeks
    cheekLifts: 'Cheek Lifts',
    cheekLiftsDesc: 'Smile broadly while keeping your lips closed, then push your cheeks upward toward your eyes.',
    cheekLiftsBenefits: 'Tones cheek muscles, reduces sagging, enhances facial definition',
    cheekLiftsWarnings: 'Avoid excessive smiling that causes wrinkles, maintain controlled movement',
    cheekPuffing: 'Cheek Puffing',
    cheekPuffingDesc: 'Inflate your cheeks with air, then transfer the air from side to side while holding.',
    cheekPuffingBenefits: 'Strengthens buccinator muscles, improves cheek fullness, tones facial structure',
    cheekPuffingWarnings: 'Breathe normally between holds, do not overexert facial muscles',
    cheekResistance: 'Cheek Resistance',
    cheekResistanceDesc: 'Use your fingers to apply gentle pressure on your cheeks while smiling against the resistance.',
    cheekResistanceBenefits: 'Builds cheek muscle strength, enhances facial contour, improves muscle control',
    cheekResistanceWarnings: 'Apply light pressure only, avoid pinching or pulling skin aggressively',

    // Specific Exercises - Eyes
    eyeFocus: 'Eye Focus Training',
    eyeFocusDesc: 'Look at a distant object, then focus on something close, repeatedly switching between distances.',
    eyeFocusBenefits: 'Strengthens eye muscles, improves focus coordination, enhances facial balance',
    eyeFocusWarnings: 'Blink regularly, avoid straining, take breaks if eyes become tired',
    eyeCircles: 'Eye Circular Movements',
    eyeCirclesDesc: 'Slowly move your eyes in circular patterns, first clockwise then counter-clockwise.',
    eyeCirclesBenefits: 'Improves eye muscle flexibility, reduces eye strain, enhances peripheral awareness',
    eyeCirclesWarnings: 'Move slowly and smoothly, avoid rapid or jerky movements',
    eyebrowLifts: 'Eyebrow Lifts',
    eyebrowLiftsDesc: 'Raise your eyebrows as high as possible, hold briefly, then relax and repeat.',
    eyebrowLiftsBenefits: 'Tones forehead muscles, reduces brow sagging, enhances upper facial expression',
    eyebrowLiftsWarnings: 'Avoid creating deep forehead wrinkles, maintain smooth movements',

    // Specific Exercises - Neck
    neckTilts: 'Neck Tilts',
    neckTiltsDesc: 'Gently tilt your head forward, backward, and to each side, stretching the neck muscles.',
    neckTiltsBenefits: 'Improves neck flexibility, reduces tension, enhances jawline appearance',
    neckTiltsWarnings: 'Move slowly and smoothly, avoid extreme ranges, stop if you feel pain',
    neckRotations: 'Neck Rotations',
    neckRotationsDesc: 'Slowly rotate your head in circles, first clockwise then counter-clockwise.',
    neckRotationsBenefits: 'Increases neck mobility, releases muscle tension, improves posture',
    neckRotationsWarnings: 'Keep movements gentle, avoid cracking or popping sounds',
    chinTucks: 'Chin Tucks',
    chinTucksDesc: 'Pull your chin straight back as if making a double chin, hold, then release.',
    chinTucksBenefits: 'Strengthens neck flexors, improves forward head posture, defines jawline',
    chinTucksWarnings: 'Ensure smooth movement, avoid jerking, align with spine properly',

    // Specific Exercises - Head Posture
    headAlignment: 'Head Alignment Training',
    headAlignmentDesc: 'Practice aligning your head directly above your shoulders, maintaining neutral position.',
    headAlignmentBenefits: 'Corrects forward head posture, improves facial symmetry, reduces neck strain',
    headAlignmentWarnings: 'Use a mirror for feedback, maintain awareness throughout day',
    headLevel: 'Head Leveling',
    headLevelDesc: 'Use a water level or app to ensure your head is perfectly level when standing still.',
    headLevelBenefits: 'Identifies asymmetries, improves balance awareness, trains proper alignment',
    headLevelWarnings: 'Do not obsess over minor asymmetries, focus on gradual improvement',
    mirrorTraining: 'Mirror Awareness Training',
    mirrorTrainingDesc: 'Practice maintaining symmetrical facial expressions and head position in front of a mirror.',
    mirrorTrainingBenefits: 'Develops symmetry awareness, improves muscle balance, enhances facial control',
    mirrorTrainingWarnings: 'Use for short periods, avoid self-criticism, focus on improvement',

    // Specific Exercises - Shoulders
    shoulderRolls: 'Shoulder Rolls',
    shoulderRollsDesc: 'Roll your shoulders forward in circles, then backward, focusing on smooth movements.',
    shoulderRollsBenefits: 'Improves shoulder mobility, reduces tension, enhances upper body symmetry',
    shoulderRollsWarnings: 'Move slowly, avoid shrugging, maintain relaxed posture',
    shoulderSqueezes: 'Shoulder Squeezes',
    shoulderSqueezesDesc: 'Squeeze your shoulder blades together, hold briefly, then release and repeat.',
    shoulderSqueezesBenefits: 'Strengthens back muscles, improves posture, enhances shoulder definition',
    shoulderSqueezesWarnings: 'Do not over-squeeze, maintain relaxed shoulders between repetitions',
    unilateralShoulder: 'Unilateral Shoulder Raises',
    unilateralShoulderDesc: 'Raise one shoulder at a time, focusing on balanced movement on both sides.',
    unilateralShoulderBenefits: 'Corrects shoulder asymmetry, improves individual side awareness, builds balanced strength',
    unilateralShoulderWarnings: 'Perform equal repetitions on each side, avoid compensating with stronger side',

    // Specific Exercises - Back
    wallAngles: 'Wall Angels',
    wallAnglesDesc: 'Stand against a wall with arms at 90 degrees, slide arms up and down while maintaining contact.',
    wallAnglesBenefits: 'Improves posture alignment, strengthens back muscles, opens chest area',
    wallAnglesWarnings: 'Keep back flat against wall, move arms slowly, avoid straining',
    catCow: 'Cat-Cow Stretch',
    catCowDesc: 'Alternate between arching and rounding your back on hands and knees position.',
    catCowBenefits: 'Increases spinal flexibility, releases back tension, improves posture awareness',
    catCowWarnings: 'Move smoothly, avoid extreme ranges, listen to your body',
    scapularRetractions: 'Scapular Retractions',
    scapularRetractionsDesc: 'Pull your shoulder blades down and back while maintaining arm position.',
    scapularRetractionsBenefits: 'Strengthens scapular muscles, improves upper back posture, enhances symmetry',
    scapularRetractionsWarnings: 'Focus on controlled movement, avoid using momentum, engage muscles consciously',

    // Specific Exercises - Body Posture
    postureAlignment: 'Posture Alignment',
    postureAlignmentDesc: 'Practice standing with weight evenly distributed, shoulders back, head aligned.',
    postureAlignmentBenefits: 'Improves overall body symmetry, reduces strain, enhances appearance',
    postureAlignmentWarnings: 'Check alignment in mirror, practice regularly, avoid hyper-extending',
    weightDistribution: 'Weight Distribution Training',
    weightDistributionDesc: 'Practice shifting weight evenly between left and right feet while standing.',
    weightDistributionBenefits: 'Corrects weight imbalances, improves balance awareness, reduces asymmetry',
    weightDistributionWarnings: 'Use a scale or level surface, practice with eyes closed for challenge',
    spinalAlignment: 'Spinal Alignment Check',
    spinalAlignmentDesc: 'Use a wall or mirror to ensure your spine is straight from multiple angles.',
    spinalAlignmentBenefits: 'Identifies postural deviations, trains proper alignment, improves overall symmetry',
    spinalAlignmentWarnings: 'Seek professional help for major deviations, focus on gradual improvement',

    // Specific Exercises - Left-Right Imbalance
    sideStretching: 'Side-to-Side Stretching',
    sideStretchingDesc: 'Perform gentle side stretches, ensuring equal duration on left and right sides.',
    sideStretchingBenefits: 'Improves flexibility symmetry, releases muscle tension, balances range of motion',
    sideStretchingWarnings: 'Keep movements controlled, avoid bouncing, breathe steadily',
 unilateralStrengthening: 'Unilateral Strengthening',
    unilateralStrengtheningDesc: 'Perform exercises on weaker side first, then match repetitions on stronger side.',
    unilateralStrengtheningBenefits: 'Corrects strength imbalances, builds symmetrical development, prevents compensations',
    unilateralStrengtheningWarnings: 'Use lighter weights on weaker side, focus on proper form first',
 balanceAwareness: 'Balance Awareness Training',
    balanceAwarenessDesc: 'Practice standing on one foot at a time, noting differences between left and right stability.',
    balanceAwarenessBenefits: 'Identifies balance asymmetries, improves proprioception, enhances coordination',
    balanceAwarenessWarnings: 'Use support if needed, practice near a wall for safety',

    // Progress Section
    weeklyProgress: 'Weekly Progress',
    monthlyProgress: 'Monthly Progress',
    symmetryTrends: 'Symmetry Trends',
    consistencyScore: 'Consistency Score',
    exerciseHistory: 'Exercise History',
    achievements: 'Achievements',
    completedExercises: 'Completed Exercises',
    totalMinutes: 'Total Minutes',
    currentStreak: 'Current Streak',
    bestStreak: 'Best Streak',
    days: 'days',
    viewDetails: 'View Details',
    noDataYet: 'No data yet. Start exercising to track your progress!',

    // Education Section
    aboutSymmetry: 'About Facial & Body Symmetry',
    whySymmetryMatters: 'Why Symmetry Matters',
    scienceBehind: 'The Science Behind Symmetry',
    biomechanics: 'Biomechanics of Posture',
    muscleBalance: 'Muscle Balance Theory',
    consistencyKey: 'Why Consistency is Key',
    tipsSuccess: 'Tips for Success',
    commonMistakes: 'Common Mistakes to Avoid',
    whenSeeResults: 'When Will You See Results?',
    additionalResources: 'Additional Resources',

    // Settings Section
    language: 'Language',
    theme: 'Theme',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    notifications: 'Notifications',
    enableNotifications: 'Enable Notifications',
    dailyReminder: 'Daily Reminder Time',
    privacy: 'Privacy',
    clearData: 'Clear All Data',
    resetProgress: 'Reset Progress',
    dataManagement: 'Data Management',
    exportData: 'Export Data',
    importData: 'Import Data',
    preferences: 'Preferences',
    exerciseDuration: 'Default Exercise Duration',
    difficultyLevel: 'Difficulty Level',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    saveSettings: 'Save Settings',
    settingsSaved: 'Settings saved successfully',
    dataCleared: 'All data cleared successfully',

    // Actions
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    complete: 'Complete',
    next: 'Next',
    previous: 'Previous',
    skip: 'Skip',
    finish: 'Finish',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    reset: 'Reset',
    back: 'Back',
    close: 'Close',
    apply: 'Apply',

    // States
    loading: 'Loading...',
    ready: 'Ready',
    inProgress: 'In Progress',
    completed: 'Completed',
    paused: 'Paused',

    // Messages
    exerciseComplete: 'Exercise Complete!',
    sessionComplete: 'Session Complete!',
    keepGoing: 'Keep up the great work!',
    takeBreak: 'Take a break if needed',
    maintainForm: 'Focus on maintaining proper form',
    breatheNaturally: 'Breathe naturally throughout',
    listenBody: 'Listen to your body',
    dontOverexert: 'Don\'t overexert yourself',
    restDay: 'Rest day - recovery is important',

    // Timer
    timeRemaining: 'Time Remaining',
    timeElapsed: 'Time Elapsed',
    restPeriod: 'Rest Period',
    getReady: 'Get Ready',
    go: 'Go!',
    halfway: 'Halfway There!',
    almostDone: 'Almost Done!',
    wellDone: 'Well Done!',

    // Disclaimer
    disclaimerTitle: 'Important Disclaimer',
    disclaimerText: 'Results depend on consistency, genetics, posture, and individual factors. This application provides guidance and educational information only. It is not medical advice, diagnosis, or treatment. Always consult with healthcare professionals before starting any exercise program. If you experience pain, discomfort, or unusual symptoms, discontinue use and seek medical attention.',
    acceptDisclaimer: 'I Accept This Disclaimer',
    readFullDisclaimer: 'Read Full Disclaimer',
    medicalAdviceWarning: 'This is not medical advice. Consult a healthcare professional before starting any exercise program.',
    consistencyNote: 'Consistency is key to seeing results. Aim for daily practice for optimal improvement.',
    geneticsNote: 'Genetics play a role in your baseline symmetry. This app helps you maximize your potential within your genetic framework.',
    resultsVary: 'Results vary by individual. Patience and persistence are essential.',

    // Error Messages
    somethingWentWrong: 'Something went wrong',
    tryAgain: 'Please try again',
    connectionError: 'Connection error',
    saveError: 'Failed to save data',
    loadError: 'Failed to load data',

    // Success Messages
    success: 'Success',
    saved: 'Saved successfully',
    updated: 'Updated successfully',
    completedSuccessfully: 'Completed successfully',

    // Empty States
    noExercises: 'No exercises available',
    noProgress: 'No progress recorded',
    selectExercise: 'Select an exercise to begin',
    selectModule: 'Select a module to view exercises',
  },

  es: {
    // App
    appName: 'Symmetry Pro',
    tagline: 'Desbloquea Tu Verdadero Potencial',
    subtitle: 'Entrenamiento Profesional de Simetría Facial y Corporal',
    startJourney: 'Comienza Tu Viaje',
    getStarted: 'Comenzar',

    // Navigation
    dashboard: 'Panel',
    facialSymmetry: 'Simetría Facial',
    bodySymmetry: 'Simetría Corporal',
    progress: 'Progreso',
    education: 'Educación',
    settings: 'Configuración',

    // Dashboard
    welcomeBack: 'Bienvenido de Nuevo',
    dailyGoal: 'Meta Diaria',
    streak: 'Racha de Días',
    totalSessions: 'Sesiones Totales',
    symmetryScore: 'Puntuación de Simetría',
    overallProgress: 'Progreso General',
    todayExercises: 'Ejercicios de Hoy',
    startWorkout: 'Iniciar Entrenamiento',
    viewAll: 'Ver Todo',

    // Modules
    facialModule: 'Módulo de Simetría Facial',
    bodyModule: 'Módulo de Simetría Corporal',
    moduleDesc: 'Ejercicios completos para mejorar el equilibrio y definición facial',
    bodyModuleDesc: 'Ejercicios específicos para postura y alineación corporal',

    // Facial Exercises
    jawlineExercises: 'Ejercicios de Mandíbula',
    cheekExercises: 'Ejercicios de Mejillas',
    eyeExercises: 'Ejercicios de Ojos',
    neckExercises: 'Ejercicios de Cuello',
    headPosture: 'Postura de la Cabeza',
    facePostureExercises: 'Ejercicios de Postura Facial',

    // Body Exercises
    shoulderExercises: 'Ejercicios de Hombros',
    backExercises: 'Ejercicios de Espalda',
    neckPosture: 'Postura del Cuello',
    bodyPosture: 'Postura Corporal',
    leftRightImbalance: 'Corrección de Desequilibrio Izquierda-Derecha',

    // Exercise Details
    description: 'Descripción',
    benefits: 'Beneficios',
    duration: 'Duración',
    repetitions: 'Repeticiones',
    sideControl: 'Control de Lado',
    warnings: 'Advertencias',
    technique: 'Técnica',
    visualDemo: 'Demostración Visual',
    leftSide: 'Lado Izquierdo',
    rightSide: 'Lado Derecho',
    bothSides: 'Ambos Lados',
    seconds: 'segundos',
    reps: 'reps',
    holdFor: 'Mantener por',
    repeat: 'Repetir',
    times: 'veces',

    // Specific Exercises - Jawline
    jawlineClench: 'Contracción de Mandíbula',
    jawlineClenchDesc: 'Tensa los músculos de la mandíbula apretando los dientes y manteniendo la posición. Enfócate en los músculos maseteros en ambos lados.',
    jawlineClenchBenefits: 'Fortalece la línea mandibular, define los contornos faciales, mejora el tono del masetero',
    jawlineClenchWarnings: 'No aprietes demasiado, evita rechinarse los dientes, detente si sientes dolor en la mandíbula',
    jawlineResistance: 'Resistencia de Mandíbula',
    jawlineResistanceDesc: 'Usa tu mano para aplicar resistencia suave contra la mandíbula mientras abres y cierras la boca.',
    jawlineResistanceBenefits: 'Construye fuerza mandibular, mejora la definición muscular, realza la estructura inferior de la cara',
    jawlineResistanceWarnings: 'Usa solo presión suave, evita la sobreextensión de la articulación de la mandíbula',
    tonguePosture: 'Postura de la Lengua (Mewing)',
    tonguePostureDesc: 'Presiona toda la superficie de la lengua contra el paladar, manteniendo los dientes ligeramente separados.',
    tonguePostureBenefits: 'Define la línea mandibular, mejora la estructura facial, promueve el posicionamiento correcto de la lengua',
    tonguePostureWarnings: 'No fuerces la lengua, asegura una colocación cómoda, practica gradualmente',

    // Specific Exercises - Cheeks
    cheekLifts: 'Elevación de Mejillas',
    cheekLiftsDesc: 'Sonríe ampliamente manteniendo los labios cerrados, luego empuja las mejillas hacia arriba hacia los ojos.',
    cheekLiftsBenefits: 'Tonifica los músculos de las mejillas, reduce la flacidez, mejora la definición facial',
    cheekLiftsWarnings: 'Evita sonreír excesivamente que cause arrugas, mantén un movimiento controlado',
    cheekPuffing: 'Inflado de Mejillas',
    cheekPuffingDesc: 'Infla las mejillas con aire, luego transfiere el aire de lado a lado mientras sostienes.',
    cheekPuffingBenefits: 'Fortalece los músculos bucinadores, mejora la plenitud de las mejillas, tonifica la estructura facial',
    cheekPuffingWarnings: 'Respira normalmente entre sostenidas, no sobreexertes los músculos faciales',
    cheekResistance: 'Resistencia de Mejillas',
    cheekResistanceDesc: 'Usa los dedos para aplicar presión suave en las mejillas mientras sonríes contra la resistencia.',
    cheekResistanceBenefits: 'Construye fuerza en las mejillas, mejora el contorno facial, aumenta el control muscular',
    cheekResistanceWarnings: 'Aplica solo presión ligera, evita pellizcar o jalar la piel agresivamente',

    // Specific Exercises - Eyes
    eyeFocus: 'Entrenamiento de Enfoque Ocular',
    eyeFocusDesc: 'Mira un objeto lejano, luego enfócate en algo cercano, cambiando repetidamente entre distancias.',
    eyeFocusBenefits: 'Fortalece los músculos oculares, mejora la coordinación del enfoque, mejora el equilibrio facial',
    eyeFocusWarnings: 'Parpadea regularmente, evita forzar, toma descansos si los ojos se cansan',
    eyeCircles: 'Movimientos Circulares de Ojos',
    eyeCirclesDesc: 'Mueve los ojos lentamente en patrones circulares, primero en sentido horario luego antihorario.',
    eyeCirclesBenefits: 'Mejora la flexibilidad de los músculos oculares, reduce la fatiga visual, mejora la conciencia periférica',
    eyeCirclesWarnings: 'Muévete lenta y suavemente, evita movimientos rápidos o bruscos',
    eyebrowLifts: 'Elevación de Cejas',
    eyebrowLiftsDesc: 'Levanta las cejas lo más alto posible, mantén brevemente, luego relájate y repite.',
    eyebrowLiftsBenefits: 'Tonifica los músculos de la frente, reduce la caída de las cejas, mejora la expresión facial superior',
    eyebrowLiftsWarnings: 'Evita crear arrugas profundas en la frente, mantén movimientos suaves',

    // Specific Exercises - Neck
    neckTilts: 'Inclinaciones de Cuello',
    neckTiltsDesc: 'Inclina gentilmente la cabeza hacia adelante, atrás y hacia cada lado, estirando los músculos del cuello.',
    neckTiltsBenefits: 'Mejora la flexibilidad del cuello, reduce la tensión, mejora la apariencia de la línea mandibular',
    neckTiltsWarnings: 'Muévete lenta y suavemente, evita rangos extremos, detente si sientes dolor',
    neckRotations: 'Rotaciones de Cuello',
    neckRotationsDesc: 'Rota lentamente la cabeza en círculos, primero en sentido horario luego antihorario.',
    neckRotationsBenefits: 'Aumenta la movilidad del cuello, libera tensión muscular, mejora la postura',
    neckRotationsWarnings: 'Mantén movimientos suaves, evita sonidos de crujido o chasquido',
    chinTucks: 'Retracción de Mentón',
    chinTucksDesc: 'Jala el mentón directamente hacia atrás como si hicieras un doble mentón, sostén, luego suelta.',
    chinTucksBenefits: 'Fortalece los flexores del cuello, mejora la postura de cabeza hacia adelante, define la línea mandibular',
    chinTucksWarnings: 'Asegura movimiento suave, evita sacudidas, alinea correctamente con la columna',

    // Specific Exercises - Head Posture
    headAlignment: 'Entrenamiento de Alineación de Cabeza',
    headAlignmentDesc: 'Practica alinear la cabeza directamente sobre los hombros, manteniendo posición neutral.',
    headAlignmentBenefits: 'Corrige la postura de cabeza hacia adelante, mejora la simetría facial, reduce la tensión del cuello',
    headAlignmentWarnings: 'Usa un espejo para retroalimentación, mantén la conciencia durante el día',
    headLevel: 'Nivelación de Cabeza',
    headLevelDesc: 'Usa un nivel de agua o app para asegurar que tu cabeza esté perfectamente nivelada al estar parado.',
    headLevelBenefits: 'Identifica asimetrías, mejora la conciencia del equilibrio, entrena la alineación correcta',
    headLevelWarnings: 'No obsesiones sobre asimetrías menores, enfócate en la mejora gradual',
    mirrorTraining: 'Entrenamiento de Conciencia en Espejo',
    mirrorTrainingDesc: 'Practica mantener expresiones faciales simétricas y posición de cabeza frente a un espejo.',
    mirrorTrainingBenefits: 'Desarrolla conciencia de simetría, mejora el equilibrio muscular, aumenta el control facial',
    mirrorTrainingWarnings: 'Usa por periodos cortos, evita la autocrítica, enfócate en la mejora',

    // Specific Exercises - Shoulders
    shoulderRolls: 'Rodillos de Hombros',
    shoulderRollsDesc: 'Rueda los hombros hacia adelante en círculos, luego hacia atrás, enfocándose en movimientos suaves.',
    shoulderRollsBenefits: 'Mejora la movilidad de los hombros, reduce la tensión, mejora la simetría del cuerpo superior',
    shoulderRollsWarnings: 'Muévete lentamente, evitas encoger los hombros, mantén postura relajada',
    shoulderSqueezes: 'Compresión de Hombros',
    shoulderSqueezesDesc: 'Comprime las escápulas juntas, mantén brevemente, luego suelta y repite.',
    shoulderSqueezesBenefits: 'Fortalece los músculos de la espalda, mejora la postura, mejora la definición de los hombros',
    shoulderSqueezesWarnings: 'No compres excesivamente, mantén hombros relajados entre repeticiones',
    unilateralShoulder: 'Elevación Unilateral de Hombros',
    unilateralShoulderDesc: 'Levanta un hombro a la vez, enfocándote en movimiento equilibrado en ambos lados.',
    unilateralShoulderBenefits: 'Corrige asimetría de hombros, mejora la conciencia individual de cada lado, construye fuerza equilibrada',
    unilateralShoulderWarnings: 'Realiza repeticiones iguales en cada lado, evita compensar con el lado más fuerte',

    // Specific Exercises - Back
    wallAngles: 'Ángulos de Pared',
    wallAnglesDesc: 'Párate contra una pared con brazos a 90 grados, desliza los brazos arriba y abajo manteniendo contacto.',
    wallAnglesBenefits: 'Mejora la alineación de la postura, fortalece los músculos de la espalda, abre el área del pecho',
    wallAnglesWarnings: 'Mantén la espalda plana contra la pared, mueve los brazos lentamente, evita forzar',
    catCow: 'Estiramiento Gato-Vaca',
    catCowDesc: 'Alterna entre arquear y redondear la espalda en posición de manos y rodillas.',
    catCowBenefits: 'Aumenta la flexibilidad espinal, libera tensión de la espalda, mejora la conciencia de la postura',
    catCowWarnings: 'Muévete suavemente, evita rangos extremos, escucha a tu cuerpo',
    scapularRetractions: 'Retracciones Escapulares',
    scapularRetractionsDesc: 'Jala las escápulas hacia abajo y atrás manteniendo la posición de los brazos.',
    scapularRetractionsBenefits: 'Fortalece los músculos escapulares, mejora la postura de la espalda superior, mejora la simetría',
    scapularRetractionsWarnings: 'Enfócate en movimiento controlado, evita usar impulso, involucra músculos conscientemente',

    // Specific Exercises - Body Posture
    postureAlignment: 'Alineación de Postura',
    postureAlignmentDesc: 'Practica estar de pie con peso distribuido uniformemente, hombros atrás, cabeza alineada.',
    postureAlignmentBenefits: 'Mejora la simetría corporal general, reduce la tensión, mejora la apariencia',
    postureAlignmentWarnings: 'Revisa la alineación en un espejo, practica regularmente, evita hiperextender',
    weightDistribution: 'Entrenamiento de Distribución de Peso',
    weightDistributionDesc: 'Practica cambiar el peso uniformemente entre los pies izquierdo y derecho al estar de pie.',
    weightDistributionBenefits: 'Corrige desequilibrios de peso, mejora la conciencia del equilibrio, reduce la asimetría',
    weightDistributionWarnings: 'Usa una balanza o superficie nivelada, practica con ojos cerrados para mayor desafío',
    spinalAlignment: 'Revisión de Alineación Espinal',
    spinalAlignmentDesc: 'Usa una pared o espejo para asegurar que tu columna esté recta desde múltiples ángulos.',
    spinalAlignmentBenefits: 'Identifica desviaciones posturales, entrena la alineación correcta, mejora la simetría general',
    spinalAlignmentWarnings: 'Busca ayuda profesional para desviaciones mayores, enfócate en la mejora gradual',

    // Specific Exercises - Left-Right Imbalance
    sideStretching: 'Estiramiento Lado a Lado',
    sideStretchingDesc: 'Realiza estiramientos laterales suaves, asegurando duración igual en ambos lados.',
    sideStretchingBenefits: 'Mejora la simetría de flexibilidad, libera tensión muscular, equilibra el rango de movimiento',
    sideStretchingWarnings: 'Mantén movimientos controlados, evita rebotes, respira constantemente',
    unilateralStrengthening: 'Fortalecimiento Unilateral',
    unilateralStrengtheningDesc: 'Realiza ejercicios primero en el lado más débil, luego iguala repeticiones en el lado más fuerte.',
    unilateralStrengtheningBenefits: 'Corrige desequilibrios de fuerza, construye desarrollo simétrico, previene compensaciones',
    unilateralStrengtheningWarnings: 'Usa pesos más ligeros en el lado débil, enfócate primero en la forma correcta',
    balanceAwareness: 'Entrenamiento de Conciencia del Equilibrio',
    balanceAwarenessDesc: 'Practica estar parado en un pie a la vez, notando diferencias entre estabilidad izquierda y derecha.',
    balanceAwarenessBenefits: 'Identifica asimetrías de equilibrio, mejora la propiocepción, aumenta la coordinación',
    balanceAwarenessWarnings: 'Usa apoyo si es necesario, practica cerca de una pared para seguridad',

    // Progress Section
    weeklyProgress: 'Progreso Semanal',
    monthlyProgress: 'Progreso Mensual',
    symmetryTrends: 'Tendencias de Simetría',
    consistencyScore: 'Puntuación de Consistencia',
    exerciseHistory: 'Historial de Ejercicios',
    achievements: 'Logros',
    completedExercises: 'Ejercicios Completados',
    totalMinutes: 'Minutos Totales',
    currentStreak: 'Racha Actual',
    bestStreak: 'Mejor Racha',
    days: 'días',
    viewDetails: 'Ver Detalles',
    noDataYet: 'Sin datos aún. ¡Comienza a ejercitarte para rastrear tu progreso!',

    // Education Section
    aboutSymmetry: 'Sobre Simetría Facial y Corporal',
    whySymmetryMatters: 'Por Qué la Simetría Importa',
    scienceBehind: 'La Ciencia detrás de la Simetría',
    biomechanics: 'Biomecánica de la Postura',
    muscleBalance: 'Teoría del Equilibrio Muscular',
    consistencyKey: 'Por Qué la Consistencia es Clave',
    tipsSuccess: 'Consejos para el Éxito',
    commonMistakes: 'Errores Comunes a Evitar',
    whenSeeResults: '¿Cuándo Verás Resultados?',
    additionalResources: 'Recursos Adicionales',

    // Settings Section
    language: 'Idioma',
    theme: 'Tema',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    notifications: 'Notificaciones',
    enableNotifications: 'Habilitar Notificaciones',
    dailyReminder: 'Hora del Recordatorio Diario',
    privacy: 'Privacidad',
    clearData: 'Borrar Todos los Datos',
    resetProgress: 'Reiniciar Progreso',
    dataManagement: 'Gestión de Datos',
    exportData: 'Exportar Datos',
    importData: 'Importar Datos',
    preferences: 'Preferencias',
    exerciseDuration: 'Duración Predeterminada del Ejercicio',
    difficultyLevel: 'Nivel de Dificultad',
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    saveSettings: 'Guardar Configuración',
    settingsSaved: 'Configuración guardada exitosamente',
    dataCleared: 'Todos los datos borrados exitosamente',

    // Actions
    start: 'Iniciar',
    pause: 'Pausar',
    resume: 'Continuar',
    complete: 'Completar',
    next: 'Siguiente',
    previous: 'Anterior',
    skip: 'Saltar',
    finish: 'Terminar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    reset: 'Reiniciar',
    back: 'Atrás',
    close: 'Cerrar',
    apply: 'Aplicar',

    // States
    loading: 'Cargando...',
    ready: 'Listo',
    inProgress: 'En Progreso',
    completed: 'Completado',
    paused: 'Pausado',

    // Messages
    exerciseComplete: '¡Ejercicio Completo!',
    sessionComplete: '¡Sesión Completa!',
    keepGoing: '¡Continúa con el excelente trabajo!',
    takeBreak: 'Toma un descanso si es necesario',
    maintainForm: 'Enfócate en mantener la forma correcta',
    breatheNaturally: 'Respira naturalmente durante todo el ejercicio',
    listenBody: 'Escucha a tu cuerpo',
    dontOverexert: 'No te sobreexijas',
    restDay: 'Día de descanso - la recuperación es importante',

    // Timer
    timeRemaining: 'Tiempo Restante',
    timeElapsed: 'Tiempo Transcurrido',
    restPeriod: 'Período de Descanso',
    getReady: 'Prepárate',
    go: '¡Ya!',
    halfway: '¡A Medio Camino!',
    almostDone: '¡Casi Terminado!',
    wellDone: '¡Bien Hecho!',

    // Disclaimer
    disclaimerTitle: 'Descargo de Responsabilidad Importante',
    disclaimerText: 'Los resultados dependen de la consistencia, genética, postura y factores individuales. Esta aplicación proporciona guía e información educativa solamente. No es consejo médico, diagnóstico o tratamiento. Siempre consulte con profesionales de la salud antes de comenzar cualquier programa de ejercicios. Si experimenta dolor, incomodidad o síntomas inusuales, discontinúe el uso y busque atención médica.',
    acceptDisclaimer: 'Acepto Este Descargo de Responsabilidad',
    readFullDisclaimer: 'Leer Descargo Completo',
    medicalAdviceWarning: 'Esto no es consejo médico. Consulte a un profesional de la salud antes de comenzar cualquier programa de ejercicios.',
    consistencyNote: 'La consistencia es clave para ver resultados. Apunta a práctica diaria para mejora óptima.',
    geneticsNote: 'La genética juega un papel en tu simetría base. Esta app te ayuda a maximizar tu potencial dentro de tu marco genético.',
    resultsVary: 'Los resultados varían por individuo. La paciencia y persistencia son esenciales.',

    // Error Messages
    somethingWentWrong: 'Algo salió mal',
    tryAgain: 'Por favor inténtelo de nuevo',
    connectionError: 'Error de conexión',
    saveError: 'Error al guardar datos',
    loadError: 'Error al cargar datos',

    // Success Messages
    success: 'Éxito',
    saved: 'Guardado exitosamente',
    updated: 'Actualizado exitosamente',
    completedSuccessfully: 'Completado exitosamente',

    // Empty States
    noExercises: 'No hay ejercicios disponibles',
    noProgress: 'Sin progreso registrado',
    selectExercise: 'Selecciona un ejercicio para comenzar',
    selectModule: 'Selecciona un módulo para ver ejercicios',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('symmetryPro_language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('symmetryPro_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
