"use client";

import React, { useState, useMemo } from 'react';
import { workflows } from '@/data/workflows';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AutomationBeamDemo from "@/components/sections/AutomationBeamDemo";

export default function WorkflowsPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = useMemo(() => Array.from(new Set(workflows.map(w => w.title.split(' ')[0]))), []);

  const filtered = workflows.filter(w => {
    const matchesSearch = w.title.toLowerCase().includes(search.toLowerCase()) || w.pain.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || w.title.startsWith(categoryFilter);
    return matchesSearch && matchesCat;
  });

  const toggle = (id: string) => {
    setOpen(prev => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Workflow Automation Examples</h1>
          <p className="text-gray-300 text-lg">Real automations that save teams hours every week. Click each card to explore the steps.</p>
        </header>

        {/* Animated Beam Demo */}
        <AutomationBeamDemo />

        {/* Sticky filter bar */}
        <div className="sticky top-16 z-20 bg-black/80 backdrop-blur border-y border-white/5 py-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <input
              type="text"
              placeholder="Search workflows..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm placeholder-gray-400"
            />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm min-w-[160px]"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 items-start">
          {filtered.map(flow => {
            const isOpen = open === flow.id;
            return (
              <Card key={flow.id} className="bg-gray-900 border-gray-800 hover:border-blue-500/40 transition-colors duration-300 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <CardHeader
                  onClick={() => toggle(flow.id)}
                  className="cursor-pointer select-none flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-lg font-semibold">{flow.title}</CardTitle>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </CardHeader>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="space-y-4 text-sm text-gray-300">
                        <div>
                          <span className="font-medium text-white">Who?</span> {flow.persona}
                        </div>
                        <div>
                          <span className="font-medium text-white">Pain:</span> {flow.pain}
                        </div>
                        <div>
                          <span className="font-medium text-white">Solution:</span> {flow.solution}
                        </div>
                        <div>
                          <span className="font-medium text-white">Steps:</span>
                          <ol className="list-decimal list-inside mt-1 space-y-1">
                            {flow.steps.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ol>
                        </div>
                        {flow.roiExample && (
                          <div className="text-green-400">{flow.roiExample}</div>
                        )}
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
} 