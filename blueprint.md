## **Application Overview**

This React application displays a simple contact form. Users can input their name, phone number, and a message, and then submit the form. The form data is sent to a specified API endpoint.

### **Implemented Features**

*   **Contact Form:** A functional contact form with fields for name, phone, and message.
*   **State Management:** Utilizes the `useState` hook to manage form data.
*   **API Integration:** Sends form data to a hardcoded API endpoint using the `fetch` API.
*   **User Feedback:** Displays an alert to the user upon successful form submission.
*   **Form Validation:** All fields are required. The form displays an error message if the user attempts to submit it with empty fields.

### **Visual Design and Styling**

*   **Layout:** The application features a fully centered, modern-looking contact form with a dark theme.
*   **Styling:** A dedicated CSS file (`ContactForm.css`) has been created to style the form elements. The styling includes a dark background, rounded corners, and improved visual feedback for user interactions.
*   **Color Palette:** The form uses a dark background (`#2e2e2e`) with lighter input fields (`#3a3a3a`) and white text. The submit button has a vibrant blue color (`#646cff`) that changes on hover.
*   **Error Styling:** A specific style is applied to error messages to make them noticeable.

### **Accessibility (A11Y)**

*   **Semantic HTML:** Uses standard HTML form elements (`<form>`, `<input>`, `<textarea>`, `<button>`), which provide a baseline level of accessibility.
*   **Placeholders:** Input fields include placeholder text to guide the user.
*   **Required Fields:** The `required` attribute is used on form fields.

## **Project History**

### **Version 1: Basic Contact Form**

The initial version of the application included a basic, unstyled contact form.

### **Version 2: Visual Styling**

Applied custom CSS to improve the visual appearance of the contact form and center it on the page.

### **Version 2.1: Centering the Form**

Ensured the contact form is perfectly centered both vertically and horizontally.

## **Current Plan**

### **Version 3: Form Validation**

The plan was to implement client-side validation to ensure all fields are required.

1.  **Add `required` attribute:** Added the `required` HTML attribute to all input and textarea elements in `ContactForm.jsx`.
2.  **Implement Error Handling:** Added state to `ContactForm.jsx` to track and display a user-friendly error message if the form is submitted with empty fields.
3.  **Style Error Message:** Added CSS rules to `ContactForm.css` to style the error message, making it clear and visible.
