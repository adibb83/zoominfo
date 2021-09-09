import { Component, OnInit } from '@angular/core';
import { SharedService } from '@services/shared.service';
import { StoreService } from '@services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  Loader$ = this.sharedService.loader$;

  constructor(
    private storeService: StoreService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.storeService.getQuestionsFromApi();
  }
}
