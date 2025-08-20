'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  loadTime: number;
  score: number;
}

// Extend PerformanceEntry for specific types
interface FirstInputDelay extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    loadTime: 0,
    score: 100
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Show after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000);

    if ('PerformanceObserver' in window) {
      try {
        // FCP (First Contentful Paint)
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries[entries.length - 1];
          if (fcp) {
            setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          if (lcp) {
            setMetrics(prev => ({ ...prev, lcp: lcp.startTime }));
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // FID (First Input Delay)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fid = entries[entries.length - 1] as FirstInputDelay;
          if (fid) {
            setMetrics(prev => ({ ...prev, fid: fid.processingStart - fid.startTime }));
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // CLS (Cumulative Layout Shift)
        const clsObserver = new PerformanceObserver((list) => {
          let cls = 0;
          for (const entry of list.getEntries()) {
            const layoutShift = entry as LayoutShift;
            if (!layoutShift.hadRecentInput) {
              cls += layoutShift.value;
            }
          }
          setMetrics(prev => ({ ...prev, cls }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // TTFB (Time to First Byte)
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
          setMetrics(prev => ({ ...prev, ttfb }));
        }

        // Load time
        window.addEventListener('load', () => {
          const loadTime = performance.now();
          setMetrics(prev => ({ ...prev, loadTime }));
        });

        return () => {
          fcpObserver.disconnect();
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance monitoring failed:', error);
      }
    }

    return () => clearTimeout(timer);
  }, []);

  // Calculate score whenever metrics change
  useEffect(() => {
    let score = 100;
    
    // FCP scoring (0-100)
    if (metrics.fcp > 1800) score -= 30;
    else if (metrics.fcp > 1000) score -= 15;
    
    // LCP scoring (0-100)
    if (metrics.lcp > 4000) score -= 30;
    else if (metrics.lcp > 2500) score -= 15;
    
    // FID scoring (0-100)
    if (metrics.fid > 300) score -= 30;
    else if (metrics.fid > 100) score -= 15;
    
    // CLS scoring (0-100)
    if (metrics.cls > 0.25) score -= 30;
    else if (metrics.cls > 0.1) score -= 15;
    
    setMetrics(prev => ({ ...prev, score: Math.max(0, score) }));
  }, [metrics.fcp, metrics.lcp, metrics.fid, metrics.cls]);

  if (!isVisible) return null;

  if (isMinimized) {
    return (
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setIsMinimized(false)}
        className="fixed left-4 bottom-4 performance-monitor bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-60 cursor-pointer hover:shadow-xl transition-all duration-200"
        aria-label="Show performance metrics"
      >
        <div className="text-sm font-semibold text-gray-900 dark:text-white">📊</div>
      </motion.button>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Fast';
    if (score >= 50) return 'Moderate';
    return 'Slow';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-4 bottom-4 performance-monitor bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-xs"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Performance</h3>
        <div className="flex items-center space-x-2">
          <div className={`text-lg font-bold ${getScoreColor(metrics.score)}`}>
            {metrics.score}
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            aria-label="Minimize performance monitor"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">FCP:</span>
          <span className="text-gray-900 dark:text-white">{metrics.fcp?.toFixed(0)}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">LCP:</span>
          <span className="text-gray-900 dark:text-white">{metrics.lcp?.toFixed(0)}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">FID:</span>
          <span className="text-gray-900 dark:text-white">{metrics.fid?.toFixed(0)}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">CLS:</span>
          <span className="text-gray-900 dark:text-white">{metrics.cls?.toFixed(3)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">TTFB:</span>
          <span className="text-gray-900 dark:text-white">{metrics.ttfb?.toFixed(0)}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Load:</span>
          <span className="text-gray-900 dark:text-white">{metrics.loadTime?.toFixed(0)}ms</span>
        </div>
      </div>
      
      <div className="mt-3 text-center">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          metrics.score >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          metrics.score >= 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {getScoreLabel(metrics.score)}
        </span>
      </div>
    </motion.div>
  );
} 