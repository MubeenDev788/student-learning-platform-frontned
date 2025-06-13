
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    
    // Simulate certificate generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Certificate data:', certificateData);
    setIsGenerating(false);
    
    // Show success message
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Award className="w-8 h-8 text-orange-500" />
          Issue Certificate
        </h1>
        <p className="text-gray-600">Generate completion certificates for your students</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Certificate Form */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Certificate Details</CardTitle>
            <CardDescription>Fill in the student and course information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateCertificate} className="space-y-4">
              <div>
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  type="text"
                  placeholder="Enter student's full name"
                  value={certificateData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="studentEmail">Student Email</Label>
                <Input
                  id="studentEmail"
                  type="email"
                  placeholder="student@example.com"
                  value={certificateData.studentEmail}
                  onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="courseName">Course Name</Label>
                <Select onValueChange={(value) => handleInputChange('courseName', value)} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="completionDate">Completion Date</Label>
                <Input
                  id="completionDate"
                  type="date"
                  value={certificateData.completionDate}
                  onChange={(e) => handleInputChange('completionDate', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="grade">Grade (Optional)</Label>
                <Select onValueChange={(value) => handleInputChange('grade', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map(grade => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Add any special achievements or notes..."
                  value={certificateData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Award className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Generate & Send
                    </>
                  )}
                </Button>
                
                <Button type="button" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Certificate Preview */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Certificate Preview</CardTitle>
            <CardDescription>Preview of the generated certificate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[400px] flex flex-col justify-center">
              <div className="mb-6">
                <Award className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate of Completion</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">This is to certify that</p>
                <p className="text-2xl font-bold text-gray-800">
                  {certificateData.studentName || '[Student Name]'}
                </p>
                <p className="text-lg">has successfully completed the course</p>
                <p className="text-xl font-semibold text-blue-600">
                  {certificateData.courseName || '[Course Name]'}
                </p>
                
                {certificateData.grade && (
                  <p className="text-lg">
                    with a grade of <span className="font-semibold text-emerald-600">{certificateData.grade}</span>
                  </p>
                )}
                
                <div className="pt-4">
                  <p className="text-sm text-gray-500">
                    Date: {certificateData.completionDate || '[Completion Date]'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IssueCertificate;
