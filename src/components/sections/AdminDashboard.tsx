"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Users, Settings, Mail, MessageSquare, BarChart3 } from 'lucide-react';

// Real API functions for fetching data
const fetchAnalytics = async () => {
  try {
    // Get the base URL from window location to handle Docker environment correctly
    const baseUrl = window.location.origin;
    
    const response = await fetch(`${baseUrl}/api/admin/analytics`);
    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch analytics data');
    }
    
    return {
      waitlistCount: result.data.totalWaitlist,
      // newsArticleCount: result.data.totalNews,
      aiToolCount: result.data.totalTools,
      contactFormsCount: result.data.totalContactForms,
      recentSignups: result.data.recentSignups
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      waitlistCount: 0,
      // newsArticleCount: 0,
      aiToolCount: 0,
      contactFormsCount: 0,
      recentSignups: 0
    };
  }
};

const fetchWaitlist = async () => {
  try {
    // Get the base URL from window location to handle Docker environment correctly
    const baseUrl = window.location.origin;
    
    const response = await fetch(`${baseUrl}/api/admin/waitlist`);
    if (!response.ok) {
      throw new Error('Failed to fetch waitlist data');
    }
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch waitlist data');
    }
    
    return result.data || [];
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return [];
  }
};

const fetchNews = async () => {
  try {
    // Get the base URL from window location to handle Docker environment correctly
    const baseUrl = window.location.origin;
    
    const response = await fetch(`${baseUrl}/api/admin/news`);
    if (!response.ok) {
      throw new Error('Failed to fetch news data');
    }
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch news data');
    }
    
    return result.data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

const fetchAITools = async () => {
  try {
    // Get the base URL from window location to handle Docker environment correctly
    const baseUrl = window.location.origin;
    
    const response = await fetch(`${baseUrl}/api/admin/ai-tools`);
    if (!response.ok) {
      throw new Error('Failed to fetch AI tools data');
    }
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch AI tools data');
    }
    
    return result.data || [];
  } catch (error) {
    console.error('Error fetching AI tools:', error);
    return [];
  }
};

const fetchContactForms = async () => {
  try {
    // Get the base URL from window location to handle Docker environment correctly
    const baseUrl = window.location.origin;
    
    const response = await fetch(`${baseUrl}/api/contact`);
    if (!response.ok) {
      throw new Error('Failed to fetch contact form submissions');
    }
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch contact form submissions');
    }
    
    return result.inquiries || [];
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    return [];
  }
};

