import emailjs from '@emailjs/browser';

// EmailJS Configuration from environment variables
// Credentials are stored in .env file (not committed to GitHub)
const EMAIL_CONFIG = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

/**
 * Send email via EmailJS
 * @param {Object} formData - Form data containing name, email, subject, message
 * @returns {Promise} Email sending promise
 */
export const sendEmail = async (formData) => {
    try {
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: 'Khaled',  // Your name
        };

        const response = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            templateParams,
            EMAIL_CONFIG.publicKey
        );

        return {
            success: true,
            message: 'Email sent successfully!',
            response
        };
    } catch (error) {
        console.error('Email sending failed:', error);
        return {
            success: false,
            message: error.text || 'Failed to send email. Please try again.',
            error
        };
    }
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Check if EmailJS is configured
 */
export const isEmailJSConfigured = () => {
    return !(
        EMAIL_CONFIG.serviceId === 'YOUR_SERVICE_ID' ||
        EMAIL_CONFIG.templateId === 'YOUR_TEMPLATE_ID' ||
        EMAIL_CONFIG.publicKey === 'YOUR_PUBLIC_KEY'
    );
};
