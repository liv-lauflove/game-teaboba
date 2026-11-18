import React from 'react';
import { motion } from 'framer-motion';
import { CustomerVisual } from '../../types/game';

interface CustomerBustProps {
  visual: CustomerVisual;
  name: string;
}

export const CustomerBust: React.FC<CustomerBustProps> = ({ visual }) => {
  const { hairColor, hairStyle, shirtColor, accessory, skinTone } = visual;

  return (
    <motion.div
      initial={{ x: 70, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -70, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      className="relative flex flex-col items-center select-none"
    >
      {/* Idle Breathing / Bobbing Animation Wrapper */}
      <motion.div
        animate={{ y: [0, -3.5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-36 h-36 flex items-end justify-center"
      >
        <svg
          viewBox="0 0 140 140"
          className="w-full h-full drop-shadow-md overflow-visible"
        >
          {/* 1. Back Hair (For long styles) */}
          {hairStyle === 'LONG_WAVY' && (
            <path
              d="M 38 60 Q 25 90 32 125 Q 45 130 52 110 Q 50 85 54 75 Z
                 M 102 60 Q 115 90 108 125 Q 95 130 88 110 Q 90 85 86 75 Z"
              fill={hairColor}
              stroke="#5D4037"
              strokeWidth="2"
            />
          )}

          {hairStyle === 'TWIN_BUNS' && (
            <>
              {/* Left Bun */}
              <circle cx="34" cy="38" r="16" fill={hairColor} stroke="#5D4037" strokeWidth="2" />
              {/* Right Bun */}
              <circle cx="106" cy="38" r="16" fill={hairColor} stroke="#5D4037" strokeWidth="2" />
              {/* Left Ribbon */}
              <path d="M 34 50 L 26 56 L 36 54 L 40 60 Z" fill="#FF8BA7" stroke="#5D4037" strokeWidth="1.5" />
              {/* Right Ribbon */}
              <path d="M 106 50 L 114 56 L 104 54 L 100 60 Z" fill="#FF8BA7" stroke="#5D4037" strokeWidth="1.5" />
            </>
          )}

          {/* 2. Torso / Shoulders / Clothes */}
          <g id="torso">
            {/* Shoulders & Upper Body */}
            <path
              d="M 30 140 C 32 105 50 96 70 96 C 90 96 108 105 110 140 Z"
              fill={shirtColor}
              stroke="#5D4037"
              strokeWidth="2.5"
            />

            {/* Neck */}
            <path
              d="M 60 82 L 60 98 C 65 101 75 101 80 98 L 80 82 Z"
              fill={skinTone}
              stroke="#5D4037"
              strokeWidth="2"
            />

            {/* Collar or Apron Details */}
            {accessory === 'APRON' ? (
              <>
                {/* Apron bib */}
                <path d="M 52 104 L 88 104 L 84 140 L 56 140 Z" fill="#FFF8E7" stroke="#5D4037" strokeWidth="2" />
                {/* Apron straps */}
                <path d="M 54 104 L 42 140 M 86 104 L 98 140" stroke="#E6C875" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              /* Cozy Peter-Pan Collar */
              <path
                d="M 70 100 C 62 100 52 96 52 96 C 56 105 66 106 70 100
                   M 70 100 C 78 100 88 96 88 96 C 84 105 74 106 70 100"
                fill="#FFFFFF"
                stroke="#5D4037"
                strokeWidth="2"
              />
            )}
          </g>

          {/* 3. Head & Face Base */}
          <g id="head">
            {/* Ears */}
            <circle cx="42" cy="68" r="7" fill={skinTone} stroke="#5D4037" strokeWidth="2" />
            <circle cx="98" cy="68" r="7" fill={skinTone} stroke="#5D4037" strokeWidth="2" />

            {/* Face Shape */}
            <path
              d="M 44 58 C 44 38 56 30 70 30 C 84 30 96 38 96 58 C 96 78 86 88 70 88 C 54 88 44 78 44 58 Z"
              fill={skinTone}
              stroke="#5D4037"
              strokeWidth="2.5"
            />

            {/* Cute Cheeks Blush */}
            <ellipse cx="53" cy="71" rx="5" ry="3" fill="#FFB7B2" opacity="0.8" />
            <ellipse cx="87" cy="71" rx="5" ry="3" fill="#FFB7B2" opacity="0.8" />

            {/* Anime Eyes */}
            <g id="eyes">
              {/* Left Eye */}
              <ellipse cx="57" cy="62" rx="4.5" ry="5.5" fill="#3E2723" />
              <circle cx="58.5" cy="60" r="1.8" fill="#FFFFFF" />
              <circle cx="55.5" cy="64" r="0.9" fill="#FFFFFF" />
              {/* Left Eyebrow */}
              <path d="M 52 53 Q 57 51 62 53" stroke="#5D4037" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Right Eye */}
              <ellipse cx="83" cy="62" rx="4.5" ry="5.5" fill="#3E2723" />
              <circle cx="84.5" cy="60" r="1.8" fill="#FFFFFF" />
              <circle cx="81.5" cy="64" r="0.9" fill="#FFFFFF" />
              {/* Right Eyebrow */}
              <path d="M 78 53 Q 83 51 88 53" stroke="#5D4037" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </g>

            {/* Sweet Smile */}
            <path
              d="M 66 73 Q 70 78 74 73"
              stroke="#795548"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Small Cute Nose */}
            <circle cx="70" cy="68" r="1" fill="#D7CCC8" />
          </g>

          {/* 4. Front Hair & Bangs */}
          <g id="front-hair">
            {hairStyle === 'STRAIGHT_DARK' && (
              <path
                d="M 43 50 C 43 32 55 24 70 24 C 85 24 97 32 97 50 C 97 54 95 65 92 68 C 88 56 82 54 77 56 C 72 58 68 56 63 56 C 58 56 52 58 48 68 C 45 65 43 54 43 50 Z"
                fill={hairColor}
                stroke="#5D4037"
                strokeWidth="2"
              />
            )}

            {hairStyle === 'BOB_CUT' && (
              <path
                d="M 42 52 C 42 30 55 22 70 22 C 85 22 98 30 98 52 C 101 70 96 82 92 84 C 91 66 84 56 78 56 C 70 56 66 58 62 56 C 56 56 49 66 48 84 C 44 82 39 70 42 52 Z"
                fill={hairColor}
                stroke="#5D4037"
                strokeWidth="2"
              />
            )}

            {hairStyle === 'BLONDE_CURLS' && (
              <path
                d="M 42 52 C 41 30 55 22 70 22 C 85 22 99 30 98 52 C 103 66 99 82 93 84 C 93 72 87 58 80 58 C 74 58 70 60 66 58 C 60 60 54 62 48 76 C 45 66 39 60 42 52 Z"
                fill={hairColor}
                stroke="#5D4037"
                strokeWidth="2"
              />
            )}

            {(hairStyle === 'LONG_WAVY' || hairStyle === 'TWIN_BUNS') && (
              <path
                d="M 43 48 C 43 30 55 24 70 24 C 85 24 97 30 97 48 C 95 56 90 60 84 56 C 78 54 74 58 70 56 C 66 58 62 54 56 56 C 50 60 45 56 43 48 Z"
                fill={hairColor}
                stroke="#5D4037"
                strokeWidth="2"
              />
            )}
          </g>

          {/* 5. Accessories */}
          {accessory === 'BERET' && (
            <g id="beret">
              <path
                d="M 45 32 C 45 18 60 12 76 14 C 92 16 102 26 98 38 C 96 40 84 36 68 34 C 54 32 45 34 45 32 Z"
                fill="#C5B3D9"
                stroke="#5D4037"
                strokeWidth="2"
              />
              <path d="M 74 14 L 75 10" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {accessory === 'GLASSES' && (
            <g id="glasses">
              {/* Left frame */}
              <circle cx="57" cy="62" r="8" fill="none" stroke="#6F4E37" strokeWidth="2" />
              {/* Right frame */}
              <circle cx="83" cy="62" r="8" fill="none" stroke="#6F4E37" strokeWidth="2" />
              {/* Bridge */}
              <path d="M 65 62 Q 70 60 75 62" stroke="#6F4E37" strokeWidth="2" fill="none" />
            </g>
          )}

          {accessory === 'FLOWER' && (
            <g id="flower-hairpin" transform="translate(88, 38)">
              <circle cx="0" cy="0" r="4.5" fill="#FFD0CD" stroke="#5D4037" strokeWidth="1" />
              <circle cx="0" cy="0" r="2" fill="#FFF8E7" />
            </g>
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
};
