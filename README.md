# **AuthGuardTS - An Express Authentication System**

A secure authentication system built using **Express**, **bcrypt**, **jsonwebtoken**, **Mongoose**, **Nodemailer**, and **TypeScript**. This project provides essential features like user registration, login, email verification, password reset, and more.

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## **Features**

- User registration with email verification
- User login with JWT authentication
- Secure password hashing with bcrypt
- Password reset functionality
- Protected routes using JWT
- Email notifications with Nodemailer

## **Tech Stack**

- **Express** - Backend framework
- **bcrypt** - Password hashing
- **jsonwebtoken** - Token-based authentication
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email service
- **TypeScript** - Type safety

## **Prerequisites**

- Node.js (v14+)
- MongoDB
- npm or yarn

## **Installation**

1. Clone the repository
   ```bash
   git clone git@github.com:dilkhush-raj/auth-guard-ts.git
   cd auth-guard-ts
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

## **Environment Variables**

Create a `.env` file in the root of your project and add variables from the `.env.example` file.

## **Usage**

1. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
2. Open [http://localhost:8000](http://localhost:8000) in your browser to access the API.

## **License**

This project is licensed under the MIT License.
