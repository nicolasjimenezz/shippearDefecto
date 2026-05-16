"use client"

import { Calendar, Clock, RefreshCw, FileCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ImportantDate } from "@/lib/types"

interface ImportantDatesProps {
  dates: ImportantDate[]
}

const typeIcons: Record<string, typeof Calendar> = {
  vencimiento: Clock,
  renovacion: RefreshCw,
  entrega: FileCheck,
  default: Calendar,
}

export function ImportantDates({ dates }: ImportantDatesProps) {
  if (dates.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">
            No se detectaron fechas importantes
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5 text-primary" />
          Fechas Importantes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {/* Timeline line */}
          <div className="absolute bottom-0 left-4 top-0 w-px bg-border" />
          
          {dates.map((date, index) => {
            const IconComponent = typeIcons[date.type.toLowerCase()] || typeIcons.default

            return (
              <div key={index} className="relative flex gap-4 pl-10">
                <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <IconComponent className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{date.date}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {date.type}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {date.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
