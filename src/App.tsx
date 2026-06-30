import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DepartmentsPage } from "@/pages/DepartmentsPage"
import { HierarchyPage } from "@/pages/HierarchyPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DepartmentsPage />} />
        <Route path="/department/:departmentId" element={<HierarchyPage />} />
        <Route path="*" element={<DepartmentsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
