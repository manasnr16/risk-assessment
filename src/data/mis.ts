export interface BauReport {
  id: number
  report: string
  size: string
  lastUpdated: string
  status: "Active" | "Under Review" | "Inactive"
}

export interface ReportMetadata {
  model: string
  window: string
  scoreColumn: string
  months: number
}

export interface RunLogEntry {
  model: string
  window: string
  population: string
  included: string
  excluded: string
}

export interface MakerCheckerReport {
  id: number
  reportName: string
  reviewStatus: "Pending Review" | "Approved" | "Under Review"
}

export interface QCReport {
  model: string
  window: string
  badRate: string
  avgScore: number
  topDecisionReasons: string
}

export interface TrackRequest {
  id: string
  type: "New MIS" | "Change Request" | "Adhoc"
  requester: string
  department: string
  tat: string
  modelsAffected: string[]
  justification: string
  metricDefinition: string
  displayFormat: string[]
  sampleOutput: string | null
  status: "Pending" | "In Review" | "Approved" | "Rejected"
  submittedAt: string
}

export const bauReports: BauReport[] = [
  { id: 1, report: "Monthly Portfolio Performance Pack", size: "2.4 MB", lastUpdated: "2026-06-30", status: "Active" },
  { id: 2, report: "Credit Card Vintage Loss Analysis", size: "1.8 MB", lastUpdated: "2026-06-28", status: "Active" },
  { id: 3, report: "Personal Loan Default Tracker", size: "3.1 MB", lastUpdated: "2026-06-25", status: "Active" },
  { id: 4, report: "Mortgage LTV Distribution Report", size: "956 KB", lastUpdated: "2026-06-20", status: "Active" },
  { id: 5, report: "Stress Test Capital Summary – Q2 2026", size: "2.7 MB", lastUpdated: "2026-06-15", status: "Under Review" },
  { id: 6, report: "Bureau Attribute Scorecard", size: "1.3 MB", lastUpdated: "2026-06-10", status: "Active" },
  { id: 7, report: "Risk Appetite Dashboard – Jun 2026", size: "4.2 MB", lastUpdated: "2026-06-05", status: "Active" },
  { id: 8, report: "Auto Finance Arrears Monitoring", size: "889 KB", lastUpdated: "2026-06-01", status: "Inactive" },
  { id: 9, report: "Model Stability Index Report", size: "2.1 MB", lastUpdated: "2026-05-30", status: "Active" },
  { id: 10, report: "Regulatory Capital Pack – Jun 2026", size: "5.8 MB", lastUpdated: "2026-05-28", status: "Active" },
  { id: 11, report: "Behavioural Model Performance Review", size: "1.6 MB", lastUpdated: "2026-05-25", status: "Under Review" },
]

export const reportMetadata: ReportMetadata[] = [
  { model: "Cards PD v4", window: "2025-01 – 2025-12", scoreColumn: "pd_score", months: 12 },
  { model: "Personal Loans LGD v2", window: "2024-07 – 2025-06", scoreColumn: "lgd_score", months: 12 },
  { model: "Mortgage EAD v3", window: "2025-01 – 2025-12", scoreColumn: "ead_exposure", months: 12 },
  { model: "Auto Finance PD v2", window: "2025-04 – 2026-03", scoreColumn: "pd_score", months: 12 },
  { model: "Behavioural Propensity v1", window: "2025-01 – 2025-06", scoreColumn: "prop_score", months: 6 },
]

export const runLog: RunLogEntry[] = [
  { model: "Cards PD v4", window: "Jun-2026", population: "1,245,880", included: "1,198,443", excluded: "47,437" },
  { model: "Personal Loans LGD v2", window: "Jun-2026", population: "328,450", included: "315,210", excluded: "13,240" },
  { model: "Mortgage EAD v3", window: "Jun-2026", population: "78,920", included: "75,840", excluded: "3,080" },
  { model: "Auto Finance PD v2", window: "Jun-2026", population: "145,230", included: "139,870", excluded: "5,360" },
  { model: "Overdraft Risk v1", window: "Jun-2026", population: "892,100", included: "856,340", excluded: "35,760" },
]

export const makerCheckerReports: MakerCheckerReport[] = [
  { id: 1, reportName: "Monthly Capital Pack – Jun 2026", reviewStatus: "Pending Review" },
  { id: 2, reportName: "Credit Card PD Run – Jun 2026", reviewStatus: "Approved" },
  { id: 3, reportName: "Stress Test Output – Q2 2026", reviewStatus: "Under Review" },
  { id: 4, reportName: "Vintage Loss Analysis – H1 2026", reviewStatus: "Approved" },
  { id: 5, reportName: "Bureau Score Distribution – Jun 2026", reviewStatus: "Pending Review" },
]

