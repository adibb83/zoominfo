import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '@services/store.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  questions$ = this.storeService.getQuestions;

  startQuiz() {
    this.router.navigate(['quiz']);
  }

  constructor(private router: Router, private storeService: StoreService) {}
}
