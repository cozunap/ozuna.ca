// src/components/ContactModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/content/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit message');

      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '' });
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6"
          onClick={handleResetAndClose}
        >
          {/* Modal Card (1:1 replica of Elementor PopUp #907 on ozuna.ca) */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative w-full max-w-[650px] bg-white rounded-none shadow-2xl p-6 sm:p-10 md:p-12 overflow-y-auto max-h-[92vh] border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleResetAndClose}
              aria-label="Close Contact Me popup"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-500 hover:text-black hover:rotate-90 transition-all p-2 rounded-full focus:outline-none"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#011437] uppercase tracking-wide">
                  Message Sent!
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-raleway max-w-sm mx-auto">
                  Thank you for reaching out. Carlos will review your inquiry and get back to you shortly.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-8 py-3 bg-[#011437] text-white hover:bg-[#ff1d25] font-raleway text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Heading: "Contact Me Today!" in authentic outlined Archivo Black */}
                <div className="text-center mb-8">
                  <h2
                    className="font-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-transparent"
                    style={{
                      WebkitTextStroke: '1px #000000',
                      stroke: '#000000'
                    }}
                  >
                    Contact Me Today!
                  </h2>
                </div>

                {error && (
                  <div className="mb-6 p-3 bg-red-50 border-l-4 border-[#ff1d25] text-[#ff1d25] text-xs font-medium font-raleway">
                    {error}
                  </div>
                )}

                {/* Form fields (col-50, col-50, col-100) */}
                <form onSubmit={handleSubmit} className="space-y-6 font-raleway">
                  {/* Row 1: Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder="Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-[#011437] text-sm border-0 border-b border-l border-gray-300 focus:border-[#ff1d25] focus:outline-none transition-colors rounded-none placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-[#011437] text-sm border-0 border-b border-l border-gray-300 focus:border-[#ff1d25] focus:outline-none transition-colors rounded-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-[#011437] text-sm border-0 border-b border-l border-gray-300 focus:border-[#ff1d25] focus:outline-none transition-colors rounded-none placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-[#011437] text-sm border-0 border-b border-l border-gray-300 focus:border-[#ff1d25] focus:outline-none transition-colors rounded-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-[#011437] text-sm border-0 border-b border-l border-gray-300 focus:border-[#ff1d25] focus:outline-none transition-colors rounded-none placeholder:text-gray-400 resize-none"
                    />
                  </div>

                  {/* Submit Button: CONTACT ME NOW! */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-[#011437] hover:bg-[#ff1d25] text-white text-[14px] font-extrabold uppercase tracking-[1px] transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer rounded-none"
                    >
                      <span>{submitting ? 'Sending...' : 'CONTACT ME NOW!'}</span>
                      <Send size={15} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
