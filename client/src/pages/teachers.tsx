import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import TeacherTable from "@/components/teachers/teacher-table";
import TeacherFormDialog from "@/components/forms/teacher-form-dialog";
import { Teacher, InsertTeacher, insertTeacherSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import Sidebar from "@/components/layout/sidebar";

export default function Teachers() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const { data: teachers = [], isLoading, error } = useQuery<Teacher[]>({
    queryKey: ['/api/teachers'],
  });

  const createTeacherMutation = useMutation({
    mutationFn: async (teacherData: InsertTeacher) => {
      const response = await apiRequest('/api/teachers', {
        method: 'POST',
        body: JSON.stringify(teacherData),
        headers: { 'Content-Type': 'application/json' }
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/teachers'] });
      setIsAddDialogOpen(false);
      toast({
        title: "موفقیت",
        description: "معلم با موفقیت اضافه شد",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطا",
        description: error.message || "خطا در افزودن معلم",
        variant: "destructive",
      });
    },
  });

  const updateTeacherMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertTeacher> }) => {
      const response = await apiRequest(`/api/teachers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/teachers'] });
      setEditingTeacher(null);
      toast({
        title: "موفقیت",
        description: "معلم با موفقیت بروزرسانی شد",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطا",
        description: error.message || "خطا در بروزرسانی معلم",
        variant: "destructive",
      });
    },
  });

  const deleteTeacherMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest(`/api/teachers/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/teachers'] });
      toast({
        title: "موفقیت",
        description: "معلم با موفقیت حذف شد",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطا",
        description: error.message || "خطا در حذف معلم",
        variant: "destructive",
      });
    },
  });

  const filteredTeachers = teachers.filter((teacher: Teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (teacher: Teacher) => {
    // Open teacher details modal
    console.log("View teacher details:", teacher);
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (teacherId: string) => {
    if (window.confirm("آیا از حذف این معلم اطمینان دارید؟")) {
      deleteTeacherMutation.mutate(teacherId);
    }
  };

  const handleSubmit = (data: InsertTeacher) => {
    if (editingTeacher) {
      updateTeacherMutation.mutate({ id: editingTeacher._id, data });
    } else {
      createTeacherMutation.mutate(data);
    }
  };


  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Sidebar />
        <div className="mr-64 p-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-red-600">خطا در بارگذاری اطلاعات معلم‌ها</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="mr-64 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="heading-teachers">
            مدیریت معلم‌ها
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            مدیریت اطلاعات معلم‌ها و هیئت علمی
          </p>
        </div>
        <Button 
          onClick={() => {
            setEditingTeacher(null);
            setIsAddDialogOpen(true);
          }}
          data-testid="button-add-teacher"
        >
          <Plus className="h-4 w-4 mr-2" />
          افزودن معلم جدید
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>لیست معلم‌ها</CardTitle>
          <CardDescription>
            مجموع {filteredTeachers.length} معلم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="جستجو بر اساس نام، بخش یا موضوع تدریس..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-teachers"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hospital-green-500"></div>
            </div>
          ) : filteredTeachers.length > 0 ? (
            <TeacherTable
              teachers={filteredTeachers}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center py-8 text-slate-500">
              {searchTerm ? "هیچ معلمی با این مشخصات یافت نشد" : "هنوز معلمی اضافه نشده است"}
            </div>
          )}
        </CardContent>
      </Card>

      <TeacherFormDialog
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          setEditingTeacher(null);
        }}
        onSubmit={handleSubmit}
        title={editingTeacher ? "ویرایش معلم" : "افزودن معلم جدید"}
        defaultValues={editingTeacher || undefined}
        isSubmitting={createTeacherMutation.isPending || updateTeacherMutation.isPending}
      />
      </div>
    </div>
  );
}