import mammoth from "mammoth"
import { extractText } from "unpdf"

export async function parseDocument(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  const extension = file.name.split('.').pop()?.toLowerCase()
  
  switch (extension) {
    case 'pdf':
      return parsePdf(arrayBuffer)
    case 'docx':
    case 'doc':
      return parseDocx(buffer)
    case 'txt':
      return parseTxt(buffer)
    default:
      throw new Error(`Formato de archivo no soportado: ${extension}`)
  }
}

async function parsePdf(arrayBuffer: ArrayBuffer): Promise<string> {
  const { text } = await extractText(arrayBuffer, { mergePages: true })
  return text
}

async function parseDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer })
  return result.value
}

function parseTxt(buffer: Buffer): string {
  return buffer.toString('utf-8')
}

export function getSupportedExtensions(): string[] {
  return ['pdf', 'docx', 'doc', 'txt']
}

export function isValidFileType(filename: string): boolean {
  const extension = filename.split('.').pop()?.toLowerCase()
  return extension ? getSupportedExtensions().includes(extension) : false
}
