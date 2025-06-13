
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Reply, Search, Filter, Clock, User } from 'lucide-react';

const StudentMessages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample messages data
  const messages = [
    {
      id: 1,
      studentName: "Alice Johnson",
      studentEmail: "alice@example.com",
      course: "Advanced JavaScript Concepts",
      subject: "Question about async/await",
      message: "Hi! I'm having trouble understanding the difference between promises and async/await. Could you explain when to use each one?",
      timestamp: "2024-01-15 10:30 AM",
      status: "unread",
      priority: "normal"
    },
    {
      id: 2,
      studentName: "Bob Smith",
      studentEmail: "bob@example.com",
      course: "React Hook Mastery",
      subject: "useEffect dependency array issue",
      message: "I'm getting infinite re-renders in my component. I think it's related to the useEffect dependency array. Can you help?",
      timestamp: "2024-01-15 09:15 AM",
      status: "replied",
      priority: "high"
    },
    {
      id: 3,
      studentName: "Carol Davis",
      studentEmail: "carol@example.com",
      course: "Node.js Backend Development",
      subject: "Database connection error",
      message: "I'm following the tutorial but getting a connection error when trying to connect to MongoDB. Here's the error message...",
      timestamp: "2024-01-14 03:45 PM",
      status: "unread",
      priority: "high"
    },
    {
      id: 4,
      studentName: "David Wilson",
      studentEmail: "david@example.com",
      course: "TypeScript Fundamentals",
      subject: "Thank you for the great course!",
      message: "Just wanted to say thank you for the excellent TypeScript course. The examples were very clear and helpful.",
      timestamp: "2024-01-14 11:20 AM",
      status: "read",
      priority: "low"
    }
  ];

  const handleReply = (messageId: number) => {
    if (replyText.trim()) {
      console.log(`Replying to message ${messageId}:`, replyText);
      setReplyText('');
      // Update message status to replied
      alert('Reply sent successfully!');
    }
  };

  const filteredMessages = messages.filter(message =>
    message.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-blue-500" />
          Student Messages
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} unread
            </Badge>
          )}
        </h1>
        <p className="text-gray-600">Manage communications with your students</p>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-lg border-0 mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search messages..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Messages List */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Click on a message to view and reply</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  } ${message.status === 'unread' ? 'bg-blue-25' : ''}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{message.studentName}</h3>
                        <p className="text-xs text-gray-500">{message.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {message.status === 'unread' && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                      <Badge 
                        variant={message.priority === 'high' ? 'destructive' : message.priority === 'low' ? 'secondary' : 'default'}
                        className="text-xs"
                      >
                        {message.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-800 mb-1">{message.subject}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{message.message}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {message.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Detail and Reply */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>
              {selectedMessage ? 'Message Details' : 'Select a Message'}
            </CardTitle>
            <CardDescription>
              {selectedMessage ? 'View full message and compose reply' : 'Choose a message from the list to view details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Message Header */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedMessage.studentName}</h3>
                        <p className="text-sm text-gray-600">{selectedMessage.studentEmail}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={selectedMessage.status === 'unread' ? 'default' : 'secondary'}
                    >
                      {selectedMessage.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Course:</p>
                      <p className="font-medium">{selectedMessage.course}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Time:</p>
                      <p className="font-medium">{selectedMessage.timestamp}</p>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{selectedMessage.subject}</h4>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">{selectedMessage.message}</p>
                  </div>
                </div>

                {/* Reply Section */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Reply to Student</h4>
                  <Textarea
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="mb-3 min-h-[120px]"
                  />
                  <Button 
                    onClick={() => handleReply(selectedMessage.id)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    disabled={!replyText.trim()}
                  >
                    <Reply className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a message to view details and reply</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentMessages;
