import { motion } from 'framer-motion'

// Cristal de ametista/safira — maior, mais detalhado, mais bonito
const CrystalSVG = () => (
  <svg
    width="110"
    height="130"
    viewBox="0 0 110 130"
    style={{ filter: 'drop-shadow(0 12px 28px rgba(168,85,247,0.55)) drop-shadow(0 0 8px rgba(74,158,255,0.3))' }}
  >
    <defs>
      <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#A855F7" />
        <stop offset="45%"  stopColor="#4A9EFF" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
      <linearGradient id="cg2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="rgba(255,255,255,0.35)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      <linearGradient id="cg3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#C084FC" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    {/* Sombra/reflexo embaixo */}
    <ellipse cx="55" cy="124" rx="28" ry="5" fill="rgba(168,85,247,0.25)" />

    {/* Corpo principal do cristal */}
    <polygon points="55,6 95,32 95,92 55,118 15,92 15,32" fill="url(#cg1)" opacity="0.97" />

    {/* Faceta direita mais escura — profundidade */}
    <polygon points="55,6 95,32 95,92 55,62" fill="rgba(0,0,0,0.18)" />

    {/* Faceta esquerda clara */}
    <polygon points="55,6 15,32 15,92 55,62" fill="rgba(255,255,255,0.07)" />

    {/* Faceta do meio superior */}
    <polygon points="55,6 95,32 55,62 15,32" fill="rgba(255,255,255,0.08)" />

    {/* Brilho diagonal principal */}
    <polygon points="22,28 52,12 60,36 30,50" fill="url(#cg2)" opacity="0.9" />

    {/* Brilho pequeno */}
    <polygon points="38,18 50,13 53,22 41,26" fill="rgba(255,255,255,0.6)" opacity="0.7" />

    {/* Aresta superior esquerda — brilhante */}
    <line x1="55" y1="6" x2="15" y2="32" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
    {/* Aresta superior direita — mais discreta */}
    <line x1="55" y1="6" x2="95" y2="32" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    {/* Cintura esquerda */}
    <line x1="15" y1="32" x2="15" y2="92" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
    {/* Cintura direita */}
    <line x1="95" y1="32" x2="95" y2="92" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

    {/* Ponto de brilho animado */}
    <circle cx="38" cy="22" r="4" fill="rgba(255,255,255,0.8)" opacity="0.7">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite"/>
    </circle>
  </svg>
)