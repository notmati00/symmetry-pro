'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Exercise } from '@/lib/exercises';

interface ExerciseAnimationProps {
  exercise: Exercise;
  isPlaying: boolean;
  side?: 'left' | 'right';
}

export function ExerciseAnimation({ exercise, isPlaying, side = 'left' }: ExerciseAnimationProps) {
  const [animationFrame, setAnimationFrame] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    let frameCount = 0;
    const framesPerCycle = 60;

    const animate = () => {
      frameCount++;
      if (frameCount >= framesPerCycle) {
        frameCount = 0;
      }
      setAnimationFrame(frameCount);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const progress = animationFrame / 60;
  const isLeftSide = side === 'left';

  switch (exercise.category) {
    case 'jawline':
      return <JawlineAnimation progress={progress} isPlaying={isPlaying} />;
    case 'cheeks':
      return <CheekAnimation progress={progress} isPlaying={isPlaying} />;
    case 'eyes':
      return <EyeAnimation progress={progress} isPlaying={isPlaying} />;
    case 'neck':
      return <NeckAnimation progress={progress} isPlaying={isPlaying} />;
    case 'headPosture':
      return <HeadPostureAnimation progress={progress} isPlaying={isPlaying} />;
    case 'shoulders':
      return <ShoulderAnimation progress={progress} isPlaying={isPlaying} isLeftSide={isLeftSide} />;
    case 'back':
      return <BackAnimation progress={progress} isPlaying={isPlaying} />;
    case 'posture':
      return <PostureAnimation progress={progress} isPlaying={isPlaying} />;
    case 'imbalance':
      return <ImbalanceAnimation progress={progress} isPlaying={isPlaying} isLeftSide={isLeftSide} />;
    default:
      return <GenericFigureAnimation progress={progress} isPlaying={isPlaying} />;
  }
}

function JawlineAnimation({ progress, isPlaying }: { progress: number; isPlaying: boolean }) {
  const jawMovement = Math.sin(progress * Math.PI * 2) * 5;
  const muscleActivation = Math.abs(Math.sin(progress * Math.PI * 2)) * 0.3;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#2d2d2d" />
        </linearGradient>
        <linearGradient id="muscleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3d3d3d" />
          <stop offset="100%" stopColor="#4a4a4a" />
        </linearGradient>
      </defs>

      <g transform="translate(100, 100)">
        <circle cx="0" cy="-20" r="45" fill="url(#skinGradient)" opacity="0.9" />

        <ellipse
          cx="-12"
          cy="5"
          rx="8"
          ry="15"
          fill="url(#muscleGradient)"
          opacity={0.4 + muscleActivation}
          transform={`rotate(${-10 + jawMovement})`}
        />

        <ellipse
          cx="12"
          cy="5"
          rx="8"
          ry="15"
          fill="url(#muscleGradient)"
          opacity={0.4 + muscleActivation}
          transform={`rotate(${10 - jawMovement})`}
        />

        <ellipse cx="-20" cy="-30" rx="6" ry="8" fill="#0a0a0a" />
        <ellipse cx="20" cy="-30" rx="6" ry="8" fill="#0a0a0a" />

        <circle cx="-18" cy="-32" r="2" fill="#4a4a4a" />
        <circle cx="22" cy="-32" r="2" fill="#4a4a4a" />

        <path
          d="M -8 15 Q 0 25 8 15"
          stroke="#3d3d3d"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M -15 45 Q 0 50 15 45"
          stroke="#1a1a1a"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />
      </g>

      <text x="100" y="180" textAnchor="middle" fill="#666" fontSize="10">
        {isPlaying ? 'Masseter Muscles Active' : 'Ready'}
      </text>
    </svg>
  );
}

