"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { BarChart3, Calendar, Loader2, Activity, MousePointerClick } from 'lucide-react';

type DateRange = '7days' | '30days' | '90days' | 'custom';

interface AnalyticsData {
  totalWaitlist: number;
  totalTools: number;
  totalNews: number;
  recentSignups: number;
  pageViews: {
    total: number;
    unique: number;
    byDate: Record<string, { pageViews: number, uniqueViews: number }>;
    byPage: Record<string, { pageViews: number, uniqueViews: number }>;
  };
  events: {
    byType: Record<string, number>;
    byPage: Record<string, number>;
    topEvents: Array<{
      id: string;
      eventType: string;
      elementId: string;
      elementName?: string;
      page: string;
      count: number;
      date: Date;
    }>;
  };
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange>('30days');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [customDateRange, setCustomDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });
  const [isClearing, setIsClearing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  
  // Format a date to YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  // Set date range based on selection
  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    
    const today = new Date();
    let start = new Date();
    
    switch(range) {
      case '7days':
        start.setDate(today.getDate() - 7);
        setStartDate(formatDate(start));
        setEndDate(formatDate(today));
        break;
      case '30days':
        start.setDate(today.getDate() - 30);
        setStartDate(formatDate(start));
        setEndDate(formatDate(today));
        break;
      case '90days':
        start.setDate(today.getDate() - 90);
        setStartDate(formatDate(start));
        setEndDate(formatDate(today));
        break;
      case 'custom':
        // Don't change dates, just update the range type
        break;
    }
  };
  
  // Apply custom date range
  const handleCustomDateRange = () => {
    if (customDateRange.start && customDateRange.end) {
      setStartDate(customDateRange.start);
      setEndDate(customDateRange.end);
    }
  };
  
  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    
    try {
      const queryParams = new URLSearchParams();
      if (startDate) queryParams.append('startDate', startDate);
      if (endDate) queryParams.append('endDate', endDate);
      
      // Get the base URL from window location to handle Docker environment correctly
      const baseUrl = window.location.origin;
      
      const response = await fetch(`${baseUrl}/api/admin/analytics?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setAnalyticsData(result.data);
      } else {
        console.error('API returned error:', result.message);
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle export
  const handleExport = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (startDate) queryParams.append('startDate', startDate);
      if (endDate) queryParams.append('endDate', endDate);

      // Get the base URL from window location to handle Docker environment correctly
      const baseUrl = window.location.origin;

      const res = await fetch(`${baseUrl}/api/admin/analytics/export?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to export analytics');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${startDate}-${endDate}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Export failed');
    }
  };

  // Handle clear
  const handleClear = async () => {
    if (!confirm('This will delete ALL analytics data. Are you sure?')) return;
    try {
      setIsProcessing(true);
      // Get the base URL from window location to handle Docker environment correctly
      const baseUrl = window.location.origin;
      
      const res = await fetch(`${baseUrl}/api/admin/analytics/clear`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to clear analytics data');
      }
      setMessage('Analytics data cleared successfully!');
      setTimeout(() => setMessage(''), 3000);
      
      // Refresh data
      await fetchAnalyticsData();
    } catch (error) {
      console.error('Error clearing analytics:', error);
      setMessage('Error clearing analytics data');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Initialize with default date range (30 days)
  useEffect(() => {
    handleDateRangeChange('30days');
  }, []);
  
  // Fetch data when date range changes
  useEffect(() => {
    if (startDate && endDate) {
      fetchAnalyticsData();
    }
  }, [startDate, endDate]);
  
  // Create page views chart data
  const getPageViewsChartData = () => {
    if (!analyticsData?.pageViews?.byDate) return [];
    
    const sortedDates = Object.keys(analyticsData.pageViews.byDate).sort();
    
    return sortedDates.map(date => ({
      date,
      pageViews: analyticsData.pageViews.byDate[date].pageViews,
      uniqueViews: analyticsData.pageViews.byDate[date].uniqueViews
    }));
  };
  
  // Get top pages by views
  const getTopPages = () => {
    if (!analyticsData?.pageViews?.byPage) return [];
    
    return Object.entries(analyticsData.pageViews.byPage)
      .map(([page, data]) => ({
        page,
        ...data
      }))
      .sort((a, b) => b.pageViews - a.pageViews)
      .slice(0, 10);
  };
  
  // Get top events by count
  const getTopEvents = () => {
    if (!analyticsData?.events?.topEvents) return [];
    
    return analyticsData.events.topEvents
      .slice(0, 10);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            size="sm"
            variant={dateRange === '7days' ? 'default' : 'outline'} 
            onClick={() => handleDateRangeChange('7days')}
            className="text-xs"
          >
            Last 7 Days
          </Button>
          <Button 
            size="sm"
            variant={dateRange === '30days' ? 'default' : 'outline'} 
            onClick={() => handleDateRangeChange('30days')}
            className="text-xs"
          >
            Last 30 Days
          </Button>
          <Button 
            size="sm"
            variant={dateRange === '90days' ? 'default' : 'outline'} 
            onClick={() => handleDateRangeChange('90days')}
            className="text-xs"
          >
            Last 90 Days
          </Button>
          <Button 
            size="sm"
            variant={dateRange === 'custom' ? 'default' : 'outline'} 
            onClick={() => handleDateRangeChange('custom')}
            className="text-xs"
          >
            <Calendar className="h-3 w-3 mr-1" />
            Custom
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleExport}
            disabled={isProcessing}
            className="text-xs"
          >
            Export
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleClear}
            disabled={isProcessing}
            className="text-xs"
          >
            Clear
          </Button>
        </div>
      </div>
      
      {dateRange === 'custom' && (
        <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-800 rounded-md">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Start Date</label>
            <input 
              type="date" 
              value={customDateRange.start}
              onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="px-3 py-1 bg-gray-900 border border-gray-700 rounded text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">End Date</label>
            <input 
              type="date" 
              value={customDateRange.end}
              onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="px-3 py-1 bg-gray-900 border border-gray-700 rounded text-sm"
            />
          </div>
          <div className="self-end">
            <Button size="sm" onClick={handleCustomDateRange}>Apply</Button>
          </div>
        </div>
      )}

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-transparent border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.pageViews?.total || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-transparent border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.pageViews?.unique || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-transparent border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Event Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData?.events?.byType?.['click'] || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-transparent border border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Waitlist Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.totalWaitlist || 0}</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="pageviews" className="w-full">
        <TabsList className="mb-4 bg-gray-800">
          <TabsTrigger value="pageviews" className="data-[state=active]:bg-gray-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Page Views
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-gray-700">
            <MousePointerClick className="h-4 w-4 mr-2" />
            Events
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pageviews">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Page Views Chart would go here */}
            <Card className="bg-transparent border border-white/10">
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-gray-400 font-medium text-xs uppercase">Page</th>
                        <th className="text-right p-3 text-gray-400 font-medium text-xs uppercase">Views</th>
                        <th className="text-right p-3 text-gray-400 font-medium text-xs uppercase">Unique</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTopPages().map((page, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                          <td className="p-3 truncate max-w-[200px]">{page.page}</td>
                          <td className="p-3 text-right">{page.pageViews}</td>
                          <td className="p-3 text-right">{page.uniqueViews}</td>
                        </tr>
                      ))}
                      {getTopPages().length === 0 && (
                        <tr>
                          <td colSpan={3} className="p-3 text-center text-gray-400">
                            No page view data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="events">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-transparent border border-white/10">
              <CardHeader>
                <CardTitle>Top Events</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-gray-400 font-medium text-xs uppercase">Element</th>
                        <th className="text-left p-3 text-gray-400 font-medium text-xs uppercase">Page</th>
                        <th className="text-left p-3 text-gray-400 font-medium text-xs uppercase">Type</th>
                        <th className="text-right p-3 text-gray-400 font-medium text-xs uppercase">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTopEvents().map((event) => (
                        <tr key={event.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="p-3 truncate max-w-[150px]">{event.elementName || event.elementId}</td>
                          <td className="p-3 truncate max-w-[150px]">{event.page}</td>
                          <td className="p-3">{event.eventType}</td>
                          <td className="p-3 text-right">{event.count}</td>
                        </tr>
                      ))}
                      {getTopEvents().length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-3 text-center text-gray-400">
                            No event data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 