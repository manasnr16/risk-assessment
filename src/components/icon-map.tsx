import {
  CreditCard,
  Landmark,
  BarChart3,
  ServerCog,
  ActivitySquare,
  GitBranch,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"
import type { Department } from "@/data/hierarchy"

export const deptIconMap: Record<Department["icon"], LucideIcon> = {
  unsecured: CreditCard,
  secured: Landmark,
  mis: BarChart3,
  systems: ServerCog,
  stress: ActivitySquare,
  modelling: GitBranch,
  governance: ShieldCheck,
}
