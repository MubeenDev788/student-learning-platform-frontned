
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload, Video, FileText } from "lucide-react";

// Example lists, you can replace with props/static if needed
const SUBJECTS = [
  "Web Development", "Data Science", "Design", "Marketing", "Business", "Technology"
];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

interface Props {
  course: any;
  onSave: (course: any) => void;
  onCancel: () => void;
}
const CourseEditForm = ({ course, onSave, onCancel }: Props) => {
  const [form, setForm] = useState({
    ...course,
    title: course?.title || "",
    description: course?.description || "",
    subject: course?.subject || "",
    difficulty: course?.difficulty || "",
    price: course?.price ?? "",
    isFree: course?.isFree ?? (!!course?.price ? false : true),
    thumbnail: course?.thumbnail || null,
    videoUrl: course?.videoUrl || "",
    syllabus: course?.syllabus || "",
    materials: course?.materials || [],
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (key: string, value: any) => setForm((f: any) => ({ ...f, [key]: value }));
  const handleFileChange = (key: string, file: any) => setForm((f: any) => ({ ...f, [key]: file }));
  const handleMaterialsChange = (files: FileList | null) => {
    if (!files) return;
    setForm((f: any) => ({
      ...f,
      materials: Array.from(files)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      onSave(form);
    }, 800); // Simulate "uploads"
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-1">
      {/* Basic Information */}
      <Card className="shadow-md border-0">
        <CardHeader>
          <CardTitle>Edit Course Information</CardTitle>
          <CardDescription>Update all the details of your course</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Course Title</Label>
            <Input
              type="text"
              value={form.title}
              required
              onChange={e => handleChange("title", e.target.value)}
              placeholder="Course Title"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={e => handleChange("description", e.target.value)}
              className="mt-1 min-h-[120px]"
              required
              placeholder="Course description"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Subject</Label>
              <Select value={form.subject} onValueChange={v => handleChange("subject", v)} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Difficulty Level</Label>
              <Select value={form.difficulty} onValueChange={v => handleChange("difficulty", v)} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTIES.map(diff => (
                    <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Syllabus</Label>
            <Textarea
              value={form.syllabus}
              onChange={e => handleChange("syllabus", e.target.value)}
              className="mt-1 min-h-[100px]"
              placeholder="Syllabus and topics covered"
            />
          </div>
        </CardContent>
      </Card>

      {/* Course Content / Media */}
      <Card className="shadow-md border-0">
        <CardHeader>
          <CardTitle>Course Media & Materials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Video URL */}
          <div>
            <Label htmlFor="videoUrl">Course Video URL</Label>
            <Input
              id="videoUrl"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={form.videoUrl}
              onChange={e => handleChange("videoUrl", e.target.value)}
              className="mt-1"
            />
          </div>
          {/* Additional Materials */}
          <div>
            <Label htmlFor="materials">Additional Materials</Label>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <Input
                id="materials"
                type="file"
                multiple
                onChange={e => handleMaterialsChange(e.target.files)}
                className="mt-1"
              />
              <FileText className="w-5 h-5 ml-1 text-gray-400" />
            </div>
            {!!form.materials?.length && (
              <ul className="text-xs text-gray-600 mt-1 list-disc ml-4">
                {form.materials.map((file: any, i: number) =>
                  <li key={i}>{file.name || (typeof file === "string" ? file : "")}</li>)}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Thumbnail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pricing */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <Label htmlFor="free-toggle">Free Course</Label>
              <Switch
                id="free-toggle"
                checked={!!form.isFree}
                onCheckedChange={checked => {
                  handleChange("isFree", checked);
                  if (checked) handleChange("price", "");
                }}
              />
            </div>
            {!form.isFree && (
              <div>
                <Label htmlFor="price">Price (USD)</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={form.price}
                    onChange={e => handleChange("price", e.target.value)}
                    className="pl-8"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Thumbnail */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Course Thumbnail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <label className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-2xl cursor-pointer relative overflow-hidden">
                {form.thumbnail && typeof form.thumbnail === "object" ? (
                  <img
                    src={URL.createObjectURL(form.thumbnail)}
                    alt="Thumbnail"
                    className="w-20 h-20 object-cover rounded"
                  />
                ) : (
                  <span role="img" aria-label="Thumbnail">🎓</span>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
                  onChange={e =>
                    e.target.files &&
                    handleFileChange("thumbnail", e.target.files[0])
                  }
                  style={{ cursor: "pointer" }}
                />
              </label>
              {form.thumbnail && typeof form.thumbnail === "object" && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleChange("thumbnail", null)}
                >
                  Remove
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 justify-end">
        <Button type="submit" className="bg-blue-600 text-white" disabled={uploading}>
          {uploading ? "Saving..." : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={uploading}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
export default CourseEditForm;
