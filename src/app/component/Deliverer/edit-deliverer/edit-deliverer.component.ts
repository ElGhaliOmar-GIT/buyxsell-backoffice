import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DelivererService} from "../../../services/deliverer.service";
import {Deliverer} from "../../../models/deliverer";

@Component({
  selector: 'app-edit-deliverer',
  templateUrl: './edit-deliverer.component.html',
  styleUrls: ['./edit-deliverer.component.scss']
})
export class EditDelivererComponent implements OnInit {

  delivererForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private delivererService: DelivererService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.delivererForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required, Validators.pattern("[1-9][0-9]{8}")],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: this.matchingPasswordsValidator });
  }

  get firstName() { return this.delivererForm.get('fistName'); }
  get lastName() { return this.delivererForm.get('lastName'); }
  get phoneNumber() { return this.delivererForm.get('phoneNumber'); }
  get email() { return this.delivererForm.get('email'); }
  get password() { return this.delivererForm.get('password'); }
  get confirmPassword() { return this.delivererForm.get('confirmPassword'); }

  matchingPasswordsValidator(formGroup: FormGroup): null | { mismatch: boolean } {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    return password.value === confirmPassword.value ? null : { mismatch: true };
  }

  onSubmitForm(): void {
    const deliverer: Deliverer = this.delivererForm.value;
    this.delivererService.addDeliverer(deliverer).subscribe(
      () => {
        this.router.navigate(['/list-deliverer']);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  onCancel() {
    this.router.navigate(['/list-deliverer']);
  }

}
