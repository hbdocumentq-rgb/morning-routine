import React from "react";

const STROKE = 2;

function Frame({ size, color, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      stroke={color}
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="8"
        y1="100"
        x2="112"
        y2="100"
        stroke={color}
        strokeOpacity="0.18"
        strokeDasharray="2 4"
      />
      {children}
    </svg>
  );
}

function CatCow({ color }) {
  return (
    <>
      {/* Cat: back arched up, head tucked */}
      <circle cx="14" cy="65" r="4" fill={color} stroke="none" />
      <path d="M 18 62 Q 34 30 50 62" />
      <line x1="18" y1="62" x2="18" y2="92" />
      <line x1="50" y1="62" x2="50" y2="92" />
      {/* Cow: belly drops, head lifted */}
      <circle cx="72" cy="52" r="4" fill={color} stroke="none" />
      <path d="M 76 58 Q 92 86 108 58" />
      <line x1="76" y1="58" x2="76" y2="92" />
      <line x1="108" y1="58" x2="108" y2="92" />
    </>
  );
}

function ChildPose({ color }) {
  return (
    <>
      <circle cx="26" cy="88" r="5" fill={color} stroke="none" />
      <path d="M 32 90 Q 55 84 82 80" />
      <path d="M 82 80 L 82 98 L 46 98" />
      <line x1="32" y1="90" x2="10" y2="96" />
    </>
  );
}

function CowFaceUpper({ color }) {
  return (
    <>
      <circle cx="60" cy="30" r="6" fill={color} stroke="none" />
      <line x1="60" y1="36" x2="60" y2="72" />
      <path d="M 60 72 L 34 96 L 86 96 Z" />
      <path d="M 55 40 Q 42 68 55 50" />
      <path d="M 65 40 Q 78 12 65 30" />
    </>
  );
}

function Cobra({ color }) {
  return (
    <>
      <circle cx="26" cy="58" r="5" fill={color} stroke="none" />
      <path d="M 30 62 Q 52 74 76 92 L 106 94" />
      <line x1="36" y1="72" x2="36" y2="94" />
    </>
  );
}

function CrescentLunge({ color }) {
  return (
    <>
      <path d="M 52 82 Q 14 50 44 28" />
      <circle cx="44" cy="22" r="5" fill={color} stroke="none" />
      <path d="M 44 28 Q 68 20 74 6" />
      <path d="M 52 82 L 28 78 L 28 98" />
      <path d="M 52 82 L 82 96 L 108 98" />
    </>
  );
}

function KneelingChestStretch({ color }) {
  return (
    <>
      {/* head / ball touching bottom line */}
      <circle cx="18" cy="94" r="6" fill={color} stroke="none" />

      {/* long upper body line */}
      <path d="M 24 88 L 94 42" />

      {/* lower parallel line, starting from the ground, parallel to the body */}
      <path d="M 30 100 L 53 85" />

      {/* bent support arm */}
      <path d="M 62 70 Q 70 72 70 80 L 68 98" />

      {/* folded kneeling leg / body angle — smooth dip touching ground */}
      <path d="M 94 42 Q 70 100 80 100 T 108 85" />
    </>
  );
}

function ThoracicBlock({ color }) {
  return (
    <g transform="translate(120 0) scale(-1 1)">
      <circle cx="96" cy="72" r="5" fill={color} stroke="none" />
      <rect x="92" y="77" width="8" height="17" />
      <path d="M 96 77 Q 85 80 74 77" />
      <rect x="66" y="77" width="8" height="17" />
      <path d="M 66 79 L 38 93 L 12 93" />
    </g>
  );
}

const FIGURES = {
  p1: CatCow,
  p2: ChildPose,
  p3: CowFaceUpper,
  p4: Cobra,
  p5: CrescentLunge,
  p6: KneelingChestStretch,
  p7: ThoracicBlock,
};

export function PoseFigure({ id, color, size = 96 }) {
  const Fig = FIGURES[id];
  if (!Fig) return null;
  return (
    <Frame size={size} color={color}>
      <Fig color={color} />
    </Frame>
  );
}
