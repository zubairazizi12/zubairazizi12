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
<<<<<<< HEAD
import { Search, Eye, MoreHorizontal, Plus, X } from "lucide-react";
import ResidentDetails from "@/components/residents/resident-details";
import FormModal from "@/components/forms/form-modal";
import Sidebar from "@/components/layout/sidebar";
import { useAuth } from "@/hooks/useAuth";
import type { Resident, Form } from "@shared/schema";

const FORM_TYPES = [
  { type: "J", name: "Initial Assessment" },
  { type: "F", name: "Mid-Training Evaluation" },
  { type: "D", name: "Clinical Skills" },
  { type: "I", name: "Research Progress" },
  { type: "G", name: "Communication Skills" },
  { type: "E", name: "Ethics & Professionalism" },
  { type: "C", name: "Case Presentation" },
  { type: "H", name: "Hands-on Procedure" },
  { type: "K", name: "Final Competency" },
];
=======
import { Plus, Search, Grid3X3, List, Eye } from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import { useAuth } from "@/hooks/useAuth";
import TrainerRegistrationForm from "@/components/forms/TrainerRegistrationForm";
>>>>>>> bdbdc045a0c8c9daccfdc0a4fe4cce85fb316bb9

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
<<<<<<< HEAD
  const [selectedResident, setSelectedResident] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [showDropdownId, setShowDropdownId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
=======

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
>>>>>>> bdbdc045a0c8c9daccfdc0a4fe4cce85fb316bb9

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

<<<<<<< HEAD
  const filteredResidents = residents.filter((resident) => {
    const matchesSearch =
      resident.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || resident.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(residents.map((r) => r.department)));

  const handleSelectForm = (
    resident: Resident,
    ft: { type: string; name: string }
  ) => {
    setSelectedForm({
      _id: `new-${ft.type}`,
      formType: ft.type,
      status: "pending",
      createdAt: new Date().toISOString(),
      completedAt: null,
      residentId: resident._id,
    });
    setShowDropdownId(null);
  };
=======
  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || trainer.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(trainers.map((t) => t.department)));
>>>>>>> bdbdc045a0c8c9daccfdc0a4fe4cce85fb316bb9

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
=======
<<<<<<< HEAD
>>>>>>> bdbdc045a0c8c9daccfdc0a4fe4cce85fb316bb9
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 -m-6 mb-6">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-900">
<<<<<<< HEAD
              مدیریت ترینری
            </h1>
            {user?.role === "admin" && (
              <Button className="bg-hospital-green-600 hover:bg-hospital-green-700">
=======
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
>>>>>>> bdbdc045a0c8c9daccfdc0a4fe4cce85fb316bb9
                <Plus className="h-4 w-4 ml-2" />
                افزودن ترینری جدید
              </Button>
            )}
          </div>
        </header>

        {/* Search and Filters */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="جستجو ترینری..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-64"
            />
          </div>
<<<<<<< HEAD
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
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

        {/* Table */}
        <table className="min-w-full border border-slate-200 text-sm">
          <thead className="bg-slate-100 text-slate-700 font-semibold">
            <tr>
              <th className="p-2 text-center">تصویر</th>
              <th className="p-2 text-center">نام</th>
              <th className="p-2 text-center">تخلص</th>
              <th className="p-2 text-center">آیدی</th>
              <th className="p-2 text-center">دپارتمان</th>
              <th className="p-2 text-center">اضافه نمودن فرم</th>
              <th className="p-2 text-center">جزئیات</th>
              <th className="p-2 text-center">اکشن</th>
            </tr>
          </thead>
          <tbody>
            {filteredResidents.map((resident) => (
              <tr key={resident._id} className="border-b hover:bg-slate-50">
                <td className="p-2 text-center">
                  <img
                    src={
                      resident.profileImageUrl ??
                      "/assets/img/default-avatar.png"
                    }
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="p-2 text-center">{resident.fullName}</td>
                <td className="p-2 text-center">{resident.fullName}</td>
                <td className="p-2 text-center">{resident._id}</td>

                {/* ستون دپارتمان */}
                <td className="p-2 text-center">{resident.department}</td>

                {/* ستون اضافه نمودن فرم */}

                <td className="p-2 text-center relative">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() =>
                      setShowDropdownId(
                        showDropdownId === resident._id ? null : resident._id
                      )
                    }
                  >
                    <Plus className="h-3 w-3" />
                    اضافه نمودن فرم
                  </Button>

                  {showDropdownId === resident._id && (
                    <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-50 w-40">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-slate-700">
                          انتخاب فرم
                        </span>
                        <button
                          onClick={() => setShowDropdownId(null)}
                          className="text-slate-500 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                        {FORM_TYPES.map((ft) => (
                          <button
                            key={ft.type}
                            onClick={() => handleSelectForm(resident, ft)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-hospital-green-600 hover:text-white font-bold transition"
                            title={ft.name}
                          >
                            {ft.type}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </td>

                {/* جزئیات */}
                <td className="p-2 text-center">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setSelectedResident(resident._id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>

                {/* اکشن */}
                <td className="p-2 text-center">
                  <Button size="icon" variant="outline">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modals */}
        {selectedResident && (
          <ResidentDetails
            residentId={selectedResident}
            onClose={() => setSelectedResident(null)}
          />
        )}
        {selectedForm && (
          <FormModal
            form={selectedForm}
            onClose={() => setSelectedForm(null)}
          />
        )}
=======
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
>>>>>>> bdbdc045a0c8c9daccfdc0a4fe4cce85fb316bb9
      </div>
    </div>
  );
}
