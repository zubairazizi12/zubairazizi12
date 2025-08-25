import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      fatherName: defaultValues?.fatherName || "",
      grandfatherName: defaultValues?.grandfatherName || "",
      academicRank: defaultValues?.academicRank || "",
      rankAchievementDate: defaultValues?.rankAchievementDate || new Date(),
      trainerAppointmentDate: defaultValues?.trainerAppointmentDate || new Date(),
      gender: defaultValues?.gender || "",
      province: defaultValues?.province || "",
      subject: defaultValues?.subject || "",
      position: defaultValues?.position || "",
      hospital: defaultValues?.hospital || "",
      dateOfBirth: defaultValues?.dateOfBirth || new Date(),
      idNumber: defaultValues?.idNumber || "",
      dutyStartDate: defaultValues?.dutyStartDate || new Date(),
      contactInfo: defaultValues?.contactInfo || "",
      whatsappNumber: defaultValues?.whatsappNumber || "",
      emailAddress: defaultValues?.emailAddress || "",
      postCode: defaultValues?.postCode || "",
      appointmentType: defaultValues?.appointmentType || "",
      department: defaultValues?.department || "",
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

        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-4">
          <div className="grid grid-cols-2 gap-4 space-y-0">
            {/* First Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">نام</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="نام کامل را وارد کنید"
                  data-testid="input-teacher-name"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="fatherName">نام پدر</Label>
                <Input
                  id="fatherName"
                  {...form.register("fatherName")}
                  placeholder="نام پدر را وارد کنید"
                />
                {form.formState.errors.fatherName && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.fatherName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="grandfatherName">نام پدر کلان</Label>
                <Input
                  id="grandfatherName"
                  {...form.register("grandfatherName")}
                  placeholder="نام پدر کلان را وارد کنید"
                />
                {form.formState.errors.grandfatherName && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.grandfatherName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="academicRank">رتبه علمی</Label>
                <Input
                  id="academicRank"
                  {...form.register("academicRank")}
                  placeholder="رتبه علمی را وارد کنید"
                />
                {form.formState.errors.academicRank && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.academicRank.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="rankAchievementDate">تاریخ اخذ رتبه</Label>
                <Input
                  id="rankAchievementDate"
                  type="date"
                  {...form.register("rankAchievementDate", { valueAsDate: true })}
                />
                {form.formState.errors.rankAchievementDate && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.rankAchievementDate.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="trainerAppointmentDate">تاریخ تقرر به صفت ترینر</Label>
                <Input
                  id="trainerAppointmentDate"
                  type="date"
                  {...form.register("trainerAppointmentDate", { valueAsDate: true })}
                />
                {form.formState.errors.trainerAppointmentDate && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.trainerAppointmentDate.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="gender">جنسیت</Label>
                <Select onValueChange={(value) => form.setValue("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="جنسیت را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="مرد">مرد</SelectItem>
                    <SelectItem value="زن">زن</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.gender.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="province">والایت</Label>
                <Input
                  id="province"
                  {...form.register("province")}
                  placeholder="والایت را وارد کنید"
                />
                {form.formState.errors.province && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.province.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subject">رشته</Label>
                <Input
                  id="subject"
                  {...form.register("subject")}
                  placeholder="رشته تخصصی را وارد کنید"
                  data-testid="input-teacher-subject"
                />
                {form.formState.errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="position">وظیفه</Label>
                <Input
                  id="position"
                  {...form.register("position")}
                  placeholder="وظیفه را وارد کنید"
                />
                {form.formState.errors.position && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.position.message}</p>
                )}
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="hospital">شفاخانه</Label>
                <Input
                  id="hospital"
                  {...form.register("hospital")}
                  placeholder="نام شفاخانه را وارد کنید"
                />
                {form.formState.errors.hospital && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.hospital.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="dateOfBirth">تاریخ تولد</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...form.register("dateOfBirth", { valueAsDate: true })}
                />
                {form.formState.errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.dateOfBirth.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="idNumber">نمبر تذکره</Label>
                <Input
                  id="idNumber"
                  {...form.register("idNumber")}
                  placeholder="نمبر تذکره را وارد کنید"
                />
                {form.formState.errors.idNumber && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.idNumber.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="dutyStartDate">تاریخ اغاز وظیفه</Label>
                <Input
                  id="dutyStartDate"
                  type="date"
                  {...form.register("dutyStartDate", { valueAsDate: true })}
                />
                {form.formState.errors.dutyStartDate && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.dutyStartDate.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactInfo">شماره تماس</Label>
                <Input
                  id="contactInfo"
                  {...form.register("contactInfo")}
                  placeholder="شماره تماس را وارد کنید"
                  data-testid="input-teacher-contact"
                />
                {form.formState.errors.contactInfo && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.contactInfo.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="whatsappNumber">شماره واتس اپ</Label>
                <Input
                  id="whatsappNumber"
                  {...form.register("whatsappNumber")}
                  placeholder="شماره واتس اپ را وارد کنید"
                />
                {form.formState.errors.whatsappNumber && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.whatsappNumber.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="emailAddress">ایمیل ادرس</Label>
                <Input
                  id="emailAddress"
                  type="email"
                  {...form.register("emailAddress")}
                  placeholder="ایمیل ادرس را وارد کنید"
                />
                {form.formState.errors.emailAddress && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.emailAddress.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="postCode">شماره وکد بست</Label>
                <Input
                  id="postCode"
                  {...form.register("postCode")}
                  placeholder="شماره وکد بست را وارد کنید"
                />
                {form.formState.errors.postCode && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.postCode.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="appointmentType">نوع تقرری</Label>
                <Input
                  id="appointmentType"
                  {...form.register("appointmentType")}
                  placeholder="نوع تقرری را وارد کنید"
                />
                {form.formState.errors.appointmentType && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.appointmentType.message}</p>
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
            </div>
          </div>

          {/* Additional fields that span both columns */}
          <div className="grid grid-cols-2 gap-4 mt-4">
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

            <div>
              <Label htmlFor="status">وضعیت فعلی</Label>
              <Select onValueChange={(value) => form.setValue("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="وضعیت فعلی را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">فعال</SelectItem>
                  <SelectItem value="inactive">غیر فعال</SelectItem>
                  <SelectItem value="suspended">تعلیق</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.status && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.status.message}</p>
              )}
            </div>
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