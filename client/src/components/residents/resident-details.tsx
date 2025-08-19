import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Edit, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import FormModal from "@/components/forms/form-modal";
import type { Resident, Form, DisciplinaryAction, Reward } from "@shared/schema";

interface ResidentDetailsProps {
  residentId: string;
  onClose: () => void;
}

const FORM_TYPES = [
  { type: 'J', name: 'Initial Assessment & Orientation' },
  { type: 'F', name: 'Mid-Training Evaluation' },
  { type: 'D', name: 'Clinical Skills Assessment' },
  { type: 'I', name: 'Research & Academic Progress' },
  { type: 'G', name: 'Communication Skills Review' },
  { type: 'E', name: 'Ethics & Professionalism' },
  { type: 'C', name: 'Case Presentation Evaluation' },
  { type: 'H', name: 'Hands-on Procedure Assessment' },
  { type: 'K', name: 'Final Competency Evaluation' },
];

export default function ResidentDetails({ residentId, onClose }: ResidentDetailsProps) {
  const { user } = useAuth();
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);

  const { data: resident } = useQuery<Resident>({
    queryKey: ["/api/residents", residentId],
  });

  const { data: forms = [] } = useQuery<Form[]>({
    queryKey: ["/api/residents", residentId, "forms"],
  });

  const { data: disciplinaryActions = [] } = useQuery<DisciplinaryAction[]>({
    queryKey: ["/api/residents", residentId, "disciplinary-actions"],
  });

  const { data: rewards = [] } = useQuery<Reward[]>({
    queryKey: ["/api/residents", residentId, "rewards"],
  });

  if (!resident) {
    return null;
  }

  const completedForms = forms.filter(form => form.status === 'completed');
  const pendingFormTypes = FORM_TYPES.filter(
    formType => !forms.some(form => form.formType === formType.type)
  );

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Resident Details</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          data-testid="button-close-details"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-6">
        <Tabs defaultValue="forms" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="forms" data-testid="tab-forms">
              Training Forms ({completedForms.length}/9)
            </TabsTrigger>
            <TabsTrigger value="actions" data-testid="tab-actions">
              Disciplinary Actions
            </TabsTrigger>
            <TabsTrigger value="rewards" data-testid="tab-rewards">
              Rewards & Achievements
            </TabsTrigger>
            <TabsTrigger value="profile" data-testid="tab-profile">
              Personal Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Completed Forms */}
              {forms.map((form) => {
                const formType = FORM_TYPES.find(ft => ft.type === form.formType);
                return (
                  <div
                    key={form.id}
                    className="p-4 border border-slate-200 rounded-lg hover:shadow-sm cursor-pointer"
                    onClick={() => setSelectedForm(form)}
                    data-testid={`form-card-${form.formType}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">Form {form.formType}</h4>
                      <Badge
                        variant="secondary"
                        className={
                          form.status === 'completed'
                            ? "bg-hospital-green-100 text-hospital-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {form.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{formType?.name}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>
                        {form.completedAt 
                          ? `Completed: ${new Date(form.completedAt).toLocaleDateString()}`
                          : `Created: ${new Date(form.createdAt || Date.now()).toLocaleDateString()}`
                        }
                      </span>
                      {user?.role === 'admin' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-hospital-green-600 hover:text-hospital-green-700 h-auto p-0"
                          data-testid={`button-edit-form-${form.formType}`}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Add New Form Cards */}
              {pendingFormTypes.map((formType) => (
                <div
                  key={formType.type}
                  className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-hospital-green-300 cursor-pointer"
                  onClick={() => {
                    // TODO: Implement add new form functionality
                  }}
                  data-testid={`add-form-card-${formType.type}`}
                >
                  <div className="flex flex-col items-center justify-center py-4">
                    <Plus className="h-6 w-6 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-600">Add Form {formType.type}</p>
                    <p className="text-xs text-slate-400">{formType.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="actions" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-slate-900">Disciplinary Actions</h4>
                {user?.role === 'admin' && (
                  <Button
                    size="sm"
                    variant="destructive"
                    data-testid="button-add-disciplinary-action"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Action
                  </Button>
                )}
              </div>
              
              {disciplinaryActions.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No disciplinary actions recorded.</p>
              ) : (
                disciplinaryActions.map((action) => (
                  <div
                    key={action.id}
                    className="bg-red-50 border border-red-200 rounded-lg p-4"
                    data-testid={`disciplinary-action-${action.id}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-red-900">{action.description}</h5>
                      <span className="text-xs text-red-600">
                        {new Date(action.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-red-700 mb-2">{action.description}</p>
                    <p className="text-xs text-red-600">
                      <strong>Action Taken:</strong> {action.actionTaken}
                    </p>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-slate-900">Rewards & Achievements</h4>
                {user?.role === 'admin' && (
                  <Button
                    size="sm"
                    className="bg-hospital-green-600 hover:bg-hospital-green-700"
                    data-testid="button-add-reward"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Reward
                  </Button>
                )}
              </div>

              {rewards.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No rewards recorded.</p>
              ) : (
                rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="bg-hospital-green-50 border border-hospital-green-200 rounded-lg p-4"
                    data-testid={`reward-${reward.id}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-hospital-green-900">{reward.rewardType}</h5>
                      <span className="text-xs text-hospital-green-600">
                        {new Date(reward.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-hospital-green-700 mb-2">{reward.description}</p>
                    {reward.amount && (
                      <p className="text-xs text-hospital-green-600">
                        <strong>Amount:</strong> {reward.amount}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-900 mb-4">Personal Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <p className="mt-1 text-sm text-slate-900" data-testid="text-resident-full-name">
                      {resident.fullName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Age</label>
                    <p className="mt-1 text-sm text-slate-900" data-testid="text-resident-age">
                      {resident.age}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Gender</label>
                    <p className="mt-1 text-sm text-slate-900" data-testid="text-resident-gender">
                      {resident.gender}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-4">Training Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Department</label>
                    <p className="mt-1 text-sm text-slate-900" data-testid="text-resident-department-detail">
                      {resident.department}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Start Date</label>
                    <p className="mt-1 text-sm text-slate-900" data-testid="text-resident-start-date-detail">
                      {new Date(resident.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  {resident.endDate && (
                    <div>
                      <label className="text-sm font-medium text-slate-700">Expected End Date</label>
                      <p className="mt-1 text-sm text-slate-900" data-testid="text-resident-end-date">
                        {new Date(resident.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {user?.role === 'admin' && (
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-hospital-green-600 hover:bg-hospital-green-700">
                  Save Changes
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Form Modal */}
      {selectedForm && (
        <FormModal
          form={selectedForm}
          onClose={() => setSelectedForm(null)}
        />
      )}
    </div>
  );
}
