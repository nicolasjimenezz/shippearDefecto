"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExecutiveSummary } from "./executive-summary"
import { RiskCard } from "./risk-card"
import { MissingClauses } from "./missing-clauses"
import { ImportantDates } from "./important-dates"
import { ComparisonPanel } from "./comparison-panel"
import type { ContractAnalysis } from "@/lib/types"

interface AnalysisTabsProps {
  analysis: ContractAnalysis
}

export function AnalysisTabs({ analysis }: AnalysisTabsProps) {
  const highRiskIssues = analysis.issues.filter(i => i.severity === "high")
  const mediumRiskIssues = analysis.issues.filter(i => i.severity === "medium")
  const lowRiskIssues = analysis.issues.filter(i => i.severity === "low")

  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="summary">Resumen</TabsTrigger>
        <TabsTrigger value="risks" className="relative">
          Riesgos
          {analysis.issues.length > 0 && (
            <span className="ml-1.5 rounded-full bg-destructive px-1.5 text-xs text-destructive-foreground">
              {analysis.issues.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="clauses">Clausulas</TabsTrigger>
        <TabsTrigger value="dates">Fechas</TabsTrigger>
        <TabsTrigger value="comparison">Comparacion</TabsTrigger>
      </TabsList>

      <TabsContent value="summary" className="mt-6">
        <ExecutiveSummary summary={analysis.executive_summary} />
      </TabsContent>

      <TabsContent value="risks" className="mt-6 space-y-4">
        {analysis.issues.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              No se detectaron riesgos en el contrato
            </p>
          </div>
        ) : (
          <>
            {highRiskIssues.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-destructive">
                  Riesgos Altos ({highRiskIssues.length})
                </h3>
                {highRiskIssues.map((issue, index) => (
                  <RiskCard key={index} issue={issue} />
                ))}
              </div>
            )}
            {mediumRiskIssues.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-warning">
                  Riesgos Medios ({mediumRiskIssues.length})
                </h3>
                {mediumRiskIssues.map((issue, index) => (
                  <RiskCard key={index} issue={issue} />
                ))}
              </div>
            )}
            {lowRiskIssues.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-primary">
                  Riesgos Bajos ({lowRiskIssues.length})
                </h3>
                {lowRiskIssues.map((issue, index) => (
                  <RiskCard key={index} issue={issue} />
                ))}
              </div>
            )}
          </>
        )}
      </TabsContent>

      <TabsContent value="clauses" className="mt-6">
        <MissingClauses clauses={analysis.missing_clauses} />
      </TabsContent>

      <TabsContent value="dates" className="mt-6">
        <ImportantDates dates={analysis.important_dates} />
      </TabsContent>

      <TabsContent value="comparison" className="mt-6">
        <ComparisonPanel clauses={analysis.highlighted_clauses} />
      </TabsContent>
    </Tabs>
  )
}
