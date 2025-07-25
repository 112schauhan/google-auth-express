# Google OAuth Express App
## A simple Express.js application that implements Google OAuth 2.0 authentication using Passport.js. Users can sign in with their Google accounts and are redirected to a blank page upon successful authentication.
### Features

#### 1. Google OAuth 2.0 authentication
#### 2. Express.js server
#### 3. Session management
#### 4. Passport.js integration
#### 5. Ready for deployment on Railway

## Deployed at - https://google-auth-express-production.up.railway.app/

## Installation

### Clone the repository
```
git clone <your-repo-url>
cd google-oauth-express
```

### Install dependencies
```
npm install
```

### Set up environment variables
Create a .env file in the root directory:
```
PORT=3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=a-secret-for-session
```
### Running the Application
#### Local Development
```
npm start
```
