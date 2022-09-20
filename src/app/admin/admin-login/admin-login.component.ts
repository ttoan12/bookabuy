import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/auth/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  isLoading = true;
  loginForm: FormGroup;

  constructor(private authService: AdminAuthService, private fb: FormBuilder, private router: Router) {}

  async ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    const { email, password } = this.loginForm.value;
    const loginResult = await this.authService.login(email, password);

    if (loginResult) {
      this.router.navigate(['admin']);
    } else {
      alert('Wrong email or password!');
    }
  }
}
