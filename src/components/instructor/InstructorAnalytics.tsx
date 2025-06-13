
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign, Eye, Clock } from 'lucide-react';

const InstructorAnalytics = () => {
  // Sample analytics data
  const analyticsData = {
    totalViews: 45230,
    totalEnrollments: 2773,
    totalRevenue: 5546,
    avgRating: 4.8,
    coursePerformance: [
      { name: "Advanced JavaScript", enrollments: 1247, revenue: 2494, rating: 4.8, views: 15420 },
      { name: "React Hook Mastery", enrollments: 892, revenue: 1784, rating: 4.9, views: 12380 },
      { name: "Node.js Backend", enrollments: 634, revenue: 1268, rating: 4.7, views: 10230 },
    ],
    monthlyStats: [
      { month: "Jan", revenue: 1200, enrollments: 150 },
      { month: "Feb", revenue: 1800, enrollments: 220 },
      { month: "Mar", revenue: 2400, enrollments: 310 },
      { month: "Apr", revenue: 1900, enrollments: 280 },
      { month: "May", revenue: 3200, enrollments: 420 },
      { month: "Jun", revenue: 2800, enrollments: 380 },
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-500" />
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">Track your course performance and earnings</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Views</p>
                <p className="text-3xl font-bold">{analyticsData.totalViews.toLocaleString()}</p>
                <p className="text-blue-200 text-xs mt-1">+15% this month</p>
              </div>
              <Eye className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold">${analyticsData.totalRevenue.toLocaleString()}</p>
                <p className="text-emerald-200 text-xs mt-1">+12% this month</p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Enrollments</p>
                <p className="text-3xl font-bold">{analyticsData.totalEnrollments.toLocaleString()}</p>
                <p className="text-purple-200 text-xs mt-1">+8% this month</p>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Avg. Rating</p>
                <p className="text-3xl font-bold">{analyticsData.avgRating}</p>
                <p className="text-orange-200 text-xs mt-1">Across all courses</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Performance */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Individual course statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.coursePerformance.map((course, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">{course.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Views</p>
                      <p className="font-semibold text-blue-600">{course.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Enrollments</p>
                      <p className="font-semibold text-purple-600">{course.enrollments.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue</p>
                      <p className="font-semibold text-emerald-600">${course.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Rating</p>
                      <p className="font-semibold text-orange-600">{course.rating}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Revenue and enrollment trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analyticsData.monthlyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">{stat.month}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">${stat.revenue}</p>
                      <p className="text-sm text-gray-600">{stat.enrollments} enrollments</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${(stat.revenue / 3500) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <Card className="shadow-lg border-0 mt-8">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>Performance highlights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-800">Top Performer</h3>
              </div>
              <p className="text-sm text-emerald-700">React Hook Mastery has the highest rating (4.9) and strong enrollment growth.</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">High Visibility</h3>
              </div>
              <p className="text-sm text-blue-700">Advanced JavaScript has the most views but could improve conversion rate.</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-purple-800">Growth Opportunity</h3>
              </div>
              <p className="text-sm text-purple-700">May was your best month. Consider launching new courses during peak times.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorAnalytics;
