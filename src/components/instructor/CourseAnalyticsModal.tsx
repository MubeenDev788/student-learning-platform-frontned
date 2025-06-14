
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { BarChart3 } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface Props {
  open: boolean;
  onClose: () => void;
  course: any | null;
}
const mockData = [
  { month: "Jan", enrollments: 30, revenue: 300, rating: 4.7 },
  { month: "Feb", enrollments: 45, revenue: 500, rating: 4.6 },
  { month: "Mar", enrollments: 60, revenue: 800, rating: 4.8 },
  { month: "Apr", enrollments: 48, revenue: 760, rating: 4.9 },
  { month: "May", enrollments: 65, revenue: 950, rating: 5.0 },
  { month: "Jun", enrollments: 54, revenue: 880, rating: 4.7 }
];
const CourseAnalyticsModal = ({
  open,
  onClose,
  course,
}: Props) => {
  if (!course) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Analytics: {course.title}
          </DialogTitle>
          <DialogDescription>
            See your course performance visually.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="enrollments" stroke="#6366F1" name="Enrollments" />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" name="Revenue" />
              <Line type="monotone" dataKey="rating" stroke="#FDBA74" name="Rating" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseAnalyticsModal;
