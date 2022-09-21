import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AdminAuthService } from 'src/app/services/auth/admin-auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  userId?: string;
  profileForm: FormGroup;

  constructor(private authService: AdminAuthService, private fb: FormBuilder, private router: Router) {}

  async ngOnInit() {
    this.profileForm = this.fb.group({
      email: new FormControl({ value: '', disabled: true }, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      address: new FormControl(''),
    });

    this.authService.user.pipe(take(1)).subscribe((user) => {
      this.userId = user?.id;
      this.profileForm = this.fb.group({
        email: new FormControl({ value: user?.email || '', disabled: true }, [Validators.required]),
        name: new FormControl(user?.name || '', [Validators.required]),
        phone: new FormControl(user?.phone || ''),
        address: new FormControl(user?.address || ''),
      });
    });
  }

  async onSubmit() {
    this.profileForm.disable();
    const { name, phone, address } = this.profileForm.value;

    const result = await this.authService.updateProfile(this.userId!, name, phone, address);
    if (result) {
      this.router.navigate(['admin']);
    } else {
      alert('Failed to update profile');
    }
  }
}
