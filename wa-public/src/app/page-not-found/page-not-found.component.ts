import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ActionService } from '../services/action.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wap-page-not-found',
  template: `
    <wap-header></wap-header>
    <h1>This is not a page. Nothing to see here.</h1>
  `,
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
