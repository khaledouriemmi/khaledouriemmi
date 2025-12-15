import React, { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { sendEmail, isValidEmail, isEmailJSConfigured } from '../../services/emailService';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const [validationErrors, setValidationErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Check if EmailJS is configured
    if (!isEmailJSConfigured()) {
      setFormStatus({
        loading: false,
        success: false,
        error: 'Email service is not configured yet. Please contact me directly at ouriemmikhaled@gmail.com'
      });
      return;
    }

    setFormStatus({
      loading: true,
      success: false,
      error: null
    });

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        setFormStatus({
          loading: false,
          success: true,
          error: null
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus(prev => ({
            ...prev,
            success: false
          }));
        }, 5000);
      } else {
        setFormStatus({
          loading: false,
          success: false,
          error: result.message
        });
      }
    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error: 'An unexpected error occurred. Please try again.'
      });
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">📬 Get In Touch</h2>
        <p className="contact-subtitle">
          Have a project in mind or want to connect? Feel free to reach out!
        </p>

        <div className="contact-content">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${validationErrors.name ? 'error' : ''}`}
                placeholder="Your name"
              />
              {validationErrors.name && (
                <span className="error-message">{validationErrors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${validationErrors.email ? 'error' : ''}`}
                placeholder="your.email@example.com"
              />
              {validationErrors.email && (
                <span className="error-message">{validationErrors.email}</span>
              )}
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject <span className="required">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`form-input ${validationErrors.subject ? 'error' : ''}`}
                placeholder="What's this about?"
              />
              {validationErrors.subject && (
                <span className="error-message">{validationErrors.subject}</span>
              )}
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message <span className="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`form-textarea ${validationErrors.message ? 'error' : ''}`}
                placeholder="Tell me more about your project or idea..."
                rows="5"
              ></textarea>
              {validationErrors.message && (
                <span className="error-message">{validationErrors.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={formStatus.loading}
            >
              {formStatus.loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  <Mail size={18} />
                  Send Message
                </>
              )}
            </button>

            {/* Status Messages */}
            {formStatus.success && (
              <div className="success-message">
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {formStatus.error && (
              <div className="error-box">
                ❌ {formStatus.error}
              </div>
            )}
          </form>

          {/* Contact Info */}
          <div className="contact-info">
            <h3 className="info-title">Or reach me directly:</h3>

            <a href="mailto:ouriemmikhaled@gmail.com" className="contact-link">
              <Mail size={20} />
              ouriemmikhaled@gmail.com
            </a>

            <div className="social-links">
              <a
                href="https://github.com/khaledouriemmi"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub Profile"
              >
                <Github size={24} />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/khaled-ouriemmi"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
                <span>LinkedIn</span>
              </a>
            </div>

            <p className="contact-thanks">Thanks for visiting! 🚀</p>
          </div>
        </div>
      </div>
    </section>
  );
}
