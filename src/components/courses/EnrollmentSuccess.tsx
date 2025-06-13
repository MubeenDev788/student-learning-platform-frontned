
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Play, Download, Star } from 'lucide-react';

interface EnrollmentSuccessProps {
  course: any;
  onContinue?: () => void;
}

const EnrollmentSuccess = ({ course, onContinue }: EnrollmentSuccessProps) => {
  if (!course) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎉 Congratulations!</h1>
          <p className="text-xl text-gray-600">You've successfully enrolled in the course</p>
        </div>

        {/* Course Card */}
        <Card className="shadow-lg border-0 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-3xl">{course.thumbnail}</span>
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-2">by {course.instructor}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{course.rating} rating</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Play className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Start Learning</h3>
                <p className="text-sm text-gray-600">Access all course materials instantly</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Download Resources</h3>
                <p className="text-sm text-gray-600">Get all course materials offline</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Earn Certificate</h3>
                <p className="text-sm text-gray-600">Complete course for certification</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full"
                onClick={onContinue}
              >
                Go to Dashboard
              </Button>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-50 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="font-medium text-gray-900">Check your email</p>
                    <p>We've sent you a confirmation email with course access details</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="font-medium text-gray-900">Set up your learning schedule</p>
                    <p>Dedicate regular time slots for maximum learning effectiveness</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="font-medium text-gray-900">Join the community</p>
                    <p>Connect with other students and get help when you need it</p>
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Need help getting started?</p>
          <Button variant="outline">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentSuccess;
