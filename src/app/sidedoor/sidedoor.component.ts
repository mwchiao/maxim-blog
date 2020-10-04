import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-sidedoor',
  templateUrl: './sidedoor.component.html',
  styleUrls: ['./sidedoor.component.css']
})
export class SidedoorComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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
    console.log("submit");
  }
}
