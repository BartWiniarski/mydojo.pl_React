# MyDojo Frontend (React) - Version 0.1.1
# mydojo.pl

## Overview

The MyDojo Frontend, version 0.1.0 built with React, is the client-side application for the MyDojo martial arts school management system. This interactive interface connects with the MyDojo Backend to provide a seamless user experience for administrators, trainers, and students.

## Version 0.1.0 Features

This initial release includes essential functionalities:

- **User Authentication**: Secure login and registration processes.
- **Role-Based Access Control**: Different views and capabilities for admins, trainers, and students.
- **Responsive Design**: Optimized for use across various devices and screen sizes.
- **Dynamic Data Rendering**: Real-time data display from the backend.
- **Interactive User Interface**: Intuitive navigation and user interactions with the application.

## Key Technologies

- **React**: A JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests to the REST API.
- **React Router**: For navigation within the application.
- **WebFontLoader**: For custom font integration.
- **Bootstrap**: Utilized for responsive design and consistent styling across the application.

## Custom Design and Branding

- **Bootstrap Customization**: The application uses a customized Bootstrap stylesheet (`my_bootstrap.css`) to align with the unique branding and design language of MyDojo.
- **Custom Graphics**: The frontend incorporates custom graphics and icons, specifically created to enhance the MyDojo brand identity. These include a custom favicon and various UI elements tailored to the aesthetic of the application.
- **Styling**: Additional custom CSS (`style.css`) is applied to further refine the look and feel, ensuring a distinctive and cohesive user experience.

## Application Structure

### Components

- **Layout**: The main structure of the application interface.
- **Header**: Dynamic navigation bar based on user authentication status and roles.
- **Login and Registration**: Forms for user authentication.
- **AdminDashboard**: Specialized dashboard for administrative functions.
- **TrainerDashboard and StudentDashboard**: Role-specific dashboards for trainers and students.
- **UserProfile**: Component for users to view and edit their profiles.

### Pages

- **Home**: The landing page of the application.
- **Admin**: Pages for user and training group management.
- **Trainer**: Trainer-specific functionalities like managing training sessions.
- **Student**: Student-centric features such as enrolling in classes.
- **NotFound**: A fallback page for non-existent routes.

## Usage

- The application starts with a login page, redirecting authenticated users to their respective dashboards.
- Admin users can manage users, training groups, and venue details.
- Trainers and students have access to functionalities specific to their roles.
- All users can view and update their profiles.

## License

This project is licensed under the [License](LICENSE.md).

## Contact

For more information or support, please contact [support@mydojo.pl](mailto:support@mydojo.pl).

---

**Note**: This README reflects the features and setup for version 0.1.0 of the MyDojo Frontend and will evolve with future updates and features.
