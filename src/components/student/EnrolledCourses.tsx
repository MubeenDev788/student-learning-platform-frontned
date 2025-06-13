
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Play, ArrowLeft } from 'lucide-react';

interface EnrolledCoursesProps {
  onBack: () => void;
  onContinueLearning: (course: any) => void;
}

const EnrolledCourses = ({ onBack, onContinueLearning }: EnrolledCoursesProps) => {
  const enrolledCourses = [
    { 
      id: 1, 
      title: "Introduction to Machine Learning", 
      progress: 75, 
      totalLessons: 24, 
      completedLessons: 18, 
      instructor: "Dr. Sarah Chen", 
      rating: 4.8,
      enrolledDate: "2024-01-15",
      lastAccessed: "2024-06-10",
      hoursSpent: 45
    },
    { 
      id: 2, 
      title: "Web Development Fundamentals", 
      progress: 45, 
      totalLessons: 32, 
      completedLessons: 14, 
      instructor: "Mark Johnson", 
      rating: 4.9,
      enrolledDate: "2024-02-20",
      lastAccessed: "2024-06-12",
      hoursSpent: 32
    },
    { 
      id: 3, 
      title: "Data Science with Python", 
      progress: 30, 
      totalLessons: 28, 
      completedLessons: 8, 
      instructor: "Prof. Lisa Wang", 
      rating: 4.7,
      enrolledDate: "2024-03-10",
      lastAccessed: "2024-06-08",
      hoursSpent: 28
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Enrolled Courses</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <Card key={course.id} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>by {course.instructor}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{course.rating}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Enrolled:</span>
                  <span>{new Date(course.enrolledDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last accessed:</span>
                  <span>{new Date(course.lastAccessed).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Time spent:</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.hoursSpent}h</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={() => onContinueLearning(course)}
              >
                <Play className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
