
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Eye, Edit, BarChart3, CheckCircle, Clock } from 'lucide-react';

interface CourseManagementProps {
  onBack: () => void;
}

const CourseManagement = ({ onBack }: CourseManagementProps) => {
  const [activeTab, setActiveTab] = useState<'published' | 'draft'>('published');
  const [courses, setCourses] = useState([
    { id: 1, title: "Advanced JavaScript Concepts", students: 1247, revenue: 2494, rating: 4.8, status: "Published", createdAt: "2024-01-15", updatedAt: "2024-06-10" },
    { id: 2, title: "React Hook Mastery", students: 892, revenue: 1784, rating: 4.9, status: "Published", createdAt: "2024-02-20", updatedAt: "2024-06-12" },
    { id: 3, title: "Node.js Backend Development", students: 634, revenue: 1268, rating: 4.7, status: "Published", createdAt: "2024-03-10", updatedAt: "2024-06-08" },
    { id: 4, title: "TypeScript Fundamentals", students: 0, revenue: 0, rating: 0, status: "Draft", createdAt: "2024-05-15", updatedAt: "2024-06-01" },
    { id: 5, title: "Python Data Analysis", students: 0, revenue: 0, rating: 0, status: "Draft", createdAt: "2024-06-01", updatedAt: "2024-06-13" }
  ]);

  const publishedCourses = courses.filter(course => course.status === 'Published');
  const draftCourses = courses.filter(course => course.status === 'Draft');

  const handlePublishCourse = (courseId: number) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? { ...course, status: 'Published', updatedAt: new Date().toISOString().split('T')[0] }
          : course
      )
    );
    console.log(`Publishing course with ID: ${courseId}`);
  };

  const handleCourseView = (course: any) => {
    console.log('Viewing course:', course);
    alert(`Viewing course: ${course.title}`);
  };

  const handleCourseEdit = (course: any) => {
    console.log('Editing course:', course);
    alert(`Editing course: ${course.title}`);
  };

  const handleCourseAnalytics = (course: any) => {
    console.log('Viewing analytics for course:', course);
    alert(`Analytics for: ${course.title}\nStudents: ${course.students}\nRevenue: $${course.revenue}\nRating: ${course.rating}`);
  };

  const renderCourseCard = (course: any) => (
    <div key={course.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
        <BookOpen className="w-8 h-8 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900">{course.title}</h3>
          <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
            {course.status}
          </Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
          <div>
            <p className="text-gray-600">Updated</p>
            <p className="font-semibold">{new Date(course.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {course.status === 'Draft' && (
          <Button 
            size="sm" 
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={() => handlePublishCourse(course.id)}
            title="Publish Course"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Publish
          </Button>
        )}
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => handleCourseView(course)}
          title="View Course"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => handleCourseEdit(course)}
          title="Edit Course"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => handleCourseAnalytics(course)}
          title="View Analytics"
        >
          <BarChart3 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600">Manage your published and draft courses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Published Courses</p>
                <p className="text-3xl font-bold">{publishedCourses.length}</p>
                <p className="text-emerald-200 text-xs mt-1">Active and earning</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Draft Courses</p>
                <p className="text-3xl font-bold">{draftCourses.length}</p>
                <p className="text-orange-200 text-xs mt-1">Ready to publish</p>
              </div>
              <Clock className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold">{courses.length}</p>
                <p className="text-blue-200 text-xs mt-1">All time created</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Course Management
              </CardTitle>
              <CardDescription>View and manage your courses by status</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'published' ? 'default' : 'outline'}
                onClick={() => setActiveTab('published')}
                className={activeTab === 'published' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : ''}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Published ({publishedCourses.length})
              </Button>
              <Button
                variant={activeTab === 'draft' ? 'default' : 'outline'}
                onClick={() => setActiveTab('draft')}
                className={activeTab === 'draft' ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' : ''}
              >
                <Clock className="w-4 h-4 mr-2" />
                Draft ({draftCourses.length})
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeTab === 'published' && (
            <div className="space-y-4">
              {publishedCourses.length > 0 ? (
                publishedCourses.map(renderCourseCard)
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No published courses yet.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'draft' && (
            <div className="space-y-4">
              {draftCourses.length > 0 ? (
                draftCourses.map(renderCourse => (
                  <div key={renderCourse.id} className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{renderCourse.title}</h3>
                        <Badge variant="secondary">Draft</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Created</p>
                          <p className="font-semibold">{new Date(renderCourse.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Last Updated</p>
                          <p className="font-semibold">{new Date(renderCourse.updatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        onClick={() => handlePublishCourse(renderCourse.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Publish
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCourseEdit(renderCourse)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No draft courses found.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseManagement;
