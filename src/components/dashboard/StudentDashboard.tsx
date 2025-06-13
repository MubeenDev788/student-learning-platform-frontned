import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Award, TrendingUp, Play, Star } from 'lucide-react';

interface StudentDashboardProps {
  onContinueLearning?: (course: any) => void;
  onNavigate?: (view: string) => void;
}

const StudentDashboard = ({ onContinueLearning, onNavigate }: StudentDashboardProps) => {
  const recentCourses = [
    { id: 1, title: "Introduction to Machine Learning", progress: 75, totalLessons: 24, completedLessons: 18, instructor: "Dr. Sarah Chen", rating: 4.8 },
    { id: 2, title: "Web Development Fundamentals", progress: 45, totalLessons: 32, completedLessons: 14, instructor: "Mark Johnson", rating: 4.9 },
    { id: 3, title: "Data Science with Python", progress: 30, totalLessons: 28, completedLessons: 8, instructor: "Prof. Lisa Wang", rating: 4.7 }
  ];

  const recommendations = [
    { id: 4, title: "Advanced React Development", difficulty: "Intermediate", duration: "8 weeks", price: "Free", rating: 4.6 },
    { id: 5, title: "AI Ethics and Philosophy", difficulty: "Beginner", duration: "4 weeks", price: "$49", rating: 4.8 },
    { id: 6, title: "Cloud Computing Basics", difficulty: "Beginner", duration: "6 weeks", price: "$79", rating: 4.5 }
  ];

  const handleContinueLearning = (course: any) => {
    onContinueLearning?.(course);
  };

  const handleCardClick = (cardType: string) => {
    onNavigate?.(cardType);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h1>
        <p className="text-gray-600">Continue your learning journey and discover new opportunities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card 
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleCardClick('enrolled-courses')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Courses Enrolled</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleCardClick('learning-hours')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Hours Learned</p>
                <p className="text-3xl font-bold">47</p>
              </div>
              <Clock className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleCardClick('certificates')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Certificates</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <Award className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Streak Days</p>
                <p className="text-3xl font-bold">15</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-blue-500" />
                Continue Learning
              </CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{course.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={course.progress} className="flex-1" />
                      <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
                    </div>
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    onClick={() => handleContinueLearning(course)}
                  >
                    Continue
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <div>
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Recommended for You
              </CardTitle>
              <CardDescription>AI-powered course suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((course) => (
                <div key={course.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="font-medium">{course.difficulty}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium text-emerald-600">{course.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{course.rating}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50">
                    View Course
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
