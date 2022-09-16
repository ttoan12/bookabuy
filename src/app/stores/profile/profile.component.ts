import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userId: BehaviorSubject<string> = new BehaviorSubject('');
  user: User = new User();
  orders: Order[];

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
    address: new FormControl(''),
  });
  isEditProfile = false;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private orderService: OrdersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user!;
      this.userId.next(user!.id);
    });

    this.userId
      .pipe(switchMap((userId) => this.orderService.getOrdersByUser(userId)))
      .subscribe((orders) => (this.orders = orders));
  }

  editProfile() {
    this.profileForm = this.formBuilder.group({
      name: new FormControl(this.user.name || '', [Validators.required]),
      phone: new FormControl(this.user.phone || '', [
        Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
      ]),
      address: new FormControl(this.user.address || ''),
    });
    this.isEditProfile = true;
  }

  async saveProfile() {
    this.profileForm.disable({ onlySelf: true });
    const newProfile: Partial<User> = {
      name: this.profileForm.value.name ?? '',
      phone: this.profileForm.value.phone ?? '',
      address: this.profileForm.value.address ?? '',
    };

    const result = await this.userService.update(this.userId.getValue(), newProfile);
    if (result) {
      this.profileForm.reset();
      this.isEditProfile = false;
    } else {
      alert('Lưu thông tin không thành công, vui lòng thử lại!');
    }

    this.profileForm.enable({ onlySelf: true });
  }

  cancelEditProfile() {
    this.profileForm.reset();
    this.isEditProfile = false;
  }
}
