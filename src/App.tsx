import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DepartmentsPage } from "@/pages/DepartmentsPage"
import { HierarchyPage } from "@/pages/HierarchyPage"
import { MISPage } from "@/pages/mis/MISPage"
import { NewMISRequestPage } from "@/pages/mis/NewMISRequestPage"
import { ChangeRequestPage } from "@/pages/mis/ChangeRequestPage"
import { AdhocRequestPage } from "@/pages/mis/AdhocRequestPage"
import { ExistingMISPage } from "@/pages/mis/ExistingMISPage"
import { TrackRequestsPage } from "@/pages/mis/TrackRequestsPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DepartmentsPage />} />
        <Route path="/department/:departmentId" element={<HierarchyPage />} />
        <Route path="/mis" element={<MISPage />} />
        <Route path="/mis/new-request" element={<NewMISRequestPage />} />
        <Route path="/mis/change-request" element={<ChangeRequestPage />} />
        <Route path="/mis/adhoc" element={<AdhocRequestPage />} />
        <Route path="/mis/existing" element={<ExistingMISPage />} />
        <Route path="/mis/track" element={<TrackRequestsPage />} />
        <Route path="*" element={<DepartmentsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
