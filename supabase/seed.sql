-- ==========================================
-- GeoStudy App — Seed Data
-- Execute APÓS o schema.sql
-- ==========================================

-- ==========================================
-- DISCIPLINAS DO PRÉ-CURSO
-- ==========================================
with
  d1 as (
    insert into disciplines (name, description, area, icon, color, xp_value, order_index)
    values ('Base Matemática', 'Fundamentos de aritmética, álgebra e operações essenciais', 'pre_course', '🔢', '#0A84FF', 100, 1)
    returning id
  ),
  d2 as (
    insert into disciplines (name, description, area, icon, color, xp_value, order_index)
    values ('Funções e Gráficos', 'Funções elementares, especiais e trigonometria', 'pre_course', '📈', '#BF5AF2', 100, 2)
    returning id
  ),
  d3 as (
    insert into disciplines (name, description, area, icon, color, xp_value, order_index)
    values ('Geometria', 'Geometria plana, analítica e vetores', 'pre_course', '📐', '#FF9F0A', 100, 3)
    returning id
  ),
  d4 as (
    insert into disciplines (name, description, area, icon, color, xp_value, order_index)
    values ('Pré-Cálculo', 'Limites, derivadas e suas aplicações', 'pre_course', '∞', '#30D158', 100, 4)
    returning id
  ),
  d5 as (
    insert into disciplines (name, description, area, icon, color, xp_value, order_index)
    values ('Química Básica', 'Matéria, estrutura atômica e reações químicas', 'pre_course', '⚗️', '#FF375F', 100, 5)
    returning id
  ),
  d6 as (
    insert into disciplines (name, description, area, icon, color, xp_value, order_index)
    values ('Física Básica', 'Cinemática, dinâmica, ondas e termodinâmica', 'pre_course', '⚡', '#5AC8FA', 100, 6)
    returning id
  ),

-- ==========================================
-- MÓDULOS E AULAS — BASE MATEMÁTICA
-- ==========================================
  m1 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Frações, Potências e Raízes', 'Operações fundamentais com frações e notação científica', 1 from d1
    returning id
  ),
  m2 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Equações e Inequações', 'Equações do 1º e 2º grau, sistemas lineares e inequações', 2 from d1
    returning id
  ),
  m3 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Expressões Algébricas', 'Produtos notáveis, fatoração e polinômios', 3 from d1
    returning id
  ),

-- ==========================================
-- MÓDULOS E AULAS — FUNÇÕES E GRÁFICOS
-- ==========================================
  m4 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Funções Elementares', 'Conceito de função, função afim e quadrática', 1 from d2
    returning id
  ),
  m5 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Funções Especiais', 'Funções exponencial, logarítmica e suas equações', 2 from d2
    returning id
  ),
  m6 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Trigonometria', 'Círculo trigonométrico e identidades fundamentais', 3 from d2
    returning id
  ),

-- ==========================================
-- MÓDULOS E AULAS — GEOMETRIA
-- ==========================================
  m7 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Geometria Plana', 'Áreas, perímetros e o Teorema de Pitágoras', 1 from d3
    returning id
  ),
  m8 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Geometria Analítica', 'Pontos, retas e circunferências no plano cartesiano', 2 from d3
    returning id
  ),
  m9 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Vetores', 'Conceito, operações e aplicações de vetores', 3 from d3
    returning id
  ),

-- ==========================================
-- MÓDULOS E AULAS — PRÉ-CÁLCULO
-- ==========================================
  m10 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Limites', 'Intuição de limites, continuidade e comportamento assintótico', 1 from d4
    returning id
  ),
  m11 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Derivadas', 'Regras de derivação e funções compostas', 2 from d4
    returning id
  ),
  m12 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Aplicações de Derivadas', 'Crescimento, máximos, mínimos e esboço de gráficos', 3 from d4
    returning id
  ),

-- ==========================================
-- MÓDULOS E AULAS — QUÍMICA BÁSICA
-- ==========================================
  m13 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Matéria e Medidas', 'Grandezas físicas, estados da matéria e misturas', 1 from d5
    returning id
  ),
  m14 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Estrutura Atômica', 'Modelos atômicos, tabela periódica e configuração eletrônica', 2 from d5
    returning id
  ),
  m15 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Ligações e Reações', 'Ligações químicas, balanceamento e estequiometria', 3 from d5
    returning id
  ),

-- ==========================================
-- MÓDULOS E AULAS — FÍSICA BÁSICA
-- ==========================================
  m16 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Grandezas e Cinemática', 'Grandezas físicas, MRU, MRUV e queda livre', 1 from d6
    returning id
  ),
  m17 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Dinâmica', 'Leis de Newton, forças e energia mecânica', 2 from d6
    returning id
  ),
  m18 as (
    insert into modules (discipline_id, title, description, order_index)
    select id, 'Ondas e Termodinâmica', 'Ondas mecânicas, calor e introdução à termodinâmica', 3 from d6
    returning id
  ),

-- ==========================================
-- AULAS — MÓDULO 1 (Frações, Potências e Raízes)
-- ==========================================
  dummy as (select 1)

insert into lessons (module_id, title, order_index, xp_reward)
select id, 'Operações com frações — simplificação', 1, 10 from m1
union all select id, 'Multiplicação e divisão de frações', 2, 10 from m1
union all select id, 'Potências: regras e propriedades', 3, 10 from m1
union all select id, 'Raiz quadrada e cúbica', 4, 10 from m1
union all select id, 'Notação científica', 5, 10 from m1
union all select id, 'MMC e MDC', 6, 10 from m1

