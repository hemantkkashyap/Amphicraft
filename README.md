# AMPHICRAFT

## Abstract

Higher education institutions often grapple with efficiently managing and promoting events for their student body. Amphicraft tackles this challenge by providing a web-based event management system built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This user-friendly platform streamlines event organization, registration, and participation through a well-defined user role structure.

## Key Functionalities

- **Hierarchical User Roles:**
  - **Administrators:** Possess full system control, including creating and managing sub-admin accounts.
  - **Sub-Admins:** Empowered to create, edit, and update event details (name, date, time, location, description, category).
  - **Users:** Can browse events, register for participation, view their registered events, and access certificates for attended events.

- **Secure Payment Integration:** Seamlessly integrates with a secure payment gateway to facilitate event registration fee collection.

- **Intuitive User Interface:** Provides a user-friendly interface for event browsing, registration, and management tasks.

- **Scalable Architecture:** Designed with scalability in mind to accommodate a growing number of events and users within the college ecosystem.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/Amphicraft.git
   ```

2. Navigate to the project directory:
   ```
   cd Amphicraft
   ```

3. Install dependencies for both the frontend and backend:
   ```
   cd frontend
   npm install
   cd backend
   npm install
   ```

4. Set up MongoDB database:
   - Install MongoDB if not already installed.
   - Create a database named `amphicraft`.
   - Update the MongoDB URI in `backend/config/db.js` with your database connection string.

5. Start the backend server:
   ```
   cd backend
   npm start
   ```

6. Start the frontend server:
   ```
   cd frontend
   npm start
   ```

7. Access the application at `http://localhost:3000`.

## How to Use

1. **Register/Login:**
   - Create a new account or log in with existing credentials.

2. **Browse Events:**
   - View upcoming events, filter by category or date.

3. **Register for Events:**
   - Select an event to view details and register for participation.

4. **Manage Events (Sub-Admins/Admins):**
   - Sub-admins can create, edit, and update event details.
   - Administrators have full system control, including managing sub-admin accounts.

5. **Payment Integration:**
   - Securely make payments for event registration fees using the integrated payment gateway.

6. **User Profile:**
   - View registered events, access certificates for attended events.

## Website Link

Visit [Amphicraft Website](https://amphicraft.vercel.app/) for a live demo.

## Benefits

- **Enhanced Security:** Granular access control through user roles ensures data security and system integrity.
- **Streamlined Event Management:** Sub-admins efficiently manage event details, alleviating administrative burdens.
- **Improved User Experience:** Users easily discover and register for relevant events, fostering a more engaged student body.
- **Centralized Platform:** Provides a central hub for event information, registration, and management functions.

## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.

## Contributors

- **Hemant Kumar Kashyap**
- **Abhay Singh Rawat**
- **Mohit Singh Arora**
- **Pankaj Bisht** 
- 
## Conclusion

Amphicraft leverages the MERN stack and a robust user role structure to create a secure, efficient, and user-friendly event management system for colleges. This innovative solution empowers administrators, sub-admins, and students to effectively manage and participate in college events, fostering a more vibrant campus experience.
