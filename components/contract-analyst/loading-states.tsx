"use client"

import { useEffect, useState } from "react"
import { FileSearch, Brain, GitCompare, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { AnalysisStatus } from "@/lib/types"

interface LoadingStatesProps {
  status: AnalysisStatus
}

const steps = [
  { key: "extracting", icon: FileSearch, label: "Extrayendo texto del documento..." },
  { key: "analyzing", icon: Brain, label: "Analizando contrato con IA..." },
  { key: "comparing", icon: GitCompare, label: "Comparando contra template interno..." },
  { key: "generating", icon: FileText, label: "Generando reporte de riesgos..." },
]

export function LoadingStates({ status }: LoadingStatesProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (status === "extracting" || status === "analyzing") {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length)
      }, 2500)
      return () => clearInterval(interval)
    }
  }, [status])

  if (status === "idle" || status === "complete" || status === "error") {
    return null
  }

  const step = steps[currentStep]
  const Icon = step.icon

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
        <p className="mt-6 text-center font-medium">{step.label}</p>
        <div className="mt-4 flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 w-8 rounded-full transition-colors",
                index === currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
