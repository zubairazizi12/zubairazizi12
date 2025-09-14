import React, { useState } from "react";

interface Activity {
  id: string;
  title: string;
  percent: number;
}

interface Section {
  name: string;
  activities: Activity[];
}

const sections: Section[] = [
  {
    name: "آغاز فعالیت (10%)",
    activities: [
      { id: "uniform", title: "یونیفورم", percent: 6 },
      { id: "coworkers", title: "برخورد با همکاران", percent: 2 },
      { id: "patients", title: "برخورد با مریض", percent: 2 },
    ],
  },
  {
    name: "شیوه اخذ مشاهده (9%)",
    activities: [
      { id: "cc", title: "شهرت مریض", percent: 2 },
      { id: "pi", title: "معاینه فزیکی", percent: 2 },
      {
        id: "postHistory",
        title: "تجویز معاینات لابراتواری روتین",
        percent: 2,
      },
      { id: "diagnosis", title: "تجویز معاینات وصفی و ضمیموی", percent: 3 },
    ],
  },
  {
    name: "انجام مشوره طبی بموقع (6%)",
    activities: [{ id: "consult", title: "انجام مشوره طبی بموقع", percent: 6 }],
  },
  {
    name: "سعی در بلند بردن سطح دانش علمی و مسلکی (27%)",
    activities: [
      { id: "morning", title: "اشتراک فعال در راپو صبحانه", percent: 6 },
      { id: "visits", title: "اشتراک فعال در ویزت‌ها", percent: 6 },
      { id: "conferences", title: "اشتراک فعال در کنفرانس‌ها", percent: 12 },
      {
        id: "license",
        title: "تقویه یکی از لیسانس‌های معتبر خارجی",
        percent: 1,
      },
      { id: "computer", title: "قدرت استفاده از کمپیوتر و انترنت", percent: 1 },
      { id: "press", title: "استفاده از نشرات مطبوع", percent: 1 },
    ],
  },
  {
    name: "دسپلین (24%)",
    activities: [
      { id: "attendance", title: "حاضر بودن", percent: 6 },
      { id: "obedience", title: "اطاعت از اوامر معقول آمرمافوق", percent: 6 },
      { id: "rules", title: "مراعات مقرره و لوایح تریننگ", percent: 6 },
      { id: "duty", title: "اشتراک در نوکریوالی", percent: 6 },
    ],
  },
  {
    name: "خصوصیات فردی (24%)",
    activities: [
      { id: "expression", title: "افاده بیان", percent: 2 },
      { id: "initiative", title: "ابتکار سالم", percent: 2 },
      { id: "leadership", title: "تصمیم و رهبری", percent: 2 },
      { id: "honesty", title: "راستکاری و همکاری", percent: 2 },
      { id: "resources", title: "استفاده معقول از منابع", percent: 4 },
      { id: "responsibility", title: "مسٔولیت‌پذیری", percent: 2 },
      { id: "evaluation", title: "تحلیل و ارزیابی", percent: 2 },
      { id: "feedback", title: "انتقاد و پیشنهاد سازنده", percent: 2 },
      { id: "individual", title: "رسیدگی به وضع فردی", percent: 2 },
      { id: "social", title: "رابطه اجتماعی", percent: 2 },
      { id: "position", title: "استفاده بجا از موقف کاری", percent: 2 },
    ],
  },
];

const months = Array.from({ length: 12 }, (_, i) => i + 1);

const ChecklistForm: React.FC = () => {
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [year, setYear] = useState("");
  const [scores, setScores] = useState<Record<string, Record<number, number>>>(
    {}
  );

  const handleScoreChange = (
    activityId: string,
    month: number,
    value: number
  ) => {
    setScores((prev) => ({
      ...prev,
      [activityId]: {
        ...prev[activityId],
        [month]: value,
      },
    }));
  };

  const calculateTotal = (activity: Activity) => {
    const monthlyScores = scores[activity.id] || {};
    return Object.values(monthlyScores).reduce((sum, v) => sum + (v || 0), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = { studentName, fatherName, year, scores };
    console.log("Submitting:", dataToSave);
  };

  return (
    <>
      {/* عنوان ثابت بالا */}
      <h1 className="fixed top-0 left-0 w-full text-2xl font-bold py-4 bg-gray-100 text-center shadow z-20">
        چک لیست کاری و ارزیابی ماهوار ترینی‌ها
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto bg-gray-100 p-6 rounded-xl shadow-md mt-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="نام ترینی"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="border px-3 py-2 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="ولد"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            className="border px-3 py-2 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="سال آموزشی"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border px-3 py-2 rounded-lg"
            required
          />
        </div>

        {/* جدول‌ها */}
        <div className="overflow-auto max-h-[70vh]">
          {sections.map((section) => (
            <div key={section.name} className="mb-10 min-w-[900px]">
              <h2 className="text-lg font-semibold mb-2">{section.name}</h2>
              <table className="w-full border text-center text-sm bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">فعالیت</th>
                    <th className="p-2 border">فیصدی</th>
                    {months.map((m) => (
                      <th key={m} className="p-2 border">
                        {m}
                      </th>
                    ))}
                    <th className="p-2 border">مجموعه نمرات</th>
                  </tr>
                </thead>
                <tbody>
                  {section.activities.map((act) => (
                    <tr key={act.id}>
                      <td className="p-2 border">{act.title}</td>
                      <td className="p-2 border">{act.percent}%</td>
                      {months.map((m) => (
                        <td key={m} className="p-2 border">
                          <input
                            type="number"
                            min={0}
                            max={act.percent}
                            value={scores[act.id]?.[m] || ""}
                            onChange={(e) =>
                              handleScoreChange(
                                act.id,
                                m,
                                Number(e.target.value)
                              )
                            }
                            className="w-16 border rounded text-center"
                          />
                        </td>
                      ))}
                      <td className="p-2 border font-bold">
                        {calculateTotal(act)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ذخیره
        </button>
      </form>
    </>
  );
};

export default ChecklistForm;
