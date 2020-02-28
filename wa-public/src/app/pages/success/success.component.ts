import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Observable, of, Subscription } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ActionService } from 'src/app/services/action.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { StateService } from 'src/app/services/state.service';
import { TypeaheadService } from 'src/app/services/typeahead.service';

@Component({
  selector: 'wap-success',
  template: `
    <wap-header
      title="Issue BC DevOps Verified Credential"
      [logoutUrl]="logoutUrl"
    ></wap-header>

    <wap-view-wrapper *ngIf="hasId; else noIdHelper">
      <ion-grid *ngIf="index === 0">
        <ion-row>
          <ion-col>
            <mat-card class="form-card">
              <mat-card-header class="main-header">
                <img
                  mat-card-avatar
                  src="assets/VON-Logo.png"
                  alt="VON Network logo"
                  class="header-image"
                />
                <mat-card-title>Verified Claims Values</mat-card-title>
                <mat-card-subtitle>Validate claims</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content [formGroup]="fg">
                <ion-list>
                  <wap-input
                    [fc]="fg.controls['sub']"
                    label="User ID"
                    error="User ID is required"
                    [invalid]="
                      (invalid && fg.controls['sub'].invalid) ||
                      (fg.controls['sub'].touched &&
                        fg.controls['sub'].invalid)
                    "
                    disabled="true"
                  >
                  </wap-input>
                  <wap-input
                    [fc]="fg.controls['firstName']"
                    placeholder="John"
                    label="First Name"
                    error="First name is required"
                    [invalid]="
                      (invalid && fg.controls['firstName'].invalid) ||
                      (fg.controls['firstName'].touched &&
                        fg.controls['firstName'].invalid)
                    "
                    disabled="true"
                  >
                  </wap-input>
                  <wap-input
                    [fc]="fg.controls['lastName']"
                    placeholder="Doe"
                    label="Last Name"
                    error="Last name is required"
                    [invalid]="
                      (invalid && fg.controls['lastName'].invalid) ||
                      (fg.controls['lastName'].touched &&
                        fg.controls['lastName'].invalid)
                    "
                    disabled="true"
                  >
                  </wap-input>
                  <wap-input
                    [fc]="fg.controls['emailAddress']"
                    placeholder="email@example.com"
                    label="Email"
                    error="Email address is required"
                    [invalid]="
                      (invalid && fg.controls['emailAddress'].invalid) ||
                      (fg.controls['emailAddress'].touched &&
                        fg.controls['emailAddress'].invalid)
                    "
                    disabled="true"
                  >
                  </wap-input>
                </ion-list>
              </mat-card-content>
            </mat-card>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <mat-card>
              <ion-card-content>
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <ion-item lines="none">
                        <ion-label
                          ><ion-text class="ion-text-wrap"
                            >I certify that the above information is correct,
                            and that I want to proceed.</ion-text
                          ></ion-label
                        >
                        <ion-checkbox
                          slot="start"
                          (click)="accepted = !accepted"
                        ></ion-checkbox>
                      </ion-item>
                    </ion-col>
                    <ion-col>
                      <ion-button
                        color="primary"
                        (click)="setIndex(index + 1)"
                        [disabled]="formInvalid"
                        class="float-right"
                        >Preview</ion-button
                      >
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>
            </mat-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <mat-card *ngIf="index === 1">
        <mat-card-header class="main-header">
          <img
            mat-card-avatar
            src="assets/VON-Logo.png"
            alt="VON Network logo"
            class="header-image"
          />
          <mat-card-title>{{ cardTitle }}</mat-card-title>
          <mat-card-subtitle>{{ cardSubtitle }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content
          class="qr-wrapper"
          *ngIf="$previewData | async as previewData"
          ><wap-issue-preview
            [values]="previewData"
            position="xzzxx"
          ></wap-issue-preview>
        </mat-card-content>
        <mat-card-actions class="card-confirm-submission">
          <button
            mat-raised-button
            color="primary"
            (click)="setIndex(index - 1)"
          >
            Back
          </button>
          <button
            mat-raised-button
            color="primary"
            (click)="setIndex(index + 1)"
            class="float-right"
          >
            Submit
          </button>
        </mat-card-actions>
      </mat-card>
      <mat-card *ngIf="index === 2">
        <mat-card-header class="main-header">
          <img
            mat-card-avatar
            src="assets/VON-Logo.png"
            alt="VON Network logo"
            class="header-image"
          />
          <mat-card-title>{{ cardTitle }}</mat-card-title>
          <mat-card-subtitle>{{ cardSubtitle }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="qr-wrapper">
          <img [src]="img" mat-card-img class="qr-code" />
        </mat-card-content>
        <mat-card class="mat-elevation-z0">
          <mat-card-header>
            <mat-card-title>Connect Your Mobile Agent</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <ion-item [href]="deeplink" lines="none" target="_blank">
              <ion-icon slot="start" name="log-out" color="dark"> </ion-icon>
              <ion-label>Open in a Trusted Digital Wallet</ion-label>
            </ion-item>
          </mat-card-content>
        </mat-card>
      </mat-card>
    </wap-view-wrapper>
    <ng-template #noIdHelper>
      <wap-view-wrapper>
        <mat-card>
          <mat-card-title>
            Please re-enter invitation link.
          </mat-card-title>
          <mat-card-content>
            Your session has expired. Please re-enter the link from the POC
            Invitation email.
          </mat-card-content>
        </mat-card>
      </wap-view-wrapper>
    </ng-template>
  `,
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit, OnDestroy {
  readonly logoutUrl: string = '/cancelled';

  index = 0;
  hasId = true;
  accepted = false;
  invalid = false;
  startAt = new Date(1980, 0, 1);
  maxDate = new Date(2018, 0, 1);
  minDate = new Date(1910, 0, 1);

  cardTitle = '';
  cardSubtitle = 'Sign-up for a verified credential';
  nextLabel = '';
  invite: any;
  dobFocus = false;

  connectionId: string;
  deeplink: string;

  addressVal = '';
  submitting: boolean;

  constructor(
    private stateSvc: StateService,
    public actionSvc: ActionService,
    private router: Router,
    public typeAheadSvc: TypeaheadService,
  ) {}

  get formInvalid() {
    return !this.accepted || this.fg.invalid;
  }

  user: any;
  fg: FormGroup;

  subs: Subscription[] = [];
  $previewData: Observable<{ key: string; value: any; label: string }[]>;
  img: string;
  disableList: string[];

  setIndex(i: number) {
    const indexMap = [
      {
        cardTitle: 'Welcome to VON',
        cardSubtitle: 'Authenticated',
        nextLabel: 'Sign-up',
      },
      {
        cardTitle: 'Preview',
        cardSubtitle: 'Preview Claims',
        nextLabel: 'Submit',
      },
      {
        cardTitle: 'Connect',
        cardSubtitle: 'Establish a connection with your mobile agent',
        nextLabel: 'Next',
      },
      {
        cardTitle: 'Sign-up',
        cardSubtitle: 'Personal information',
        nextLabel: 'Preview',
      },
      {
        cardTitle: 'Preview Credential',
        cardSubtitle: 'Personal information',
        nextLabel: 'Submit',
      },
      {
        cardTitle: 'Connect',
        cardSubtitle: 'Connect your mobile agent',
        nextLabel: 'Submit',
      },
    ];
    this.cardTitle = indexMap[i].cardTitle;
    this.cardSubtitle = indexMap[i].cardSubtitle;
    this.nextLabel = indexMap[i].nextLabel;
    this.invalid = false;
    this.index = i;
    if (i === 0) this.accepted = false;
    if (i === 1) {
      this.$previewData = of(this.setPreview(this.fg));
    }
    if (i === 2) this.connect();
  }

  validateAllIndex() {
    const indexes = [0, 1, 2];
    for (const index of indexes) {
      const valid = this.validateIndex(index, this.fg);
      if (!valid) return false;
    }
    return true;
  }

  validateIndex(i: number, fg: FormGroup) {
    if (i === 5 || i === 1) return this.setIndex(i);
    const ctrls = fg.controls;

    function validFc(fc: AbstractControl) {
      return fc.valid;
    }
    const indexOneCtrls = [ctrls.firstName, ctrls.lastName, ctrls.emailAddress];

    const ctrlMap = [indexOneCtrls];

    const indexValid = (args: { ctrls: AbstractControl[] }) => {
      const { ctrls } = args;
      const valids = ctrls.some(ctrl => validFc(ctrl));
      return valids;
    };
    const valid = indexValid({ ctrls: ctrlMap[i] });
    return valid ? this.setIndex(i) : (this.invalid = true);
  }

  async ngOnInit() {
    if (!this.stateSvc._id) return (this.hasId = false);
    const user = {
      sub: this.stateSvc.linkId,
      given_name: this.stateSvc.invitedUser.firstName,
      family_name: this.stateSvc.invitedUser.lastName,
      email: this.stateSvc.invitedUser.email,
    };
    const keys = Object.keys(user);
    this.disableList = keys.filter(
      key => user[key] !== undefined || null || '',
    );

    const sub = new FormControl(user.sub || '', [
      Validators.required,
    ]);
    const firstName = new FormControl(user.given_name || '', [
      Validators.required,
    ]);
    const lastName = new FormControl(user.family_name || '', [
      Validators.required,
    ]);
    const emailAddress = new FormControl(user.email || '', [
      Validators.required,
      Validators.email,
    ]);

    this.fg = new FormGroup({
      sub,
      firstName,
      lastName,
      emailAddress,
    });

    this.fg.updateValueAndValidity();

    const invitation = await this.actionSvc.getInvitation().toPromise();
    this.connectionId = invitation.connection_id;

    console.log(JSON.stringify(invitation.invitation));

    const inviteURL = `${AppConfigService.settings.baseUrl}?c_i=${invitation.base64}`;
    this.invite = invitation.invitation as any;
    this.img = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chld=L|0&chl=${inviteURL}`;
    this.deeplink = `didcomm://launch?d_m=${invitation.base64}`;
    const previewData = of(this.setPreview(this.fg));
    this.$previewData = previewData;
    this.setIndex(0);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  setPreview(fg: FormGroup) {
    const values = fg.getRawValue();
    const map = [
      {
        label: 'User ID',
        key: 'sub',
        value: values.sub || 'not defined',
      },
      {
        label: 'First Name',
        key: 'firstName',
        value: values.firstName || 'not defined',
      },
      {
        label: 'Last Name',
        key: 'lastName',
        value: values.lastName || 'not defined',
      },
      {
        label: 'Email Address',
        key: 'emailAddress',
        value: values.emailAddress || 'not defined',
      },
    ];

    return map;
  }
  connect() {
    if (!this.stateSvc._id) return (this.hasId = false);
    const form = this.fg.getRawValue();
    const timer = interval(6000);
    this.subs.push(
      timer
        .pipe(
          take(50),
          mergeMap(() => this.actionSvc.getConnectionState(this.connectionId)),
        )
        .subscribe(obs => {
          console.log(JSON.stringify(this.invite, null, 2));
          if (obs.state === 'active' || obs.state === 'response') {
            if (this.submitting) return;
            this.submitting = true;
            this.actionSvc
              .issueCredentials({
                connectionId: this.connectionId,
                claims: {
                  sub: form.sub,
                  family_name: form.lastName,
                  given_name: form.firstName,
                  email: form.emailAddress,
                },
                _id: this.stateSvc._id,
              })
              .toPromise()
              .then(res =>
                this.router.navigate([
                  `/issue-credential/${res.credential_exchange_id}`,
                ]),
              );
          }
        }),
    );
  }
}
