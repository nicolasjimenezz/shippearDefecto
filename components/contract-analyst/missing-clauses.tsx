"use client"

import { AlertTriangle, AlertCircle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MissingClause, Severity } from "@/lib/types"
import { cn } from "@/lib/utils"

interface MissingClausesProps {
  clauses: MissingClause[]
}

const importanceConfig: Record<Severity, { icon: typeof AlertTriangle; color: string; bg: string; label: string }> = {
  high: { 
    icon: AlertTriangle, 
    color: "text-destructive", 
    bg: "bg-destructive/10", 
    label: "Critica" 
  },
  medium: { 
    icon: AlertCircle, 
    color: "text-warning", 
    bg: "bg-warning/10", 
    label: "Importante" 
  },
  low: { 
    icon: Info, 
    color: "text-muted-foreground", 
    bg: "bg-muted", 
    label: "Sugerida" 
  },
}

export function MissingClauses({ clauses }: MissingClausesProps) {
  if (clauses.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">
            No se detectaron clausulas faltantes
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {clauses.map((clause, index) => {
        const config = importanceConfig[clause.importance]
        const Icon = config.icon

        return (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("rounded-full p-1.5", config.bg)}>
                    <Icon className={cn("h-4 w-4", config.color)} />
                  </div>
                  <CardTitle className="text-base">{clause.clause_name}</CardTitle>
                </div>
                <Badge 
                  variant={clause.importance === "high" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {config.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{clause.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
