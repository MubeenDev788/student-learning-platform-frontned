
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Eye, ArrowLeft, Calendar } from 'lucide-react';

interface CertificatesProps {
  onBack: () => void;
}

const Certificates = ({ onBack }: CertificatesProps) => {
  const certificates = [
    {
      id: 1,
      courseName: "Introduction to Machine Learning",
      instructor: "Dr. Sarah Chen",
      completionDate: "2024-05-15",
      issueDate: "2024-05-16",
      grade: "A+",
      certificateId: "ML-2024-001",
      validUntil: "2029-05-16"
    },
    {
      id: 2,
      courseName: "Web Development Fundamentals",
      instructor: "Mark Johnson",
      completionDate: "2024-04-20",
      issueDate: "2024-04-21",
      grade: "A",
      certificateId: "WD-2024-002",
      validUntil: "2029-04-21"
    },
    {
      id: 3,
      courseName: "Data Science Basics",
      instructor: "Prof. Lisa Wang",
      completionDate: "2024-03-10",
      issueDate: "2024-03-11",
      grade: "B+",
      certificateId: "DS-2024-003",
      validUntil: "2029-03-11"
    }
  ];

  const handleDownload = (certificate: any) => {
    // Simulate certificate download
    console.log(`Downloading certificate: ${certificate.certificateId}`);
    // In a real app, this would generate and download a PDF
    alert(`Certificate ${certificate.certificateId} downloaded successfully!`);
  };

  const handlePreview = (certificate: any) => {
    // Simulate certificate preview
    console.log(`Previewing certificate: ${certificate.certificateId}`);
    alert(`Opening preview for certificate: ${certificate.courseName}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
          <p className="text-gray-600">Your earned certificates and achievements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <Card key={certificate.id} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-full h-32 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-lg">{certificate.courseName}</CardTitle>
              <CardDescription>by {certificate.instructor}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificate ID:</span>
                  <span className="font-mono">{certificate.certificateId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-semibold text-emerald-600">{certificate.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span>{new Date(certificate.completionDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Issued:</span>
                  <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valid until:</span>
                  <span>{new Date(certificate.validUntil).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handlePreview(certificate)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                  onClick={() => handleDownload(certificate)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
          <p className="text-gray-600">Complete courses to earn your first certificate!</p>
        </div>
      )}
    </div>
  );
};

export default Certificates;
