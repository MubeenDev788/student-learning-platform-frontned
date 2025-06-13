import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, Clock, Users, Play, BookOpen } from 'lucide-react';

interface CourseCatalogProps {
  onCourseSelect?: (course: any) => void;
  onCourseEnroll?: (course: any) => void;
}

const CourseCatalog = ({ onCourseSelect, onCourseEnroll }: CourseCatalogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 2543,
      duration: "42 hours",
      price: 89.99,
      isFree: false,
      difficulty: "Beginner",
      subject: "Web Development",
      thumbnail: "🌐",
      description: "Learn HTML, CSS, JavaScript, React, and Node.js from scratch"
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Michael Chen",
      rating: 4.9,
      students: 1876,
      duration: "38 hours",
      price: 0,
      isFree: true,
      difficulty: "Intermediate",
      subject: "Data Science",
      thumbnail: "🤖",
      description: "Introduction to ML algorithms and practical applications"
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Rodriguez",
      rating: 4.7,
      students: 3241,
      duration: "28 hours",
      price: 79.99,
      isFree: false,
      difficulty: "Beginner",
      subject: "Design",
      thumbnail: "🎨",
      description: "Master design principles and create beautiful user interfaces"
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Prof. Lisa Wang",
      rating: 4.6,
      students: 1654,
      duration: "45 hours",
      price: 0,
      isFree: true,
      difficulty: "Intermediate",
      subject: "Data Science",
      thumbnail: "🐍",
      description: "Learn Python programming with focus on data analysis"
    },
    {
      id: 5,
      title: "Advanced React Development",
      instructor: "Alex Turner",
      rating: 4.8,
      students: 987,
      duration: "52 hours",
      price: 129.99,
      isFree: false,
      difficulty: "Advanced",
      subject: "Web Development",
      thumbnail: "⚛️",
      description: "Deep dive into React ecosystem with advanced patterns"
    },
    {
      id: 6,
      title: "Digital Marketing Strategy",
      instructor: "Jennifer Lee",
      rating: 4.5,
      students: 2156,
      duration: "24 hours",
      price: 59.99,
      isFree: false,
      difficulty: "Beginner",
      subject: "Marketing",
      thumbnail: "📊",
      description: "Complete guide to digital marketing and growth hacking"
    }
  ];

  const subjects = ["Web Development", "Data Science", "Design", "Marketing"];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || course.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'free' && course.isFree) ||
                        (selectedPrice === 'paid' && !course.isFree);
    
    return matchesSearch && matchesSubject && matchesDifficulty && matchesPrice;
  });

  const handleCourseClick = (course: any) => {
    onCourseSelect?.(course);
  };

  const handleEnrollClick = (e: React.MouseEvent, course: any) => {
    e.stopPropagation(); // Prevent course details from opening
    onCourseEnroll?.(course);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Catalog</h1>
        <p className="text-gray-600">Discover courses tailored to your learning goals</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search courses, instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPrice} onValueChange={setSelectedPrice}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card 
            key={course.id} 
            className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
            onClick={() => handleCourseClick(course)}
          >
            {/* Course Thumbnail */}
            <div className="h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center">
              <span className="text-6xl">{course.thumbnail}</span>
            </div>

            <CardContent className="p-6">
              {/* Course Title & Instructor */}
              <div className="mb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600">by {course.instructor}</p>
              </div>

              {/* Course Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

              {/* Course Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  {course.subject}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    course.difficulty === 'Beginner' ? 'border-emerald-500 text-emerald-700' :
                    course.difficulty === 'Intermediate' ? 'border-orange-500 text-orange-700' :
                    'border-red-500 text-red-700'
                  }`}
                >
                  {course.difficulty}
                </Badge>
              </div>

              {/* Price & Enroll */}
              <div className="flex items-center justify-between">
                <div>
                  {course.isFree ? (
                    <span className="text-2xl font-bold text-emerald-600">Free</span>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                  )}
                </div>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  onClick={(e) => handleEnrollClick(e, course)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Enroll Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg" className="border-blue-500 text-blue-500 hover:bg-blue-50">
          Load More Courses
        </Button>
      </div>
    </div>
  );
};

export default CourseCatalog;
