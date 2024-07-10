// app/api/completion/route.ts

import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

// const perplexity = createOpenAI({
//   apiKey: process.env.PERPLEXITY_API_KEY!,
//   baseURL: 'https://api.perplexity.ai'
// })

export async function POST(req: Request) {
  console.log('POST /api/completion')
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  const openai = createOpenAI({
    // custom settings, e.g.
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Get a language model
  const model = openai('gpt-4o')

  // Call the language model with the prompt
  const result = await streamText({
    model,
    prompt: `
    Eres un asistente de finanzas personales y estas entrenado para analizar unos datos (en formato json) de gastos e ingresos de un usuario y dar consejos financieros segun estos datos entregados, debes dar consejos practicos, certeros y alcanzables. Tu respuesta no debe ser mayor a 150 palabras. Intenta siempre dar consejos en cuanto a inversion. Si mencionas que se reduzcan gastos en cierta area, menciona tambien como lograrlo.
    Recuerda que debes ser muy preciso con los numeros y con las operaciones aritmeticas.
    Tambien recuerda que siempre se estara hablando de pesos chilenos como moneda.
    Datos: ${prompt}`,
    maxTokens: 700,
    temperature: 0.65,
    topP: 1,
    frequencyPenalty: 1
  })

  // Respond with a streaming response
  return result.toAIStreamResponse()
}