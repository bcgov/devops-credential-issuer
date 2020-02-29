import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wap-header',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          <img
            class="branding-logo"
            src="/assets/bcgov/bcid-logo-rev-en.svg"
            width="181"
            height="44"
            alt="B.C. Government Logo"
          />
          <span>{{ title }}</span>
        </ion-title>
      </ion-toolbar>
    </ion-header>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() logoUrl: string;
  @Input() title: string;
  @Input() logoutUrl: string;

  isLoggedIn: boolean;

  constructor() {}

  ngOnInit() {}
}
