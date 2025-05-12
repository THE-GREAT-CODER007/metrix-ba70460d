
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AreaChart, BarChart3, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-metrix-dark">
      <header className="border-b border-gray-800">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Metrix Logo" className="h-8 w-8" />
            <span className="font-bold text-xl text-white">METRIX</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="default" className="bg-gradient-metrix hover:opacity-90">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto py-16 px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient leading-tight">
              Track, Analyze, and Improve Your Trading Performance
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              METRIX is a comprehensive trading journal that helps you analyze your trades, track your performance, and make data-driven decisions to improve your trading strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-metrix hover:opacity-90" asChild>
                <Link to="/dashboard">
                  <span>Go to Dashboard</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-700 hover:bg-gray-800" asChild>
                <Link to="/journal">
                  <span>Start Journaling</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-full max-w-md h-72 bg-metrix-card rounded-lg border border-gray-800 shadow-xl overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <h3 className="font-medium">Performance Overview</h3>
                </div>
                <div className="p-4 flex justify-center items-center h-full">
                  <div className="animate-pulse-slow flex flex-col items-center">
                    <AreaChart size={48} className="text-metrix-blue mb-4" />
                    <BarChart3 size={48} className="text-metrix-purple" />
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-72 h-40 bg-metrix-card rounded-lg border border-gray-800 shadow-xl -z-10 opacity-75"></div>
              <div className="absolute -left-4 -top-4 w-72 h-40 bg-metrix-card rounded-lg border border-gray-800 shadow-xl -z-10 opacity-50"></div>
            </div>
          </div>
        </section>

        <section className="bg-metrix-navy py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-metrix-card p-6 rounded-lg border border-gray-800 card-hover">
                <div className="h-12 w-12 rounded-full bg-gradient-metrix flex items-center justify-center mb-4">
                  <AreaChart size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Performance Tracking</h3>
                <p className="text-gray-400">
                  Track your trading performance with detailed metrics and visualizations that help you understand your strengths and weaknesses.
                </p>
              </div>
              
              <div className="bg-metrix-card p-6 rounded-lg border border-gray-800 card-hover">
                <div className="h-12 w-12 rounded-full bg-gradient-metrix flex items-center justify-center mb-4">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
                <p className="text-gray-400">
                  Analyze your trading history with powerful analytics tools that provide insights into your trading patterns and behaviors.
                </p>
              </div>
              
              <div className="bg-metrix-card p-6 rounded-lg border border-gray-800 card-hover">
                <div className="h-12 w-12 rounded-full bg-gradient-metrix flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Trading Journal</h3>
                <p className="text-gray-400">
                  Keep a detailed record of your trades with notes, screenshots, and emotions to identify patterns and improve your strategy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-metrix-navy border-t border-gray-800">
        <div className="container mx-auto py-8 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src="/logo.svg" alt="Metrix Logo" className="h-6 w-6" />
              <span className="font-bold text-white">METRIX</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2023 METRIX. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
