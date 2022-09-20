import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/auth/admin-auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
})
export class AdminRegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AdminAuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    const { email, password, name } = this.registerForm.value;
    const registerResult = await this.authService.register(email, password, name);

    if (registerResult) {
      this.router.navigate(['admin', 'login']);
    } else {
      alert('Email already exists');
    }
  }
}
