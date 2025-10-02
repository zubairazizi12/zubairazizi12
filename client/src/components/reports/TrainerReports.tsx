import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import TrainerDetails from "./TrainerDetails";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
  forms: Form[];
}

const TrainerReports: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [filtered, setFiltered] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [openDetails, setOpenDetails] = useState(false);

  // دریافت دیتا از سرور
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/trainers")
      .then((res) => {
        setTrainers(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trainers:", err);
        setLoading(false);
      });
  }, []);

  // فیلتر دیتا
  useEffect(() => {
    let result = trainers;
    if (searchName) {
      result = result.filter((t) =>
        t.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (searchDepartment) {
      result = result.filter((t) =>
        t.department.toLowerCase().includes(searchDepartment.toLowerCase())
      );
    }
    if (searchDate) {
      result = result.filter((t) => t.trainerAppointmentDate === searchDate);
    }
    if (searchStatus) {
      result = result.filter(
        (t) => t.status.toLowerCase() === searchStatus.toLowerCase()
      );
    }
    setFiltered(result);
  }, [searchName, searchDepartment, searchDate, searchStatus, trainers]);

  const handlePrintAll = () => {
    const printContent = `
      <h2>گزارشات ترینری</h2>
      <table border="1" style="border-collapse: collapse; width:100%; font-size:12px;">
        <tr>
          <th>نام</th>
          <th>تخلص</th>
          <th>دیپارتمنت</th>
          <th>تاریخ تقرر</th>
          <th>وضعیت</th>
        </tr>
        ${filtered
          .map(
            (t) => `
          <tr>
            <td>${t.name}</td>
            <td>${t.lastname}</td>
            <td>${t.department}</td>
            <td>${t.trainerAppointmentDate}</td>
            <td>${t.status}</td>
          </tr>`
          )
          .join("")}
      </table>
    `;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(printContent);
      win.document.close();
      win.print();
    }
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trainers");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "trainers-report.xlsx");
  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">گزارشات ترینری</h1>
        <div className="flex gap-2">
          <Button onClick={handlePrintAll} className="bg-blue-600 text-white">
            چاپ کل جدول
          </Button>
          <Button onClick={handleExportExcel} className="bg-green-600 text-white">
            خروجی Excel
          </Button>
        </div>
      </div>

      {/* فیلترها */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="جستجو بر اساس نام"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Input
          placeholder="جستجو بر اساس دیپارتمنت"
          value={searchDepartment}
          onChange={(e) => setSearchDepartment(e.target.value)}
        />
        <Input
          type="date"
          placeholder="تاریخ تقرر"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <Input
          placeholder="وضعیت (active/inactive)"
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        />
      </div>

      {/* جدول */}
      <Card>
        <CardContent className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">نام</th>
                <th className="border px-3 py-2">دیپارتمنت</th>
                <th className="border px-3 py-2">تاریخ تقرر</th>
                <th className="border px-3 py-2">وضعیت</th>
                <th className="border px-3 py-2">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((trainer) => (
                <tr key={trainer.id}>
                  <td className="border px-3 py-2">{trainer.name} {trainer.lastname}</td>
                  <td className="border px-3 py-2">{trainer.department}</td>
                  <td className="border px-3 py-2">
                    {new Date(trainer.trainerAppointmentDate).toLocaleDateString("fa-IR")}
                  </td>
                  <td className="border px-3 py-2">
                    <span
                      className={
                        trainer.status === "active"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {trainer.status}
                    </span>
                  </td>
                  <td className="border px-3 py-2">
                    <Button
                      onClick={() => {
                        setSelectedTrainer(trainer);
                        setOpenDetails(true);
                      }}
                      size="sm"
                      className="bg-green-600 text-white"
                    >
                      مشاهده جزئیات
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* کامپوننت جزئیات */}
      {selectedTrainer && (
        <TrainerDetails
          open={openDetails}
          onClose={() => setOpenDetails(false)}
          trainer={selectedTrainer}
        />
      )}
    </div>
  );
};

export default TrainerReports;
