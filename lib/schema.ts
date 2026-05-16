import { z } from "zod"

export const analysisSchema = z.object({
  executive_summary: z.string().describe("Resumen ejecutivo del contrato en 2-3 oraciones"),
  overall_risk_score: z.number().min(0).max(100).describe("Puntaje de riesgo general de 0 a 100"),
  issues: z.array(z.object({
    title: z.string().describe("Titulo breve del problema"),
    description: z.string().describe("Descripcion detallada del problema"),
    severity: z.enum(["low", "medium", "high"]).describe("Severidad del problema"),
    risk_score: z.number().min(0).max(100).describe("Puntaje de riesgo individual"),
    contract_excerpt: z.string().nullable().describe("Extracto relevante del contrato"),
    template_excerpt: z.string().nullable().describe("Extracto correspondiente del template"),
    category: z.string().describe("Categoria del problema: Pagos, Penalidades, Terminacion, etc."),
    missing_in_contract: z.boolean().describe("Si la clausula falta completamente en el contrato")
  })).describe("Lista de problemas encontrados"),
  important_dates: z.array(z.object({
    date: z.string().describe("Fecha en formato legible"),
    description: z.string().describe("Descripcion del evento o deadline"),
    type: z.string().describe("Tipo: vencimiento, renovacion, entrega, etc.")
  })).describe("Fechas importantes del contrato"),
  missing_clauses: z.array(z.object({
    clause_name: z.string().describe("Nombre de la clausula faltante"),
    importance: z.enum(["low", "medium", "high"]).describe("Importancia de incluir esta clausula"),
    description: z.string().describe("Por que es importante incluir esta clausula")
  })).describe("Clausulas que deberian estar pero no estan"),
  highlighted_clauses: z.array(z.object({
    clause_type: z.string().describe("Tipo de clausula"),
    content: z.string().describe("Contenido o resumen de la clausula"),
    status: z.enum(["compliant", "risky", "missing"]).describe("Estado de la clausula")
  })).describe("Clausulas destacadas del contrato")
})

export type AnalysisSchemaType = z.infer<typeof analysisSchema>
