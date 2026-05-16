"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface RiskScoreCardProps {
  score: number
}

export function RiskScoreCard({ score }: RiskScoreCardProps) {
  const getRiskLevel = (score: number) => {
    if (score < 40) return { label: "Bajo", color: "text-success", bgColor: "bg-success" }
    if (score < 70) return { label: "Medio", color: "text-warning", bgColor: "bg-warning" }
    return { label: "Alto", color: "text-destructive", bgColor: "bg-destructive" }
  }

  const risk = getRiskLevel(score)
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Puntaje de Riesgo
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative h-32 w-32">
          <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/30"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={cn("transition-all duration-1000 ease-out", risk.color)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-3xl font-bold", risk.color)}>{score}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>
        <div className={cn(
          "mt-3 rounded-full px-3 py-1 text-sm font-medium",
          risk.bgColor,
          score < 70 ? "text-foreground" : "text-destructive-foreground"
        )}>
          Riesgo {risk.label}
        </div>
      </CardContent>
    </Card>
  )
}
