import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, MessageCircle, Send, BookOpen, CheckCircle, Clock, Star } from 'lucide-react';

interface LearningInterfaceProps {
  course?: any;
}

const LearningInterface = ({ course }: LearningInterfaceProps) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'Hello! I\'m your AI learning assistant. How can I help you today?' },
    { type: 'user', message: 'Can you explain the concept we just covered?' },
    { type: 'bot', message: 'Of course! The concept we covered focuses on...' }
  ]);

  const lessons = [
    { id: 1, title: "Introduction to Web Development", duration: "15 mins", completed: true },
    { id: 2, title: "HTML Fundamentals", duration: "22 mins", completed: true },
    { id: 3, title: "CSS Styling Basics", duration: "18 mins", completed: false },
    { id: 4, title: "JavaScript Introduction", duration: "25 mins", completed: false },
    { id: 5, title: "Responsive Design", duration: "20 mins", completed: false }
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, 
        { type: 'user', message: chatMessage },
        { type: 'bot', message: 'Thanks for your question! Let me help you understand this better...' }
      ]);
      setChatMessage('');
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLessonClick = (index: number) => {
    setCurrentLesson(index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Course Header */}
      {course && (
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">{course.thumbnail}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-600">by {course.instructor}</p>
            </div>
          </div>
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-gray-600">{progress}% Complete</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Course Navigation */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Course Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentLesson === index 
                        ? 'bg-blue-100 border-blue-500 border' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleLessonClick(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900">{lesson.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{lesson.duration}</span>
                        </div>
                      </div>
                      {lesson.completed && (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <Card className="shadow-lg border-0 mb-6">
            <div className="aspect-video bg-gray-900 rounded-t-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white bg-opacity-10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white" />
                  ) : (
                    <Play className="w-10 h-10 text-white ml-1" />
                  )}
                </div>
                <p className="text-white text-lg">Video: {lessons[currentLesson].title}</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{lessons[currentLesson].title}</h2>
                <Badge variant={lessons[currentLesson].completed ? "default" : "secondary"}>
                  {lessons[currentLesson].completed ? "Completed" : "In Progress"}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <Button onClick={togglePlayPause} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                  {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart
                </Button>
              </div>

              <Progress value={25} className="mb-2" />
              <p className="text-sm text-gray-600">3:45 / 15:00</p>
            </CardContent>
          </Card>

          {/* Lesson Content */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Lesson Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  In this lesson, we'll explore the fundamental concepts that form the foundation of our subject. 
                  You'll learn key principles and see practical examples that will help you understand how to 
                  apply these concepts in real-world scenarios.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Learning Objectives:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    Understand the core principles and terminology
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    Learn practical implementation techniques
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    Practice with hands-on exercises
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Chat Assistant */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg border-0 h-fit sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Chat History */}
              <div className="h-64 overflow-y-auto mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="space-y-3">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-2 rounded-lg text-sm ${
                        chat.type === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white text-gray-800 border'
                      }`}>
                        {chat.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="space-y-3">
                <Textarea
                  placeholder="Ask your AI assistant anything..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
                <Button 
                  onClick={handleSendMessage}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Quick Actions:</p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Explain this concept
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Show examples
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Practice quiz
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
