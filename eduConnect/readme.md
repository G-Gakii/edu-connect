# EduConnect

EduConnect is an open platform designed to help students in public secondary schools across Africa get quick answers to their study questions. Inspired by platforms like Quora, EduConnect is specifically tailored for students, creating a space where they can engage, learn from their peers, and feel empowered to ask and answer questions freely.

## Features

- Students can post questions in different subjects (e.g., math, science, literature).
- Other students can answer these questions, share explanations, or suggest study resources.
- Students can upvote helpful answers, encouraging quality content.
- Questions are organized by subject categories (e.g., math, science, languages,art) for easy browsing.
- A search bar allows students to quickly find specific topics or questions.

## Technologies Used

- Django
- Django REST framework
- PostgreSQL:
- python-dotenv
- psycopg2

## prerequisties

- Python 3.13+
- PostgreSQL

## installation

- create folder
- create virtual environment and activate:
  ```
  python -m venv venv
  source venv/bin/activate
  ```
- git clone : https://github.com/G-Gakii/edu-connect.git
- cd edu-connect
- Set up the PostgreSQL database: CREATE DATABASE educonnect;
- Configure the database settings:

  # settings.py

  ````DATABASES = {
  'default': {
      'ENGINE': 'django.db.backends.postgresql_psycopg2',
      'NAME': 'educonnect',
      'USER': 'educonnectuser',
      'PASSWORD': 'yourpassword',
      'HOST': 'localhost',
      'PORT': '5432',
  }
    }```

  ````

- Install the necessary dependencies:pip install -r requirements.txt
- Set up the database:python manage.py migrate
- Run the development server:python manage.py runserver

## Usage

- Create an account or log in.
- Start posting questions or answering others.
- Use the search bar to find specific topics or questions.
- Upvote helpful answers

## Endpoints
