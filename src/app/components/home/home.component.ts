import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../models/IUser';
import { UserFormComponent } from '../user-form/user-form.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserFormComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isOpenModal: boolean = false;
  currentUser: IUser | null = null
  userList!: IUser[];
  buttonTitle: string = ''

  constructor(private _toastr: ToastrService, private _service: UserService) {}

  ngOnInit(): void {
    this.getAllUsersList();
  }

  getAllUsersList() {
    this._service.getAllUsers().subscribe({
      next: (res) => {
        this.userList = res.data;
      },
      error: (err) => {
        this._toastr.error('Some thing Went Wrong');
      },
    });
  }
  openModal() {
    this.currentUser = null
    this.isOpenModal = true;
    this.buttonTitle = "Register"
  }
  closeModal() {
    this.isOpenModal = false;
    this.getAllUsersList();
  }

  loadCurrentUser(user: IUser) {
    this.currentUser = user;
    this.buttonTitle ="Update"
    this.isOpenModal = true;

  }
}
