
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowLeft, Clock, TrendingUp, Calendar } from 'lucide-react';

interface LearningHoursProps {
  onBack: () => void;
}

const LearningHours = ({ onBack }: LearningHoursProps) => {
  const dailyHours = [
    { day: 'Mon', hours: 2.5, date: '2024-06-10' },
    { day: 'Tue', hours: 1.8, date: '2024-06-11' },
    { day: 'Wed', hours: 3.2, date: '2024-06-12' },
    { day: 'Thu', hours: 2.1, date: '2024-06-13' },
    { day: 'Fri', hours: 4.0, date: '2024-06-14' },
    { day: 'Sat', hours: 3.5, date: '2024-06-15' },
    { day: 'Sun', hours: 2.8, date: '2024-06-16' }
  ];

  const weeklyHours = [
    { week: 'Week 1', hours: 15.2 },
    { week: 'Week 2', hours: 18.5 },
    { week: 'Week 3', hours: 22.1 },
    { week: 'Week 4', hours: 19.9 }
  ];

  const totalHours = dailyHours.reduce((sum, day) => sum + day.hours, 0);
  const averageHours = totalHours / dailyHours.length;

  const chartConfig = {
    hours: {
      label: "Hours",
      color: "#3b82f6",
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
          <h1 className="text-3xl font-bold text-gray-900">Learning Hours</h1>
          <p className="text-gray-600">Track your learning progress over time</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">This Week</p>
                <p className="text-3xl font-bold">{totalHours.toFixed(1)}h</p>
              </div>
              <Clock className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Daily Average</p>
                <p className="text-3xl font-bold">{averageHours.toFixed(1)}h</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Streak Days</p>
                <p className="text-3xl font-bold">7</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Hours Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Daily Learning Hours</CardTitle>
            <CardDescription>Hours spent learning each day this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={dailyHours}>
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Trend Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Weekly Learning Trend</CardTitle>
            <CardDescription>Learning hours over the past 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={weeklyHours}>
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="var(--color-hours)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--color-hours)", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Learning Details */}
      <Card className="shadow-lg mt-8">
        <CardHeader>
          <CardTitle>This Week's Learning Sessions</CardTitle>
          <CardDescription>Detailed breakdown of your learning activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dailyHours.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold">{day.day}</span>
                  </div>
                  <div>
                    <p className="font-medium">{new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}</p>
                    <p className="text-sm text-gray-600">{day.hours} hours of learning</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-blue-600">{day.hours}h</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningHours;
