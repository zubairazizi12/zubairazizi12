import FormF from "@/components/forms/formF"; // 👈 فرم F
import TeacherActivityForm from "@/components/forms/formJ"; // 👈 فرم J
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Search, Grid3X3, List, Eye } from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import { useAuth } from "@/hooks/useAuth";
import TrainerRegistrationForm from "@/components/forms/TrainerRegistrationForm";

type FormItem = { id: string; completed: boolean };
type Trainer = {
  _id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  province: string;
  department: string;
  specialty: string;
  birthDate: string;
  joiningDate: string;
  appointmentType: string;
  status: string;
};

export default function TrainersPage() {
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [openForm, setOpenForm] = useState(false);
  const [openFormF, setOpenFormF] = useState(false); // 👈 فرم F
  const [openTeacherForm, setOpenTeacherForm] = useState(false); // 👈 فرم J
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [trainerForms, setTrainerForms] = useState<Record<string, FormItem[]>>(
    {}
  );

  const formIds = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  // گرفتن لیست ترینرها از سرور
  const { data: trainers = [], isLoading: trainersLoading } = useQuery<
    Trainer[]
  >({
    queryKey: ["/api/trainers"],
    queryFn: async () => {
      const res = await fetch("/api/trainers");
      if (!res.ok) throw new Error("Failed to fetch trainers");
      return res.json();
    },
    onSuccess(data) {
      const formsObj: Record<string, FormItem[]> = {};
      data.forEach((t) => {
        formsObj[t._id] = formIds.map((id) => ({ id, completed: false }));
      });
      setTrainerForms(formsObj);
    },
  });

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || trainer.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(trainers.map((t) => t.department)));

  const toggleForm = (trainerId: string, formId: string) => {
    setTrainerForms((prev) => ({
      ...prev,
      [trainerId]: prev[trainerId].map((f) =>
        f.id === formId ? { ...f, completed: !f.completed } : f
      ),
    }));
  };

  if (trainersLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Sidebar />
        <div className="mr-64 p-6">
          <p className="text-gray-500">در حال بارگذاری ترینرها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="mr-64 p-6">
<<<<<<< HEAD
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 -m-6 mb-6">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-900">
              مدیریت ترینرها
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm bg-slate-100 px-3 py-2 rounded-lg shadow">
                فرم‌های تکمیل‌شده:{" "}
                {
                  Object.values(trainerForms)
                    .flat()
                    .filter((f) => f.completed).length
                }
              </span>
              {user?.role === "admin" && (
                <Button
                  className="bg-hospital-green-600 hover:bg-hospital-green-700"
                  onClick={() => setOpenForm(true)}
                >
                  <Plus className="h-4 w-4 ml-2" />
                  افزودن ترینر جدید
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
                  placeholder="جستجو ترینرها..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-64"
                />
              </div>
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="همه بخش‌ها" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه بخش‌ها</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">نمایش:</span>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
=======
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
>>>>>>> f9ad67ed0738450587f6084c6a2c87caaf174188
        </div>

<<<<<<< HEAD
        {/* Trainers List */}
        <div
          className={
            viewMode === "grid"
              ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
          }
        >
          {filteredTrainers.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p>هیچ ترینری یافت نشد.</p>
            </div>
          ) : (
            filteredTrainers.map((trainer) => (
              <div
                key={trainer._id}
                className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col gap-3"
              >
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg">
                      {trainer.name} {trainer.lastName}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {trainer.department}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {trainer.phoneNumber}
                    </p>
                  </div>

                  {/* Forms Dropdown Button */}
                  <div className="relative">
                    <Button
                      className="flex items-center gap-2 border rounded-lg bg-slate-50 hover:bg-slate-100"
                      size="sm"
                    >
                      فرم‌ها
                    </Button>

                    <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-slate-200 shadow-lg rounded-md z-10 flex flex-col gap-1 p-2">
                      {["A", "B", "C", "D", "E", "F", "J", "H", "I"].map(
                        (formId) => {
                          const completed =
                            trainerForms[trainer._id]?.find(
                              (f) => f.id === formId.toLowerCase()
                            )?.completed || false;

                          return (
                            <Button
                              key={formId}
                              size="sm"
                              variant={completed ? "default" : "outline"}
                              className="w-full flex justify-center text-xs"
                              onClick={() => {
                                if (formId === "F") setOpenFormF(true);
                                else if (formId === "J")
                                  setOpenTeacherForm(true);
                                else
                                  toggleForm(trainer._id, formId.toLowerCase());
                              }}
                            >
                              {formId}
                            </Button>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>

                {/* View Profile Button */}
                <Button
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                  onClick={() => setSelectedTrainer(trainer)}
                >
                  <Eye className="h-4 w-4 ml-1" />
                  مشاهده پروفایل
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Modals */}
        {openForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
              <TrainerRegistrationForm onClose={() => setOpenForm(false)} />
            </div>
=======
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
>>>>>>> f9ad67ed0738450587f6084c6a2c87caaf174188
          </div>
        )}

        {openFormF && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
              <FormF /> {/* 👈 فرم F */}
              <Button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => setOpenFormF(false)}
              >
                بستن
              </Button>
            </div>
          </div>
        )}

        {openTeacherForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
              <TeacherActivityForm /> {/* 👈 فرم J */}
              <Button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => setOpenTeacherForm(false)}
              >
                بستن
              </Button>
            </div>
          </div>
        )}

        {selectedTrainer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
              <h2 className="text-xl font-bold mb-4">
                پروفایل {selectedTrainer.name} {selectedTrainer.lastName}
              </h2>
              <div className="space-y-2 text-sm text-slate-700">
                <p>شماره تماس: {selectedTrainer.phoneNumber}</p>
                <p>ایمیل: {selectedTrainer.email}</p>
                <p>ولایت: {selectedTrainer.province}</p>
                <p>دیپارتمنت: {selectedTrainer.department}</p>
                <p>تخصص: {selectedTrainer.specialty}</p>
                <p>تاریخ تولد: {selectedTrainer.birthDate}</p>
                <p>تاریخ پیوستن: {selectedTrainer.joiningDate}</p>
                <p>نوع استخدام: {selectedTrainer.appointmentType}</p>
                <p>وضعیت: {selectedTrainer.status}</p>
              </div>
              <Button
                className="mt-6 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => setSelectedTrainer(null)}
              >
                بستن
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
