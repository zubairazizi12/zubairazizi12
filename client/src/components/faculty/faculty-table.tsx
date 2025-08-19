import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { Faculty } from "@shared/schema";

interface FacultyTableProps {
  faculty: Faculty[];
}

export default function FacultyTable({ faculty }: FacultyTableProps) {
  const { user } = useAuth();

  if (faculty.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="text-center py-12 text-slate-500">
          <p>No faculty members found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Faculty Member</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faculty.map((member) => (
              <TableRow key={member.id} className="hover:bg-slate-50" data-testid={`row-faculty-${member.id}`}>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.profileImageUrl || ''} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900" data-testid={`text-faculty-name-${member.id}`}>
                        {member.name}
                      </div>
                      <div className="text-sm text-slate-500">Faculty Member</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-slate-900" data-testid={`text-faculty-department-${member.id}`}>
                  {member.department}
                </TableCell>
                <TableCell className="text-sm text-slate-900" data-testid={`text-faculty-role-${member.id}`}>
                  {member.role}
                </TableCell>
                <TableCell className="text-sm text-slate-900" data-testid={`text-faculty-contact-${member.id}`}>
                  {member.contactInfo}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      member.status === 'active'
                        ? "bg-hospital-green-100 text-hospital-green-800"
                        : "bg-slate-100 text-slate-800"
                    }
                    data-testid={`badge-faculty-status-${member.id}`}
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-hospital-green-600 hover:text-hospital-green-700"
                      data-testid={`button-view-faculty-${member.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {user?.role === 'admin' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-600 hover:text-slate-700"
                          data-testid={`button-edit-faculty-${member.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          data-testid={`button-delete-faculty-${member.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