function CheekAnimation({ progress, isPlaying }: { progress: number; isPlaying: boolean }) {
  const cheekExpansion = Math.sin(progress * Math.PI * 2) * 3;
  const liftAmount = Math.abs(Math.sin(progress * Math.PI * 2)) * 5;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="faceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#2d2d2d" />
        </linearGradient>
        <linearGradient id="cheekGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#4d4d4d" />
        </linearGradient>
      </defs>

      <g transform="translate(100, 100)">
        <ellipse cx="0" cy="-10" rx="40" ry="50" fill="url(#faceGradient)" opacity="0.9" />

        <ellipse
          cx="-25"
          cy="-5 - liftAmount"
          rx={12 + cheekExpansion}
          ry={10 + cheekExpansion}
          fill="url(#cheekGradient)"
          opacity="0.6"
        />

        <ellipse
          cx="25"
          cy="-5 - liftAmount"
          rx={12 + cheekExpansion}
          ry={10 + cheekExpansion}
          fill="url(#cheekGradient)"
          opacity="0.6"
        />

        <ellipse cx="-18" cy="-30" rx="5" ry="7" fill="#0a0a0a" />
        <ellipse cx="18" cy="-30" rx="5" ry="7" fill="#0a0a0a" />

        <circle cx="-16" cy="-32" r="2" fill="#4a4a4a" />
        <circle cx="20" cy="-32" r="2" fill="#4a4a4a" />

        <path
          d="M -5 20 Q 0 25 5 20"
          stroke="#4d4d4d"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M -15 40 Q 0 45 15 40"
          stroke="#2a2a2a"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />

        <g opacity="0.3">
          <circle cx="-25" cy="-15" r="8" fill="none" stroke="#5a5a5a" strokeWidth="1" />
          <circle cx="25" cy="-15" r="8" fill="none" stroke="#5a5a5a" strokeWidth="1" />
        </g>
      </g>

      <text x="100" y="180" textAnchor="middle" fill="#666" fontSize="10">
        {isPlaying ? 'Cheek Muscles Activated' : 'Ready'}
      </text>
    </svg>
  );
}

function EyeAnimation({ progress, isPlaying }: { progress: number; isPlaying: boolean }) {
  const eyeDirection = Math.sin(progress * Math.PI * 2) * 4;
  const browLift = Math.abs(Math.sin(progress * Math.PI * 2)) * 6;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="eyeFaceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#2d2d2d" />
        </linearGradient>
        <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </radialGradient>
      </defs>

      <g transform="translate(100, 100)">
        <ellipse cx="0" cy="-15" rx="42" ry="48" fill="url(#eyeFaceGradient)" opacity="0.9" />

        <path
          d={`M -30 -45 Q -20 -45 - ${browLift - 45} Q -10 -45 0 -${45 + browLift * 0.5}`}
          stroke="#3a3a3a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d={`M 30 -45 Q 20 -45 ${browLift - 45} Q 10 -45 0 -${45 + browLift * 0.5}`}
          stroke="#3a3a3a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        <ellipse cx="-18" cy="-35" rx="12" ry="8" fill="#0a0a0a" />
        <ellipse cx="18" cy="-35" rx="12" ry="8" fill="#0a0a0a" />

        <circle cx={-18 + eyeDirection} cy="-35" r="4" fill="#5a5a5a" />
        <circle cx={18 + eyeDirection} cy="-35" r="4" fill="#5a5a5a" />

        <circle cx={-18 + eyeDirection + 1} cy="-36" r="1.5" fill="#7a7a7a" />
        <circle cx={18 + eyeDirection + 1} cy="-36" r="1.5" fill="#7a7a7a" />

        <path
          d="M -8 20 Q 0 25 8 20"
          stroke="#4d4d4d"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <g opacity="0.2">
          <circle cx="-18" cy="-35" r="14" fill="none" stroke="#5a5a5a" strokeWidth="1" />
          <circle cx="18" cy="-35" r="14" fill="none" stroke="#5a5a5a" strokeWidth="1" />
        </g>
      </g>

      <text x="100" y="180" textAnchor="middle" fill="#666" fontSize="10">
        {isPlaying ? 'Eye Muscles Engaged' : 'Ready'}
      </text>
    </svg>
  );
}

