
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import AuthForm from '@/components/auth/AuthForm';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import InstructorDashboard from '@/components/dashboard/InstructorDashboard';
import CourseCatalog from '@/components/courses/CourseCatalog';
import CourseUpload from '@/components/courses/CourseUpload';
import LearningInterface from '@/components/learning/LearningInterface';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, catalog, upload, learning

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
          <Button
            variant={currentView === 'catalog' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('catalog')}
            className={currentView === 'catalog' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : ''}
          >
            Course Catalog
          </Button>
          {user.role === 'instructor' && (
            <Button
              variant={currentView === 'upload' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('upload')}
              className={currentView === 'upload' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : ''}
            >
              Upload Course
            </Button>
          )}
          <Button
            variant={currentView === 'learning' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('learning')}
            className={currentView === 'learning' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : ''}
          >
            Learning Interface
          </Button>
        </nav>
      </div>
    </div>
  );

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'catalog':
        return <CourseCatalog />;
      case 'upload':
        return user.role === 'instructor' ? <CourseUpload /> : <StudentDashboard />;
      case 'learning':
        return <LearningInterface />;
      default:
        return user.role === 'instructor' ? <InstructorDashboard /> : <StudentDashboard />;
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
