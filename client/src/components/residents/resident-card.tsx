
// import React from "react";
// import type { Resident } from "@shared/schema";
// import { FileText, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface ResidentCardProps {
//   resident: Resident;
//   onClick?: () => void;
//   onActionClick?: () => void;
// }

// export default function ResidentCard({
//   resident,
//   onClick,
//   onActionClick,
// }: ResidentCardProps) {
//   const formsCompleted = 1;
//   const formsTotal = 9;

//   return (
//     <div className="group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
//       {/* بدنه بالای کارت: عکس سمت چپ و نام سمت راست */}
//       <div className="p-4 flex items-center gap-4">
//         {/* عکس بزرگتر */}
//         <div className="w-28 h-28 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
//           <img
//             src={resident.profileImageUrl ?? "/assets/img/default-avatar.png"}
//             alt={resident.fullName}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         {/* نام و بخش */}
//         <div className="flex flex-col text-left">
//           <h3 className="text-lg font-semibold text-slate-900">
//             {resident.fullName}
//           </h3>
//             <button
//     type="button"
//     className="mt-1 inline-block text-xs text-white bg-hospital-green-600 px-3 py-1 rounded-full hover:bg-hospital-green-700 transition-colors"
//   >
//     {resident.department}
//   </button>
//         </div>
//       </div>

//       {/* بخش میانی: تعداد فرم‌ها و اضافه فرم */}
//       <div className="px-4 pb-4 flex items-center justify-between">
//         <div className="text-slate-600 text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-slate-300 group-hover:bg-hospital-green-600 group-hover:text-white transition-colors">
//           <FileText className="w-3 h-3" />
//           {formsCompleted}/{formsTotal}
//         </div>
//         <Button
//           size="sm"
//           variant="outline"
//           className="text-xs flex items-center gap-1 border-slate-300 hover:bg-hospital-green-600 hover:text-white transition-colors"
//         >
//           <Plus className="h-3 w-3" />
//           اضافه فرم
//         </Button>
//       </div>

//       {/* پایین کارت: دو دکمه کنارهم */}
//       <div className="px-4 pb-4 flex gap-2">
//         <Button
//           variant="outline"
//           className="flex-1 border-slate-300 hover:bg-hospital-green-600 hover:text-white transition-colors"
//           onClick={onClick}
//         >
//           مشاهده جزئیات
//         </Button>
//         <Button
//           variant="outline"
//           className="flex-1 border-slate-300 hover:bg-hospital-green-600 hover:text-white transition-colors"
//           onClick={onActionClick}
//         >
//           اکشن
//         </Button>
//       </div>
//     </div>
//   );
// }
/////////
import React, { useState } from "react";
import type { Resident, Form } from "@shared/schema";
import { FileText, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/forms/form-modal";

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

interface ResidentCardProps {
  resident: Resident;
  onClick?: () => void;
}

export default function ResidentCard({ resident, onClick }: ResidentCardProps) {
  const formsCompleted = 1;
  const formsTotal = FORM_TYPES.length;

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);

  const handleSelectForm = (ft: { type: string; name: string }) => {
    setSelectedForm({
      _id: `new-${ft.type}`,
      formType: ft.type,
      status: "pending",
      createdAt: new Date().toISOString(),
      completedAt: null,
      residentId: resident._id,
    });
    setShowDropdown(false);
  };

  return (
    <div className="relative group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition overflow-visible">
      {/* بخش بالای کارت */}
      <div className="p-4 flex items-center gap-4">
        <div className="w-28 h-28 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
          <img
            src={resident.profileImageUrl ?? "/assets/img/default-avatar.png"}
            alt={resident.fullName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col text-left">
          <h3 className="text-lg font-semibold text-slate-900">{resident.fullName}</h3>
          <button
            type="button"
            className="mt-1 inline-block text-xs text-white bg-hospital-green-600 px-3 py-1 rounded-full hover:bg-hospital-green-700 transition-colors"
          >
            {resident.department}
          </button>
        </div>
      </div>

      {/* بخش میانی */}
      <div className="px-4 pb-4 flex items-center justify-between relative">
        <div className="text-slate-600 text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-slate-300 group-hover:bg-hospital-green-600 group-hover:text-white transition-colors">
          <FileText className="w-3 h-3" />
          {formsCompleted}/{formsTotal}
        </div>

        {/* دکمه اضافه فرم و dropdown عمودی */}
        <div className="relative">
          <Button
            size="sm"
            variant="outline"
            className="text-xs flex items-center gap-1 border-slate-300 hover:bg-hospital-green-600 hover:text-white transition-colors"
            onClick={() => setShowDropdown((p) => !p)}
          >
            <Plus className="h-3 w-3" />
            اضافه فرم
          </Button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-50 w-40">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700">انتخاب فرم</span>
                <button
                  onClick={() => setShowDropdown(false)}
                  className="text-slate-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                {FORM_TYPES.map((ft) => (
                  <button
                    key={ft.type}
                    onClick={() => handleSelectForm(ft)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-hospital-green-600 hover:text-white font-bold transition"
                    title={ft.name} // نام فرم روی hover نمایش داده می‌شود
                  >
                    {ft.type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* پایین کارت */}
      <div className="px-4 pb-4 flex gap-2">
        <Button
          variant="outline"
          className="flex-1 border-slate-300 hover:bg-hospital-green-600 hover:text-white transition-colors"
          onClick={onClick}
        >
          مشاهده جزئیات
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-slate-300 hover:bg-hospital-green-600 hover:text-white transition-colors"
        >
          اکشن
        </Button>
      </div>

      {/* Modal واقعی فقط با FormModal */}
      {selectedForm && (
        <FormModal
          form={selectedForm}
          onClose={() => setSelectedForm(null)}
        />
      )}
    </div>
  );
}



