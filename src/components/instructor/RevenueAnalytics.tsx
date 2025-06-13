
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowLeft, DollarSign, TrendingUp, Calendar } from 'lucide-react';

interface RevenueAnalyticsProps {
  onBack: () => void;
}

const RevenueAnalytics = ({ onBack }: RevenueAnalyticsProps) => {
  const monthlyRevenue = [
    { month: 'Jan', revenue: 1200, courses: 2 },
    { month: 'Feb', revenue: 1800, courses: 3 },
    { month: 'Mar', revenue: 2400, courses: 3 },
    { month: 'Apr', revenue: 2100, courses: 4 },
    { month: 'May', revenue: 2800, courses: 4 },
    { month: 'Jun', revenue: 3200, courses: 4 }
  ];

  const courseRevenue = [
    { course: 'Advanced JavaScript', revenue: 2494, students: 1247, avgPrice: 2 },
    { course: 'React Hook Mastery', revenue: 1784, students: 892, avgPrice: 2 },
    { course: 'Node.js Backend', revenue: 1268, students: 634, avgPrice: 2 },
    { course: 'TypeScript Fundamentals', revenue: 0, students: 0, avgPrice: 0 }
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
    courses: {
      label: "Courses",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
          <p className="text-gray-600">Track your earnings and performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold">$5,546</p>
                <p className="text-emerald-200 text-xs mt-1">+12% from last month</p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Monthly Growth</p>
                <p className="text-3xl font-bold">+14%</p>
                <p className="text-blue-200 text-xs mt-1">Compared to last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Avg. Monthly</p>
                <p className="text-3xl font-bold">$924</p>
                <p className="text-purple-200 text-xs mt-1">Over 6 months</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Revenue growth over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenue}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--color-revenue)" 
                    strokeWidth={3}
                    dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Revenue by Course</CardTitle>
            <CardDescription>Earnings breakdown by individual courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courseRevenue}>
                  <XAxis dataKey="course" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Course Performance Details</CardTitle>
          <CardDescription>Detailed revenue breakdown for each course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courseRevenue.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{course.course}</h3>
                  <p className="text-sm text-gray-600">{course.students} students enrolled</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-600">${course.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">
                    {course.avgPrice > 0 ? `$${course.avgPrice} avg` : 'Free course'}
                  </p>
                </div>
                <Badge variant={course.revenue > 0 ? "default" : "secondary"} className="ml-4">
                  {course.revenue > 0 ? "Active" : "Draft"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueAnalytics;
