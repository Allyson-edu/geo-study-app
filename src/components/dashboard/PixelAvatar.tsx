import { motion } from 'framer-motion'

interface PixelAvatarProps {
  level: number
  isLevelingUp?: boolean
}

// Mapeamento de caracteres para cores
const COLOR_MAP: Record<string, string> = {
  K: '#000000', // preto (outline)
  S: '#FFCC99', // pele
  E: '#3A2020', // olhos
  M: '#CC5544', // boca
  B: '#0A84FF', // azul
  P: '#BF5AF2', // roxo
  W: '#FFFFFF', // branco
  H: '#553311', // cabelo castanho
  R: '#FF375F', // vermelho/rosa
  G: '#30D158', // verde
  T: '#5AC8FA', // teal/ciano
  Y: '#FFD60A', // amarelo
  N: '#B8860B', // dourado escuro
  O: '#FF9F0A', // laranja
  L: '#2C2C2E', // cinza escuro (óculos/detalhes)
  C: '#8ECFFF', // azul claro (reflexo)
  D: '#FFAA55', // pele escura (sombra)
  Z: '#9966CC', // roxo escuro
  Q: '#00CED1', // turquesa
  X: '#CC3300', // vermelho escuro
  A: '#AAAAAA', // cinza claro
  F: '#FF6600', // laranja escuro
}

// Cada string é uma linha (16 chars = 16 pixels de largura)
// Nível 1-3: Estudante com camisa azul
const SPRITE_STUDENT: string[] = [
  '    KKKKKK      ',
  '   KHHHHHK      ',
  '   KHSSSSK      ',
  '   KSEESSK      ',
  '   KSMMSSK      ',
  '   KSSSSSSK     ',
  '    KKKKKK      ',
  '  KBWBBWBBK     ',
  ' KBBBBBBBBK     ',
  ' KBBBBBBBBK     ',
  '  KBBBBBBBK     ',
  '   KBKKBBK      ',
  '   KBKKBBK      ',
  '   KBKKBBK      ',
  '   KSSKSSKK     ',
  '  KKSSKSSKK     ',
]

// Nível 4-6: Cientista com jaleco branco e óculos
const SPRITE_SCIENTIST: string[] = [
  '    KKKKKK      ',
  '   KHHKHHK      ',
  '   KHSSSSK      ',
  '  KLSEESLK      ',
  '  KKSSSSSKK     ',
  '   KSSSSSSK     ',
  '    KKKKKK      ',
  '  KWWWWWWWK     ',
  ' KWWPPPWWWK     ',
  ' KWWWPWWWWK     ',
  '  KWWWWWWK      ',
  '   KWKKWK       ',
  '   KWKKWK       ',
  '   KWKKWK       ',
  '   KAAKKAKK     ',
  '  KKAAKKAKK     ',
]

// Nível 7-9: Geólogo com chapéu e mochila
const SPRITE_GEOLOGIST: string[] = [
  '   KKKKKKK      ',
  '  KNNNNNNNK     ',
  '  KNSSSSSKK     ',
  '   KSEESKK      ',
  '   KSMMSSK      ',
  '   KSSSSSSK     ',
  '    KKKKKK      ',
  ' KOOOOOOOOK     ',
  ' KOOSSSOOOK     ',
  ' KOOOOOOOOK     ',
  '  KOOOOOOOK     ',
  '   KOOKOOK      ',
  '   KOOKOOK      ',
  '   KOOKOOK      ',
  '   KAAKAAAKK    ',
  '  KKAAKAAAKK    ',
]

// Nível 10+: Mestre com roupa roxa e aura dourada
const SPRITE_MASTER: string[] = [
  '   KYYKKYK      ',
  '   KYZZYYK      ',
  '   KZSSSKK      ',
  '   KZEESKK      ',
  '   KZMMSSK      ',
  '   KZSSSSK      ',
  '    KKKKKK      ',
  '  KPPPZPPK      ',
  ' KZPPPPPPK      ',
  ' KPPYZYPKK      ',
  '  KPPPPPK       ',
  '   KPKKPK       ',
  '   KPKKPK       ',
  '   KPKKPK       ',
  '   KYYKYYAKK    ',
  '  KKYYKYYAKK    ',
]

const SPRITES: Record<string, string[]> = {
  student: SPRITE_STUDENT,
  scientist: SPRITE_SCIENTIST,
  geologist: SPRITE_GEOLOGIST,
  master: SPRITE_MASTER,
}

function getSpriteKey(level: number): string {
  if (level <= 3) return 'student'
  if (level <= 6) return 'scientist'
  if (level <= 9) return 'geologist'
  return 'master'
}

function getAuraColor(level: number): string {
  if (level <= 3) return '#0A84FF'
  if (level <= 6) return '#BF5AF2'
  if (level <= 9) return '#FF9F0A'
  return '#FFD60A'
}

function renderSprite(sprite: string[], pixelSize = 8) {
  const pixels: React.ReactElement[] = []
  sprite.forEach((row, y) => {
    row.split('').forEach((char, x) => {
      const color = COLOR_MAP[char]
      if (color) {
        pixels.push(
          <rect
            key={`${x}-${y}`}
            x={x * pixelSize}
            y={y * pixelSize}
            width={pixelSize}
            height={pixelSize}
            fill={color}
          />
        )
      }
    })
  })
  return pixels
}

export function PixelAvatar({ level, isLevelingUp }: PixelAvatarProps) {
  const spriteKey = getSpriteKey(level)
  const auraColor = getAuraColor(level)
  const sprite = SPRITES[spriteKey]
  const pixelSize = 8
  const cols = 16
  const rows = sprite.length
  const svgWidth = cols * pixelSize
  const svgHeight = rows * pixelSize

  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={
        isLevelingUp
          ? { scale: [1, 1.4, 1.2, 1], rotate: [0, 10, -10, 0] }
          : {}
      }
      transition={{ duration: 0.8 }}
    >
      {/* Aura de fundo */}
      <div
        className="absolute inset-0 rounded-full opacity-40"
        style={{
          background: `radial-gradient(circle, ${auraColor}88 0%, transparent 70%)`,
          filter: 'blur(12px)',
        }}
      />

      {/* SVG do sprite com respiração idle */}
      <motion.svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        shapeRendering="crispEdges"
        className="pixel-art relative z-10"
        animate={{ scaleY: [1, 0.97, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {renderSprite(sprite, pixelSize)}
      </motion.svg>
    </motion.div>
  )
}