function NeckAnimation({ progress, isPlaying }: { progress: number; isPlaying: boolean }) {
  const neckRotation = Math.sin(progress * Math.PI * 2) * 15;
  const neckTilt = Math.cos(progress * Math.PI * 2) * 8;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
        <linearGradient id="neckGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#3d3d3d" />
        </linearGradient>
      </defs>

      <g transform="translate(100, 100)">
        <rect x="-25" y="45" width="50" height="60" fill="url(#bodyGradient)" opacity="0.9" rx="5" />

        <rect
          x="-12"
          y="15"
          width="24"
          height="40"
          fill="url(#neckGradient)"
          opacity="0.8"
          rx="3"
          transform={`rotate(${neckTilt})`}
        />

        <g transform={`rotate(${neckRotation})`}>
          <ellipse cx="0" cy="-5" rx="38" ry="42" fill="#1a1a1a" opacity="0.9" />

          <ellipse cx="-16" cy="-25" rx="6" ry="8" fill="#0a0a0a" />
          <ellipse cx="16" cy="-25" rx="6" ry="8" fill="#0a0a0a" />

          <circle cx="-14" cy="-27" r="2" fill="#4a4a4a" />
          <circle cx="18" cy="-27" r="2" fill="#4a4a4a" />

          <path
            d="M -6 15 Q 0 20 6 15"
            stroke="#3d3d3d"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        <g opacity="0.2">
          <path
            d="M -20 20 Q 0 25 20 20"
            stroke="#4a4a4a"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </g>

      <text x="100" y="180" textAnchor="middle" fill="#666" fontSize="10">
        {isPlaying ? 'Neck Muscles Stretching' : 'Ready'}
      </text>
    </svg>
  );
}

function HeadPostureAnimation({ progress, isPlaying }: { progress: number; isPlaying: boolean }) {
  const alignmentPhase = Math.floor(progress * 4);
  const headOffset = alignmentPhase === 1 ? -8 : alignmentPhase === 3 ? 8 : 0;
  const isAligned = alignmentPhase === 0 || alignmentPhase === 2;
  const alignmentColor = isAligned ? '#3d3d3d' : '#5a3a3a';

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="postureBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
        <linearGradient id="postureNeckGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#3d3d3d" />
        </linearGradient>
      </defs>

      <g transform="translate(100, 100)">
        <line x1="0" y1="30" x2="0" y2="100" stroke={alignmentColor} strokeWidth="2" opacity="0.5" />

        <rect x="-30" y="40" width="60" height="65" fill="url(#postureBodyGradient)" opacity="0.9" rx="5" />

        <rect
          x="-15"
          y="10"
          width="30"
          height="40"
          fill="url(#postureNeckGradient)"
          opacity="0.8"
          rx="3"
        />

        <g transform={`translate(${headOffset}, 0)`}>
          <ellipse cx="0" cy="-15" rx="35" ry="40" fill="#1a1a1a" opacity="0.9" />

          <ellipse cx="-14" cy="-35" rx="5" ry="7" fill="#0a0a0a" />
          <ellipse cx="14" cy="-35" rx="5" ry="7" fill="#0a0a0a" />

          <circle cx="-12" cy="-37" r="2" fill="#4a4a4a" />
          <circle cx="16" cy="-37" r="2" fill="#4a4a4a" />

          <path
            d="M -5 5 Q 0 10 5 5"
            stroke="#3d3d3d"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        <g opacity={isAligned ? 0.6 : 0.2}>
          <line x1="-50" y1="-20" x2="50" y2="-20" stroke="#5a5a5a" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="-50" y1="-10" x2="50" y2="-10" stroke="#5a5a5a" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="-50" y1="0" x2="50" y2="0" stroke="#5a5a5a" strokeWidth="1" strokeDasharray="4,4" />
        </g>
      </g>

      <text x="100" y="180" textAnchor="middle" fill="#666" fontSize="10">
        {isPlaying ? (isAligned ? 'Aligned' : 'Adjusting...') : 'Ready'}
      </text>
    </svg>
  );
}

