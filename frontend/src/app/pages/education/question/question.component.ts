import { Component, effect, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EducationService } from '../../../service/education.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  questionForm!: FormGroup;
  isedit!: boolean;
  educationService = inject(EducationService);
  router = inject(Router);
  questionId = 0;
  questionerror = '';

  constructor() {
    this.questionForm = this.educationService.questionForm;
    effect(() => {
      this.isedit = this.educationService.isEditQuestion();
      this.questionId = this.educationService.questionid();
    });
  }
  askQuestion() {
    if (this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      return;
    } else {
      if (this.isedit) {
        this.educationService
          .editQuestion(this.questionId, this.questionForm.value)
          .subscribe({
            next: (res) => {
              console.log(res), this.router.navigate(['/main']);
              this.questionForm.reset();
            },
            error: (err) => {
              this.questionerror =
                'You do not have permission to delete this resource.';
            },
          });
      } else {
        this.educationService.askQuestion(this.questionForm.value).subscribe({
          next: (res) => {
            console.log(res), this.router.navigate(['/main']);
            this.questionForm.reset();
          },
        });
      }
    }
  }
}
