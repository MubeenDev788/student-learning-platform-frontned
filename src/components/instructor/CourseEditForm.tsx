
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  course: any;
  onSave: (course: any) => void;
  onCancel: () => void;
}
const CourseEditForm = ({ course, onSave, onCancel }: Props) => {
  const [form, setForm] = useState({
    ...course,
    description: course?.description || "",
    category: course?.category || "",
    syllabus: course?.syllabus || "",
  });
  const handleChange = (key: string, value: string) => setForm({ ...form, [key]: value });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };
  return (
    <div className="py-6 px-2">
      <Card className="mb-4 shadow-lg">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Course Title</Label>
              <Input value={form.title} required onChange={e => handleChange("title", e.target.value)} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => handleChange("description", e.target.value)} />
            </div>
            <div>
              <Label>Category</Label>
              <Input value={form.category} onChange={e => handleChange("category", e.target.value)} />
            </div>
            <div>
              <Label>Syllabus</Label>
              <Textarea value={form.syllabus} onChange={e => handleChange("syllabus", e.target.value)} />
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="bg-blue-600 text-white" >Save</Button>
              <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default CourseEditForm;
