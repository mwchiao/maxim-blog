import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sidedoor',
  templateUrl: './sidedoor.component.html',
  styleUrls: ['./sidedoor.component.css']
})
export class SidedoorComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  loggingIn: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: UserService) { }

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

  get email(): AbstractControl {
    return this.loginForm.get("email");
  }

  get password(): AbstractControl {
    return this.loginForm.get("password");
  }

  onSubmit(): void {
    this.loggingIn = true;
    this.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then( 
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