function ShoulderAnimation({ progress, isPlaying, isLeftSide }: { progress: number; isPlaying: boolean; isLeftSide: boolean }) {
  const shoulderPhase = Math.sin(progress * Math.PI * 2);
  const activeShoulderLift = isLeftSide ? shoulderPhase > 0 ? shoulderPhase * 5 : 0 : shoulderPhase < 0 ? -shoulderPhase * 5 : 0;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shoulderBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
        <linearGradient id="shoulderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#3d3d3d" />
        </linearGradient>
      </defs>

      <g transform="translate(100, 100)">
        <ellipse cx="0" cy="60" rx="35" ry="45" fill="url(#shoulderBodyGradient)" opacity="0.9" />

        <ellipse
          cx="-28"
          cy="10 - (isLeftSide ? activeShoulderLift : 0)"
          rx="12"
          ry="15"
          fill="url(#shoulderGradient)"
          opacity={isLeftSide ? 0.9 : 0.6}
        />

        <ellipse
          cx="28"
          cy="10 - (!isLeftSide ? activeShoulderLift : 0)}"
          rx="12"
          ry="15"
          fill="url(#shoulderGradient)"
          opacity={!isLeftSide ? 0.9 : 0.6}
        />

        <rect
          x="-12"
          y="-25"
          width="24"
          height="35"
          fill="#1a1a1a"
          opacity="0.9"
          rx="3"
        />

        <ellipse cx="-10" cy="-45" rx="6" ry="8" fill="#0a0a0a" />
        <ellipse cx="10" cy="-45" rx="6" ry="8" fill="#0a0a0a" />

        <circle cx="-8" cy="-47" r="2" fill="#4a4a4a" />
        <circle cx="12" cy="-47" r="2" fill="#4a4a4a" />

        <path
          d="M -3 -5 Q 0 0 3 -5"
          stroke="#3d3d3d"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <line
          x1="-40"
          y1="10"
          x2="-60"
          y2="10"
          stroke={isLeftSide ? '#4a4a4a' : '#2a2a2a'}
          strokeWidth="3"
          strokeLinecap="round"
        />

        <line
          x1="40"
          y1="10"
          x2="60"
          y2="10"
          stroke={!isLeftSide ? '#4a4a4a' : '#2a2a2a'}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      <text x="100" y="180" textAnchor="middle" fill="#666" fontSize="10">
        {isPlaying ? `${isLeftSide ? 'Left' : 'Right'} Shoulder Active` : 'Ready'}
      </text>
    </svg>
  );
}

function BackAnimation({ progress, isPlaying }: { progress: number; isPlaying: boolean }) {
  const backArch = Math.sin(progress * Math.PI * 2) * 8;
  const shoulderSqueeze = Math.abs(Math.sin(progress * Math.PI * 2)) * 4;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="backBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
        <linearGradient id="spineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#4a4a4a" />
        </linearGradient>
      </defs>

      <g transform="translate(100, 100)">
        <path
          d={`M -40 -${20 - backArch} Q -50 20 -45 60 L 45 60 Q 50 20 40 -${20 - backArch}`}
          fill="url(#backBodyGradient)"
          opacity="0.9"
        />

        <path
          d={`M 0 -${50 - backArch} Q -5 0 0 70`}
          stroke="url(#spineGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        <g opacity="0.6">
          <circle cx={-15 - shoulderSqueeze} cy="-10" r="8" fill="none" stroke="#4a4a4a" strokeWidth="2" />
          <circle cx={15 + shoulderSqueeze} cy="-10" r="8" fill="none" stroke="#4a4a4a" strokeWidth="2" />
        </g>

        <circle cx="-15" cy="-10" r="4" fill="#3a3a3a" />
        <circle cx="15" cy="-10" r="4" fill="#3a3a3a" />

        <g opacity="0.3">
          <path
            d="M -25 20 Q 0 25 25 20"
            stroke="#5a5a5a"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M -25 35 Q 0 40 25 35"
            stroke="#5a5a5a"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </g>

      <text x="100" y="180" textAnchor="middle" fill="#666" fontSize="10">
        {isPlaying ? 'Back Muscles Engaged' : 'Ready'}
      </text>
    </svg>
  );
}

