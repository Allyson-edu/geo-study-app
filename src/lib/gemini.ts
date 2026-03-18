import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export async function generateExercises(lessonTitle: string, disciplineName: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  const prompt = `Você é um professor especialista em ${disciplineName}. 
  Crie uma lista com 5 exercícios práticos e progressivos (do mais fácil ao mais difícil) sobre o tópico: "${lessonTitle}".
  
  Formato:
  - Numerados de 1 a 5
  - Enunciado claro e objetivo
  - Ao final, uma seção "Gabarito Comentado" com as respostas explicadas
  
  Seja didático e use exemplos do cotidiano quando possível.`

  const result = await model.generateContent(prompt)
  return result.response.text()
}

export async function generateWhereToStudy(lessonTitle: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  const prompt = `Você é um curador de conteúdo educacional brasileiro especializado em ensino médio e pré-vestibular.
  
  Para o tópico "${lessonTitle}", indique recursos de estudo REAIS e específicos:
  
  1. **YouTube** (2-3 canais/vídeos em português): nome do canal, nome do professor e por que é bom
  2. **Plataformas gratuitas** (1-2): Khan Academy, Brasil Escola, Descomplica, etc. com o link da seção específica
  3. **Recurso extra** (1): apostila gratuita, livro didático acessível ou site especializado
  
  Seja específico com nomes reais. Formate de forma clara e organizada com emojis.`

  const result = await model.generateContent(prompt)
  return result.response.text()
}
