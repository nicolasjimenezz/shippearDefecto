import { generateText, Output } from "ai"
import { analysisSchema } from "@/lib/schema"
import { ANALYSIS_PROMPT } from "@/lib/template"
import { parseDocument } from "@/lib/parse-document"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    
    if (!file) {
      return Response.json(
        { error: "No se proporciono ningun archivo" },
        { status: 400 }
      )
    }

    // Extract text from the document
    const contractText = await parseDocument(file)
    
    if (!contractText || contractText.trim().length === 0) {
      return Response.json(
        { error: "No se pudo extraer texto del documento" },
        { status: 400 }
      )
    }

    // Call OpenAI with structured output
    const result = await generateText({
      model: "openai/gpt-4o-mini",
      output: Output.object({
        schema: analysisSchema,
      }),
      prompt: `${ANALYSIS_PROMPT}\n\n${contractText}`,
    })

    return Response.json({ analysis: result.output })
  } catch (error) {
    console.error("Error analyzing contract:", error)
    
    if (error instanceof Error) {
      // Check for API key issues
      if (error.message.includes("API key") || error.message.includes("authentication")) {
        return Response.json(
          { error: "Error de autenticacion con OpenAI. Verifica que OPENAI_API_KEY este configurada correctamente." },
          { status: 401 }
        )
      }
      
      return Response.json(
        { error: `Error al analizar el contrato: ${error.message}` },
        { status: 500 }
      )
    }
    
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