function PostureAnimation({ progress, isPlaying }: { progress: number; isPlaying: boolean }) {
  const posturePhase = Math.floor(progress * 3);
  const leanAmount = posturePhase === 1 ? 8 : posturePhase === 2 ? -6 : 0;
  const isGoodPosture = posturePhase === 0;
  const postureColor = isGoodPosture ? '#3d3d3d' : '#5a3a3a';

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="postureFigureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
      </defs>

      <g transform="translate(100, 100)">
        <line x1="0" y1="50" x2="0" y2="100" stroke={postureColor} strokeWidth="2" opacity="0.5" />

        <ellipse cx="0" cy="70" rx="30" ry="40" fill="url(#postureFigureGradient)" opacity="0.9" />

        <rect
          x="-10"
          y="30"
          width="20"
          height="40"
          fill="#1a1a1a"
          opacity="0.9"
          rx="3"
          transform={`rotate(${leanAmount})`}
        />

        <ellipse
          cx={leanAmount * 0.5}
          cy="10"
          rx="28"
          ry="32"
          fill="#1a1a1a"
          opacity="0.9"
          transform={`rotate(${leanAmount})`}
        />

        <ellipse
          cx={-10 + leanAmount * 0.5}
          cy="-8"
          rx="5"
          ry="6"
          fill="#0a0a0a"
          transform={`rotate(${leanAmount})`}
        />
        <ellipse
          cx={10 + leanAmount * 0.5}
          cy="-8"
          rx="5"
          ry="6"
          fill="#0a0a0a"
          transform={`rotate(${leanAmount})`}
        />

        <circle
          cx={-8 + leanAmount * 0.5}
          cy="-10"
          r="2"
          fill="#4a4a4a"
          transform={`rotate(${leanAmount})`}
        />
        <circle
          cx={12 + leanAmount * 0.5}
          cy="-10"
          r="2"
          fill="#4a4a4a"
          transform={`rotate(${leanAmount})`}
        />

        <g opacity={isGoodPosture ? 0.6 : 0.2}>
          <line x1="-50" y1="-30" x2="50" y2="-30" stroke="#5a5a5a" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="-50" y1="0" x2="50" y2="0" stroke="#5a5a5a" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="-50" y1="30" x2="50" y2="30" stroke="#5a5a5a" strokeWidth="1" strokeDasharray="4,4" />
        </g>
      </g>

      <text x="100" y="180" textAnchor="middle" fill="#666" fontSize="10">
        {isPlaying ? (isGoodPosture ? 'Good Posture' : 'Adjusting...') : 'Ready'}
      </text>
    </svg>
  );
}

