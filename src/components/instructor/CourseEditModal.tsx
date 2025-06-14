
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import CourseEditForm from "./CourseEditForm";

interface Props {
  open: boolean;
  onClose: () => void;
  course: any | null;
  onSave: (course: any) => void;
}
const CourseEditModal = ({ open, onClose, course, onSave }: Props) => {
  if (!course) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Edit className="w-5 h-5 text-blue-500" />
            Edit Course: {course.title}
          </DialogTitle>
          <DialogDescription>
            Make changes to your course below.
          </DialogDescription>
        </DialogHeader>
        <CourseEditForm course={course} onSave={onSave} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};
export default CourseEditModal;
