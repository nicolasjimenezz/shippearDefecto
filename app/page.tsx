"use client"

import { useState } from "react"
import { FileText, Shield } from "lucide-react"
import { ThemeToggle } from "@/components/contract-analyst/theme-toggle"
import { UploadZone } from "@/components/contract-analyst/upload-zone"
import { RiskScoreCard } from "@/components/contract-analyst/risk-score-card"
import { AnalysisTabs } from "@/components/contract-analyst/analysis-tabs"
import { LoadingStates } from "@/components/contract-analyst/loading-states"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { ContractAnalysis, AnalysisStatus } from "@/lib/types"

export default function ContractAnalystPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [status, setStatus] = useState<AnalysisStatus>("idle")
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file)
    setAnalysis(null)
    setError(null)
    setStatus("idle")
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setStatus("extracting")
    setError(null)
    setAnalysis(null)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      setStatus("analyzing")
      
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al analizar el contrato")
      }

      setAnalysis(data.analysis)
      setStatus("complete")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ContractAnalyst</h1>
              <p className="text-xs text-muted-foreground">Analisis inteligente de contratos</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="space-y-8">
          {/* Upload section */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Subir Contrato</h2>
              <p className="text-sm text-muted-foreground">
                Sube un contrato para analizarlo contra el template interno de la empresa
              </p>
            </div>
            <UploadZone
              onFileSelect={handleFileSelect}
              onAnalyze={handleAnalyze}
              selectedFile={selectedFile}
              isAnalyzing={status === "extracting" || status === "analyzing"}
            />
          </section>

          {/* Error alert */}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error en el analisis</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Loading state */}
          {(status === "extracting" || status === "analyzing") && (
            <LoadingStates status={status} />
          )}

          {/* Analysis results */}
          {analysis && status === "complete" && (
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Resultados del Analisis</h2>
              </div>

              <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                {/* Sidebar with score */}
                <div className="space-y-4">
                  <RiskScoreCard score={analysis.overall_risk_score} />
                  
                  {/* Quick stats */}
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                      Resumen Rapido
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Problemas detectados</span>
                        <span className="font-medium">{analysis.issues.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Clausulas faltantes</span>
                        <span className="font-medium">{analysis.missing_clauses.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fechas importantes</span>
                        <span className="font-medium">{analysis.important_dates.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Riesgos altos</span>
                        <span className="font-medium text-destructive">
                          {analysis.issues.filter(i => i.severity === "high").length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main content with tabs */}
                <AnalysisTabs analysis={analysis} />
              </div>
            </section>
          )}

          {/* Empty state */}
          {status === "idle" && !analysis && (
            <div className="rounded-lg border border-dashed bg-card/50 p-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium">Sin analisis todavia</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Sube un contrato para comenzar el analisis automatico
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-4">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground">
          ContractAnalyst utiliza IA para acelerar la revision legal. 
          Siempre verifique los resultados con un profesional.
        </div>
      </footer>
    </div>
  )
}
