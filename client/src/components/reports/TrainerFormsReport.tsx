// FormsReport.tsx
import React, { useEffect, useState } from "react";

interface Trainer {
  id: number;
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
}

export default function FormsReport() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    // اینجا داده‌ها را از API می‌گیری
    fetch("/api/trainers")
      .then((res) => res.json())
      .then((data) => setTrainers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">گزارش ترینرها</h2>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">نام</th>
            <th className="border px-2 py-1">تخلص</th>
            <th className="border px-2 py-1">نوع والد</th>
            <th className="border px-2 py-1">نام والد</th>
            <th className="border px-2 py-1">جنسیت</th>
            <th className="border px-2 py-1">ولایت</th>
            <th className="border px-2 py-1">دیپارتمنت</th>
            <th className="border px-2 py-1">تخصص</th>
            <th className="border px-2 py-1">شفاخانه</th>
            <th className="border px-2 py-1">تاریخ شامل شدن</th>
            <th className="border px-2 py-1">سال آموزش</th>
            <th className="border px-2 py-1">سوپروایزر</th>
            <th className="border px-2 py-1">تاریخ تولد</th>
            <th className="border px-2 py-1">نمبر تذکره</th>
            <th className="border px-2 py-1">شماره تماس</th>
            <th className="border px-2 py-1">واتساپ</th>
            <th className="border px-2 py-1">ایمیل</th>
            <th className="border px-2 py-1">پوست و کود</th>
            <th className="border px-2 py-1">نوع تقرر</th>
            <th className="border px-2 py-1">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{t.id}</td>
              <td className="border px-2 py-1">{t.name}</td>
              <td className="border px-2 py-1">{t.lastName}</td>
              <td className="border px-2 py-1">{t.parentType}</td>
              <td className="border px-2 py-1">{t.parentName}</td>
              <td className="border px-2 py-1">{t.gender}</td>
              <td className="border px-2 py-1">{t.province}</td>
              <td className="border px-2 py-1">{t.department}</td>
              <td className="border px-2 py-1">{t.specialty}</td>
              <td className="border px-2 py-1">{t.hospital}</td>
              <td className="border px-2 py-1">{t.joiningDate}</td>
              <td className="border px-2 py-1">{t.trainingYear}</td>
              <td className="border px-2 py-1">{t.supervisorName}</td>
              <td className="border px-2 py-1">{t.birthDate}</td>
              <td className="border px-2 py-1">{t.idNumber}</td>
              <td className="border px-2 py-1">{t.phoneNumber}</td>
              <td className="border px-2 py-1">{t.whatsappNumber}</td>
              <td className="border px-2 py-1">{t.email}</td>
              <td className="border px-2 py-1">{t.postNumberAndCode}</td>
              <td className="border px-2 py-1">{t.appointmentType}</td>
              <td className="border px-2 py-1">{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
