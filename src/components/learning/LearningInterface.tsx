
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Pause, SkipForward, SkipBack, MessageCircle, Send, CheckCircle, Circle, BookOpen, Clock, Star } from 'lucide-react';

const LearningInterface = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'ai',
      message: "Hello! I'm your AI learning assistant. Feel free to ask me any questions about the course content.",
      timestamp: new Date()
    }
  ]);

  const lessons = [
    { id: 1, title: "Introduction to Web Development", duration: "12:34", completed: true },
    { id: 2, title: "HTML Fundamentals", duration: "18:45", completed: true },
    { id: 3, title: "CSS Styling Basics", duration: "24:12", completed: false },
    { id: 4, title: "JavaScript Essentials", duration: "32:18", completed: false },
    { id: 5, title: "DOM Manipulation", duration: "28:56", completed: false },
    { id: 6, title: "Building Your First Project", duration: "45:23", completed: false }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: chatMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        type: 'ai',
        message: "That's a great question! Let me help you understand that concept better. The key thing to remember is...",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setChatMessage('');
  };

  const currentLessonData = lessons[currentLesson];
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Course Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Complete Web Development Bootcamp</h1>
            <p className="text-gray-600">by Sarah Johnson</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Course Progress</span>
            <span className="text-sm text-gray-600">{completedLessons}/{lessons.length} lessons completed</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Course Stats */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>4.8</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>42 hours total</span>
          </div>
          <Badge variant="secondary">Web Development</Badge>
          <Badge variant="outline" className="border-emerald-500 text-emerald-700">Beginner</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Course Content */}
        <div className="lg:col-span-3">
          {/* Video Player */}
          <Card className="shadow-lg border-0 mb-6">
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-900 rounded-t-lg relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      {isPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8 ml-1" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{currentLessonData.title}</h3>
                    <p className="text-sm text-gray-300">Duration: {currentLessonData.duration}</p>
                  </div>
                </div>
              </div>

              {/* Video Controls */}
              <div className="p-4 bg-gray-50 rounded-b-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                      disabled={currentLesson === 0}
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
                      disabled={currentLesson === lessons.length - 1}
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    Lesson {currentLesson + 1} of {lessons.length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Description */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>About This Lesson</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                In this lesson, you'll learn the fundamental concepts of web development. We'll cover the basics of how the web works, 
                the role of HTML, CSS, and JavaScript, and set up your development environment. By the end of this lesson, 
                you'll have a solid understanding of the web development landscape and be ready to start building your first website.
              </p>
              
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">What you'll learn:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Understanding how the web works
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Setting up your development environment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Introduction to HTML, CSS, and JavaScript
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Best practices for web development
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Navigation */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Course Content
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      currentLesson === index ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => setCurrentLesson(index)}
                  >
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{lesson.title}</h4>
                        <p className="text-xs text-gray-600">{lesson.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Chatbot */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-500" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Ask me anything..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearningInterface;
