import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { StoreService } from './store.service';

@Injectable()

export class ScoreRouteGuardService implements CanActivate {

  canActivate(): Observable<boolean> {
    return this.store.quizStatus.pipe(
      map(isFinished => {
        if (isFinished) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }))
  }

  constructor(
    private store: StoreService,
    private router: Router
  ) { }
}


