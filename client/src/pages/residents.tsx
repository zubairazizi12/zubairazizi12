import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import TrainerRegistrationForm from "@/components/forms/TrainerRegistrationForm";
import TrainerDetails from "@/components/residents/resident-details";
import TrainerDetailsModal from "@/components/residents/ResidentDetailsModal";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Eye, MoreHorizontal, Plus, X } from "lucide-react";
import FormModal from "@/components/forms/form-modal";
import Sidebar from "@/components/layout/sidebar";
import { useAuth } from "@/hooks/useAuth";

type Trainer = {
  _id: string;
  id: string;
  name: string;
  lastName: string;
  parentType: string;
  parentName: string;
  gender: string;
  province: string;
  department: string;
  specialty: string;
  hospital: string;
  joiningDate: string;
  trainingYear: string;
  supervisorName: string;
  birthDate: string;
  idNumber: string;
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
  postNumberAndCode: string;
  appointmentType: string;
  status: string;
  profileImageUrl?: string;
};

type FormType = { type: string; name: string };

const FORM_TYPES: FormType[] = [
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

export default function TrainersPage() {
  const { user } = useAuth();
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<any | null>(null);
  const [showDropdownId, setShowDropdownId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: trainers = [], isLoading } = useQuery<Trainer[]>({
    queryKey: ["/api/trainers"],
    queryFn: async () => {
      const res = await fetch("/api/trainers");
      return res.json();
    },
  });

  const filteredTrainers = trainers.filter((trainer) => {
    const fullName = `${trainer.name} ${trainer.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      trainer.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || trainer.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(trainers.map((t) => t.department)));

  const handleSelectForm = (trainer: Trainer, ft: FormType) => {
    setSelectedForm({
      _id: `new-${ft.type}`,
      formType: ft.type,
      status: "pending",
      createdAt: new Date().toISOString(),
      completedAt: null,
      trainerId: trainer._id,
    });
    setShowDropdownId(null);
  };

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
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-900">
              مدیریت ترینرها
            </h1>
            {user?.role === "admin" && (
              <>
                <Button
                  className="bg-hospital-green-600 hover:bg-hospital-green-700"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="h-4 w-4 ml-2" />
                  افزودن ترینر جدید
                </Button>

                {showForm && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                      <button
                        onClick={() => setShowForm(false)}
                        className="absolute top-3 right-3 text-slate-500 hover:text-slate-900"
                      >
                        ✕
                      </button>

                      <TrainerRegistrationForm
                        onClose={() => setShowForm(false)}
                      />
                    </div>
                  </div>
                )}
              </>
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
            {filteredTrainers.map((trainer) => (
              <tr key={trainer._id} className="border-b hover:bg-slate-50">
                <td className="p-2 text-center">
                  <img
                    src={
                      trainer.profileImageUrl ??
                      "/assets/img/default-avatar.png"
                    }
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="p-2 text-center">{trainer.name}</td>
                <td className="p-2 text-center">{trainer.lastName}</td>
                <td className="p-2 text-center">{trainer.id}</td>
                <td className="p-2 text-center">{trainer.department}</td>

                {/* اضافه کردن فرم */}
                <td className="p-2 text-center relative">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() =>
                      setShowDropdownId(
                        showDropdownId === trainer._id ? null : trainer._id
                      )
                    }
                  >
                    <Plus className="h-3 w-3" />
                    اضافه نمودن فرم
                  </Button>

                  {showDropdownId === trainer._id && (
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
                            onClick={() => handleSelectForm(trainer, ft)}
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
                {/* جزئیات */}
                <td className="p-2 text-center">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setSelectedTrainer(trainer._id); // یا resident._id
                      setIsModalOpen(true);
                    }}
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
        {selectedTrainer && (
          <TrainerDetailsModal
            trainerId={selectedTrainer}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedTrainer(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
