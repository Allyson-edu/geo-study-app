const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

async function callGemini(prompt: string): Promise<string> {
  if (!API_KEY) {
    throw new Error('Chave VITE_GEMINI_API_KEY não configurada nas variáveis de ambiente.')
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini API retornou ${response.status}: ${errorText}`)
  }

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    throw new Error('Resposta vazia da API Gemini')
  }

  return text
}

export async function generateExercises(lessonTitle: string, disciplineName: string): Promise<string> {
  const prompt = `Você é um professor especialista em ${disciplineName}. 
  Crie uma lista com 5 exercícios práticos e progressivos (do mais fácil ao mais difícil) sobre o tópico: "${lessonTitle}".
  
  Formato:
  - Numerados de 1 a 5
  - Enunciado claro e objetivo
  - Ao final, uma seção "Gabarito Comentado" com as respostas explicadas
  
  Seja didático e use exemplos do cotidiano quando possível.`

  return callGemini(prompt)
}

export async function generateWhereToStudy(lessonTitle: string): Promise<string> {
  const prompt = `Você é um curador de conteúdo educacional brasileiro especializado em ensino superior e ciências da Terra.
  
  Para o tópico "${lessonTitle}", indique recursos de estudo REAIS e específicos:
  
  1. **YouTube** (2-3 canais/vídeos em português): nome do canal, nome do professor e por que é bom
  2. **Plataformas gratuitas** (1-2): Khan Academy, Brasil Escola, Descomplica, etc. com o link da seção específica
  3. **Recurso extra** (1): apostila gratuita, livro didático acessível ou site especializado
  
  Seja específico com nomes reais. Formate de forma clara e organizada com emojis.`

  return callGemini(prompt)
}

