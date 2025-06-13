"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, TrendingUp, AlertTriangle, Shield, Zap, RefreshCw } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author?: string;
  source: string;
  sourceUrl: string;
  category: string;
  publishedAt: string;
  isPublished: boolean;
}

interface NewsResponse {
  success: boolean;
  articles: NewsArticle[];
  total: number;
}

export default function NewsInsights() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNews();
    // Auto-refresh news every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news?limit=6');
      const data: NewsResponse = await response.json();
      
      if (data.success) {
        setNews(data.articles);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshNews = async () => {
    setRefreshing(true);
    try {
      // Add featured articles first
      await fetch('/api/news', { method: 'PUT' });
      // Refresh news feeds
      await fetch('/api/news?refresh=true', { method: 'POST' });
      // Fetch updated news
      await fetchNews();
    } catch (error) {
      console.error('Error refreshing news:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI_OUTAGES': return <AlertTriangle className="w-5 h-5 text-gray-400" />;
      case 'DATA_BREACHES': return <Shield className="w-5 h-5 text-gray-300" />;
      case 'INDUSTRY_INSIGHTS': return <TrendingUp className="w-5 h-5 text-white" />;
      case 'AI_NEWS': return <Zap className="w-5 h-5 text-gray-200" />;
      default: return <TrendingUp className="w-5 h-5 text-gray-400" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'AI_OUTAGES': return 'Cloud AI Risks';
      case 'DATA_BREACHES': return 'Security Breaches';
      case 'INDUSTRY_INSIGHTS': return 'Industry News';
      case 'AI_NEWS': return 'AI Updates';
      case 'CYBERSECURITY': return 'Cybersecurity';
      default: return category.replace(/_/g, ' ');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI_OUTAGES': return 'bg-gray-800/30 text-gray-300 border-gray-700/40';
      case 'DATA_BREACHES': return 'bg-gray-800/20 text-gray-300 border-gray-700/30';
      case 'INDUSTRY_INSIGHTS': return 'bg-gray-700/20 text-white border-gray-600/30';
      case 'AI_NEWS': return 'bg-gray-700/30 text-gray-200 border-gray-600/40';
      case 'CYBERSECURITY': return 'bg-gray-800/30 text-gray-300 border-gray-700/40';
      default: return 'bg-gray-800/20 text-gray-400 border-gray-700/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
            Industry Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Real-time AI industry developments, security breaches, and the growing case for local AI solutions.
          </p>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={refreshNews}
              disabled={refreshing}
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-200 disabled:bg-gray-600 text-black rounded-lg transition-colors font-medium"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh News'}
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-white/50 transition-all duration-300 group"
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    {getCategoryIcon(article.category)}
                    <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(article.category)}`}>
                      {getCategoryLabel(article.category)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.publishedAt)}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-[100px]">{article.source}</span>
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && news.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">
              No news articles available yet.
            </p>
            <button
              onClick={refreshNews}
              disabled={refreshing}
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-200 disabled:bg-gray-600 text-black rounded-lg transition-colors font-medium"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Loading...' : 'Load News'}
            </button>
          </div>
        )}

        {/* Why Local AI Matters CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-gray-800/20 to-gray-900/20 border border-gray-700/20 rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-white flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-gray-300" />
            The Case for Local AI
          </h3>
          <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
            Every outage, every breach, every downtime event reinforces why your organization needs local AI solutions. 
            Don't let your business depend on external AI services that can fail when you need them most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/ai-tools"
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-200 text-black rounded-lg transition-colors font-medium"
            >
              Explore AI Tools
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-gray-600 hover:border-white text-white rounded-lg transition-colors font-medium"
            >
              Discuss Local AI Solutions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 