import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wap-already-issued',
  template: `
    <wap-header></wap-header>
    <h1>
      The credential for this user was already issued.
    </h1>
    <p>
      If you require further assistance, please contact the BCDevOps team.
    </p>
  `,
  styleUrls: ['./already-issued.component.scss'],
})
export class AlreadyIssuedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
