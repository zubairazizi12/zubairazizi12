import React, { useState } from "react";

export default function EvaluationFormHStyled() {
  const [yearInput, setYearInput] = useState("");
  const [residentName, setResidentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [department, setDepartment] = useState("");
  const [trainingYear, setTrainingYear] = useState("سال اول");

  const [totalScore, setTotalScore] = useState<number | "">("");
  const [averageScore, setAverageScore] = useState<number | "">("");

  const [instructorName, setInstructorName] = useState("");
  const [instructorSigned, setInstructorSigned] = useState(false);
  const [shiftDepartment, setShiftDepartment] = useState("");
  const [programDirector, setProgramDirector] = useState("");
  const [presidentSigned, setPresidentSigned] = useState(false);

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      
      {/* بالای فرم */}
      <div className="text-center mb-2">
        <div className="mt-1 font-semibold">وزارت صحت عامه</div>
        <div className="font-semibold">معینیت اداری</div>
        <div className="font-semibold">ریاست اکمال تخصص</div>
      </div>
      <hr className="border-t-2 border-gray-300 my-3"/>
      <div className="text-center font-semibold mb-4">
        فرم مخصوص درج نمرات سال‌های دوران ترینینگ - شفاخانه ملی و تخصص چشم نور
      </div>

      {/* اطلاعات اولیه و سال ترینی در سطر سه‌تایی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">سال</label>
          <input
            type="text"
            placeholder="سال"
            value={yearInput}
            onChange={(e) => setYearInput(e.target.value)}
            className="border rounded px-2 py-2 text-center w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">نام دستیار</label>
          <input
            type="text"
            placeholder="نام دستیار"
            value={residentName}
            onChange={(e) => setResidentName(e.target.value)}
            className="border rounded px-2 py-2 text-center w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">نام پدر</label>
          <input
            type="text"
            placeholder="نام پدر"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            className="border rounded px-2 py-2 text-center w-full"
          />
        </div>
      </div>

      {/* سطر بعدی سه‌تایی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">دپارتمان</label>
          <input
            type="text"
            placeholder="دپارتمان"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border rounded px-2 py-2 text-center w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">سال ترینی</label>
          <select
            value={trainingYear}
            onChange={(e) => setTrainingYear(e.target.value)}
            className="border rounded px-2 py-2 text-center w-full"
          >
            <option>سال اول</option>
            <option>سال دوم</option>
            <option>سال سوم</option>
            <option>سال چهارم</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">مجموع نمرات</label>
          <input
            type="number"
            placeholder="مجموع نمرات"
            value={totalScore}
            onChange={(e) => setTotalScore(Number(e.target.value))}
            className="border rounded px-2 py-2 text-center w-full"
          />
        </div>
      </div>

      {/* سطر بعدی سه‌تایی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">اوسط نمرات</label>
          <input
            type="number"
            placeholder="اوسط نمرات"
            value={averageScore}
            onChange={(e) => setAverageScore(Number(e.target.value))}
            className="border rounded px-2 py-2 text-center w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">نام استاد</label>
          <input
            type="text"
            placeholder="نام استاد"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
            className="border rounded px-2 py-2 text-center w-full"
          />
        </div>
        <div className="flex items-center justify-center">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={instructorSigned} onChange={(e) => setInstructorSigned(e.target.checked)} />
            امضای استاد
          </label>
        </div>
      </div>

      {/* سطر بعدی سه‌تایی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">شیفت دپارتمان</label>
          <input
            type="text"
            placeholder="شیفت دپارتمان"
            value={shiftDepartment}
            onChange={(e) => setShiftDepartment(e.target.value)}
            className="border rounded px-2 py-2 text-center w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">آمر برنامه آموزشی</label>
          <input
            type="text"
            placeholder="آمر برنامه آموزشی"
            value={programDirector}
            onChange={(e) => setProgramDirector(e.target.value)}
            className="border rounded px-2 py-2 text-center w-full"
          />
        </div>
        <div className="flex items-center justify-center">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={presidentSigned} onChange={(e) => setPresidentSigned(e.target.checked)} />
            مهر و امضای ریاست
          </label>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => alert("اطلاعات ذخیره شد")}
          className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          ذخیره فرم
        </button>
      </div>
    </div>
  );
}
