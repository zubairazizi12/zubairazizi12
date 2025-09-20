import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ResidentDetails from "./resident-details";

interface ResidentDetailsModalProps {
  residentId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResidentDetailsModal({
  residentId,
  isOpen,
  onClose,
}: ResidentDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>جزئیات رزیدنت</DialogTitle>
        </DialogHeader>

        <ResidentDetails residentId={residentId} onClose={onClose} />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
