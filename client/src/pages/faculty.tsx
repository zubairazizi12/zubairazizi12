import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FacultyTable from "@/components/faculty/faculty-table";
import Sidebar from "@/components/layout/sidebar";
import { useAuth } from "@/hooks/useAuth";
import type { Faculty } from "@shared/schema";

export default function FacultyPage() {
  const { user } = useAuth();

  const { data: faculty = [], isLoading } = useQuery<Faculty[]>({
    queryKey: ["/api/faculty"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Sidebar />
        <div className="mr-64 p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-64"></div>
            <div className="h-96 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="mr-64 p-6">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 -m-6 mb-6">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-900">مدیریت هیئت علمی</h1>
            {user?.role === 'admin' && (
              <Button 
                className="bg-hospital-green-600 hover:bg-hospital-green-700"
                data-testid="button-add-faculty"
              >
                <Plus className="h-4 w-4 ml-2" />
                افزودن عضو هیئت علمی
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">اعضای هیئت علمی</h2>
      </div>

      <FacultyTable faculty={faculty} />
      </div>
    </div>
  );
}
