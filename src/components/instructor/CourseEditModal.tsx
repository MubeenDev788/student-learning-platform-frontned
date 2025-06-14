
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
      <DialogContent
        className="max-w-2xl"
        style={{
          height: "90vh",
          maxHeight: "90vh",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Edit className="w-5 h-5 text-blue-500" />
            Edit Course: {course.title}
          </DialogTitle>
          <DialogDescription>
            Update your course details below.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1">
          <CourseEditForm course={course} onSave={onSave} onCancel={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CourseEditModal;
