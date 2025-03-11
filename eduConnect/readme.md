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

- `base`: http://127.0.0.1:8000/question

### Quiz Endpoints

- `GET	/quiz/` : Retrieve a list of quiz questions.
  - Response

```
[
    {
        "id": 17,
        "category": "TECH",
        "Question": "What is machine learning",
        "student_name": "foo",
        "created_at": "2025-02-02T15:45:48.263868Z",
        "answer": []
    },{
        "id": 8,
        "category": "ART",
        "Question": "where can get tutorial to learn pottery?",
        "student_name": "foo",
        "created_at": "2025-01-29T20:30:33.637097Z",
        "answer": []
    },]
```

- `GET	/quiz/<int:pk>/` :Retrieve details of a specific question.
- `POST	/quiz/` : Add question

  - Request Headers:
    `Authorization: Token your-auth-token`
  - Request Body

  ```
  {

    "category":"ART",
    "Question":"What is the best soil for modelling"

  ```

}```

    - Response:

````{
  "id": 18,
  "category": "ART",
  "Question": "What is the best soil for modelling",
  "student_name": "bii",
  "created_at": "2025-03-11T06:42:10.074391Z",
  "answer": []
}```

````

- `PUT /quiz/<int:pk>/` : Update an existing question (Only by the author).

  - Request Headers:
  - `Authorization: Token your-auth-token`
  - Request Body

  ```
  {

    "category":"ART",
    "Question":"What is the best soil for modelling"

  ```

}```

    - Response:

````{
  "id": 18,
  "category": "ART",
  "Question": "What is the best soil for modelling",
  "student_name": "bii",
  "created_at": "2025-03-11T06:42:10.074391Z",
  "answer": []
}```
````

- `DELETE	/quiz/<int:pk>/`: Delete an question (Only by the author).
  - Request Headers:
    `Authorization: Token your-auth-token`
  - Response
  - `Question deleted successfully`

`POST	/quiz/<int:pk>/answer-create/` : Submit an answer for a specific question.

- Request Headers:
     - `Authorization: Token your-auth-token`

      - Request Body

```
{
  "answer":"kilogram"

```

}```

### Answer Endpoints

- `PUT /answer/<int:pk>/` : Update an existing answer (Only by the respondent).

  - Request Headers:
    `Authorization: Token your-auth-token`
       - Request Body

  ```
  {
    "answer":"kilogram"

  ```

}```

- `POST	/answer/<int:pk>/thumb-up/`: Upvote (like) an answer.

- `DELETE	/answer/<int:pk>/`: Delete an answer (Only by the respondent).
  - Request Headers:
    `Authorization: Token your-auth-token`

## User Account

- `POST	/account/login/`: Authenticate a user and return an auth token.

  - Request Body

  ```
  {
    "username":"fuu",
    "password":"Fuu@12345"

  }
  ```

      - Response:

  ```
  {
    "token": "225a1e2db66594d375766e1bf2ba9cb5c9d0b9c6"
  }
  ```

- `POST	/account/register/` :Register a new user.

  - Request Body

  ```
  {
    "username":"fuu",
    "email":":"fuu@example.com"
    "password":"Fuu@12345"
     "password2":"Fuu@12345"

  }
  ```

- `POST	/account/logout/`: Logout a user (invalidate auth token).
  - Request Headers:
  - `Authorization: Token your-auth-token`
