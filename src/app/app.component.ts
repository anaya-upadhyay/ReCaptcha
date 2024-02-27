import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private recaptchaV3Service: ReCaptchaV3Service) {}

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((token: string) => {
        console.log(`Token [${token}] generated`);
      });
  }

  // public resolved(captchaResponse: string): void {
  //   console.log(`Resolved captcha with response: ${captchaResponse}`);
  // }

  public resolved(event: any): void {
    const captchaResponse: string = event && event.detail;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
