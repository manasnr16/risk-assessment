import { cn } from "@/lib/utils"

interface ToggleGroupProps {
  options: string[]
  value: string | string[]
  onChange: (val: string | string[]) => void
  multi?: boolean
}

export function ToggleGroup({ options, value, onChange, multi = false }: ToggleGroupProps) {
  const handleClick = (option: string) => {
    if (multi) {
      const arr = value as string[]
      onChange(arr.includes(option) ? arr.filter((v) => v !== option) : [...arr, option])
    } else {
      onChange(option)
    }
  }

  const isActive = (option: string) =>
    multi ? (value as string[]).includes(option) : value === option

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => handleClick(option)}
          className={cn(
            "rounded-lg border px-4 py-2 text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
            isActive(option)
              ? "border-primary bg-primary/5 text-primary font-medium"
              : "border-line bg-surface text-ink-soft hover:border-primary/30 hover:bg-line-soft hover:text-ink",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
