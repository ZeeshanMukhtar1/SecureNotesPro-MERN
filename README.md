# Secured Notes Pro (MERN App)

Secure Notes Pro is a web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). This application allows users to securely create and manage their notes. It provides a user-friendly interface, robust security features, and a pleasant user experience.

## Features

- **Create and Manage Notes**: Users can securely create, edit, and delete their notes.
- **Secure Storage**: Notes are stored securely in the MongoDB database.
- **Error Handling**: Comprehensive error handling using various npm packages.
- **Frontend**: React with TypeScript, React Bootstrap for responsive components.
- **Backend**: Express.js with TypeScript, MongoDB for data storage.

## Backend Dependencies

The backend of Secure Notes Pro relies on several npm packages to function properly:

- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `mongoose`: Elegant MongoDB object modeling for Node.js.
- `cors`: Middleware for enabling CORS (Cross-Origin Resource Sharing).
- `dotenv`: Loads environment variables from a `.env` file.
- `http-errors`: Create HTTP errors.
- `morgan`: HTTP request logger middleware.
- `envalid`: Environment variable validation.
- `@types/cors`, `@types/express`, `@types/http-errors`, `@types/morgan`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint`, `nodemon`, `ts-node`, `typescript`: Development dependencies for TypeScript and ESLint.

## Frontend Dependencies

The frontend of Secure Notes Pro relies on the following packages:

- `react`: A JavaScript library for building user interfaces.
- `react-bootstrap`: Bootstrap components built with React.
- `typescript`: TypeScript language support.
- `@types/react`: Type definitions for React.
- `@types/react-bootstrap`: Type definitions for React Bootstrap.
- `@types/react-dom`: Type definitions for React DOM.
- `@types/node-sass`: Type definitions for Node.js SASS support.
- `react-notifications`: library for displaying beautiful notifications on actions.

## Project Demo

![empty Databse video](./frontend/public/screen-capture.gif 'empty Databse video')

## Usage

To use Secure Notes Pro, follow these steps:

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
   Mongo__connection__String=your-mongodb-connection-string
   PORT = 5000

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

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://zeeshan-resume.netlify.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/zeeshanmukhtar1/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/ZeshanMukhtar01)
[![instagram](https://img.shields.io/badge/instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/zeshanmukhtar01/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ZeeshanMukhtar1)
