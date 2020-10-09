import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidedoor',
  templateUrl: './sidedoor.component.html',
  styleUrls: ['./sidedoor.component.css']
})
export class SidedoorComponent implements OnInit {

  loginForm: FormGroup;
  message: string;

  loggingIn: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  onSubmit(): void {
    this.loggingIn = true;
    this.auth.signIn(this.email.value, this.password.value).then( 
      () => {
        this.loggingIn = false;
        this.router.navigate([""]);
      },
      (error) => {
        this.loggingIn = false;
        this.message = error.message
      }
    );
  }
}
