
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Award, Send, Download } from 'lucide-react';

const IssueCertificate = () => {
  const [certificateData, setCertificateData] = useState({
    studentName: '',
    studentEmail: '',
    courseName: '',
    completionDate: '',
    grade: '',
    additionalNotes: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setCertificateData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1700));
    setIsGenerating(false);
    alert('Certificate generated successfully!');
  };

  const courses = [
    "Advanced JavaScript Concepts",
    "React Hook Mastery", 
    "Node.js Backend Development",
    "TypeScript Fundamentals"
  ];
  const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "Pass"];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col items-center">
      <div className="flex flex-col md:flex-row w-full gap-8">
        {/* Form Section */}
        <Card className="flex-1 bg-white border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-orange-500" />
              Issue Certificate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateCertificate} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    value={certificateData.studentName}
                    onChange={e => handleInputChange("studentName", e.target.value)}
                    placeholder="Full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="studentEmail">Student Email</Label>
                  <Input
                    id="studentEmail"
                    type="email"
                    value={certificateData.studentEmail}
                    onChange={e => handleInputChange("studentEmail", e.target.value)}
                    placeholder="student@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="courseName">Course Name</Label>
                  <Select
                    value={certificateData.courseName}
                    onValueChange={value => handleInputChange("courseName", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="completionDate">Completion Date</Label>
                  <Input
                    id="completionDate"
                    type="date"
                    value={certificateData.completionDate}
                    onChange={e => handleInputChange("completionDate", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="grade">Grade</Label>
                  <Select
                    value={certificateData.grade}
                    onValueChange={value => handleInputChange("grade", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    value={certificateData.additionalNotes}
                    onChange={e => handleInputChange("additionalNotes", e.target.value)}
                    placeholder="e.g. Honors, participation etc. (optional)"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6 justify-end">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  disabled={isGenerating}
                >
                  <Send className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
                  {isGenerating ? "Generating..." : "Generate & Send"}
                </Button>
                <Button variant="outline" type="button">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* Preview Section */}
        <Card className="flex-1 border-2 border-dashed border-gray-300 bg-gradient-to-br from-white to-blue-50 shadow-md min-h-[480px] flex flex-col justify-center items-center">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-orange-500" />
              Certificate Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 rounded-lg text-center flex flex-col items-center gap-3">
              <h2 className="text-xl font-bold text-gray-800">Certificate of Completion</h2>
              <span className="text-lg text-gray-700">Awarded to</span>
              <span className="text-2xl font-semibold text-blue-600">{certificateData.studentName || "[Student Name]"}</span>
              <span className="text-lg text-gray-700">for successfully completing</span>
              <span className="text-lg font-semibold text-purple-700">{certificateData.courseName || "[Course Name]"}</span>
              {certificateData.grade && (
                <span className="text-md text-gray-800">with grade <span className="font-bold text-emerald-600">{certificateData.grade}</span></span>
              )}
              <div>
                <span className="text-xs text-gray-500">
                  Email: {certificateData.studentEmail || "[Student Email]"}
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-500">
                  Completion Date: {certificateData.completionDate || "[Date]"}
                </span>
              </div>
              {certificateData.additionalNotes && (
                <div className="mt-2 bg-gray-100 px-3 py-1 rounded text-xs text-gray-600 border">
                  Notes: {certificateData.additionalNotes}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IssueCertificate;
