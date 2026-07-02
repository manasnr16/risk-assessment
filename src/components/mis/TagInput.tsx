import { useState, useRef } from "react"
import { X } from "lucide-react"
import { modelSuggestions } from "@/data/mis"

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  suggestions?: string[]
}

export function TagInput({
  value,
  onChange,
  placeholder = "Type to search the model repository, press Enter to add...",
  suggestions = modelSuggestions,
}: TagInputProps) {
  const [inputVal, setInputVal] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = suggestions
    .filter((s) => s.toLowerCase().includes(inputVal.toLowerCase()) && !value.includes(s))
    .slice(0, 6)

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed])
    }
    setInputVal("")
    setShowDropdown(false)
  }

  const removeTag = (tag: string) => onChange(value.filter((t) => t !== tag))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (filtered.length > 0 && inputVal) {
        addTag(filtered[0])
      } else if (inputVal.trim()) {
        addTag(inputVal.trim())
      }
    }
    if (e.key === "Backspace" && !inputVal && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  }

  return (
    <div className="relative">
      <div
        className="flex flex-wrap gap-1.5 min-h-[42px] rounded-lg border border-line bg-surface px-3 py-2 cursor-text focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40 transition-colors"
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-primary/5 border border-primary/15 px-2 py-0.5 text-xs font-mono text-primary"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
              className="hover:text-accent transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value)
            setShowDropdown(true)
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[180px] bg-transparent text-sm text-ink placeholder:text-ink-faint outline-none py-0.5"
        />
      </div>
      {showDropdown && inputVal && filtered.length > 0 && (
        <div className="absolute z-10 top-full left-0 right-0 mt-1 rounded-lg border border-line bg-surface shadow-[0_8px_24px_-8px_rgba(16,24,38,0.18)] overflow-hidden">
          {filtered.map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={() => addTag(s)}
              className="w-full text-left px-3 py-2.5 text-sm text-ink-soft hover:bg-line-soft hover:text-ink transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
