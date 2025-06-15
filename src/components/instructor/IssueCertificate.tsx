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
        <Card className="flex-1 border-2 border-dashed border-gray-300 min-h-[480px] flex flex-col justify-center items-center bg-[#F9F9FB]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-orange-500" />
              Certificate Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="relative rounded-xl shadow-xl bg-white mx-auto px-10 py-8 text-center w-[350px] sm:w-[430px] md:w-[510px] border border-gray-200"
              style={{
                background: `linear-gradient(120deg, #225c3b 0%, #f8e7ad 80%, #fdf6e0 95%)`
              }}
            >
              {/* Elegant curved/wave bg */}
              <div className="pointer-events-none absolute z-0 left-0 top-0 w-full h-full overflow-hidden select-none">
                {/* Use only tailwind gradients since no image allowed */}
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-green-600/60 via-transparent to-transparent rounded-full filter blur-xl opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tr from-yellow-400/40 via-transparent to-green-300 rounded-full filter blur-2xl opacity-30"></div>
              </div>
              {/* Certificate Content */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <img alt="award" src="https://img.icons8.com/ios-filled/50/FFC700/prize--v1.png" className="w-10 h-10 mt-2" />
                <div className="uppercase text-gray-800 font-bold text-[13px] tracking-wider mt-2 mb-1" style={{ letterSpacing: "0.13em" }}>Certificate of Achievement</div>
                <div className="text-gray-600 text-xs mb-4">This certificate is proudly presented to:</div>
                <div className="font-playfair text-2xl text-blue-600 font-extrabold mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
                  {certificateData.studentName || "[Student Name]"}
                </div>
                <div className="text-gray-500 text-xs mb-1">
                  {certificateData.courseName ? (
                    <>for completing <span className="font-semibold text-purple-700">{certificateData.courseName}</span></>
                  ) : <>[Course Name]</>}
                </div>
                {certificateData.grade && (
                  <div className="text-xs text-emerald-700 font-bold mb-2">Grade: {certificateData.grade}</div>
                )}
                <div className="mt-2 mb-3 text-[13px] text-gray-600 italic max-w-xs mx-auto">
                  {certificateData.additionalNotes || (
                    <>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit nulla mollitia mollitia voluptatum, expedita suscipit fuga.</>
                  )}
                </div>
                {/* Signature and date section */}
                <div className="flex w-full justify-between pt-8 items-center text-xs text-gray-500">
                  <span>
                    <span className="block font-bold text-gray-700">{certificateData.studentName || "[Student Name]"}</span>
                    <span className="block text-[10px] text-gray-400 mt-1">Signature</span>
                  </span>
                  <span>
                    <span className="block font-semibold">IssuerAI</span>
                    <span className="block text-[10px] text-gray-400 mt-1">Issuer</span>
                  </span>
                  <span>
                    <span className="block">{certificateData.completionDate || "[Date]"}</span>
                    <span className="block text-[10px] text-gray-400 mt-1">Date</span>
                  </span>
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
