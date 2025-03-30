# Modern Economist Portfolio

A professional, responsive portfolio website for economists, academic researchers, and policy advisors.

## Project Overview

This project is a modern, clean portfolio website designed specifically for economists to showcase their research, publications, experience, and academic credentials. The design emphasizes professionalism while maintaining visual appeal and user engagement.

## Features

- **Professional Design**: Clean, academic-focused design with a modern aesthetic
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Research Showcase**: Dedicated section to highlight research interests and specialties
- **Publications Section**: Interactive publication listing with filtering by type
- **Experience Timeline**: Visual representation of career progression
- **Smooth Animations**: Subtle animations to enhance user experience
- **Contact Form**: Professional contact form with validation
- **Bilingual Support**: Toggle between English and Spanish

## Project Structure

- `index.html` - The main HTML file with the portfolio structure and content
- `css/styles.css` - Comprehensive styling with a professional color scheme
- `js/script.js` - Interactive features including publication filtering, smooth scrolling, and form validation
- `images/` - Directory for storing profile photos and other image assets

## Code Organization

The codebase has been cleaned up and organized for better maintainability:

### JavaScript (js/script.js)

The JavaScript code is organized into logical sections:

1. **Core Initialization**: All initialization functions are grouped in the `initCore()` function
2. **Event Listeners**: Event listeners are set up in the `setupEventListeners()` function
3. **Scroll Handling**: All scroll-related functions are managed through a single `handleScroll()` function
4. **Feature-specific Functions**: Each feature has its own dedicated function
5. **Utility Functions**: Helper functions are organized at the bottom

### CSS (css/styles.css)

The CSS is organized into logical sections:

1. **Base Styles**: Reset and base element styling
2. **Utility Classes**: Reusable utility classes for margins, animations, etc.
3. **Button Styles**: Styling for all button types
4. **Layout Components**: Styling for layout elements like navigation and sections
5. **Section-specific Styles**: Styling for individual sections
6. **Responsive Styles**: Media queries for different screen sizes

## Customization

To customize this portfolio for a specific economist:

1. Replace the placeholder content in `index.html` with actual information:
   - Update the name, title, and contact information
   - Add relevant publications with links to papers
   - Modify the research focus areas to match specializations
   - Update the experience timeline with actual career history
   - Add educational background and credentials

2. Personalize the design in `css/styles.css`:
   - Modify the color scheme variables in the `:root` section
   - Adjust typography, spacing, and layout as needed
   - Add custom styles for any additional sections

3. Add personal images:
   - Replace the placeholder profile icon with an actual photo
   - Add institutional logos if desired

## Maintenance Guidelines

### Adding New Features

1. **JavaScript**: 
   - Add new initialization code to the `initCore()` function
   - Add new event listeners to the `setupEventListeners()` function
   - Create dedicated functions for new features
   - Use null checks before accessing DOM elements to prevent errors

2. **CSS**:
   - Add new styles in the appropriate section
   - Use the existing CSS variables for colors, spacing, etc.
   - Follow the existing naming conventions

### Performance Considerations

1. **JavaScript**:
   - Avoid unnecessary DOM manipulations
   - Use event delegation where possible
   - Consider using IntersectionObserver for scroll animations
   - Clear intervals and event listeners when components are removed

2. **CSS**:
   - Use hardware-accelerated properties for animations (transform, opacity)
   - Avoid expensive properties like box-shadow in animations
   - Use media queries to reduce complexity on mobile devices

## Browser Support

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is available for personal and commercial use.

---

Feel free to use this template as a starting point for creating a professional economist portfolio!

# Academic Leadership Portfolio

A professional portfolio website for Dr. Jane Smith, showcasing her academic leadership experience, research, publications, and vision for university leadership.

## Features

- Responsive design for all devices
- Bilingual support (English and Spanish)
- Interactive sections for research, publications, and leadership experience
- Testimonials carousel
- Contact form with Firebase integration
- User authentication with Firebase

## Firebase Integration

This project uses Firebase for:

1. **Authentication**: User login, signup, and password reset functionality
2. **Firestore Database**: Storing contact form submissions
3. **Cloud Functions**: Sending emails from contact form submissions

### Setting Up Firebase

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup steps
   - Enable Google Analytics if desired

2. **Set Up Authentication**:
   - In your Firebase project, go to "Authentication" in the left sidebar
   - Click "Get started"
   - Enable "Email/Password" authentication method

3. **Create a Firestore Database**:
   - In your Firebase project, go to "Firestore Database" in the left sidebar
   - Click "Create database"
   - Start in production mode or test mode as needed
   - Choose a location for your database

4. **Set Up Security Rules**:
   - In Firestore, go to the "Rules" tab
   - Update the rules to allow authenticated users to write to the contactMessages collection:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /contactMessages/{message} {
         allow read: if request.auth != null;
         allow write: if true;  // Allow anyone to submit contact messages
       }
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

5. **Set Up Cloud Functions for Email**:
   - Install Firebase CLI: `npm install -g firebase-tools`
   - Login to Firebase: `firebase login`
   - Initialize Firebase in your project: `firebase init`
   - Select Firestore, Functions, and Hosting
   - Update the email configuration in `functions/index.js`:
     - Replace `your-email@gmail.com` with your actual email
     - Replace `your-app-password` with your app password (for Gmail, create one at https://myaccount.google.com/apppasswords)
   - Deploy the functions: `firebase deploy --only functions`

6. **Error Handling for Cloud Functions**:
   - The project includes robust error handling for email sending:
     - Limited retry attempts (maximum of 2 retries)
     - Timeout configuration (60 seconds)
     - Specific error handling for different failure scenarios
     - Status tracking in Firestore to prevent duplicate emails
   - Client-side error handling with specific error messages
   - Non-retryable errors are identified to prevent endless retries

7. **Get Your Firebase Configuration**:
   - In your Firebase project, click on the gear icon (Project settings)
   - Scroll down to "Your apps" section
   - If you haven't added an app yet, click on the web icon (`</>`)
   - Register your app with a nickname
   - Copy the firebaseConfig object

8. **Update Configuration in Your Project**:
   - Open `js/firebase-config.js`
   - Replace the placeholder configuration with your actual Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_ACTUAL_API_KEY",
     authDomain: "YOUR_ACTUAL_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_ACTUAL_PROJECT_ID",
     storageBucket: "YOUR_ACTUAL_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
     appId: "YOUR_ACTUAL_APP_ID",
     measurementId: "YOUR_ACTUAL_MEASUREMENT_ID"
   };
   ```

## Development

### Prerequisites

- Web server (local or hosted)
- Firebase account

### Local Development

1. Clone the repository
2. Set up Firebase as described above
3. Open the project in your preferred code editor
4. Serve the files using a local web server

## Deployment

1. Update the Firebase configuration with your production Firebase project details
2. Deploy the website to your hosting provider
3. Ensure all Firebase services are properly configured for production

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Firebase (Authentication, Firestore)
- Font Awesome icons

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for the icons
- Firebase for authentication and database services 