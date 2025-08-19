import ReportCards from "@/components/reports/report-cards";
import Sidebar from "@/components/layout/sidebar";

export default function Reports() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="ml-64 p-6">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 -m-6 mb-6">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-slate-900">Reports & Analytics</h1>
        </div>
      </header>

      <ReportCards />
      </div>
    </div>
  );
}
