// Mock data for the Risk Intelligence Platform hierarchy explorer.
// No backend — this is the single source of truth for both screens.

export interface ChildNode {
  id: string
  name: string
  /** Risk-register style tracking code, e.g. RU-CARDS */
  code: string
  description: string
}

export interface Department {
  id: string
  name: string
  /** Short label shown on the card, e.g. "Unsecured Risk" */
  shortName: string
  code: string
  summary: string
  /** Lucide icon name resolved in DepartmentCard */
  icon: "unsecured" | "secured" | "mis" | "systems" | "stress" | "modelling" | "governance"
  children: ChildNode[]
}

const dept = (
  id: string,
  name: string,
  shortName: string,
  code: string,
  summary: string,
  icon: Department["icon"],
  children: Array<[string, string, string]>,
): Department => ({
  id,
  name,
  shortName,
  code,
  summary,
  icon,
  children: children.map(([cName, cCode, cDesc]) => ({
    id: `${id}-${cCode.toLowerCase()}`,
    name: cName,
    code: cCode,
    description: cDesc,
  })),
})

export const departments: Department[] = [
  dept(
    "unsecured-risk",
    "Head of Unsecured Risk",
    "Unsecured Risk",
    "RU",
    "Portfolio risk oversight across all unsecured lending products.",
    "unsecured",
    [
      ["Cards", "RU-CARD", "Credit risk monitoring and limit management for the consumer credit card book."],
      ["Personal Loans", "RU-PERL", "Origination and performance risk tracking for unsecured personal loans."],
      ["Overdraft", "RU-OVRD", "Exposure and utilisation risk across current account overdraft facilities."],
    ],
  ),
  dept(
    "secured-risk",
    "Head of Secured Risk",
    "Secured Risk",
    "RS",
    "Risk stewardship for lending secured against property and assets.",
    "secured",
    [
      ["Mortgages", "RS-MTGE", "Loan-to-value and arrears risk across the residential mortgage portfolio."],
      ["Auto Finance", "RS-AUTO", "Collateral and default risk for vehicle finance agreements."],
      ["Asset Finance", "RS-ASST", "Risk monitoring for equipment and commercial asset-backed lending."],
    ],
  ),
  dept(
    "mis-reporting",
    "MIS & Reporting",
    "MIS & Reporting",
    "MR",
    "Management information and statutory reporting for the risk function.",
    "mis",
    [
      ["Business MIS", "MR-BUSI", "Internal performance dashboards and portfolio management packs."],
      ["Regulatory MIS", "MR-REGU", "Statutory and regulator-facing risk reporting submissions."],
    ],
  ),
  dept(
    "systems-implementation",
    "Systems & Implementation",
    "Systems & Implementation",
    "SI",
    "Delivery and upkeep of the platforms that power risk operations.",
    "systems",
    [
      ["Platform Engineering", "SI-PLAT", "Build and maintenance of core risk decisioning platforms."],
      ["Data Integration", "SI-DATA", "Pipelines connecting source systems into the risk data estate."],
      ["Change Delivery", "SI-CHNG", "Release governance for risk-system changes and migrations."],
    ],
  ),
  dept(
    "stress-testing",
    "Stress Testing",
    "Stress Testing",
    "ST",
    "Forward-looking resilience testing under adverse scenarios.",
    "stress",
    [
      ["Macro Scenarios", "ST-MACR", "Scenario design tied to macroeconomic shock variables."],
      ["Capital Adequacy", "ST-CAPL", "Projection of capital ratios under stressed conditions."],
      ["Reverse Stress Testing", "ST-REVS", "Identification of scenarios that would breach viability."],
    ],
  ),
  dept(
    "modelling-team",
    "Modelling Team",
    "Modelling Team",
    "MT",
    "Development and validation of the bank's credit risk models.",
    "modelling",
    [
      ["Credit Risk Models", "MT-CRDT", "PD, LGD and EAD model development across portfolios."],
      ["Behavioural Models", "MT-BEHV", "Customer behaviour and propensity modelling."],
      ["Model Validation", "MT-VALD", "Independent validation and performance monitoring of models."],
    ],
  ),
  dept(
    "governance",
    "Governance",
    "Governance",
    "GV",
    "Oversight, policy and assurance across the risk framework.",
    "governance",
    [
      ["Governance Analytics", "GV-ANLY", "Analytics supporting committee packs and risk appetite tracking."],
      ["Governance Review", "GV-REVW", "Periodic review and challenge of risk policy and controls."],
    ],
  ),
]

export const getDepartment = (id: string) => departments.find((d) => d.id === id)
