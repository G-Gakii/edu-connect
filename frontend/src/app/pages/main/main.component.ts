import { Component, effect, inject } from '@angular/core';
import { EducationService } from '../../service/education.service';
import { QuestionAnswer } from '../../interface/question-answer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  searchName = '';
  educationService = inject(EducationService);
  questions: QuestionAnswer[] = [];
  router = inject(Router);
  questionForm!: FormGroup;
  answerForm!: FormGroup;
  questionId = 0;

  constructor() {
    this.questionForm = this.educationService.questionForm;
    this.answerForm = this.educationService.answerForm;
    this.getQuestionAndAnswers();
  }
  navigateToQuestionPage() {
    this.router.navigate(['/question']);
  }
  getQuestionAndAnswers() {
    this.educationService.getQuestionAndAnswers().subscribe({
      next: (res) => (this.questions = res),
    });
  }
  showAnswerfn(index: number) {
    this.questions[index].showAnswer = !this.questions[index].showAnswer;
  }
  answer(question: string, id: number) {
    this.router.navigate(['/answer']);
    this.educationService.question.set(question);
    this.educationService.id.set(id);
  }
  EditQuestion(question: QuestionAnswer) {
    this.educationService.isEditQuestion.set(true);
    this.educationService.questionid.set(question.id);
    this.questionForm.patchValue({
      category: question.category,
      Question: question.Question,
    });
    this.router.navigate(['/question']);
  }
  deleteQuestion(id: number) {
    this.educationService.deleteQuestion(id).subscribe({
      next: (res) => {
        console.log(res),
          (this.questions = this.questions.filter(
            (question) => question.id !== id
          ));
      },
      error: (err) => {
        this.questions = this.questions.map((question) => {
          if (question.id === id) {
            question.error = err.error.message || 'Unathorized';
          }
          return question;
        });
      },
    });
  }
  editAnswer(question: string, answer: string, id: number) {
    this.educationService.isEditAnswer.set(true);
    this.educationService.id.set(id);
    this.educationService.question.set(question);
    console.log(answer);
    this.router.navigate(['/answer']);
    this.answerForm.patchValue({
      answer: answer,
    });
  }
  deleteAnswer(id: number, questionid: number) {
    this.educationService.deleteAnswer(id).subscribe({
      next: (res) => {
        console.log(res),
          (this.questions = this.questions.map((question) => {
            if (questionid === question.id) {
              question.answer = question.answer.filter(
                (answer) => answer.id !== id
              );
            }
            return question;
          }));
      },
      error: (err) => {
        this.questions = this.questions.map((question) => {
          if (question.id == questionid) {
            question.error = 'unathorized';
          }
          return question;
        });
      },
    });
  }
  searchQuestion() {
    console.log('search name', this.searchName);

    this.educationService
      .searchForQuestionsByCategoryOrQuestion(this.searchName)
      .subscribe({
        next: (res) => {
          console.log('search', res);
          this.questions = res;
        },
      });
  }
  thumb_up(id: number) {
    return this.educationService.thumbup(id).subscribe({
      next: (res) => {
        console.log(res);
        let myanswer = this.questions
          .find((question) =>
            question.answer.find((answer) => answer.id === id)
          )
          ?.answer.find((answer) => answer.id === id);
        if (myanswer) {
          myanswer.thumbs_up++;
        }
      },
    });
  }
}