const AIToolsManager = () => {
  const [tools, setTools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({
    id: undefined,
    name: '',
    description: '',
    category: '',
    url: '',
    pricing: '',
    tags: '',
  });
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  // Derived category list for filter dropdown
  const categoryOptions = React.useMemo(() => {
    const set = new Set<string>();
    tools.forEach(t => {
      if (t.category) set.add(t.category);
    });
    return Array.from(set).sort();
  }, [tools]);

  // Helper to detect price category
  const getPriceTag = (pricing: string | null) => {
    if (!pricing || pricing.toLowerCase().includes('free')) return 'free';
    return 'paid';
  };

  const filteredTools = tools.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesPrice = selectedPrice === 'all' || getPriceTag(t.pricing) === selectedPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const loadTools = async () => {
    setIsLoading(true);
    const data = await fetchAITools();
    setTools(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadTools();
  }, []);

  const openAddForm = () => {
    setFormData({ id: undefined, name: '', description: '', category: '', url: '', pricing: '', tags: '' });
    setShowForm(true);
  };

  const openEditForm = (tool: any) => {
    setFormData({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      category: tool.category,
      url: tool.url,
      pricing: tool.pricing === 'Unknown' ? '' : tool.pricing,
      tags: tool.tags?.join(', ') || '',
    });
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description || !formData.category) return;
    setSaving(true);
    try {
      // Get the base URL from window location to handle Docker environment correctly
      const baseUrl = window.location.origin;

      if (formData.id) {
        // Update existing tool
        const response = await fetch(`${baseUrl}/api/admin/ai-tools/${formData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            category: formData.category,
            url: formData.url,
            pricing: formData.pricing,
            tags: formData.tags.split(',').map((t: string) => t.trim()),
          }),
        });
        if (!response.ok) throw new Error('Failed to update');
      } else {
        // Create new tool
        const response = await fetch(`${baseUrl}/api/admin/ai-tools`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            category: formData.category,
            url: formData.url,
            pricing: formData.pricing,
            tags: formData.tags.split(',').map((t: string) => t.trim()),
          }),
        });
        if (!response.ok) throw new Error('Failed to create');
      }
      await loadTools();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert('Error saving tool');
    } finally {
      setSaving(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Workflow Automation': 'bg-white/10 text-gray-300 border-white/20',
      'LLM Runtime': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      'Code Editor': 'bg-white/15 text-gray-200 border-white/30',
      'AI Chatbot': 'bg-gray-400/10 text-gray-300 border-gray-400/20',
      'Code Assistant': 'bg-white/20 text-gray-100 border-white/40',
      'AI API': 'bg-gray-600/10 text-gray-400 border-gray-600/20',
      'ML Library': 'bg-gray-300/10 text-gray-300 border-gray-300/20',
      'Image Generation': 'bg-white/12 text-gray-200 border-white/25',
      'Vector Database': 'bg-gray-500/12 text-gray-300 border-gray-500/25',
      'Cloud GPU': 'bg-gray-400/12 text-gray-300 border-gray-400/25',
      Uncategorized: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    return colors[category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  return (
    <Card className="bg-transparent border border-white/10 relative">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Manage AI Tools</CardTitle>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 rounded-md border border-gray-700 px-3 py-1 text-sm hover:bg-gray-800"
        >
          + Add Tool
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-400"
          />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white min-w-[150px]"
          >
            <option value="all">All Categories</option>
            {categoryOptions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={selectedPrice}
            onChange={e => setSelectedPrice(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white min-w-[120px]"
          >
            <option value="all">All Prices</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : filteredTools.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No AI tools found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool: any) => (
              <div key={tool.id} className="bg-transparent border border-white/10 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{tool.name}</h4>
                  <div className="flex gap-2 text-sm">
                    <button onClick={() => openEditForm(tool)} className="text-gray-400 hover:text-blue-400">
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm('Delete this tool?')) return;
                        try {
                          const resp = await fetch(`/api/admin/ai-tools/${tool.id}`, { method: 'DELETE' });
                          if (!resp.ok) throw new Error('Failed');
                          await loadTools();
                        } catch (e) {
                          alert('Error deleting');
                        }
                      }}
                      className="text-red-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xs break-words mb-2 inline-block">
                  {tool.url}
                </a>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs border ${getCategoryColor(tool.category)}`}>{tool.category}</span>
                </div>
                <p className="text-gray-300 text-xs line-clamp-3 mb-2">{tool.description}</p>
                {tool.pricing && <p className="text-green-400 text-xs">{tool.pricing}</p>}
              </div>
            ))}
          </div>
        )}
        {/* No results message */}
        {!isLoading && filteredTools.length === 0 && (
          <p className="text-center text-gray-400">No tools match your criteria.</p>
        )}
      </CardContent>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-transparent border border-white/20 rounded-lg w-full max-w-lg p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4 text-white">
              {formData.id ? 'Edit Tool' : 'Add New Tool'}
            </h3>
            <div className="space-y-4">
              <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
              <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
              <input name="url" placeholder="URL" value={formData.url} onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
              <input name="pricing" placeholder="Pricing" value={formData.pricing} onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
              <input name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border border-gray-700 rounded hover:bg-gray-800">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white disabled:opacity-50">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

