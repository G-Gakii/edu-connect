import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/account/register/register.component';
import { LoginComponent } from './pages/account/login/login.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'question',
    loadComponent: () =>
      import('./pages/education/question/question.component').then(
        (c) => c.QuestionComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'answer',
    loadComponent: () =>
      import('./pages/education/answer/answer.component').then(
        (c) => c.AnswerComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.component').then((c) => c.MainComponent),
  },
];
