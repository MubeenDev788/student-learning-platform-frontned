
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import AuthForm from '@/components/auth/AuthForm';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import InstructorDashboard from '@/components/dashboard/InstructorDashboard';
import CourseCatalog from '@/components/courses/CourseCatalog';
import CourseUpload from '@/components/courses/CourseUpload';
import LearningInterface from '@/components/learning/LearningInterface';
import IssueCertificate from '@/components/instructor/IssueCertificate';
import InstructorAnalytics from '@/components/instructor/InstructorAnalytics';
import StudentMessages from '@/components/instructor/StudentMessages';
import RevenueAnalytics from '@/components/instructor/RevenueAnalytics';
import StudentManagement from '@/components/instructor/StudentManagement';
import CourseManagement from '@/components/instructor/CourseManagement';
import CourseDetails from '@/components/courses/CourseDetails';
import CourseEnrollment from '@/components/courses/CourseEnrollment';
import EnrollmentSuccess from '@/components/courses/EnrollmentSuccess';
import EnrolledCourses from '@/components/student/EnrolledCourses';
import Certificates from '@/components/student/Certificates';
import LearningHours from '@/components/student/LearningHours';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleAuth = (userData: any) => {
    console.log('User authenticated:', userData);
    setUser({
      id: 1,
      name: userData.name || 'John Doe',
      email: userData.email,
      role: userData.role || 'student'
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
    setSelectedCourse(null);
  };

  // Handle navigation from quick actions
  const handleQuickAction = (action: string) => {
    setCurrentView(action);
  };

  // Handle course selection for details view
  const handleCourseSelect = (course: any) => {
    setSelectedCourse(course);
    setCurrentView('course-details');
  };

  // Handle course enrollment
  const handleCourseEnroll = (course: any) => {
    setSelectedCourse(course);
    setCurrentView('enrollment');
  };

  // Handle successful enrollment
  const handleEnrollmentSuccess = () => {
    setCurrentView('enrollment-success');
  };

  // Handle continue learning (navigate to learning interface with selected course)
  const handleContinueLearning = (course: any) => {
    setSelectedCourse(course);
    setCurrentView('learning');
  };

  // Handle student dashboard navigation
  const handleStudentNavigation = (view: string) => {
    setCurrentView(view);
  };

  // Show authentication form if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            onClick={() => setShowLogin(!showLogin)}
            className="text-gray-600 hover:text-gray-900"
          >
            {showLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Button>
        </div>
        <AuthForm
          isLogin={showLogin}
          onSubmit={handleAuth}
          loading={false}
        />
      </div>
    );
  }

  // Navigation for logged-in users
  const renderNavigation = () => (
    <div className="bg-white border-b border-gray-200 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 py-4">
          <Button
            variant={currentView === 'dashboard' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('dashboard')}
            className={currentView === 'dashboard' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : ''}
          >
            Dashboard
          </Button>
          
          {/* Student-only navigation */}
          {user.role === 'student' && (
            <>
              <Button
                variant={currentView === 'catalog' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('catalog')}
                className={currentView === 'catalog' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : ''}
              >
                Course Catalog
              </Button>
              <Button
                variant={currentView === 'learning' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('learning')}
                className={currentView === 'learning' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : ''}
              >
                Learning Interface
              </Button>
            </>
          )}

          {/* Instructor-only navigation */}
          {user.role === 'instructor' && (
            <>
              <Button
                variant={currentView === 'upload' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('upload')}
                className={currentView === 'upload' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : ''}
              >
                Upload Course
              </Button>
              <Button
                variant={currentView === 'certificate' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('certificate')}
                className={currentView === 'certificate' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : ''}
              >
                Issue Certificate
              </Button>
            </>
          )}
        </nav>
      </div>
    </div>
  );

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'catalog':
        return user.role === 'student' ? 
          <CourseCatalog onCourseSelect={handleCourseSelect} onCourseEnroll={handleCourseEnroll} /> : 
          <StudentDashboard onContinueLearning={handleContinueLearning} onNavigate={handleStudentNavigation} />;
      case 'upload':
        return user.role === 'instructor' ? <CourseUpload /> : <StudentDashboard onContinueLearning={handleContinueLearning} onNavigate={handleStudentNavigation} />;
      case 'learning':
        return user.role === 'student' ? 
          <LearningInterface course={selectedCourse} /> : 
          <StudentDashboard onContinueLearning={handleContinueLearning} onNavigate={handleStudentNavigation} />;
      case 'certificate':
        return user.role === 'instructor' ? <IssueCertificate /> : <StudentDashboard onContinueLearning={handleContinueLearning} onNavigate={handleStudentNavigation} />;
      case 'analytics':
        return user.role === 'instructor' ? <InstructorAnalytics /> : <StudentDashboard onContinueLearning={handleContinueLearning} onNavigate={handleStudentNavigation} />;
      case 'messages':
        return user.role === 'instructor' ? <StudentMessages /> : <StudentDashboard onContinueLearning={handleContinueLearning} onNavigate={handleStudentNavigation} />;
      case 'revenue-analytics':
        return user.role === 'instructor' ? <RevenueAnalytics onBack={() => setCurrentView('dashboard')} /> : <StudentDashboard onContinueLearning={handleContinueLearning} onNavigate={handleStudentNavigation} />;
      case 'student-management':
        return user.role === 'instructor' ? <StudentManagement onBack={() => setCurrentView('dashboard')} /> : <StudentDashboard onContinueLearning={handleContinueLearning} onNavigate={handleStudentNavigation} />;
      case 'course-management':
        return user.role === 'instructor' ? <CourseManagement onBack={() => setCurrentView('dashboard')} /> : <StudentDashboard onContinueLearning={handleContinueLearning} onNavigate={handleStudentNavigation} />;
      case 'course-details':
        return <CourseDetails course={selectedCourse} onEnroll={handleCourseEnroll} onBack={() => setCurrentView('catalog')} />;
      case 'enrollment':
        return <CourseEnrollment course={selectedCourse} onSuccess={handleEnrollmentSuccess} onBack={() => setCurrentView('catalog')} />;
      case 'enrollment-success':
        return <EnrollmentSuccess course={selectedCourse} onContinue={() => setCurrentView('dashboard')} />;
      case 'enrolled-courses':
        return <EnrolledCourses onBack={() => setCurrentView('dashboard')} onContinueLearning={handleContinueLearning} />;
      case 'certificates':
        return <Certificates onBack={() => setCurrentView('dashboard')} />;
      case 'learning-hours':
        return <LearningHours onBack={() => setCurrentView('dashboard')} />;
      default:
        return user.role === 'instructor' ? 
          <InstructorDashboard onQuickAction={handleQuickAction} /> : 
          <StudentDashboard onContinueLearning={handleContinueLearning} onNavigate={handleStudentNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      {renderNavigation()}
      {renderCurrentView()}
    </div>
  );
};

export default Index;
