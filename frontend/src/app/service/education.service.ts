import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Question } from '../interface/question';
import { catchError, Observable, throwError } from 'rxjs';
import { QuestionAnswer } from '../interface/question-answer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private http = inject(HttpClient);
  questionError = signal('');
  question = signal('');
  id = signal(0);
  questionForm!: FormGroup;
  answerForm!: FormGroup;
  fb = inject(FormBuilder);
  isEditQuestion = signal(false);
  isEditAnswer = signal(false);
  questionid = signal(0);
  answerId = signal(0);

  constructor() {
    this.questionForm = this.fb.group({
      category: ['', [Validators.required]],
      Question: ['', Validators.required],
    });
    this.answerForm = this.fb.group({
      answer: ['', [Validators.required]],
    });
  }

  askQuestion(question: Question): Observable<any> {
    return this.http
      .post<any>('quiz/', question)
      .pipe(catchError(this.handleError.bind(this)));
  }

  getQuestionAndAnswers(): Observable<QuestionAnswer[]> {
    return this.http
      .get<QuestionAnswer[]>('quiz')
      .pipe(catchError(this.handleError.bind(this)));
  }
  answerQuestion(id: number, answer: string) {
    return this.http
      .post(`quiz/${id}/answer-create/`, answer)
      .pipe(catchError(this.handleError.bind(this)));
  }
  editQuestion(id: number, question: Question) {
    return this.http.put(`quiz/${id}`, question);
  }
  deleteQuestion(id: number) {
    return this.http
      .delete(`quiz/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  editAnswer(id: number, answer: string) {
    return this.http.put(`answer/${id}`, answer);
  }
  deleteAnswer(id: number) {
    return this.http
      .delete(`answer/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  searchForQuestionsByCategoryOrQuestion(
    searchname: string
  ): Observable<QuestionAnswer[]> {
    return this.http.get<QuestionAnswer[]>(`quiz/?search=${searchname}`);
  }

  thumbup(id: number) {
    return this.http.post(`answer/${id}/thumb-up/`, '');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      this.questionError.set(error.error.message);
    } else {
      this.questionError.set(error.error.message);
    }
    return throwError(error);
  }
}
