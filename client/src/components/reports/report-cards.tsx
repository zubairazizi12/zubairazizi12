import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, ChevronLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import TeachersReport from "./TeacherReportTable"; 
import FormsReport from "./TrainerFormsReport"; 
import TrainerReports from "./TrainerReports"; // 👉 اینو اضافه کن

const reports = [
  {
    title: "گزارشات ترینری",
    icon: Users,
    color: "bg-hospital-green-100 text-hospital-green-600",
    buttonColor: "bg-hospital-green-600 hover:bg-hospital-green-700",
  },
  // {
  //   title: "گزارشات فورم ها",
  //   icon: FileText,
  //   color: "bg-blue-100 text-blue-600",
  //   buttonColor: "bg-blue-600 hover:bg-blue-700",
  // },
  {
    title: "گزارشات استادان",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
];

export default function ReportCards() {
  const [showTeachersReport, setShowTeachersReport] = useState(false);
  const [showFormsReport, setShowFormsReport] = useState(false);
  const [showTrainerReport, setShowTrainerReport] = useState(false); // 👉 استیت جدید

  // گرفتن لیست استادان از API
  const { data: teachers = [], isLoading, error } = useQuery({
    queryKey: ["/api/teachers"],
    queryFn: async () => {
      const res = await apiRequest("/api/teachers");
      return res.json();
    },
  });

  const handleGenerateReport = (reportType: string) => {
    if (reportType === "گزارشات استادان") {
      setShowTeachersReport(true);
      setShowFormsReport(false);
      setShowTrainerReport(false);
    } 
    // else if (reportType === "گزارشات فورم ها") {
    //   setShowFormsReport(true);
    //   setShowTeachersReport(false);
    //   setShowTrainerReport(false);
    // } 
    else if (reportType === "گزارشات ترینری") {
      setShowTrainerReport(true);
      setShowTeachersReport(false);
      setShowFormsReport(false);
    } else {
      setShowTeachersReport(false);
      setShowFormsReport(false);
      setShowTrainerReport(false);
    }
  };

  return (
    <div>
      {/* کارت‌ها فقط وقتی هیچ گزارش دیگری نمایش داده نمی‌شود */}
      {!showTeachersReport && !showFormsReport && !showTrainerReport && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg ${report.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-900">{report.title}</h3>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleGenerateReport(report.title)}
                    className={`w-full text-white ${report.buttonColor}`}
                  >
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* نمایش جدول استادان */}
      {showTeachersReport && (
        <div className="mt-6">
          <div className="mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTeachersReport(false)}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              بازگشت به گزارشات
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hospital-green-500"></div>
            </div>
          ) : error ? (
            <p className="text-red-600">خطا در بارگذاری اطلاعات استادان</p>
          ) : (
            <TeachersReport teachers={teachers} />
          )}
        </div>
      )}

      {/* نمایش گزارش فورم‌ها */}
      {showFormsReport && (
        <div className="mt-6">
          <div className="mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFormsReport(false)}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              بازگشت به گزارشات
            </Button>
          </div>

          <FormsReport />
        </div>
      )}

      {/* نمایش گزارش ترینری */}
      {showTrainerReport && (
        <div className="mt-6">
          <div className="mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTrainerReport(false)}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              بازگشت به گزارشات
            </Button>
          </div>

          <TrainerReports /> {/* 👉 همون کامپوننتی که ساختیم */}
        </div>
      )}
    </div>
  );
}
