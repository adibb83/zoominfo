import { Component } from '@angular/core';
import { Question } from '../app/models/quiz.modle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  responsiveOptions: object[];
  Questions: Question[] = [
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
    },
    {
      category: 'VmVoaWNsZXM=',
      type: 'bXVsdGlwbGU=',
      difficulty: 'bWVkaXVt',
      question:
        'V2hpY2ggY2FyIGJyYW5kIGRvZXMgTk9UIGJlbG9uZyB0byBHZW5lcmFsIE1vdG9ycz8=',
      correct_answer: 'Rm9yZA==',
      incorrect_answers: ['QnVpY2s=', 'Q2FkaWxsYWM=', 'Q2hldnJvbGV0'],
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
    },
    {
      category: 'RW50ZXJ0YWlubWVudDogVGVsZXZpc2lvbg==',
      type: 'bXVsdGlwbGU=',
      difficulty: 'bWVkaXVt',
      question:
        'SW4gIlRoZSBCaWcgQmFuZyBUaGVvcnkiLCB3aGF0IGlzIEhvd2FyZCBXb2xvd2l0eidzIG5pY2tuYW1lIGluIFdvcmxkIG9mIFdhcmNyYWZ0Pw==',
      correct_answer: 'V29sb3dpemFyZA==',
      incorrect_answers: ['U2hlbGRvcg==', 'UmFqZXNo', 'UHJpeWE='],
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
    },
    {
      category: 'RW50ZXJ0YWlubWVudDogVmlkZW8gR2FtZXM=',
      type: 'bXVsdGlwbGU=',
      difficulty: 'aGFyZA==',
      question:
        'V2hhdCBpcyB0aGUgbmFtZSBvZiB0aGUgYWxsaWdhdG9yIGluIFdoZXJlJ3MgTXkgV2F0ZXI/',
      correct_answer: 'U3dhbXB5',
      incorrect_answers: ['Q3Jhbmt5', 'Q3JvY2t5', 'SnVzdGljZQ=='],
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
    },
  ];
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
  }
}
