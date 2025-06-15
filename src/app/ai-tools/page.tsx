'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ExternalLink, Tag, DollarSign } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';

interface AITool {
  id: string;
  name: string;
  category: string;
  type: string;
  description: string;
  url: string;
  pricing: string | null;
  license: string | null;
  isActive: boolean;
  createdAt: string;
}

interface ToolsResponse {
  success: boolean;
  tools: AITool[];
  total: number;
  categories: string[];
  types: string[];
  pagination: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export default function AIToolsPage() {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const fetchTools = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedType !== 'all') params.append('type', selectedType);
      params.append('limit', '100');

      const response = await fetch(`/api/ai-tools?${params}`);
      const data: ToolsResponse = await response.json();

      if (data.success) {
        setTools(data.tools);
        setCategories(data.categories);
        setTypes(data.types);
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, selectedType]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

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
      'Uncategorized': 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      
      <div className="relative">
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 z-0 opacity-30">
          <InteractiveGridPattern 
            className="w-full h-full" 
            dotColor="rgba(255, 255, 255, 0.06)"
            size={20}
          />
        </div>

        {/* Gradient overlay removed to allow Jarvis background to show through */}

        {/* Additional pattern */}
        <div className="fixed inset-0 z-[1] opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>
        
        <div className="container mx-auto px-4 py-12 pt-28 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              AI Tools Database
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive collection of cutting-edge AI tools. 
              These tools power our consulting services and form the foundation for next-generation AI solutions.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4"
          >
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools, categories, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white appearance-none min-w-[180px]"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white appearance-none min-w-[150px]"
              >
                <option value="all">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-center"
          >
            <p className="text-gray-400">
              Showing {tools.length} AI tools {searchQuery || selectedCategory !== 'all' || selectedType !== 'all' ? 'matching your criteria' : 'in our database'}
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Tools Grid */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(tool.category)}`}>
                        {tool.category}
                      </span>
                      {tool.type && (
                        <span className="px-3 py-1 rounded-full text-sm bg-gray-700/50 text-gray-300 border border-gray-600">
                          {tool.type}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {tool.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    {tool.pricing && (
                      <div className="flex items-center text-green-400">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span className="truncate">{tool.pricing}</span>
                      </div>
                    )}
                    {tool.license && (
                      <span className="text-gray-400 truncate">
                        {tool.license}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* No Results */}
          {!loading && tools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No tools found matching your criteria.
              </p>
            </div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Consulting CTA */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Need Implementation Help?
              </h3>
              <p className="text-gray-300 mb-6">
                Our consulting team specializes in integrating these AI tools into your workflow. 
                From workflow automation to enterprise AI implementations.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                Get Consultation
              </a>
            </div>

            {/* Products CTA */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Coming Soon: GURU & AetherArena
              </h3>
              <p className="text-gray-300 mb-6">
                Our upcoming products will revolutionize how you interact with AI tools. 
                Local AI solutions for maximum privacy and reliability.
              </p>
              <a
                href="/waitlist"
                className="inline-flex items-center px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                Join Waitlist
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 