export const qcReports: QCReport[] = [
  { model: "Cards PD v4", window: "Jun-2026", badRate: "2.34%", avgScore: 648, topDecisionReasons: "Bureau thin file, High utilisation" },
  { model: "Personal Loans LGD v2", window: "Jun-2026", badRate: "4.12%", avgScore: 592, topDecisionReasons: "Income instability, Delinquency history" },
  { model: "Mortgage EAD v3", window: "Jun-2026", badRate: "0.87%", avgScore: 712, topDecisionReasons: "LTV > 85%, Property type restriction" },
  { model: "Auto Finance PD v2", window: "Jun-2026", badRate: "3.28%", avgScore: 615, topDecisionReasons: "Age of vehicle, Negative equity" },
  { model: "Behavioural Propensity v1", window: "Jun-2026", badRate: "5.61%", avgScore: 578, topDecisionReasons: "Low engagement, Revolving balance" },
]

export const trackRequests: TrackRequest[] = [
  {
    id: "MIS-2026-001",
    type: "New MIS",
    requester: "Sarah Chen",
    department: "Risk Committee",
    tat: "5 days",
    modelsAffected: ["Cards PD v4", "MT-CRDT"],
    justification: "Required for monthly board reporting on credit card portfolio performance and risk-adjusted return metrics.",
    metricDefinition: "Revenue KPIs, risk-adjusted return on capital, delinquency roll rates",
    displayFormat: ["Dashboard", "PDF"],
    sampleOutput: "board_report_template.pdf",
    status: "Pending",
    submittedAt: "2026-06-28",
  },
  {
    id: "MIS-2026-002",
    type: "Change Request",
    requester: "James Okafor",
    department: "Portfolio Management",
    tat: "2 days",
    modelsAffected: ["Personal Loans LGD v2"],
    justification: "LGD metric redefined post-model refresh; existing report uses stale definition.",
    metricDefinition: "LGD recalibration metric aligned to updated model assumptions",
    displayFormat: ["Excel Workbook"],
    sampleOutput: null,
    status: "In Review",
    submittedAt: "2026-06-27",
  },
  {
    id: "MIS-2026-003",
    type: "Adhoc",
    requester: "Priya Sharma",
    department: "Model Risk",
    tat: "1 day",
    modelsAffected: ["MT-BEHV"],
    justification: "One-off investigation following anomalous score distribution flagged in Q2 review.",
    metricDefinition: "N/A – data pull",
    displayFormat: ["Excel Workbook"],
    sampleOutput: null,
    status: "Approved",
    submittedAt: "2026-06-25",
  },
  {
    id: "MIS-2026-004",
    type: "New MIS",
    requester: "David Liu",
    department: "Stress Testing",
    tat: "7 days",
    modelsAffected: ["ST-MACR", "ST-CAPL"],
    justification: "PRA regulatory requirement for enhanced stress test disclosures by Q3 2026.",
    metricDefinition: "NIM sensitivity, capital ratio projections under adverse scenario",
    displayFormat: ["PDF", "Dashboard"],
    sampleOutput: "stress_test_template.xlsx",
    status: "Pending",
    submittedAt: "2026-06-24",
  },
  {
    id: "MIS-2026-005",
    type: "Change Request",
    requester: "Emma Walsh",
    department: "Credit Risk",
    tat: "3 days",
    modelsAffected: ["Cards PD v4"],
    justification: "New PRA supervisory expectation on PD threshold disclosure in ICAAP report.",
    metricDefinition: "PD threshold adjustment at 90-day default definition",
    displayFormat: ["Excel Workbook"],
    sampleOutput: null,
    status: "Rejected",
    submittedAt: "2026-06-22",
  },
  {
    id: "MIS-2026-006",
    type: "Adhoc",
    requester: "Michael Torres",
    department: "Unsecured Risk",
    tat: "1 day",
    modelsAffected: ["RU-OVRD"],
    justification: "Spike in overdraft utilisation rates flagged by treasury; root cause analysis needed.",
    metricDefinition: "N/A – analysis request",
    displayFormat: ["Excel Workbook", "PDF"],
    sampleOutput: null,
    status: "In Review",
    submittedAt: "2026-06-20",
  },
]

export const modelSuggestions = [
  "RU-CARD – Cards",
  "RU-PERL – Personal Loans",
  "RU-OVRD – Overdraft",
  "RS-MTGE – Mortgages",
  "RS-AUTO – Auto Finance",
  "RS-ASST – Asset Finance",
  "MR-BUSI – Business MIS",
  "MR-REGU – Regulatory MIS",
  "SI-PLAT – Platform Engineering",
  "SI-DATA – Data Integration",
  "SI-CHNG – Change Delivery",
  "ST-MACR – Macro Scenarios",
  "ST-CAPL – Capital Adequacy",
  "ST-REVS – Reverse Stress Testing",
  "MT-CRDT – Credit Risk Models",
  "MT-BEHV – Behavioural Models",
  "MT-VALD – Model Validation",
  "GV-ANLY – Governance Analytics",
  "GV-REVW – Governance Review",
]
