import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Search, Grid3X3, List } from "lucide-react";
import ResidentCard from "@/components/residents/resident-card";
import ResidentDetails from "@/components/residents/resident-details";
import Sidebar from "@/components/layout/sidebar";
import { useAuth } from "@/hooks/useAuth";
import type { Resident } from "@shared/schema";

export default function Residents() {
  const { user } = useAuth();
  const [selectedResident, setSelectedResident] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const { data: residents = [], isLoading } = useQuery<Resident[]>({
    queryKey: ["/api/residents"],
  });

  const filteredResidents = residents.filter((resident) => {
    const matchesSearch = resident.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resident.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || resident.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(residents.map(r => r.department)));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Sidebar />
        <div className="mr-64 p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-64"></div>
            <div className="h-20 bg-slate-200 rounded"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-200 rounded"></div>
              ))}
            </div>
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
            <h1 className="text-2xl font-semibold text-slate-900">مدیریت ترینری</h1>
            {user?.role === 'admin' && (
              <Button 
                className="bg-hospital-green-600 hover:bg-hospital-green-700"
                data-testid="button-add-resident"
              >
                <Plus className="h-4 w-4 ml-2" />
                افزودن ترینری جدید
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="جستجو ترینری..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-64"
                data-testid="input-search-residents"
              />
            </div>
            <Select  value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48" data-testid="select-department-filter">
                <SelectValue placeholder="همه بخش‌ها" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه بخش‌ها</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">نمایش:</span>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              data-testid="button-grid-view"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              data-testid="button-list-view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div> */}
        </div>
      </div>

      {/* Residents List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResidents.map((resident) => (
          <ResidentCard
            key={resident._id}
            resident={resident}
            onClick={() => setSelectedResident(resident._id)}
            data-testid={`card-resident-${resident._id}`}
          />
        ))}
        {filteredResidents.length === 0 && (
          <div className="text-center py-12 text-slate-500 col-span-full">
            <p>هیچ ترینری با این مشخصات یافت نشد.</p>
          </div>
        )}
      </div>

      {/* Selected Resident Details */}
      {selectedResident && (
        <ResidentDetails
          residentId={selectedResident}
          onClose={() => setSelectedResident(null)}
        />
      )}
      </div>
    </div>
  );
}
