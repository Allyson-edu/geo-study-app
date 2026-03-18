export interface Lesson {
  id: string
  title: string
  summary: string
  duration: string
}

export interface Discipline {
  id: string
  name: string
  shortName: string
  color: string
  priority: 'URGENTE' | 'ALTA' | 'MÉDIA'
  semester: 'pre' | 'graduation'
  examDate?: string
  ementa: string
  lessons: Lesson[]
}

export const disciplines: Discipline[] = [
  // ── Pré-Curso ──────────────────────────────────────────────
  {
    id: 'matematica-fundamental',
    name: 'Matemática Fundamental',
    shortName: 'Matemática',
    color: '#D62B2B',
    priority: 'URGENTE',
    semester: 'pre',
    ementa: 'Revisão dos conceitos matemáticos essenciais para o ingresso na graduação em Geologia.',
    lessons: [
      { id: 'mat-01', title: 'Números e Operações', summary: 'Números e operações básicas: inteiros, racionais, operações aritméticas e propriedades', duration: '45 min' },
      { id: 'mat-02', title: 'Frações e Decimais', summary: 'Frações, números decimais, conversões e operações com frações', duration: '45 min' },
      { id: 'mat-03', title: 'Potências e Raízes', summary: 'Potenciação, radiciação, propriedades das potências e raízes', duration: '45 min' },
      { id: 'mat-04', title: 'Equações do 1º Grau', summary: 'Equações do primeiro grau, resolução e aplicações práticas', duration: '50 min' },
      { id: 'mat-05', title: 'Equações do 2º Grau', summary: 'Equações do segundo grau, fórmula de Bhaskara e discriminante', duration: '50 min' },
      { id: 'mat-06', title: 'Funções', summary: 'Funções matemáticas: conceito, domínio, contradomínio, funções afim e quadrática', duration: '55 min' },
      { id: 'mat-07', title: 'Geometria Básica', summary: 'Geometria plana: áreas, perímetros, triângulos, quadriláteros e círculos', duration: '50 min' },
      { id: 'mat-08', title: 'Trigonometria Básica', summary: 'Trigonometria no triângulo retângulo: seno, cosseno e tangente', duration: '50 min' },
    ],
  },
  {
    id: 'fisica-basica',
    name: 'Física Básica',
    shortName: 'Física',
    color: '#1A4DAB',
    priority: 'ALTA',
    semester: 'pre',
    ementa: 'Fundamentos da física clássica necessários para compreender fenômenos naturais estudados na Geologia.',
    lessons: [
      { id: 'fis-01', title: 'Grandezas e Medidas', summary: 'Grandezas físicas, unidades de medida, sistema internacional e conversões', duration: '40 min' },
      { id: 'fis-02', title: 'Cinemática', summary: 'Movimento dos corpos: posição, velocidade, aceleração, MRU e MRUV', duration: '50 min' },
      { id: 'fis-03', title: 'Dinâmica (Leis de Newton)', summary: 'Leis de Newton: inércia, força e ação-reação, aplicações práticas', duration: '55 min' },
      { id: 'fis-04', title: 'Energia e Trabalho', summary: 'Trabalho mecânico, energia cinética, potencial e conservação de energia', duration: '50 min' },
      { id: 'fis-05', title: 'Hidrostática', summary: 'Pressão em fluidos, Princípio de Arquimedes, pressão hidrostática', duration: '45 min' },
    ],
  },
  {
    id: 'quimica-fundamental',
    name: 'Química Fundamental',
    shortName: 'Química',
    color: '#F5C400',
    priority: 'ALTA',
    semester: 'pre',
    ementa: 'Conceitos fundamentais de química inorgânica e físico-química aplicados às ciências da Terra.',
    lessons: [
      { id: 'qui-01', title: 'Tabela Periódica', summary: 'Organização da tabela periódica, propriedades dos elementos e tendências periódicas', duration: '45 min' },
      { id: 'qui-02', title: 'Ligações Químicas', summary: 'Ligações iônicas, covalentes e metálicas, polaridade e geometria molecular', duration: '50 min' },
      { id: 'qui-03', title: 'Estequiometria', summary: 'Cálculos estequiométricos, mol, massa molar e relações em reações químicas', duration: '55 min' },
      { id: 'qui-04', title: 'Soluções', summary: 'Soluções aquosas, concentração, solubilidade e propriedades coligativas', duration: '50 min' },
      { id: 'qui-05', title: 'Termoquímica', summary: 'Entalpia, reações exotérmicas e endotérmicas, Lei de Hess', duration: '45 min' },
    ],
  },
  {
    id: 'portugues-redacao',
    name: 'Português e Redação',
    shortName: 'Português',
    color: '#1A4DAB',
    priority: 'MÉDIA',
    semester: 'pre',
    ementa: 'Desenvolvimento das habilidades de leitura, interpretação e escrita para a vida acadêmica.',
    lessons: [
      { id: 'por-01', title: 'Interpretação de Texto', summary: 'Leitura e interpretação de textos: inferências, ideias centrais e vocabulário contextual', duration: '40 min' },
      { id: 'por-02', title: 'Gramática Essencial', summary: 'Gramática normativa: morfologia, sintaxe, concordância e regência', duration: '50 min' },
      { id: 'por-03', title: 'Redação Técnica', summary: 'Estrutura da redação acadêmica: introdução, desenvolvimento, conclusão e coesão', duration: '55 min' },
      { id: 'por-04', title: 'Argumentação', summary: 'Técnicas de argumentação, tipos de argumento e construção de texto dissertativo', duration: '45 min' },
    ],
  },
  {
    id: 'ingles-tecnico',
    name: 'Inglês Técnico',
    shortName: 'Inglês',
    color: '#1A4DAB',
    priority: 'MÉDIA',
    semester: 'pre',
    ementa: 'Leitura e compreensão de textos científicos em inglês para acesso à literatura técnica de Geologia.',
    lessons: [
      { id: 'ing-01', title: 'Vocabulário Técnico', summary: 'Vocabulário científico em inglês: termos geológicos, mineralogia e ciências da Terra', duration: '40 min' },
      { id: 'ing-02', title: 'Reading Comprehension', summary: 'Estratégias de leitura de textos científicos em inglês: skimming, scanning e inferência', duration: '45 min' },
      { id: 'ing-03', title: 'Escrita Técnica', summary: 'Escrita de resumos e relatórios técnicos simples em inglês', duration: '45 min' },
    ],
  },

  // ── Graduação — 1º Semestre ────────────────────────────────
  {
    id: 'calculo-i',
    name: 'Cálculo I',
    shortName: 'Cálculo I',
    color: '#D62B2B',
    priority: 'URGENTE',
    semester: 'graduation',
    examDate: '03/08/2026',
    ementa: 'Limites, derivadas e integrais de funções de uma variável real com aplicações nas ciências exatas.',
    lessons: [
      { id: 'cal-01', title: 'Limites', summary: 'Limites de funções reais: definição, propriedades, limites laterais e continuidade', duration: '60 min' },
      { id: 'cal-02', title: 'Derivadas', summary: 'Derivação de funções: regras de derivação, regra da cadeia e aplicações', duration: '60 min' },
      { id: 'cal-03', title: 'Integrais', summary: 'Integração indefinida e definida, Teorema Fundamental do Cálculo', duration: '60 min' },
      { id: 'cal-04', title: 'Aplicações do Cálculo', summary: 'Aplicações de derivadas e integrais em otimização e cálculo de áreas', duration: '55 min' },
    ],
  },
  {
    id: 'algebra-linear',
    name: 'Álgebra Linear',
    shortName: 'Álgebra',
    color: '#1A4DAB',
    priority: 'ALTA',
    semester: 'graduation',
    examDate: '03/08/2026',
    ementa: 'Vetores, matrizes, sistemas de equações lineares e transformações lineares com aplicações geométricas.',
    lessons: [
      { id: 'alg-01', title: 'Vetores e Matrizes', summary: 'Vetores no espaço, operações com matrizes, determinantes e inversas', duration: '60 min' },
      { id: 'alg-02', title: 'Sistemas Lineares', summary: 'Resolução de sistemas de equações lineares por eliminação de Gauss', duration: '55 min' },
      { id: 'alg-03', title: 'Transformações Lineares', summary: 'Transformações lineares, núcleo, imagem e representação matricial', duration: '60 min' },
      { id: 'alg-04', title: 'Espaços Vetoriais', summary: 'Espaços vetoriais, bases, dimensão, subespaços e ortogonalidade', duration: '60 min' },
    ],
  },
  {
    id: 'fisica-i',
    name: 'Física I',
    shortName: 'Física I',
    color: '#F5C400',
    priority: 'ALTA',
    semester: 'graduation',
    examDate: '03/08/2026',
    ementa: 'Mecânica clássica, oscilações, ondas e termodinâmica — fundamentos físicos para as geociências.',
    lessons: [
      { id: 'fi-01', title: 'Mecânica Clássica', summary: 'Leis de Newton, energia, momento linear e rotação de corpos rígidos', duration: '60 min' },
      { id: 'fi-02', title: 'Oscilações e Ondas', summary: 'Movimento oscilatório, ondas mecânicas, som e fenômenos ondulatórios', duration: '55 min' },
      { id: 'fi-03', title: 'Termodinâmica', summary: 'Leis da termodinâmica, temperatura, calor, entropia e ciclos termodinâmicos', duration: '55 min' },
    ],
  },
  {
    id: 'introducao-engenharia',
    name: 'Introdução à Engenharia',
    shortName: 'Intro. Eng.',
    color: '#1A4DAB',
    priority: 'MÉDIA',
    semester: 'graduation',
    examDate: '03/08/2026',
    ementa: 'Visão geral da profissão, ética profissional e metodologia científica aplicada à engenharia.',
    lessons: [
      { id: 'ien-01', title: 'Fundamentos da Engenharia', summary: 'História da engenharia, áreas de atuação, mercado de trabalho e impacto social', duration: '45 min' },
      { id: 'ien-02', title: 'Ética Profissional', summary: 'Código de ética do engenheiro, responsabilidade social e sustentabilidade', duration: '40 min' },
      { id: 'ien-03', title: 'Metodologia Científica', summary: 'Método científico, elaboração de relatórios técnicos e normas ABNT', duration: '50 min' },
    ],
  },
  {
    id: 'programacao-i',
    name: 'Programação I',
    shortName: 'Prog. I',
    color: '#1A4DAB',
    priority: 'MÉDIA',
    semester: 'graduation',
    examDate: '03/08/2026',
    ementa: 'Introdução à programação com Python, lógica computacional e estruturas de dados básicas.',
    lessons: [
      { id: 'pro-01', title: 'Algoritmos', summary: 'Lógica de programação, fluxogramas, pseudocódigo e estruturas de controle', duration: '50 min' },
      { id: 'pro-02', title: 'Estruturas de Dados Básicas', summary: 'Listas, tuplas, dicionários e conjuntos em Python', duration: '55 min' },
      { id: 'pro-03', title: 'Lógica de Programação', summary: 'Funções, recursão, modularização e boas práticas de código', duration: '55 min' },
      { id: 'pro-04', title: 'Introdução ao Python', summary: 'Sintaxe Python, tipos de dados, entrada/saída e bibliotecas científicas básicas', duration: '60 min' },
    ],
  },
]
