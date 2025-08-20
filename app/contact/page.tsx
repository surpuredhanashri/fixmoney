'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle,
  Loader2
} from 'lucide-react';

// Form validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the data to your API
      console.log('Form data:', data);
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about fixing your money problems? Need technical support? 
            Want to partner with us? We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 form-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      {...register('firstName')}
                      id="firstName"
                      type="text"
                      className={`w-full px-4 py-3 rounded-2xl border-2 ${
                        errors.firstName 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/30' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 transition-all duration-200 shadow-sm hover:shadow-md`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      {...register('lastName')}
                      id="lastName"
                      type="text"
                      className={`w-full px-4 py-3 rounded-2xl border-2 ${
                        errors.lastName 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/30' 
                          : 'border-gray-200 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 transition-all duration-200 shadow-sm hover:shadow-md`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    className={`w-full px-4 py-3 rounded-2xl border-2 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/30' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 transition-all duration-200 shadow-sm hover:shadow-md`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    {...register('subject')}
                    id="subject"
                    type="text"
                    className={`w-full px-4 py-3 rounded-2xl border-2 ${
                      errors.subject 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/30' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 transition-all duration-200 shadow-sm hover:shadow-md`}
                    placeholder="Enter email subject (e.g., General Inquiry, Technical Support)"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-3 rounded-2xl border-2 ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/30' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 transition-all duration-200 shadow-sm hover:shadow-md resize-none`}
                    placeholder="Tell us how we can help you fix your money problems..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-600 to-success-600 hover:from-primary-700 hover:to-success-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our team is dedicated to helping you fix your money problems. 
                  We typically respond within 24 hours during business days.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">contact@fixmoney.in</p>
                    <p className="text-gray-600 dark:text-gray-300">support@fixmoney.in</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Phone className="w-6 h-6 text-success-600 dark:text-success-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                    <p className="text-gray-600 dark:text-gray-300">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <MapPin className="w-6 h-6 text-warning-600 dark:text-warning-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Office</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      FixMoney.in<br />
                      Financial District<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Business Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                      Saturday: 10:00 AM - 2:00 PM IST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How quickly do you respond to inquiries?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We typically respond to all inquiries within 24 hours during business days. 
                For urgent technical support, we aim to respond within 4 hours.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Do you provide personalized financial advice?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! Our AI-powered tools provide personalized recommendations based on your 
                financial situation. For complex cases, we can arrange consultations with our financial experts.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is my financial data secure?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutely. We use bank-level encryption and security measures. Your data is never shared 
                with third parties and is processed securely on our servers.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Can I partner with FixMoney.in?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're always open to partnerships! Whether you're a financial institution, 
                technology company, or content creator, reach out to discuss collaboration opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Multiple Ways to Get Help
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose the support option that works best for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 text-center shadow-2xl border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MessageSquare className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get instant help from our support team during business hours
              </p>
              <button className="bg-gradient-to-r from-primary-600 to-success-600 hover:from-primary-700 hover:to-success-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Start Chat
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 text-center shadow-2xl border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-8 h-8 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Help Center</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Browse our comprehensive knowledge base and tutorials
              </p>
              <a href="/help" className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Visit Help Center
              </a>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 text-center shadow-2xl border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="w-8 h-8 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Send us a detailed message and get a thorough response
              </p>
              <a href="mailto:support@fixmoney.in" className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-success-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Fix Your Money Problems?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Don't wait - start your journey to financial freedom today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/sip-calculator" className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              Try SIP Calculator
            </a>
            <a href="/budget-fixer" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105">
              Check Budget Health
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 