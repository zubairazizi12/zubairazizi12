
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { Resident } from "@shared/schema";

// لیست فرم‌ها
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

interface ResidentDetailsProps {
  residentId: string;
  onClose: () => void;
}

export default function ResidentDetails({ residentId, onClose }: ResidentDetailsProps) {
  const { user } = useAuth();

  const { data: resident } = useQuery<Resident>({
    queryKey: ["/api/residents", residentId],
  });

  if (!resident) return null;

  return (
    <div className="relative bg-white rounded-lg shadow-lg border border-slate-200 p-6">
      {/* Close button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Top row: Photo + Form Buttons + Placeholder for Actions */}
      <div className="flex items-center justify-between mb-4 w-full">
        {/* Left: Resident photo */}
        <div className="flex-shrink-0 w-24 h-24 rounded-full border border-slate-300 overflow-hidden">
          {resident.profileImageUrl ? (
            <img
              src={resident.profileImageUrl}
              alt={resident.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500">
              عکس
            </div>
          )}
        </div>

        {/* Center: Form Buttons */}
        <div className="flex-1 flex justify-center space-x-4 overflow-x-auto mx-4">
          {FORM_TYPES.map((ft) => (
            <Button
              key={ft.type}
              className="w-16 h-16 rounded-full flex items-center justify-center text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              title={ft.name} // نام فرم روی hover نشان داده می‌شود
            >
              {ft.type}
            </Button>
          ))}
        </div>

        {/* Right: Placeholder for Actions */}
        <div className="flex-shrink-0">
          <Button
            size="sm"
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Disciplinary Actions
          </Button>
        </div>
      </div>

      {/* Resident Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 pt-4 mt-4">
        <div>
          <h4 className="font-medium text-slate-900 mb-2">Personal Information</h4>
          <ul className="text-sm text-slate-700 space-y-1">
            <li><strong>Full Name:</strong> {resident.fullName}</li>
            <li><strong>Age:</strong> {resident.age}</li>
            <li><strong>Gender:</strong> {resident.gender}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-slate-900 mb-2">Training Information</h4>
          <ul className="text-sm text-slate-700 space-y-1">
            <li><strong>Department:</strong> {resident.department}</li>
            <li><strong>Start Date:</strong> {new Date(resident.startDate).toLocaleDateString()}</li>
            {resident.endDate && (
              <li><strong>Expected End Date:</strong> {new Date(resident.endDate).toLocaleDateString()}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}



