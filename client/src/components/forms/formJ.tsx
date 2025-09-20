import React, { useState } from "react";

const teacherActivities = {
  basics: ["Uniform", "Salam", "Introduction", "Patient add"],
  history: [
    "CC",
    "PI",
    "POST HISTORY",
    "PERS HISTORY",
    "SE STATE",
    "DRUG HISTORY",
  ],
  review: ["Head & Neck", "RS", "CVS", "GIS", "UGS", "CNS", "ENT"],
  physicalExam: [
    "Head & Neck",
    "RS",
    "CVS",
    "GIS",
    "UGS",
    "Local status",
    "Extremities",
  ],
  result: ["Impression", "Action plan", "Drug order"],
  procedure: [
    "IP",
    "Mask, hat, gloves",
    "Surgical instrument handling",
    "Kind of procedure",
  ],
};

const TeacherActivityForm: React.FC = () => {
  const [teacherName, setTeacherName] = useState("");
  const [formData, setFormData] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (label: string) => {
    setFormData((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      teacherName,
      activities: formData,
    };
    console.log("Submitting:", dataToSave);

    // اینجا می‌تونید درخواست ارسال به API بزنید
    // fetch("/api/save", { method: "POST", body: JSON.stringify(dataToSave) })
  };

  const renderSection = (title: string, items: string[]) => (
    <div className="mb-6 border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData[item] || false}
              onChange={() => handleCheckboxChange(item)}
              className="w-4 h-4"
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md max-h-[80vh] overflow-y-auto"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">
        چک لیست امتحان عملی و نظری ترینی های شفاخانه نور
      </h1>

      <div className="mb-6">
        <label className="block mb-2 font-medium">نام استاد:</label>
        <input
          type="text"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
      </div>

      {renderSection("Basic Activities", teacherActivities.basics)}
      {renderSection("History Taking", teacherActivities.history)}
      {renderSection("Review of Systems", teacherActivities.review)}
      {renderSection("Physical Examination", teacherActivities.physicalExam)}
      {renderSection("Results", teacherActivities.result)}
      {renderSection("Procedures", teacherActivities.procedure)}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ذخیره
      </button>
    </form>
  );
};

export default TeacherActivityForm;
