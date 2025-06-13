
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Star, Clock, Users, Play, MessageCircle, Send } from 'lucide-react';

interface CourseDetailsProps {
  course: any;
  onEnroll?: (course: any) => void;
  onBack?: () => void;
}

const CourseDetails = ({ course, onEnroll, onBack }: CourseDetailsProps) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Alex Johnson",
      rating: 5,
      comment: "Excellent course! The instructor explains concepts clearly and the hands-on projects are very helpful.",
      date: "2 days ago"
    },
    {
      id: 2,
      user: "Sarah Davis",
      rating: 4,
      comment: "Great content overall. Would love to see more advanced topics covered in future updates.",
      date: "1 week ago"
    },
    {
      id: 3,
      user: "Mike Chen",
      rating: 5,
      comment: "This course completely changed my understanding of the subject. Highly recommended!",
      date: "2 weeks ago"
    }
  ]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: "Current User",
        rating: 5,
        comment: newComment,
        date: "Just now"
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  if (!course) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 hover:bg-gray-100"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Catalog
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Details */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0 mb-8">
            {/* Course Header */}
            <div className="h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center rounded-t-lg">
              <span className="text-8xl">{course.thumbnail}</span>
            </div>
            
            <CardContent className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                <p className="text-lg text-gray-600 mb-4">by {course.instructor}</p>
                
                {/* Course Stats */}
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-gray-600">({course.students} students)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{course.students.toLocaleString()} enrolled</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">{course.subject}</Badge>
                  <Badge 
                    variant="outline"
                    className={`${
                      course.difficulty === 'Beginner' ? 'border-emerald-500 text-emerald-700' :
                      course.difficulty === 'Intermediate' ? 'border-orange-500 text-orange-700' :
                      'border-red-500 text-red-700'
                    }`}
                  >
                    {course.difficulty}
                  </Badge>
                  {course.isFree && <Badge className="bg-emerald-500">Free Course</Badge>}
                </div>
              </div>

              {/* Course Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Course</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{course.description}</p>
                <p className="text-gray-600 leading-relaxed">
                  This comprehensive course will take you from beginner to advanced level with hands-on projects, 
                  real-world examples, and expert guidance. You'll learn industry best practices and gain the 
                  skills needed to excel in your field.
                </p>
              </div>

              {/* What You'll Learn */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Master the fundamentals and advanced concepts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Build real-world projects from scratch
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Learn industry best practices and standards
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Get hands-on experience with modern tools
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                Student Reviews & Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add Comment */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Add Your Review</h3>
                <Textarea
                  placeholder="Share your thoughts about this course..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-3"
                />
                <Button 
                  onClick={handleAddComment}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {comment.user.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{comment.user}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(comment.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 ml-10">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrollment Card */}
        <div>
          <Card className="shadow-lg border-0 sticky top-8">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                {course.isFree ? (
                  <div className="text-3xl font-bold text-emerald-600 mb-2">Free</div>
                ) : (
                  <div className="text-3xl font-bold text-gray-900 mb-2">${course.price}</div>
                )}
                <p className="text-gray-600">One-time payment</p>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white mb-4"
                size="lg"
                onClick={() => onEnroll?.(course)}
              >
                <Play className="w-5 h-5 mr-2" />
                Enroll Now
              </Button>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{course.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Students:</span>
                  <span className="font-medium">{course.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">English</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">This course includes:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Lifetime access
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Certificate of completion
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    30-day money back guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Mobile and TV access
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
