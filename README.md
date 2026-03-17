# 🌍 GeoStudy App

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/Allyson-edu/geo-study-app)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.x-3ECF8E?logo=supabase)](https://supabase.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)

Aplicativo pessoal de estudos para **Allyson**, estudante que ingressará no curso de **Geologia na UFPE** em agosto de 2026. Uma PWA com design inspirado no **macOS Big Sur**, gamificação com XP e níveis, Pomodoro integrado e exercícios gerados por IA.

---

## ✨ Funcionalidades

- 🎯 **Dashboard** com avatar pixel art evolutivo, barra de XP animada e countdown para o início do curso
- 📚 **Pré-Curso** com 6 disciplinas, 18 módulos e ~70 aulas organizadas
- 🏛️ **Graduação** preparada para receber disciplinas da UFPE
- ⏱️ **Pomodoro Widget** flutuante, arrastável (mouse e touch), com mensagens de descanso hilariantes
- 🤖 **IA (Gemini)** para gerar exercícios personalizados e indicar onde estudar
- 🌙 **Dark/Light mode** com persistência
- 📱 **PWA** instalável no iPad via Safari e no Linux como app desktop
- 🔥 **Streak** de dias consecutivos de estudo
- 🎮 **Gamificação** com XP, níveis e títulos

---

## 🛠️ Stack Técnica

| Camada | Tecnologia |
|---|---|
| Frontend | Vite + React + TypeScript |
| Estilização | Tailwind CSS v3 + design Big Sur |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| Estado | Zustand |
| Queries | TanStack React Query |
| Animações | Framer Motion |
| IA | Google Gemini 1.5 Flash |
| Roteamento | React Router DOM v7 |
| PWA | vite-plugin-pwa |

---

## 🚀 Instalação (Linux/Arch)

### Pré-requisitos
- Node.js ≥ 18
- npm ≥ 9

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/Allyson-edu/geo-study-app.git
cd geo-study-app

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais (veja abaixo)

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

### Build para produção

```bash
npm run build
npm run preview
```

---

## 🔑 Configuração do `.env.local`

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_anon_key_aqui
VITE_GEMINI_API_KEY=sua_gemini_api_key_aqui
```

**Onde obter:**
- **Supabase:** [supabase.com](https://supabase.com) → Projeto → Settings → API
- **Gemini:** [aistudio.google.com](https://aistudio.google.com) → Get API Key

---

## 🗄️ Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Vá em **SQL Editor**
3. Execute primeiro o `supabase/schema.sql`
4. Execute depois o `supabase/seed.sql`

---

## 📁 Estrutura de Pastas

```
geo-study-app/
├── public/
│   └── icons/              # Ícones PWA (192x192, 512x512)
├── src/
│   ├── components/
│   │   ├── dashboard/      # AvatarCard, XPBar, StreakCounter, CountdownToCourse
│   │   ├── layout/         # Sidebar, TopBar
│   │   ├── pomodoro/       # PomodoroWidget
│   │   └── study/          # ModuleCard, LessonRow, ExerciseGenerator, WhereToStudy
│   ├── hooks/              # useProgress, useXP, useStreak
│   ├── lib/                # supabase.ts, gemini.ts, utils.ts
│   ├── pages/              # Dashboard, PreCourse, Graduation, DisciplineDetail
│   ├── store/              # pomodoroStore, themeStore (Zustand)
│   └── styles/             # globals.css
├── supabase/
│   ├── schema.sql          # Estrutura do banco de dados
│   └── seed.sql            # Dados iniciais (disciplinas, módulos, aulas)
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🗺️ Roadmap

- [x] Estrutura base (Vite + React + TS + Tailwind)
- [x] Roteamento (React Router v7)
- [x] Tema dark/light com Zustand + persistência
- [x] Pomodoro Widget arrastável com Web Audio API
- [x] Dashboard com countdown, avatar e XP
- [x] Pré-Curso com 6 disciplinas e módulos
- [x] Graduação (placeholder)
- [x] Integração Supabase (schema + seed)
- [x] Geração de exercícios com Gemini AI
- [x] "Onde estudar" com Gemini AI
- [x] PWA (manifest + service worker)
- [ ] Autenticação completa (login/signup)
- [ ] Streak real com Supabase
- [ ] Notificações push para lembrar de estudar
- [ ] Modo offline completo
- [ ] Estatísticas avançadas
- [ ] Conquistas (achievements)

---

## 📄 Licença

Projeto pessoal — uso privado de Allyson.
