
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Upload, Loader2, Facebook, Github, Instagram, Linkedin, Youtube, BookOpen, Clock, Award, Users, TrendingUp, Calendar, Edit, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const uploadProfilePic = (file: File) =>
  new Promise<string>((resolve) =>
    setTimeout(() => resolve(URL.createObjectURL(file)), 1000)
  );

const SOCIAL_FIELDS = [
  { key: "facebook", label: "Facebook", Icon: Facebook, placeholder: "Facebook URL" },
  { key: "github", label: "GitHub", Icon: Github, placeholder: "GitHub URL" },
  { key: "instagram", label: "Instagram", Icon: Instagram, placeholder: "Instagram URL" },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin, placeholder: "LinkedIn URL" },
  { key: "youtube", label: "YouTube", Icon: Youtube, placeholder: "YouTube URL" },
];

const LANGUAGES = ["English", "Spanish", "French", "German", "Chinese"];

const DEFAULT_SOCIAL = {
  facebook: "",
  github: "",
  instagram: "",
  linkedin: "",
  youtube: ""
};

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user =
    location.state && location.state.user
      ? location.state.user
      : {
          username: "ryan",
          name: "Harsh Kumar",
          email: "harsh@example.com",
          role: "Student",
          language: "English",
          rating: 4.5,
          profilePic: "",
          social: { ...DEFAULT_SOCIAL },
        };

  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [language, setLanguage] = useState(user.language);
  const [password, setPassword] = useState("");
  const [social, setSocial] = useState(
    user.social ? { ...DEFAULT_SOCIAL, ...user.social } : { ...DEFAULT_SOCIAL }
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const isStudent = role.toLowerCase() === 'student';
  const isMentor = role.toLowerCase() === 'instructor' || role.toLowerCase() === 'mentor';

  // Handle profile image upload
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      setError("");
      try {
        const url = await uploadProfilePic(e.target.files[0]);
        setProfilePic(url);
      } catch {
        setError("Failed to upload image.");
      }
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setTimeout(() => {
      setSaving(false);
      setIsEditing(false);
    }, 900);
  };

  const studentStats = [
    { label: "Enrolled Courses", value: "12", icon: BookOpen, color: "text-blue-600" },
    { label: "Hours Spent", value: "89", icon: Clock, color: "text-green-600" },
    { label: "Certificates", value: "5", icon: Award, color: "text-purple-600" },
    { label: "Streak Days", value: "23", icon: TrendingUp, color: "text-orange-600" },
  ];

  const mentorStats = [
    { label: "Students Taught", value: "156", icon: Users, color: "text-blue-600" },
    { label: "Courses Created", value: "8", icon: BookOpen, color: "text-green-600" },
    { label: "Total Revenue", value: "$12,450", icon: TrendingUp, color: "text-purple-600" },
    { label: "Rating", value: "4.8", icon: Award, color: "text-orange-600" },
  ];

  const recentCourses = [
    { name: "User Experience (UX) Design", progress: 75, lessons: 25, assignments: 5 },
    { name: "Visual Design and Branding", progress: 45, lessons: 18, assignments: 3 },
    { name: "Frontend Development Basics", progress: 90, lessons: 32, assignments: 8 },
  ];

  const upcomingLessons = [
    { name: "UX Design Fundamentals", time: "6:30pm", date: "Today" },
    { name: "Interaction Design", time: "9:00pm", date: "Tomorrow" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Dashboard
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">
              Hello {name.split(' ')[0]} 👋
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  {profilePic ? (
                    <AvatarImage src={profilePic} alt={name} />
                  ) : (
                    <AvatarFallback>
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  )}
                </Avatar>
                {isEditing && (
                  <>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={onAvatarChange}
                      disabled={uploading}
                    />
                    <button
                      className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 text-white hover:bg-blue-700"
                      onClick={() => avatarInputRef.current?.click()}
                      disabled={uploading}
                    >
                      <Upload className="w-3 h-3" />
                    </button>
                  </>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{name}</p>
                <p className="text-xs text-gray-500">{role}</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-600 mt-2">Let's learn something new today!</p>
      </div>

      <div className="p-6">
        {isEditing ? (
          /* Edit Form */
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <Input value={username} onChange={e => setUsername(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input value={email} type="email" onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <Input value={role} onChange={e => setRole(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select 
                      className="w-full h-10 px-3 py-2 bg-white rounded-md border border-gray-300"
                      value={language} 
                      onChange={e => setLanguage(e.target.value)}
                    >
                      {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <Input 
                      value={password} 
                      type="password" 
                      onChange={e => setPassword(e.target.value)} 
                      placeholder="Leave blank to keep unchanged"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Social Links</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SOCIAL_FIELDS.map(field => (
                      <div key={field.key} className="flex items-center gap-2">
                        <field.Icon className="w-4 h-4 text-gray-400" />
                        <Input
                          type="url"
                          placeholder={field.placeholder}
                          value={social[field.key] || ""}
                          onChange={e => setSocial({ ...social, [field.key]: e.target.value })}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <div className="flex gap-3">
                  <Button type="submit" disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* Dashboard View */
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(isStudent ? studentStats : mentorStats).map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Courses */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    {isStudent ? 'Recent enrolled courses' : 'Your Courses'}
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                    See more
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{course.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {course.lessons} Lessons
                            </span>
                            <span className="flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              {course.assignments} Assignments
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-orange-500 transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 mt-1">{course.progress}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Calendar Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-600 mb-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                        <div key={day} className="py-2">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-sm">
                      {Array.from({ length: 35 }, (_, i) => {
                        const date = i - 6 + new Date().getDate();
                        const isToday = date === new Date().getDate();
                        return (
                          <div
                            key={i}
                            className={`aspect-square flex items-center justify-center rounded ${
                              isToday 
                                ? 'bg-orange-500 text-white font-medium' 
                                : date > 0 && date <= 31 
                                  ? 'hover:bg-gray-100 cursor-pointer' 
                                  : 'text-gray-300'
                            }`}
                          >
                            {date > 0 && date <= 31 ? date : ''}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Lessons */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Upcoming Lesson</CardTitle>
                    <Button variant="ghost" size="sm" className="text-orange-600">
                      See more
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingLessons.map((lesson, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <h4 className="font-medium text-sm">{lesson.name}</h4>
                            <p className="text-xs text-gray-600">{lesson.time}</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                          Join
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
