import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Form {
  id: number;
  title: string;
  content: string;
}

interface Trainer {
  id: number;
  name: string;
  lastname: string;
  fatherName: string;
  grandfatherName: string;
  academicRank: string;
  rankAchievementDate: string;
  trainerAppointmentDate: string;
  position: string;
  department: string;
  subject: string;
  hospital: string;
  dateOfBirth: string;
  dutyStartDate: string;
  contactInfo: string;
  whatsappNumber: string;
  emailAddress: string;
  postCode: string;
  appointmentType: string;
  experience: string;
  status: string;
  forms?: Form[]; // اینجا forms اختیاری شد
}

interface Props {
  open: boolean;
  onClose: () => void;
  trainer: Trainer | null;
}

const TrainerDetails: React.FC<Props> = ({ open, onClose, trainer }) => {
  const [activeForm, setActiveForm] = React.useState<Form | null>(null);

  if (!trainer) return null;

  const forms = trainer.forms || []; // اگر forms undefined باشد، آرایه خالی می‌شود

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            جزئیات ترینر: {trainer.name} {trainer.lastname}
          </DialogTitle>
        </DialogHeader>

        {/* مشخصات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
          <p><b>نام:</b> {trainer.name}</p>
          <p><b>تخلص:</b> {trainer.lastname}</p>
          <p><b>نام پدر:</b> {trainer.fatherName}</p>
          <p><b>نام پدرکلان:</b> {trainer.grandfatherName}</p>
          <p><b>رتبه علمی:</b> {trainer.academicRank}</p>
          <p><b>تاریخ کسب رتبه:</b> {trainer.rankAchievementDate}</p>
          <p><b>تاریخ تقرر:</b> {trainer.trainerAppointmentDate}</p>
          <p><b>وظیفه:</b> {trainer.position}</p>
          <p><b>دیپارتمنت:</b> {trainer.department}</p>
          <p><b>مضمون:</b> {trainer.subject}</p>
          <p><b>شفاخانه:</b> {trainer.hospital}</p>
          <p><b>تاریخ تولد:</b> {trainer.dateOfBirth}</p>
          <p><b>شروع وظیفه:</b> {trainer.dutyStartDate}</p>
          <p><b>تماس:</b> {trainer.contactInfo}</p>
          <p><b>واتساپ:</b> {trainer.whatsappNumber}</p>
          <p><b>ایمیل:</b> {trainer.emailAddress}</p>
          <p><b>کود پستی:</b> {trainer.postCode}</p>
          <p><b>نوع تقرر:</b> {trainer.appointmentType}</p>
          <p><b>تجربه:</b> {trainer.experience}</p>
          <p><b>وضعیت:</b> {trainer.status}</p>
        </div>

        {/* دکمه‌های دایروی */}
        <div className="flex gap-2 mt-6 flex-wrap">
          {[...Array(9)].map((_, i) => {
            const form = forms.find((f) => f.id === i + 1) || null;
            return (
              <Button
                key={i}
                size="sm"
                className={`rounded-full w-10 h-10 ${
                  form ? "bg-green-600 text-white" : "bg-gray-300"
                }`}
                disabled={!form}
                onClick={() => form && setActiveForm(form)}
              >
                {i + 1}
              </Button>
            );
          })}
        </div>

        {/* فورم انتخاب شده */}
        {activeForm && (
          <div className="mt-4 p-4 border rounded-lg bg-white">
            <h3 className="font-bold mb-2">{activeForm.title}</h3>
            <p>{activeForm.content}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TrainerDetails;
