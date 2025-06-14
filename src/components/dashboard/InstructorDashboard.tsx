import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Users, BookOpen, TrendingUp, Plus, Eye, Edit, BarChart3, Delete } from 'lucide-react';
import CourseDeleteModal from "@/components/instructor/CourseDeleteModal";
import CourseEditModal from "@/components/instructor/CourseEditModal";
import CourseAnalyticsModal from "@/components/instructor/CourseAnalyticsModal";

interface InstructorDashboardProps {
  onQuickAction?: (action: string) => void;
}

const InstructorDashboard = ({ onQuickAction }: InstructorDashboardProps) => {
  const courses = [
    { id: 1, title: "Advanced JavaScript Concepts", students: 1247, revenue: 2494, rating: 4.8, status: "Published" },
    { id: 2, title: "React Hook Mastery", students: 892, revenue: 1784, rating: 4.9, status: "Published" },
    { id: 3, title: "Node.js Backend Development", students: 634, revenue: 1268, rating: 4.7, status: "Published" },
    { id: 4, title: "TypeScript Fundamentals", students: 0, revenue: 0, rating: 0, status: "Draft" }
  ];

  const totalRevenue = courses.reduce((sum, course) => sum + course.revenue, 0);
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [editCourse, setEditCourse] = React.useState<any | null>(null);
  const [analyticsCourse, setAnalyticsCourse] = React.useState<any | null>(null);
  const [courseToDelete, setCourseToDelete] = React.useState<any | null>(null);
  const [courseList, setCourseList] = React.useState(courses);

  const handleDeleteRequest = (course: any) => {
    setCourseToDelete(course);
    setDeleteModalOpen(true);
  };
  const handleFirstConfirmation = () => {
    setDeleteModalOpen(false);
    setConfirmDeleteOpen(true);
  };
  const handleFinalDelete = () => {
    setCourseList(courseList.filter(c => c.id !== courseToDelete.id));
    setConfirmDeleteOpen(false);
    setCourseToDelete(null);
  };
  const handleEdit = (course: any) => {
    setEditCourse(course);
  };
  const handleUpdateCourse = (updatedCourse: any) => {
    setCourseList(courseList.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    setEditCourse(null);
  };
  const handleShowAnalytics = (course: any) => {
    setAnalyticsCourse(course);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructor Dashboard</h1>
          <p className="text-gray-600">Manage your courses and track your success.</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          onClick={() => onQuickAction?.('upload')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card 
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 cursor-pointer hover:from-emerald-600 hover:to-emerald-700 transition-all"
          onClick={() => onQuickAction?.('revenue-analytics')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
                <p className="text-emerald-200 text-xs mt-1">+12% from last month</p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all"
          onClick={() => onQuickAction?.('student-management')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold">{totalStudents.toLocaleString()}</p>
                <p className="text-blue-200 text-xs mt-1">+8% from last month</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all"
          onClick={() => onQuickAction?.('course-management')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Active Courses</p>
                <p className="text-3xl font-bold">{courses.filter(c => c.status === 'Published').length}</p>
                <p className="text-purple-200 text-xs mt-1">1 in draft</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Avg. Rating</p>
                <p className="text-3xl font-bold">4.8</p>
                <p className="text-orange-200 text-xs mt-1">Across all courses</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Management */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Your Courses
              </CardTitle>
              <CardDescription>Manage and track your course performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courseList.map((course) => (
                <div key={course.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        course.status === 'Published' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Students</p>
                        <p className="font-semibold">{course.students.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <p className="font-semibold text-emerald-600">${course.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rating</p>
                        <p className="font-semibold">{course.rating > 0 ? course.rating : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label="Delete"
                      onClick={() => handleDeleteRequest(course)}
                      title="Delete Course"
                    >
                      <Delete className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label="Edit"
                      onClick={() => handleEdit(course)}
                      title="Edit Course"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label="Analytics"
                      onClick={() => handleShowAnalytics(course)}
                      title="Analytics"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Analytics */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                onClick={() => onQuickAction?.('upload')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Course
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onQuickAction?.('analytics')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onQuickAction?.('messages')}
              >
                <Users className="w-4 h-4 mr-2" />
                Student Messages
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-600">New enrollment in React Hook Mastery</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">5-star review received</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">Course completion milestone reached</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">New student question posted</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Modals and Analytics */}
      <CourseDeleteModal
        open={deleteModalOpen}
        confirmOpen={confirmDeleteOpen}
        onFirstConfirm={handleFirstConfirmation}
        onFinalDelete={handleFinalDelete}
        onCancel={() => { setDeleteModalOpen(false); setCourseToDelete(null); }}
        onCancelFinal={() => { setConfirmDeleteOpen(false); setCourseToDelete(null); }}
        course={courseToDelete}
      />
      <CourseEditModal
        open={!!editCourse}
        onClose={() => setEditCourse(null)}
        course={editCourse}
        onSave={handleUpdateCourse}
      />
      <CourseAnalyticsModal
        open={!!analyticsCourse}
        onClose={() => setAnalyticsCourse(null)}
        course={analyticsCourse}
      />
    </div>
  );
};

export default InstructorDashboard;