const WaitlistManager = () => {
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWaitlist = async () => {
    setIsLoading(true);
    const data = await fetchWaitlist();
    setWaitlist(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadWaitlist();
  }, []);

  return (
    <Card className="bg-transparent border border-white/10">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Waitlist Entries</CardTitle>
        <button
          onClick={loadWaitlist}
          disabled={isLoading}
          className="inline-flex items-center gap-1 rounded-md border border-gray-700 px-3 py-1 text-sm hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75a9 9 0 0110.605-8.69m3.853 1.548A9.001 9.001 0 0121.75 12"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 5.25l1.5-3 1.5 3M2.25 12c0 4.97 4.03 9 9 9"
              />
            </svg>
          )}
          <span className="sr-only">Refresh</span>
        </button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : waitlist.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No waitlist entries found.</p>
        ) : (
          <ul>
            {waitlist.map((entry: any) => (
              <li key={entry.id} className="border-b border-gray-800 py-2">
                <p className="font-semibold">{entry.name}</p>
                <p className="text-sm text-gray-400">{entry.email}</p>
                <p className="text-xs text-gray-500">{entry.createdAt}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

const ContactFormsManager = () => {
  const [contactForms, setContactForms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const loadContactForms = async () => {
      setIsLoading(true);
      const data = await fetchContactForms();
      setContactForms(data);
      setIsLoading(false);
    };
    loadContactForms();
  }, []);

  // Filter contact forms by status
  const filteredForms = selectedStatus === 'all' 
    ? contactForms 
    : contactForms.filter(form => form.status === selectedStatus);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'RESPONDED': return 'bg-green-500/20 text-green-300 border-green-500/40';
      case 'CLOSED': return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  const updateContactFormStatus = async (id: string, status: string) => {
    try {
      // Get the base URL from window location to handle Docker environment correctly
      const baseUrl = window.location.origin;
      
      const response = await fetch(`${baseUrl}/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      
      // Update local state
      setContactForms(prev => 
        prev.map(form => form.id === id ? { ...form, status } : form)
      );
      
    } catch (error) {
      console.error('Error updating contact form status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  return (
    <Card className="bg-transparent border border-white/10">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Contact Form Submissions</CardTitle>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white"
        >
          <option value="all">All Statuses</option>
          <option value="NEW">New</option>
          <option value="RESPONDED">Responded</option>
          <option value="CLOSED">Closed</option>
        </select>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : filteredForms.length > 0 ? (
          <div className="space-y-4">
            {filteredForms.map((form) => (
              <div key={form.id} className="p-4 border border-white/10 rounded-lg bg-black/20">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{form.name}</span>
                    <span className="text-gray-400 text-sm">({form.email})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${getStatusBadgeClass(form.status)}`}>
                      {form.status}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(form.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {form.company && (
                  <div className="text-sm text-gray-300 mb-2">
                    <strong>Company:</strong> {form.company}
                  </div>
                )}
                
                {form.serviceType && (
                  <div className="text-sm text-gray-300 mb-2">
                    <strong>Interest:</strong> {form.serviceType}
                  </div>
                )}
                
                <div className="text-sm mb-4 border-l-2 border-gray-700 pl-3 py-1">
                  {form.message}
                </div>
                
                <div className="flex items-center gap-2">
                  <select
                    value={form.status}
                    onChange={(e) => updateContactFormStatus(form.id, e.target.value)}
                    className="px-2 py-1 text-xs bg-gray-800 border border-gray-700 rounded"
                  >
                    <option value="NEW">Mark as New</option>
                    <option value="RESPONDED">Mark as Responded</option>
                    <option value="CLOSED">Mark as Closed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-8">
            No contact form submissions found.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const TerminalChatAnalytics = () => {
  const [chatData, setChatData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setIsLoading(true);
        // Get the base URL from window location to handle Docker environment correctly
        const baseUrl = window.location.origin;
        
        const response = await fetch(`${baseUrl}/api/admin/analytics`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch terminal chat data');
        }
        
        const result = await response.json();
        
        if (result.success && result.data.terminalChat) {
          setChatData(result.data.terminalChat);
        } else {
          console.error('API returned error or missing data');
        }
      } catch (error) {
        console.error('Error fetching terminal chat data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChatData();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }
  
  if (!chatData) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-400">No terminal chat data available</p>
      </div>
    );
  }
  
  const { total, uniqueSessions, uniqueVisitors, byRole, byPage, recentSessions } = chatData;
  
  // Format the role counts for display
  const roleCounts = Object.entries(byRole || {}).map(([role, count]) => ({
    role,
    count: count as number,
  }));
  
  // Format the page counts for display
  const pageCounts = Object.entries(byPage || {}).map(([page, count]) => ({
    page,
    count: count as number,
  })).sort((a, b) => b.count - a.count);
  
  const viewSession = (sessionId: string) => {
    setSelectedSession(selectedSession === sessionId ? null : sessionId);
  };
  
  // Find the selected session
  const selectedSessionData = selectedSession 
    ? recentSessions.find((session: any[]) => session[0]?.sessionId === selectedSession) 
    : null;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{total || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Unique Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{uniqueSessions || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{uniqueVisitors || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg. Messages/Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {uniqueSessions ? (total / uniqueSessions).toFixed(1) : '0'}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role breakdown */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white">Message Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {roleCounts.map(({ role, count }) => (
                <div key={role} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${
                      role === 'user' ? 'bg-green-500' : 
                      role === 'assistant' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}></span>
                    <span className="font-medium capitalize text-gray-300">{role}</span>
                  </div>
                  <span className="text-gray-400">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Page breakdown */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white">Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {pageCounts.slice(0, 10).map(({ page, count }) => (
                <div key={page} className="flex items-center justify-between">
                  <span className="font-medium truncate max-w-[70%] text-gray-300">{page || 'unknown'}</span>
                  <span className="text-gray-400">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent sessions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-white">Recent Chat Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSessions.length > 0 ? (
              recentSessions.map((session: any[]) => {
                // Each session is an array of messages
                if (!session.length) return null;
                
                const firstMessage = session[0];
                const sessionId = firstMessage.sessionId;
                const timestamp = new Date(firstMessage.timestamp).toLocaleString();
                const messageCount = session.length;
                const isSelected = selectedSession === sessionId;
                
                return (
                  <div key={sessionId} className="border border-gray-700 rounded-md overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-3 bg-gray-800 cursor-pointer"
                      onClick={() => viewSession(sessionId)}
                    >
                      <div className="flex flex-col">
                        <div className="font-medium text-gray-200">Session {sessionId.substring(0, 8)}...</div>
                        <div className="text-xs text-gray-400">{timestamp}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">{messageCount} messages</span>
                        <svg 
                          className={`w-4 h-4 transition-transform text-gray-400 ${isSelected ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="p-3 bg-gray-800/50 max-h-80 overflow-y-auto space-y-2">
                        {session.map((message: any) => (
                          <div 
                            key={message.id} 
                            className={`p-2 rounded-md ${
                              message.role === 'user' ? 'bg-green-950/40 border-l-4 border-green-600' : 
                              message.role === 'assistant' ? 'bg-blue-950/40 border-l-4 border-blue-600' : 
                              'bg-gray-800/40 border-l-4 border-gray-600'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium capitalize text-gray-300">{message.role}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-sm whitespace-pre-wrap text-gray-300">{message.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400">No recent chat sessions</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      const data = await fetchAnalytics();
      setAnalyticsData(data);
    };
    loadAnalytics();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-8 flex flex-wrap gap-2 bg-transparent w-full border-b border-gray-700 pb-2">
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="waitlist"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Waitlist
          </TabsTrigger>
          <TabsTrigger 
            value="ai-tools"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            AI Tools
          </TabsTrigger>
          <TabsTrigger 
            value="contact"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Contact Forms
          </TabsTrigger>
          <TabsTrigger 
            value="terminal-chat"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Terminal Chat
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Waitlist Entries
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.waitlistCount || 0}</div>
                <p className="text-xs text-muted-foreground">
                  +{analyticsData?.recentSignups || 0} in the last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  AI Tools Listed
                </CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.aiToolCount || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Contact Forms
                </CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.contactFormsCount || 0}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="waitlist">
          <WaitlistManager />
        </TabsContent>
        
        <TabsContent value="ai-tools">
          <AIToolsManager />
        </TabsContent>
        
        <TabsContent value="contact">
          <ContactFormsManager />
        </TabsContent>
        
        <TabsContent value="terminal-chat">
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-white">
              <MessageSquare className="w-6 h-6 mr-2 text-blue-500" />
              Terminal Chat Analytics
            </h2>
            <TerminalChatAnalytics />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 