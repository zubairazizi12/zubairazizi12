import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import type { Form } from "@shared/schema";

interface FormModalProps {
  form: Form;
  onClose: () => void;
}

const FORM_TITLES = {
  J: 'Initial Assessment & Orientation',
  F: 'Mid-Training Evaluation',
  D: 'Clinical Skills Assessment',
  I: 'Research & Academic Progress',
  G: 'Communication Skills Review',
  E: 'Ethics & Professionalism',
  C: 'Case Presentation Evaluation',
  H: 'Hands-on Procedure Assessment',
  K: 'Final Competency Evaluation',
};

export default function FormModal({ form, onClose }: FormModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(form.formData as any || {});

  const isReadOnly = user?.role !== 'admin';
  const formTitle = FORM_TITLES[form.formType as keyof typeof FORM_TITLES] || 'Form Details';

  const handleSave = () => {
    // TODO: Implement form save functionality
    console.log('Saving form:', formData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="modal-form-detail">
        <DialogHeader>
          <DialogTitle data-testid="text-form-modal-title">
            Form {form.formType} - {formTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assessmentDate">Assessment Date</Label>
              <Input
                id="assessmentDate"
                type="date"
                value={formData.assessmentDate || ''}
                onChange={(e) => setFormData({...formData, assessmentDate: e.target.value})}
                readOnly={isReadOnly}
                data-testid="input-assessment-date"
              />
            </div>
            <div>
              <Label htmlFor="supervisor">Supervisor</Label>
              <Select
                value={formData.supervisorId || ''}
                onValueChange={(value) => setFormData({...formData, supervisorId: value})}
                disabled={isReadOnly}
              >
                <SelectTrigger data-testid="select-supervisor">
                  <SelectValue placeholder="Select supervisor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Dr. Michael Chen</SelectItem>
                  <SelectItem value="2">Dr. Emily Rodriguez</SelectItem>
                  <SelectItem value="3">Dr. Sarah Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="rating">Overall Rating</Label>
            <Select
              value={formData.rating || ''}
              onValueChange={(value) => setFormData({...formData, rating: value})}
              disabled={isReadOnly}
            >
              <SelectTrigger data-testid="select-rating">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="satisfactory">Satisfactory</SelectItem>
                <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="strengths">Strengths</Label>
            <Textarea
              id="strengths"
              placeholder="Describe the resident's strengths..."
              value={formData.strengths || ''}
              onChange={(e) => setFormData({...formData, strengths: e.target.value})}
              readOnly={isReadOnly}
              className="min-h-[80px]"
              data-testid="textarea-strengths"
            />
          </div>

          <div>
            <Label htmlFor="areasForImprovement">Areas for Improvement</Label>
            <Textarea
              id="areasForImprovement"
              placeholder="Describe areas that need improvement..."
              value={formData.areasForImprovement || ''}
              onChange={(e) => setFormData({...formData, areasForImprovement: e.target.value})}
              readOnly={isReadOnly}
              className="min-h-[80px]"
              data-testid="textarea-areas-improvement"
            />
          </div>

          <div>
            <Label htmlFor="comments">Additional Comments</Label>
            <Textarea
              id="comments"
              placeholder="Enter detailed assessment comments..."
              value={formData.comments || ''}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
              readOnly={isReadOnly}
              className="min-h-[100px]"
              data-testid="textarea-comments"
            />
          </div>

          <div>
            <Label htmlFor="goals">Learning Goals for Next Period</Label>
            <Textarea
              id="goals"
              placeholder="Set learning objectives for the resident..."
              value={formData.goals || ''}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              readOnly={isReadOnly}
              className="min-h-[80px]"
              data-testid="textarea-goals"
            />
          </div>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-slate-200 mt-6 space-x-3">
          <Button variant="outline" onClick={onClose} data-testid="button-cancel-form">
            {isReadOnly ? 'Close' : 'Cancel'}
          </Button>
          {!isReadOnly && (
            <Button 
              onClick={handleSave}
              className="bg-hospital-green-600 hover:bg-hospital-green-700"
              data-testid="button-save-form"
            >
              Save Changes
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