function ImbalanceAnimation({ progress, isPlaying, isLeftSide }: { progress: number; isPlaying: boolean; isLeftSide: boolean }) {
  const balancePhase = Math.sin(progress * Math.PI * 2);
  const leftWeight = isLeftSide ? 50 + balancePhase * 20 : 50 - balancePhase * 20;
  const rightWeight = isLeftSide ? 50 - balancePhase * 20 : 50 + balancePhase * 20;
  const isActive = isPlaying && Math.abs(balancePhase) > 0.3;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="imbalanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
        <linearGradient id="balanceIndicator" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3d3d3d" />
          <stop offset="50%" stopColor="#5a5a5a" />
          <stop offset="100%" stopColor="#3d3d3d" />
        </linearGradient>
      </defs>

      <g transform="translate(100, 100)">
        <ellipse cx="0" cy="60" rx="40" ry="45" fill="url(#imbalanceGradient)" opacity="0.9" />

        <rect
          x="-12"
          y="25"
          width="24"
          height="35"
          fill="#1a1a1a"
          opacity="0.9"
          rx="3"
        />

        <ellipse cx="0" cy="5" rx="30" ry="35" fill="#1a1a1a" opacity="0.9" />

        <ellipse cx="-10" cy="-15" rx="5" ry="6" fill="#0a0a0a" />
        <ellipse cx="10" cy="-15" rx="5" ry="6" fill="#0a0a0a" />

        <circle cx="-8" cy="-17" r="2" fill="#4a4a4a" />
        <circle cx="12" cy="-17" r="2" fill="#4a4a4a" />

        <rect x="-60" y="120" width="30" height="8" fill={isActive && isLeftSide ? '#4a4a4a' : '#2a2a2a'} rx="2" />
        <rect x="30" y="120" width="30" height="8" fill={isActive && !isLeftSide ? '#4a4a4a' : '#2a2a2a'} rx="2" />

        <line
          x1="-30"
          y1="120"
          x2="-30"
          y2="140"
          stroke="#3d3d3d"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="30"
          y1="120"
          x2="30"
          y2="140"
          stroke="#3d3d3d"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <rect x="-70" y="140" width="50" height="6" fill="url(#balanceIndicator)" rx="2" />
        <rect x="20" y="140" width="50" height="6" fill="url(#balanceIndicator)" rx="2" />

        <text x="-45" y="135" textAnchor="middle" fill="#666" fontSize="8">
          {Math.round(leftWeight)}%
        </text>
        <text x="45" y="135" textAnchor="middle" fill="#666" fontSize="8">
          {Math.round(rightWeight)}%
        </text>

        <g opacity="0.3">
          <circle cx="-45" cy="115" r="3" fill={isActive && isLeftSide ? '#5a5a5a' : '#2a2a2a'} />
          <circle cx="45" cy="115" r="3" fill={isActive && !isLeftSide ? '#5a5a5a' : '#2a2a2a'} />
        </g>
      </g>

      <text x="100" y="185" textAnchor="middle" fill="#666" fontSize="10">
        {isPlaying ? `${isLeftSide ? 'Left' : 'Right'} Side Focus` : 'Ready'}
      </text>
    </svg>
  );
}

function GenericFigureAnimation({ progress, isPlaying }: { progress: number; isPlaying: boolean }) {
  const pulsePhase = Math.sin(progress * Math.PI * 2);

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="genericGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
      </defs>

      <g transform="translate(100, 100)">
        <ellipse cx="0" cy="70" rx="45" ry="50" fill="url(#genericGradient)" opacity="0.9 + pulsePhase * 0.1" />

        <rect
          x="-15"
          y="30"
          width="30"
          height="40"
          fill="#1a1a1a"
          opacity="0.9"
          rx="3"
        />

        <ellipse
          cx="0"
          cy="10"
          rx="35"
          ry="40"
          fill="#1a1a1a"
          opacity="0.9 + pulsePhase * 0.1"
        />

        <ellipse cx="-12" cy="-10" rx="6" ry="7" fill="#0a0a0a" />
        <ellipse cx="12" cy="-10" rx="6" ry="7" fill="#0a0a0a" />

        <circle cx="-10" cy="-12" r="2" fill="#4a4a4a" />
        <circle cx="14" cy="-12" r="2" fill="#4a4a4a" />

        <g opacity="0.3 + pulsePhase * 0.2">
          <circle cx="0" cy="10" r="45" fill="none" stroke="#4a4a4a" strokeWidth="1" />
          <circle cx="0" cy="10" r="55" fill="none" stroke="#3a3a3a" strokeWidth="1" />
        </g>
      </g>

      <text x="100" y="180" textAnchor="middle" fill="#666" fontSize="10">
        {isPlaying ? 'Exercise in Progress' : 'Ready'}
      </text>
    </svg>
  );
}
