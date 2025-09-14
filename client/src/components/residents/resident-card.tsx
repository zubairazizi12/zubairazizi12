import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Plus, AlertCircle, Award } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type {
  Resident,
  Form,
  DisciplinaryAction,
  Reward,
} from "@shared/schema";

interface ResidentCardProps {
  resident: Resident;
  onClick: () => void;
}

export default function ResidentCard({ resident, onClick }: ResidentCardProps) {
  const { user } = useAuth();

  const { data: forms = [] } = useQuery<Form[]>({
    queryKey: ["/api/residents", resident.id, "forms"],
  });

  const { data: disciplinaryActions = [] } = useQuery<DisciplinaryAction[]>({
    queryKey: ["/api/residents", resident.id, "disciplinary-actions"],
  });

  const { data: rewards = [] } = useQuery<Reward[]>({
    queryKey: ["/api/residents", resident.id, "rewards"],
  });

  const completedForms = forms.filter(
    (form) => form.status === "completed"
  ).length;
  const totalForms = 9; // J, F, D, I, G, E, C, H, K

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={resident.profileImageUrl || ""}
                alt={resident.fullName}
              />
              <AvatarFallback>
                {resident.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3
                className="text-lg font-semibold text-slate-900"
                data-testid={`text-resident-name-${resident.id}`}
              >
                {resident.fullName}
              </h3>
              <p
                className="text-sm text-slate-600"
                data-testid={`text-resident-department-${resident.id}`}
              >
                {resident.department}
              </p>
              <p className="text-xs text-slate-500">
                Started:{" "}
                <span data-testid={`text-resident-start-date-${resident.id}`}>
                  {new Date(resident.startDate).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">
                Forms Completed
              </p>
              <p
                className="text-lg font-bold text-hospital-green-600"
                data-testid={`text-forms-completed-${resident.id}`}
              >
                {completedForms}/{totalForms}
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <Badge
                variant="secondary"
                className="bg-hospital-green-100 text-hospital-green-800"
                data-testid={`badge-status-${resident.id}`}
              >
                {resident.status}
              </Badge>
              {rewards.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800"
                  data-testid={`badge-rewards-${resident.id}`}
                >
                  {rewards.length} Rewards
                </Badge>
              )}
              {disciplinaryActions.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-800"
                  data-testid={`badge-disciplinary-${resident.id}`}
                >
                  {disciplinaryActions.length} Disciplinary
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-2">
            {user?.role === "admin" && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Implement add form functionality
                  }}
                  data-testid={`button-add-form-${resident.id}`}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Form
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs text-red-700 border-red-200 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Implement record action functionality
                  }}
                  data-testid={`button-record-action-${resident.id}`}
                >
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Record Action
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="outline"
              className="text-xs text-hospital-green-700 border-hospital-green-200 hover:bg-hospital-green-50"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              data-testid={`button-view-profile-${resident.id}`}
            >
              View Profile
            </Button>
          </div>
          <div className="flex items-center text-xs text-slate-500">
            <Clock className="h-3 w-3 mr-1" />
            Last updated{" "}
            {new Date(
              resident.updatedAt || resident.createdAt || Date.now()
            ).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
