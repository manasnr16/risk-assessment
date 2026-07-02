import { useState, useRef } from "react"
import { Upload, X, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  accept?: string
}

export function FileUpload({
  files,
  onFilesChange,
  accept = ".png,.jpg,.pdf,.xlsx,.csv",
}: FileUploadProps) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    onFilesChange([...files, ...Array.from(e.dataTransfer.files)])
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesChange([...files, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (idx: number) => onFilesChange(files.filter((_, i) => i !== idx))

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "rounded-lg border-2 border-dashed px-6 py-8 text-center cursor-pointer transition-colors",
          dragging
            ? "border-primary bg-primary/5"
            : "border-line hover:border-primary/40 hover:bg-line-soft",
        )}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="h-5 w-5 mx-auto mb-2 text-ink-faint" />
        <p className="text-sm text-ink-soft">
          Drag & drop or{" "}
          <span className="text-primary font-medium">browse</span>
        </p>
        <p className="mt-1 text-xs text-ink-faint">PNG, JPG, PDF, XLSX, CSV</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleSelect}
          className="hidden"
        />
      </div>
      {files.length > 0 && (
        <div className="space-y-1.5">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-line bg-surface px-3 py-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="h-4 w-4 text-ink-faint shrink-0" />
                <span className="text-sm text-ink truncate">{file.name}</span>
                <span className="text-xs text-ink-faint shrink-0">
                  {(file.size / 1024).toFixed(0)} KB
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="ml-2 text-ink-faint hover:text-ink transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
