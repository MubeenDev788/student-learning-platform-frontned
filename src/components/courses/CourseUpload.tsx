
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, Video, FileText, DollarSign, Save, Eye } from 'lucide-react';

const CourseUpload = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    subject: '',
    difficulty: '',
    price: '',
    isFree: false,
    thumbnail: null,
    videoUrl: '',
    materials: []
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Course data:', courseData);
    setIsUploading(false);
    
    // Show success message or redirect
    alert('Course uploaded successfully!');
  };

  const subjects = ["Web Development", "Data Science", "Design", "Marketing", "Business", "Technology"];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Course</h1>
        <p className="text-gray-600">Share your knowledge and help others learn</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Essential details about your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="e.g., Complete Web Development Bootcamp"
                    value={courseData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what students will learn in your course..."
                    value={courseData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="mt-1 min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select onValueChange={(value) => handleInputChange('subject', value)} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(subject => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select onValueChange={(value) => handleInputChange('difficulty', value)} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map(difficulty => (
                          <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>Upload your course materials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Video Upload */}
                <div>
                  <Label htmlFor="video">Course Video</Label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
                    <div className="text-center">
                      <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drop your video file here, or <span className="text-blue-500 cursor-pointer">browse</span>
                      </p>
                      <p className="text-xs text-gray-500">Supports MP4, MOV, AVI up to 2GB</p>
                    </div>
                  </div>
                </div>

                {/* Video URL Alternative */}
                <div>
                  <Label htmlFor="videoUrl">Or provide video URL</Label>
                  <Input
                    id="videoUrl"
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={courseData.videoUrl}
                    onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Additional Materials */}
                <div>
                  <Label htmlFor="materials">Additional Materials</Label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload PDFs, slides, or other materials
                      </p>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                  Pricing
                </CardTitle>
                <CardDescription>Set your course price</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="free-toggle">Free Course</Label>
                  <Switch
                    id="free-toggle"
                    checked={courseData.isFree}
                    onCheckedChange={(checked) => handleInputChange('isFree', checked)}
                  />
                </div>

                {!courseData.isFree && (
                  <div>
                    <Label htmlFor="price">Price (USD)</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={courseData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="pl-8"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                )}

                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> Competitive pricing attracts more students. 
                    Research similar courses for guidance.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Course Thumbnail */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Course Thumbnail</CardTitle>
                <CardDescription>Add an attractive cover image</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Upload course thumbnail
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Upload className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Publish Course
                  </>
                )}
              </Button>
              
              <Button type="button" variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseUpload;
