# Secured Notes Pro (MERN App)

Secured Notes Pro is a web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). This application allows users to securely create and manage their notes. It provides a user-friendly interface, robust security features, and a pleasant user experience.

## Features

- **User Authentication**: Users can create accounts securely and log in to manage their notes.
- **Create and Manage Notes**: Users can securely create, edit, and delete their notes.
- **Secure Storage**: Notes are stored securely in the MongoDB database.
- **Error Handling**: Comprehensive error handling using various npm packages.
- **Frontend**: React with TypeScript, React Bootstrap for responsive components.
- **Backend**: Express.js with TypeScript, MongoDB for data storage.

## Backend Dependencies

The backend of Secured Notes Pro relies on several npm packages to function properly:

- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `mongoose`: Elegant MongoDB object modeling for Node.js.
- `cors`: Middleware for enabling CORS (Cross-Origin Resource Sharing).
- `dotenv`: Loads environment variables from a `.env` file.
- `http-errors`: Create HTTP errors.
- `morgan`: HTTP request logger middleware.
- `envalid`: Environment variable validation.
- `@types/cors`, `@types/express`, `@types/http-errors`, `@types/morgan`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint`, `nodemon`, `ts-node`, `typescript`: Development dependencies for TypeScript and ESLint.

## Frontend Dependencies

The frontend of Secured Notes Pro relies on the following packages:

- `react`: A JavaScript library for building user interfaces.
- `react-bootstrap`: Bootstrap components built with React.
- `typescript`: TypeScript language support.
- `@types/react`: Type definitions for React.
- `@types/react-bootstrap`: Type definitions for React Bootstrap.
- `@types/react-dom`: Type definitions for React DOM.

## Usage

To use Secured Notes Pro, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ZeeshanMukhtar1/SecureNotesPro-MERN.git
   cd SecureNotesPro-MERN
   ```

2. **Install server dependencies** (from the `backend` directory):

   ```bash
   cd backend
   npm install
   ```

3. **Install client dependencies** (from the `frontend` directory):

   ```bash
   cd ../frontend
   npm install
   ```

4. **Create a `.env` file** in the `backend` directory and add your environment variables (e.g., MongoDB connection string).

   ```env
   MONGODB_URI=your-mongodb-connection-string
   ```

5. **Start the development server**:

   - For the server (from the `backend` directory):

     ```bash
     npm start
     ```

   - For the client (from the `frontend` directory):

     ```bash
     npm start
     ```

## Author

- **Zeeshan Mukhtar**

