import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import {
  switchMap,
  startWith
} from 'rxjs/operators';
import { IQuiz, IQuestion, ITotal } from './models/quiz.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  responsiveOptions: object[];
  currentQ = 0;
  reset$ = new Subject();
  timer$: Observable<any>;
  subscription!: Subscription;

  quiz: IQuiz = {
    questions: [
      {
        category: 'RW50ZXJ0YWlubWVudDogQm9va3M=',
        type: 'bXVsdGlwbGU=',
        difficulty: 'bWVkaXVt',
        question:
          'V2hpY2ggb2YgdGhlIGZvbGxvd2luZyBhdXRob3JzIHdhcyBub3QgYm9ybiBpbiBFbmdsYW5kPyA=',
        correct_answer: 'QXJ0aHVyIENvbmFuIERveWxl',
        incorrect_answers: [
          'R3JhaGFtIEdyZWVuZQ==',
          'SCBHIFdlbGxz',
          'QXJ0aHVyIEMgQ2xhcmtl',
        ],
        all_answers: [
          'R3JhaGFtIEdyZWVuZQ==',
          'SCBHIFdlbGxz',
          'QXJ0aHVyIEMgQ2xhcmtl',
          'QXJ0aHVyIENvbmFuIERveWxl'
        ],
        incorrect_count: 0
      },
      {
        category: 'R2VuZXJhbCBLbm93bGVkZ2U=',
        type: 'bXVsdGlwbGU=',
        difficulty: 'ZWFzeQ==',
        question:
          'V2hhdCB3YXMgdGhlIG5hbWUgb2YgdGhlIFdXRiBwcm9mZXNzaW9uYWwgd3Jlc3RsaW5nIHRhZyB0ZWFtIG1hZGUgdXAgb2YgdGhlIHdyZXN0bGVycyBBeCBhbmQgU21hc2g/',
        correct_answer: 'RGVtb2xpdGlvbg==',
        incorrect_answers: [
          'VGhlIERyZWFtIFRlYW0=',
          'VGhlIEJ1c2h3aGFja2Vycw==',
          'VGhlIEJyaXRpc2ggQnVsbGRvZ3M=',
        ],
        all_answers: [
          'VGhlIERyZWFtIFRlYW0=',
          'VGhlIEJ1c2h3aGFja2Vycw==',
          'VGhlIEJyaXRpc2ggQnVsbGRvZ3M=',
          'RGVtb2xpdGlvbg=='
        ],
        incorrect_count: 0
      },
      {
        category: 'RW50ZXJ0YWlubWVudDogVGVsZXZpc2lvbg==',
        type: 'bXVsdGlwbGU=',
        difficulty: 'bWVkaXVt',
        question:
          'SW4gQnJlYWtpbmcgQmFkLCB0aGUgaW5pdGlhbHMgVy5XLiByZWZlciB0byB3aGljaCBvZiB0aGUgZm9sbG93aW5nPw==',
        correct_answer: 'V2FsdGVyIFdoaXRl',
        incorrect_answers: [
          'V2lsbGlhbSBXb2xm',
          'V2lsbHkgV29ua2E=',
          'V2FsbHkgV2FscnVz',
        ],
        all_answers: [
          'V2lsbGlhbSBXb2xm',
          'V2lsbHkgV29ua2E=',
          'V2FsdGVyIFdoaXRl',
          'V2FsbHkgV2FscnVz',

        ],
        incorrect_count: 0
      },
      {
        category: 'VmVoaWNsZXM=',
        type: 'bXVsdGlwbGU=',
        difficulty: 'bWVkaXVt',
        question:
          'V2hpY2ggY2FyIGJyYW5kIGRvZXMgTk9UIGJlbG9uZyB0byBHZW5lcmFsIE1vdG9ycz8=',
        correct_answer: 'Rm9yZA==',
        incorrect_answers: ['QnVpY2s=', 'Q2FkaWxsYWM=', 'Q2hldnJvbGV0'],
        all_answers: ['QnVpY2s=', 'Q2FkaWxsYWM=', 'Rm9yZA==', 'Q2hldnJvbGV0'],
        incorrect_count: 0
      },
      {
        category: 'R2VuZXJhbCBLbm93bGVkZ2U=',
        type: 'bXVsdGlwbGU=',
        difficulty: 'ZWFzeQ==',
        question:
          'V2hpY2ggQW1lcmljYW4tb3duZWQgYnJld2VyeSBsZWQgdGhlIGNvdW50cnkgaW4gc2FsZXMgYnkgdm9sdW1lIGluIDIwMTU/',
        correct_answer: 'RC4gRy4gWXVlbmdsaW5nIGFuZCBTb24sIEluYw==',
        incorrect_answers: [
          'QW5oZXVzZXIgQnVzY2g=',
          'Qm9zdG9uIEJlZXIgQ29tcGFueQ==',
          'TWlsbGVyIENvb3Jz',
        ],
        all_answers: [
          'RC4gRy4gWXVlbmdsaW5nIGFuZCBTb24sIEluYw==',
          'QW5oZXVzZXIgQnVzY2g=',
          'Qm9zdG9uIEJlZXIgQ29tcGFueQ==',
          'TWlsbGVyIENvb3Jz',
        ],
        incorrect_count: 0
      },
      {
        category: 'RW50ZXJ0YWlubWVudDogVGVsZXZpc2lvbg==',
        type: 'bXVsdGlwbGU=',
        difficulty: 'bWVkaXVt',
        question:
          'SW4gIlRoZSBCaWcgQmFuZyBUaGVvcnkiLCB3aGF0IGlzIEhvd2FyZCBXb2xvd2l0eidzIG5pY2tuYW1lIGluIFdvcmxkIG9mIFdhcmNyYWZ0Pw==',
        correct_answer: 'V29sb3dpemFyZA==',
        incorrect_answers: ['U2hlbGRvcg==', 'UmFqZXNo', 'UHJpeWE='],
        all_answers: ['U2hlbGRvcg==', 'V29sb3dpemFyZA==', 'UmFqZXNo', 'UHJpeWE='],
        incorrect_count: 0
      },
      {
        category: 'RW50ZXJ0YWlubWVudDogTXVzaWM=',
        type: 'bXVsdGlwbGU=',
        difficulty: 'bWVkaXVt',
        question:
          'V2hhdCBpcyB0aGUgZmlyc3QgdHJhY2sgb24gS2FueWUgV2VzdCdzIDgwOHMgJiBIZWFydGJyZWFrPw==',
        correct_answer: 'U2F5IFlvdSBXaWxs',
        incorrect_answers: [
          'V2VsY29tZSB0byBIZWFydGJyZWFr',
          'U3RyZWV0IExpZ2h0cw==',
          'SGVhcnRsZXNz',
        ],
        all_answers: [
          'V2VsY29tZSB0byBIZWFydGJyZWFr',
          'U3RyZWV0IExpZ2h0cw==',
          'U2F5IFlvdSBXaWxs',
          'SGVhcnRsZXNz',
        ],
        incorrect_count: 0
      },
      {
        category: 'UG9saXRpY3M=',
        type: 'bXVsdGlwbGU=',
        difficulty: 'aGFyZA==',
        question:
          'SW4gSnVuZSAyMDE3LCBTYXVkaSBBcmFiaWEgYW5kIEVneXB0IGJyb2tlIG9mZiB0aWVzIHdpdGggd2hpY2ggY291bnRyeSBvdmVyIGl0cyBzdXBwb3NlZCBzdXBwb3J0IGZvciB0ZXJyb3Jpc20/',
        correct_answer: 'UWF0YXI=',
        incorrect_answers: [
          'QmFocmFpbg==',
          'VW5pdGVkIFN0YXRlcyBvZiBBbWVyaWNh',
          'UnVzc2lh',
        ],
        all_answers: [
          'QmFocmFpbg==',
          'VW5pdGVkIFN0YXRlcyBvZiBBbWVyaWNh',
          'UnVzc2lh',
          'UWF0YXI='
        ],
        incorrect_count: 0
      },
      {
        category: 'RW50ZXJ0YWlubWVudDogVmlkZW8gR2FtZXM=',
        type: 'bXVsdGlwbGU=',
        difficulty: 'aGFyZA==',
        question:
          'V2hhdCBpcyB0aGUgbmFtZSBvZiB0aGUgYWxsaWdhdG9yIGluIFdoZXJlJ3MgTXkgV2F0ZXI/',
        correct_answer: 'U3dhbXB5',
        incorrect_answers: ['Q3Jhbmt5', 'Q3JvY2t5', 'SnVzdGljZQ=='],
        all_answers: ['Q3Jhbmt5', 'Q3JvY2t5', 'SnVzdGljZQ==', 'U3dhbXB5'],
        incorrect_count: 0
      },
      {
        category: 'Q2VsZWJyaXRpZXM=',
        type: 'bXVsdGlwbGU=',
        difficulty: 'ZWFzeQ==',
        question:
          'V2hhdCB3YXMgSmFtZXMgQ29idXJuJ3MgbGFzdCBmaWxtIHJvbGUgYmVmb3JlIGhpcyBkZWF0aD8=',
        correct_answer: 'QW1lcmljYW4gR3Vu',
        incorrect_answers: [
          'TW9uc3RlcnMgSW5j',
          'VGV4YXMgUmFuZ2Vycw==',
          'U25vdyBEb2dz',
        ],
        all_answers: [
          'TW9uc3RlcnMgSW5j',
          'VGV4YXMgUmFuZ2Vycw==',
          'U25vdyBEb2dz',
          'QW1lcmljYW4gR3Vu'
        ],
        incorrect_count: 0
      },
    ],
    total: { correct_answer: 0, incorrect_answers: 0 }
  }

  title = 'zoominfo';

  constructor() {

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(1, 1000))
    );
  }

  ngOnInit() {
    this.subscription = this.timer$.subscribe((i) => {
      if (i > 20) {
        this.quiz.total.incorrect_answers++;
        this.nextQuestion();
        this.refreshTimer();
      }
    });
  }

  refreshTimer(): void {
    this.reset$.next(void 0);
  }

  nextQuestion() {
    this.currentQ++;
  }

  questionResult($event: boolean) {

  }

}
