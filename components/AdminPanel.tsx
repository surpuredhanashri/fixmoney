'use client';

import { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  BarChart3, 
  Users, 
  FileText, 
  Settings,
  Save,
  X,
  Calendar,
  Tag,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

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
  status: 'draft' | 'published';
}

interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalViews: number;
  totalUsers: number;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blogs' | 'calculators' | 'settings'>('dashboard');
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: '1',
      title: 'Complete Guide to Tax Planning for FY 2024-25',
      excerpt: 'Learn how to optimize your tax planning with the new tax regime changes...',
      content: 'Full blog content would go here...',
      author: 'FixMoney Team',
      publishedAt: '2024-01-15',
      readTime: 8,
      tags: ['tax planning', 'new tax regime', 'deductions', 'FY 2024-25'],
      category: 'Tax Planning',
      featured: true,
      status: 'published',
    },
    {
      id: '2',
      title: 'Investment Strategies for Beginners: Start Your Wealth Journey',
      excerpt: 'New to investing? Discover the fundamentals of investment planning...',
      content: 'Full blog content would go here...',
      author: 'Financial Expert',
      publishedAt: '2024-01-12',
      readTime: 12,
      tags: ['investment', 'beginners', 'portfolio', 'wealth creation'],
      category: 'Investment',
      featured: true,
      status: 'published',
    },
  ]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  const dashboardStats: DashboardStats = {
    totalBlogs: blogs.length,
    publishedBlogs: blogs.filter(blog => blog.status === 'published').length,
    draftBlogs: blogs.filter(blog => blog.status === 'draft').length,
    totalViews: 15420,
    totalUsers: 2847,
  };

  const categories = ['Tax Planning', 'Investment', 'Personal Finance', 'Business Finance', 'Retirement Planning'];
  const tags = ['tax planning', 'investment', 'budgeting', 'GST', 'PPF', 'FD', 'emergency fund', 'retirement'];

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setIsEditing(true);
    setShowBlogForm(true);
  };

  const handleDeleteBlog = (blogId: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    }
  };

  const handleSaveBlog = (blogData: Partial<Blog>) => {
    console.log('Saving blog:', blogData); // Debug log
    
    if (isEditing && editingBlog) {
      const updatedBlogs = blogs.map(blog => 
        blog.id === editingBlog.id ? { ...blog, ...blogData } : blog
      );
      setBlogs(updatedBlogs);
      toast.success('Blog updated successfully!');
    } else {
      const newBlog: Blog = {
        id: Date.now().toString(),
        title: blogData.title || '',
        excerpt: blogData.excerpt || '',
        content: blogData.content || '',
        author: blogData.author || '',
        publishedAt: new Date().toISOString().split('T')[0],
        readTime: blogData.readTime || 5,
        tags: blogData.tags || [],
        category: blogData.category || 'Personal Finance',
        featured: blogData.featured || false,
        status: blogData.status || 'draft',
      };
      setBlogs([...blogs, newBlog]);
      toast.success('Blog created successfully!');
    }
    
    setShowBlogForm(false);
    setIsEditing(false);
    setEditingBlog(null);
  };

  const toggleBlogStatus = (blogId: string) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId 
        ? { ...blog, status: blog.status === 'published' ? 'draft' : 'published' }
        : blog
    ));
  };

  const toggleFeatured = (blogId: string) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId 
        ? { ...blog, featured: !blog.featured }
        : blog
    ));
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'blogs'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Blogs
          </button>
          <button
            onClick={() => setActiveTab('calculators')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'calculators'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Calculators
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Blogs</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalBlogs}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.publishedBlogs}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <FileText className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Drafts</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.draftBlogs}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalViews.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {blogs.slice(0, 5).map(blog => (
                <div key={blog.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">{blog.title}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blogs Tab */}
      {activeTab === 'blogs' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Blogs</h2>
            <button
              onClick={() => {
                setShowBlogForm(true);
                setIsEditing(false);
                setEditingBlog(null);
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Blog
            </button>
          </div>

          {/* Blog List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {blogs.map(blog => (
                    <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{blog.title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{blog.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {blog.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          blog.status === 'published'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleFeatured(blog.id)}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            blog.featured
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          }`}
                        >
                          {blog.featured ? 'Featured' : 'Not Featured'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleBlogStatus(blog.id)}
                          className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Calculators Tab */}
      {activeTab === 'calculators' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Manage Calculators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'SIP Calculator', status: 'active', users: 1247 },
              { name: 'EMI Calculator', status: 'active', users: 892 },
              { name: 'Budget Fixer', status: 'active', users: 567 },
              { name: 'FD Calculator', status: 'active', users: 423 },
              { name: 'PPF Calculator', status: 'active', users: 345 },
              { name: 'GST Calculator', status: 'active', users: 234 },
              { name: 'Tax Calculator', status: 'active', users: 678 },
            ].map(calc => (
              <div key={calc.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{calc.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 dark:text-green-400">{calc.status}</span>
                  <span className="text-gray-500 dark:text-gray-400">{calc.users} users</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Site Settings</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    defaultValue="FixMoney.in"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Fix your money problems with AI-powered budget repair tools, SIP calculators, debt payoff strategies, and financial health optimization."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Default Theme
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Form Modal */}
      {showBlogForm && (
        <BlogForm
          blog={editingBlog}
          isEditing={isEditing}
          onSave={handleSaveBlog}
          onCancel={() => {
            setShowBlogForm(false);
            setIsEditing(false);
            setEditingBlog(null);
          }}
          categories={categories}
          tags={tags}
        />
      )}
    </div>
  );
}

function BlogForm({ 
  blog, 
  isEditing, 
  onSave, 
  onCancel, 
  categories, 
  tags 
}: { 
  blog: Blog | null; 
  isEditing: boolean; 
  onSave: (data: Partial<Blog>) => void; 
  onCancel: () => void; 
  categories: string[];
  tags: string[];
}) {
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    excerpt: blog?.excerpt || '',
    content: blog?.content || '',
    author: blog?.author || '',
    category: blog?.category || 'Personal Finance',
    tags: blog?.tags || [],
    featured: blog?.featured || false,
    status: blog?.status || 'draft',
    readTime: blog?.readTime || 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Blog' : 'Add New Blog'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Read Time (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Excerpt *
              </label>
              <textarea
                required
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                required
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Write your blog content here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.tags.includes(tag)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Featured Article</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.status === 'published'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Publish Immediately</span>
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? 'Update Blog' : 'Create Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 