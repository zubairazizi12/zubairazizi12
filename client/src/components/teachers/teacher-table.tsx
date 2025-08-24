import { Teacher } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Edit, Trash2 } from "lucide-react";

interface TeacherTableProps {
  teachers: Teacher[];
  onViewDetails: (teacher: Teacher) => void;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacherId: string) => void;
}

export default function TeacherTable({ teachers, onViewDetails, onEdit, onDelete }: TeacherTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'فعال';
      case 'inactive':
        return 'غیرفعال';
      default:
        return status;
    }
  };

  return (
    <div className="grid gap-4">
      {teachers.map((teacher) => (
        <Card key={teacher._id} className="p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={teacher.profileImageUrl || ''} alt={teacher.name} />
                  <AvatarFallback className="bg-hospital-green-100 text-hospital-green-600">
                    {teacher.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100" data-testid={`text-teacher-name-${teacher._id}`}>
                    {teacher.name}
                  </h3>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Badge variant="secondary" className="text-xs">
                      {teacher.department}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {teacher.subject}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(teacher.status)}`}>
                      {getStatusText(teacher.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <div>تجربه: {teacher.experience} سال</div>
                    <div>تماس: {teacher.contactInfo}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(teacher)}
                  data-testid={`button-view-teacher-${teacher._id}`}
                >
                  <Eye className="h-4 w-4 ml-2" />
                  مشاهده
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(teacher)}
                  data-testid={`button-edit-teacher-${teacher._id}`}
                >
                  <Edit className="h-4 w-4 ml-2" />
                  ویرایش
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(teacher._id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  data-testid={`button-delete-teacher-${teacher._id}`}
                >
                  <Trash2 className="h-4 w-4 ml-2" />
                  حذف
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}