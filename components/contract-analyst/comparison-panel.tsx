"use client"

import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { HighlightedClause, ClauseStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ComparisonPanelProps {
  clauses: HighlightedClause[]
}

const statusConfig: Record<ClauseStatus, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  compliant: { 
    icon: CheckCircle2, 
    color: "text-success", 
    bg: "bg-success/10", 
    label: "Conforme" 
  },
  risky: { 
    icon: AlertTriangle, 
    color: "text-warning", 
    bg: "bg-warning/10", 
    label: "Riesgoso" 
  },
  missing: { 
    icon: XCircle, 
    color: "text-destructive", 
    bg: "bg-destructive/10", 
    label: "Faltante" 
  },
}

export function ComparisonPanel({ clauses }: ComparisonPanelProps) {
  if (clauses.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">
            No hay clausulas para mostrar
          </p>
        </CardContent>
      </Card>
    )
  }

  // Group by status
  const grouped = {
    compliant: clauses.filter(c => c.status === "compliant"),
    risky: clauses.filter(c => c.status === "risky"),
    missing: clauses.filter(c => c.status === "missing"),
  }

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {(["compliant", "risky", "missing"] as ClauseStatus[]).map((status) => {
          const config = statusConfig[status]
          const Icon = config.icon
          const count = grouped[status].length

          return (
            <Card key={status} className={cn("border-l-4", {
              "border-l-success": status === "compliant",
              "border-l-warning": status === "risky",
              "border-l-destructive": status === "missing",
            })}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className={cn("rounded-full p-2", config.bg)}>
                  <Icon className={cn("h-5 w-5", config.color)} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">{config.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Detailed list */}
      <div className="space-y-3">
        {clauses.map((clause, index) => {
          const config = statusConfig[clause.status]
          const Icon = config.icon

          return (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-5 w-5", config.color)} />
                    <CardTitle className="text-base">{clause.clause_type}</CardTitle>
                  </div>
                  <Badge 
                    variant={clause.status === "compliant" ? "secondary" : clause.status === "risky" ? "outline" : "destructive"}
                    className="text-xs"
                  >
                    {config.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{clause.content}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
