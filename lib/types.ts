export type Severity = "low" | "medium" | "high"
export type ClauseStatus = "compliant" | "risky" | "missing"

export interface Issue {
  title: string
  description: string
  severity: Severity
  risk_score: number
  contract_excerpt: string | null
  template_excerpt: string | null
  category: string
  missing_in_contract: boolean
}

export interface ImportantDate {
  date: string
  description: string
  type: string
}

export interface MissingClause {
  clause_name: string
  importance: Severity
  description: string
}

export interface HighlightedClause {
  clause_type: string
  content: string
  status: ClauseStatus
}

export interface ContractAnalysis {
  executive_summary: string
  overall_risk_score: number
  issues: Issue[]
  important_dates: ImportantDate[]
  missing_clauses: MissingClause[]
  highlighted_clauses: HighlightedClause[]
}

export type AnalysisStatus = "idle" | "extracting" | "analyzing" | "complete" | "error"
