
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { ArrowLeft, Users, BookOpen, Mail, MessageCircle } from 'lucide-react';

interface StudentManagementProps {
  onBack: () => void;
}

const StudentManagement = ({ onBack }: StudentManagementProps) => {
  const [selectedCourse, setSelectedCourse] = useState('all');

  const courseStudents = [
    { course: 'Advanced JavaScript', students: 1247, color: '#3B82F6' },
    { course: 'React Hook Mastery', students: 892, color: '#10B981' },
    { course: 'Node.js Backend', students: 634, color: '#F59E0B' },
    { course: 'TypeScript Fundamentals', students: 0, color: '#6B7280' }
  ];

  const studentDetails = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', course: 'Advanced JavaScript', enrolled: '2024-01-15', progress: 85, status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', course: 'React Hook Mastery', enrolled: '2024-02-20', progress: 92, status: 'Active' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', course: 'Node.js Backend', enrolled: '2024-03-10', progress: 67, status: 'Active' },
    { id: 4, name: 'David Wilson', email: 'david@example.com', course: 'Advanced JavaScript', enrolled: '2024-01-25', progress: 45, status: 'Inactive' },
    { id: 5, name: 'Eva Brown', email: 'eva@example.com', course: 'React Hook Mastery', enrolled: '2024-02-28', progress: 78, status: 'Active' }
  ];

  const chartConfig = {
    students: {
      label: "Students",
      color: "hsl(var(--chart-1))",
    },
  };

  const totalStudents = courseStudents.reduce((sum, course) => sum + course.students, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Track and manage your students across all courses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold">{totalStudents.toLocaleString()}</p>
                <p className="text-blue-200 text-xs mt-1">Across all courses</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Active Students</p>
                <p className="text-3xl font-bold">{studentDetails.filter(s => s.status === 'Active').length}</p>
                <p className="text-emerald-200 text-xs mt-1">Currently learning</p>
              </div>
              <BookOpen className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Avg. Progress</p>
                <p className="text-3xl font-bold">73%</p>
                <p className="text-purple-200 text-xs mt-1">Course completion</p>
              </div>
              <MessageCircle className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Students by Course</CardTitle>
            <CardDescription>Distribution of students across your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={courseStudents}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="students"
                  >
                    {courseStudents.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {courseStudents.map((course, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: course.color }}
                    ></div>
                    <span className="text-sm">{course.course}</span>
                  </div>
                  <span className="text-sm font-semibold">{course.students}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Course Enrollment</CardTitle>
            <CardDescription>Number of students enrolled in each course</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courseStudents}>
                  <XAxis dataKey="course" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="students" fill="var(--color-students)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
          <CardDescription>Individual student progress and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <select 
              value={selectedCourse} 
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Courses</option>
              {courseStudents.map((course, index) => (
                <option key={index} value={course.course}>{course.course}</option>
              ))}
            </select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentDetails
                .filter(student => selectedCourse === 'all' || student.course === selectedCourse)
                .map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{new Date(student.enrolled).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Mail className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
