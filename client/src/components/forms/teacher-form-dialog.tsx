import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InsertTeacher, insertTeacherSchema } from "@shared/schema";

interface TeacherFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InsertTeacher) => void;
  title: string;
  defaultValues?: Partial<InsertTeacher>;
  isSubmitting: boolean;
}

export default function TeacherFormDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  defaultValues,
  isSubmitting
}: TeacherFormDialogProps) {
  const form = useForm<InsertTeacher>({
    resolver: zodResolver(insertTeacherSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      department: defaultValues?.department || "",
      subject: defaultValues?.subject || "",
      contactInfo: defaultValues?.contactInfo || "",
      experience: defaultValues?.experience || 0,
      status: defaultValues?.status || "active",
      profileImageUrl: defaultValues?.profileImageUrl || "",
    },
  });

  const handleSubmit = (data: InsertTeacher) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent data-testid="dialog-teacher-form">
        <DialogHeader>
          <DialogTitle data-testid="text-teacher-form-title">{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">نام معلم</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="نام کامل معلم را وارد کنید"
              data-testid="input-teacher-name"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="department">بخش</Label>
            <Input
              id="department"
              {...form.register("department")}
              placeholder="بخش مربوطه را وارد کنید"
              data-testid="input-teacher-department"
            />
            {form.formState.errors.department && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.department.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="subject">موضوع تدریس</Label>
            <Input
              id="subject"
              {...form.register("subject")}
              placeholder="موضوع اصلی تدریس را وارد کنید"
              data-testid="input-teacher-subject"
            />
            {form.formState.errors.subject && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contactInfo">اطلاعات تماس</Label>
            <Input
              id="contactInfo"
              {...form.register("contactInfo")}
              placeholder="شماره تلفن یا ایمیل"
              data-testid="input-teacher-contact"
            />
            {form.formState.errors.contactInfo && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.contactInfo.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="experience">سال‌های تجربه</Label>
            <Input
              id="experience"
              type="number"
              {...form.register("experience", { valueAsNumber: true })}
              placeholder="تعداد سال‌های تجربه"
              data-testid="input-teacher-experience"
            />
            {form.formState.errors.experience && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.experience.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-slate-200 mt-6 space-x-3 rtl:space-x-reverse">
            <Button variant="outline" type="button" onClick={onClose} data-testid="button-cancel-teacher-form">
              لغو
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-hospital-green-600 hover:bg-hospital-green-700"
              data-testid="button-submit-teacher-form"
            >
              {isSubmitting ? 'در حال ذخیره...' : 'ذخیره'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}