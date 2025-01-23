import { Component, effect, inject } from '@angular/core';
import { EducationService } from '../../../service/education.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss',
})
export class AnswerComponent {
  educationService = inject(EducationService);
  fb = inject(FormBuilder);
  router = inject(Router);
  question = '';
  id = 0;
  answer = '';
  isEdit!: boolean;

  answerForm!: FormGroup;
  constructor() {
    this.answerForm = this.educationService.answerForm;
    effect(() => {
      this.question = this.educationService.question();
      this.id = this.educationService.id();
      this.isEdit = this.educationService.isEditAnswer();
    });
  }

  myAnswer() {
    if (this.answerForm.invalid) {
      this.answerForm.markAllAsTouched();
      return;
    }
    {
      if (this.isEdit) {
        this.educationService
          .editAnswer(this.id, this.answerForm.value)
          .subscribe({
            next: (res) => {
              console.log(res), this.router.navigate(['/main']);
            },
          });
      } else {
        this.educationService
          .answerQuestion(this.id, this.answerForm.value)
          .subscribe({
            next: (res) => {
              console.log(res), this.answerForm.reset();
              this.router.navigate(['/main']);
            },
          });
      }
    }
  }
}
