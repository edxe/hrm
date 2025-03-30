const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure nodemailer with your email service credentials
// For Gmail, you might need to create an app password: https://support.google.com/accounts/answer/185833
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lozadajesuse72@gmail.com', // User's Gmail address
    pass: 'jesuse35'                  // User's app password
  }
});

// Configure retry settings to prevent endless retries
const runtimeOpts = {
  timeoutSeconds: 60,
  memory: '256MB',
  // Retry configuration to limit retries
  failurePolicy: {
    retry: {
      maxRetryAttempts: 2,
      maxRetryDuration: "120s"
    }
  }
};

// Cloud function triggered by new document in contactMessages collection
exports.sendEmailOnContactMessage = functions
  .runWith(runtimeOpts)
  .firestore
  .document('contactMessages/{messageId}')
  .onCreate(async (snap, context) => {
    try {
      const messageData = snap.data();
      
      // Skip processing if this is a retry and we've already marked it as processed
      if (messageData.emailSent) {
        console.log('Email already sent for this message, skipping.');
        return null;
      }
      
      // Validate required fields
      if (!messageData.name || !messageData.email || !messageData.subject || !messageData.message) {
        console.error('Missing required fields in contact message');
        await markMessageAsError(snap.ref, 'Missing required fields');
        return null;
      }
      
      const recipient = messageData.recipient || 'lozadapachecojesuse@gmail.com';
      
      // Create email content
      const mailOptions = {
        from: 'Academic Portfolio <lozadajesuse72@gmail.com>',
        to: recipient,
        subject: `Contact Form: ${messageData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${messageData.name}</p>
          <p><strong>Email:</strong> ${messageData.email}</p>
          <p><strong>Subject:</strong> ${messageData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${messageData.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>This email was sent from the contact form on your Academic Portfolio website.</em></p>
        `
      };
      
      // Send email
      await transporter.sendMail(mailOptions);
      
      // Mark message as processed to prevent duplicate emails
      await snap.ref.update({ 
        emailSent: true,
        emailSentTimestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: 'sent'
      });
      
      console.log('Email sent successfully');
      return null;
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Mark message with error status
      await markMessageAsError(snap.ref, error.message);
      
      // For certain errors, we should not retry
      if (isNonRetryableError(error)) {
        return null;
      }
      
      // For other errors, throw to allow Firebase to retry (limited by our retry config)
      throw error;
    }
  });

// HTTP callable function for sending contact emails
exports.sendContactEmail = functions
  .runWith(runtimeOpts)
  .https.onCall(async (data, context) => {
    try {
      // Validate required fields
      if (!data.name || !data.email || !data.subject || !data.message) {
        throw new functions.https.HttpsError(
          'invalid-argument', 
          'Missing required fields in contact form'
        );
      }
      
      const recipient = data.recipient || 'lozadapachecojesuse@gmail.com';
      
      // Create email content
      const mailOptions = {
        from: 'Academic Portfolio <lozadajesuse72@gmail.com>',
        to: recipient,
        subject: `Contact Form: ${data.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>This email was sent from the contact form on your Academic Portfolio website.</em></p>
        `
      };
      
      // Send email
      await transporter.sendMail(mailOptions);
      
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Return appropriate error based on the type
      if (error.code === 'auth/invalid-credential' || 
          error.responseCode === 535 || 
          error.message.includes('Invalid login')) {
        throw new functions.https.HttpsError(
          'unauthenticated', 
          'Email service authentication failed. Please check your email credentials.'
        );
      } else if (error.message.includes('spam') || error.message.includes('rejected')) {
        throw new functions.https.HttpsError(
          'aborted', 
          'Email was rejected by the mail server. It may have been flagged as spam.'
        );
      } else {
        throw new functions.https.HttpsError(
          'internal', 
          'An error occurred while sending the email. Please try again later.'
        );
      }
    }
  });

// Helper function to mark a message with error status
async function markMessageAsError(docRef, errorMessage) {
  try {
    await docRef.update({
      status: 'error',
      errorMessage: errorMessage,
      errorTimestamp: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating document with error status:', error);
  }
}

// Helper function to determine if an error should not be retried
function isNonRetryableError(error) {
  // Don't retry for authentication errors
  if (error.code === 'auth/invalid-credential' || 
      error.responseCode === 535 || 
      error.message.includes('Invalid login')) {
    return true;
  }
  
  // Don't retry for spam or rejection errors
  if (error.message.includes('spam') || 
      error.message.includes('rejected') || 
      error.message.includes('blocked')) {
    return true;
  }
  
  // Don't retry for invalid recipient errors
  if (error.responseCode === 550 || 
      error.message.includes('no such user') || 
      error.message.includes('does not exist')) {
    return true;
  }
  
  return false;
} 