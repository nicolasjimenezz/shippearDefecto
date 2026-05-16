"use client"

import { useCallback, useState } from "react"
import { Upload, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  onAnalyze: () => void
  selectedFile: File | null
  isAnalyzing: boolean
}

const SUPPORTED_EXTENSIONS = [".pdf", ".docx", ".doc", ".txt"]

export function UploadZone({ onFileSelect, onAnalyze, selectedFile, isAnalyzing }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && isValidFile(file)) {
      onFileSelect(file)
    }
  }, [onFileSelect])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && isValidFile(file)) {
      onFileSelect(file)
    }
  }, [onFileSelect])

  const isValidFile = (file: File): boolean => {
    const extension = "." + file.name.split(".").pop()?.toLowerCase()
    return SUPPORTED_EXTENSIONS.includes(extension)
  }

  const clearFile = useCallback(() => {
    onFileSelect(null as unknown as File)
  }, [onFileSelect])

  return (
    <Card className="p-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
          selectedFile && "border-success bg-success/5"
        )}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
              <FileText className="h-7 w-7 text-success" />
            </div>
            <div className="text-center">
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFile}
                disabled={isAnalyzing}
              >
                <X className="mr-1 h-4 w-4" />
                Cambiar archivo
              </Button>
              <Button
                size="sm"
                onClick={onAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analizando..." : "Analizar Contrato"}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Upload className="h-7 w-7 text-muted-foreground" />
            </div>
            <div className="mt-4 text-center">
              <p className="font-medium">Arrastra tu contrato aqui</p>
              <p className="mt-1 text-sm text-muted-foreground">
                o haz clic para seleccionar
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Formatos soportados: PDF, DOCX, TXT
              </p>
            </div>
            <input
              type="file"
              accept={SUPPORTED_EXTENSIONS.join(",")}
              onChange={handleFileChange}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </>
        )}
      </div>
    </Card>
  )
}
