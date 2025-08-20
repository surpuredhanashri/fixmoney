'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, Search, Filter } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
  featured: boolean;
}

// Sample blog data - in a real app, this would come from a database
const sampleBlogs: Blog[] = [
  {
    id: '1',
    title: 'Complete Guide to Tax Planning for FY 2024-25',
    excerpt: 'Learn how to optimize your tax planning with the new tax regime changes. Understand deductions, exemptions, and strategies to minimize your tax liability.',
    content: 'Full blog content would go here...',
    author: 'FixMoney Team',
    publishedAt: '2024-01-15',
    readTime: 8,
    tags: ['tax planning', 'new tax regime', 'deductions', 'FY 2024-25'],
    category: 'Tax Planning',
    featured: true,
  },
  {
    id: '2',
    title: 'Investment Strategies for Beginners: Start Your Wealth Journey',
    excerpt: 'New to investing? Discover the fundamentals of investment planning, risk management, and building a diversified portfolio for long-term wealth creation.',
    content: 'Full blog content would go here...',
    author: 'Financial Expert',
    publishedAt: '2024-01-12',
    readTime: 12,
    tags: ['investment', 'beginners', 'portfolio', 'wealth creation'],
    category: 'Investment',
    featured: true,
  },
  {
    id: '3',
    title: 'Understanding PPF vs FD: Which Investment is Better?',
    excerpt: 'Compare Public Provident Fund (PPF) and Fixed Deposits (FD) to understand which investment option suits your financial goals and risk appetite.',
    content: 'Full blog content would go here...',
    author: 'Investment Advisor',
    publishedAt: '2024-01-10',
    readTime: 6,
    tags: ['PPF', 'FD', 'investment comparison', 'risk assessment'],
    category: 'Investment',
    featured: false,
  },
  {
    id: '4',
    title: 'Budget Management Tips for Young Professionals',
    excerpt: 'Practical budgeting strategies for young professionals to manage expenses, save money, and achieve financial independence early in their careers.',
    content: 'Full blog content would go here...',
    author: 'Personal Finance Coach',
    publishedAt: '2024-01-08',
    readTime: 10,
    tags: ['budgeting', 'young professionals', 'saving', 'financial independence'],
    category: 'Personal Finance',
    featured: false,
  },
  {
    id: '5',
    title: 'GST Changes in 2024: What Businesses Need to Know',
    excerpt: 'Stay updated with the latest GST changes and their impact on businesses. Understand compliance requirements and optimize your tax strategy.',
    content: 'Full blog content would go here...',
    author: 'Tax Consultant',
    publishedAt: '2024-01-05',
    readTime: 7,
    tags: ['GST', 'business', 'compliance', 'tax strategy'],
    category: 'Business Finance',
    featured: false,
  },
  {
    id: '6',
    title: 'Emergency Fund Planning: Your Financial Safety Net',
    excerpt: 'Learn why emergency funds are crucial and how to build one. Discover the right amount to save and where to keep your emergency fund.',
    content: 'Full blog content would go here...',
    author: 'Financial Planner',
    publishedAt: '2024-01-03',
    readTime: 5,
    tags: ['emergency fund', 'financial planning', 'safety net', 'savings'],
    category: 'Personal Finance',
    featured: false,
  },
];

const categories = ['All', 'Tax Planning', 'Investment', 'Personal Finance', 'Business Finance', 'Retirement Planning'];
const tags = ['tax planning', 'investment', 'budgeting', 'GST', 'PPF', 'FD', 'emergency fund', 'retirement'];

// Helper function to format dates
const formatDateForDisplay = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>(sampleBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => blog.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedTags([]);
  };



  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>

        {/* Tags Filter */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Filter by Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Blogs */}
      {filteredBlogs.filter(blog => blog.featured).length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredBlogs
              .filter(blog => blog.featured)
              .map(blog => (
                <FeaturedBlogCard key={blog.id} blog={blog} />
              ))}
          </div>
        </div>
      )}

      {/* All Blogs */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          All Articles ({filteredBlogs.length})
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No blogs found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}

function FeaturedBlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-medium rounded-full">
            Featured
          </span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
            {blog.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDateForDisplay(blog.publishedAt)}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {blog.readTime} min read
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <Link
          href={`/blogs/${blog.id}`}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
            {blog.category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDateForDisplay(blog.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {blog.readTime} min
          </span>
        </div>
        
        <Link
          href={`/blogs/${blog.id}`}
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
} 