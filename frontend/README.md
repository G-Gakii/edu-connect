# EduConnect Frontend

EduConnect is an open platform designed to help students in public secondary schools across Africa get quick answers to their study questions. This frontend, built with Angular, interacts with the backend API to provide a seamless user experience.

## Features

- User Authentication: Students can log in and register.
- Question Management: Students can post, view, and search for questions.
- Answer Interaction: Students can answer questions and upvote helpful answers.
- Navigation: Easy navigation through different sections of the application.

## Technologies Used

- Angular
- Angular CLI
- TypeScript
- HTML5/CSS3
- RxJS

## Prerequisites

- Node.js
- Angular CLI
- EduConnect Backend API (running locally or accessible via URL)

## Installation

- Clone the repository:

```
git clone
```

- cd educonnect-frontend
- Install dependencies:

```
npm install
```

- Update environment settings:
- Open src/environments/environment.ts: Set the API base URL to match your backend setup:

```export const environment = {
production: false,
apiUrl: 'http://localhost:8000/api' // Adjust the base URL as needed
};
```

- Run the development server:

```
ng serve
```

## Usage

- Register or log in to access the platform.
- Post questions: Click on "Ask a Question" and fill out the form.
- Browse questions: Navigate through different subjects to find interesting questions.
- Answer questions: Click on a question and provide your answer.
- Upvote helpful answers to encourage quality contributions.
