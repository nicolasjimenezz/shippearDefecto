"use client"

import { AlertTriangle, AlertCircle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Issue, Severity } from "@/lib/types"
import { cn } from "@/lib/utils"

interface RiskCardProps {
  issue: Issue
}

const severityConfig: Record<Severity, { icon: typeof AlertTriangle; color: string; bg: string; label: string }> = {
  high: { 
    icon: AlertTriangle, 
    color: "text-destructive", 
    bg: "bg-destructive/10", 
    label: "Alto" 
  },
  medium: { 
    icon: AlertCircle, 
    color: "text-warning", 
    bg: "bg-warning/10", 
    label: "Medio" 
  },
  low: { 
    icon: Info, 
    color: "text-primary", 
    bg: "bg-primary/10", 
    label: "Bajo" 
  },
}

export function RiskCard({ issue }: RiskCardProps) {
  const config = severityConfig[issue.severity]
  const Icon = config.icon

  return (
    <Card className={cn("border-l-4", {
      "border-l-destructive": issue.severity === "high",
      "border-l-warning": issue.severity === "medium",
      "border-l-primary": issue.severity === "low",
    })}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className={cn("rounded-full p-1.5", config.bg)}>
              <Icon className={cn("h-4 w-4", config.color)} />
            </div>
            <CardTitle className="text-base">{issue.title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {issue.category}
            </Badge>
            <Badge 
              variant={issue.severity === "high" ? "destructive" : "secondary"}
              className="text-xs"
            >
              {config.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{issue.description}</p>
        
        {(issue.contract_excerpt || issue.template_excerpt) && (
          <div className="grid gap-3 md:grid-cols-2">
            {issue.contract_excerpt && (
              <div className="rounded-md bg-muted/50 p-3">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  En el contrato:
                </p>
                <p className="text-sm italic">{`"${issue.contract_excerpt}"`}</p>
              </div>
            )}
            {issue.template_excerpt && (
              <div className="rounded-md bg-primary/5 p-3">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Segun template:
                </p>
                <p className="text-sm italic">{`"${issue.template_excerpt}"`}</p>
              </div>
            )}
          </div>
        )}

        {issue.missing_in_contract && (
          <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">
              Clausula faltante en el contrato
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
