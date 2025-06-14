
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

interface Props {
  open: boolean;
  confirmOpen: boolean;
  onFirstConfirm: () => void;
  onFinalDelete: () => void;
  onCancel: () => void;
  onCancelFinal: () => void;
  course: any;
}
const CourseDeleteModal = ({
  open,
  confirmOpen,
  onFirstConfirm,
  onFinalDelete,
  onCancel,
  onCancelFinal,
  course
}: Props) => (
  <>
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center text-red-600">
            <Delete className="w-5 h-5" /> Delete Course
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-semibold text-red-700">{course?.title}</span>?<br/>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end flex gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={onFirstConfirm}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog open={confirmOpen} onOpenChange={onCancelFinal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-700">Confirm Deletion</DialogTitle>
          <DialogDescription>
            This is your last chance! Are you <span className="font-bold">absolutely sure</span> you want to delete <span className="font-semibold text-red-700">{course?.title}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end flex gap-2">
          <Button variant="outline" onClick={onCancelFinal}>Cancel</Button>
          <Button className="bg-red-700 hover:bg-red-800 text-white" onClick={onFinalDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
);

export default CourseDeleteModal;