-- Módulo 2
union all select id, 'Equações do 1º grau', 1, 10 from m2
union all select id, 'Equações do 2º grau — Fórmula de Bhaskara', 2, 10 from m2
union all select id, 'Sistemas de equações lineares', 3, 10 from m2
union all select id, 'Inequações do 1º e 2º grau', 4, 10 from m2

-- Módulo 3
union all select id, 'Produtos notáveis', 1, 10 from m3
union all select id, 'Fatoração de expressões', 2, 10 from m3
union all select id, 'Operações com polinômios', 3, 10 from m3

-- Módulo 4 — Funções Elementares
union all select id, 'Conceito de função — domínio e imagem', 1, 10 from m4
union all select id, 'Função afim — linear', 2, 10 from m4
union all select id, 'Função quadrática e parábola', 3, 10 from m4
union all select id, 'Análise gráfica de funções', 4, 10 from m4

-- Módulo 5 — Funções Especiais
union all select id, 'Função exponencial', 1, 10 from m5
union all select id, 'Função logarítmica', 2, 10 from m5
union all select id, 'Propriedades dos logaritmos', 3, 10 from m5
union all select id, 'Equações exponenciais e logarítmicas', 4, 10 from m5

-- Módulo 6 — Trigonometria
union all select id, 'Círculo trigonométrico', 1, 10 from m6
union all select id, 'Seno, cosseno e tangente', 2, 10 from m6
union all select id, 'Identidades trigonométricas fundamentais', 3, 10 from m6
union all select id, 'Equações trigonométricas básicas', 4, 10 from m6

-- Módulo 7 — Geometria Plana
union all select id, 'Áreas e perímetros das figuras planas', 1, 10 from m7
union all select id, 'Teorema de Pitágoras', 2, 10 from m7
union all select id, 'Semelhança de triângulos', 3, 10 from m7
union all select id, 'Círculo — comprimento e área', 4, 10 from m7

-- Módulo 8 — Geometria Analítica
union all select id, 'Pontos e distâncias no plano cartesiano', 1, 10 from m8
union all select id, 'Equação da reta — formas e inclinação', 2, 10 from m8
union all select id, 'Posição relativa entre retas', 3, 10 from m8
union all select id, 'Circunferência no plano', 4, 10 from m8

-- Módulo 9 — Vetores
union all select id, 'Conceito e operações com vetores', 1, 10 from m9
union all select id, 'Produto escalar', 2, 10 from m9
union all select id, 'Aplicações de vetores em física', 3, 10 from m9

-- Módulo 10 — Limites
union all select id, 'Intuição de limite — o que é um limite?', 1, 10 from m10
union all select id, 'Limites laterais e continuidade', 2, 10 from m10
union all select id, 'Limites no infinito — comportamento assintótico', 3, 10 from m10
union all select id, 'Limites indeterminados — formas 0/0', 4, 10 from m10

-- Módulo 11 — Derivadas
union all select id, 'Taxa de variação instantânea — conceito', 1, 10 from m11
union all select id, 'Regras básicas de derivação', 2, 10 from m11
union all select id, 'Regra da cadeia — derivadas compostas', 3, 10 from m11
union all select id, 'Derivadas de funções trigonométricas', 4, 10 from m11

-- Módulo 12 — Aplicações de Derivadas
union all select id, 'Crescimento e decrescimento de funções', 1, 10 from m12
union all select id, 'Máximos e mínimos — problemas de otimização', 2, 10 from m12
union all select id, 'Esboço de gráficos com derivadas', 3, 10 from m12

-- Módulo 13 — Matéria e Medidas
union all select id, 'Grandezas físicas e o Sistema Internacional', 1, 10 from m13
union all select id, 'Algarismos significativos', 2, 10 from m13
union all select id, 'Estados físicos da matéria e mudanças de fase', 3, 10 from m13
union all select id, 'Misturas e substâncias puras', 4, 10 from m13

-- Módulo 14 — Estrutura Atômica
union all select id, 'Modelos atômicos — história e evolução', 1, 10 from m14
union all select id, 'Tabela periódica — organização e propriedades', 2, 10 from m14
union all select id, 'Configuração eletrônica', 3, 10 from m14
union all select id, 'Íons — cátions e ânions', 4, 10 from m14

-- Módulo 15 — Ligações e Reações
union all select id, 'Ligações iônicas e covalentes', 1, 10 from m15
union all select id, 'Balanceamento de equações químicas', 2, 10 from m15
union all select id, 'Conceito de mol e massa molar', 3, 10 from m15
union all select id, 'Estequiometria — cálculos básicos', 4, 10 from m15

-- Módulo 16 — Grandezas e Cinemática
union all select id, 'Grandezas físicas — escalares e vetoriais', 1, 10 from m16
union all select id, 'Movimento Retilíneo Uniforme (MRU)', 2, 10 from m16
union all select id, 'Movimento Retilíneo Uniformemente Variado (MRUV)', 3, 10 from m16
union all select id, 'Queda livre e lançamento de projéteis', 4, 10 from m16

-- Módulo 17 — Dinâmica
union all select id, '1ª Lei de Newton — inércia', 1, 10 from m17
union all select id, '2ª Lei de Newton — F=ma', 2, 10 from m17
union all select id, '3ª Lei de Newton — ação e reação', 3, 10 from m17
union all select id, 'Força gravitacional e força de atrito', 4, 10 from m17
union all select id, 'Trabalho e energia mecânica', 5, 10 from m17

-- Módulo 18 — Ondas e Termodinâmica
union all select id, 'Ondas mecânicas — características e tipos', 1, 10 from m18
union all select id, 'Temperatura, calor e escalas termométricas', 2, 10 from m18
union all select id, 'Calor específico e calorimetria', 3, 10 from m18
union all select id, 'Introdução às Leis da Termodinâmica', 4, 10 from m18;
