import { Component } from '@angular/core';
import { IUser } from '../../models/IUser';
import { UserFormComponent } from '../user-form/user-form.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserFormComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isOpenModal: boolean = false;

  userList: IUser[] = [
    { name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor' },
    { name: 'Mike Jones', email: 'mike.jones@example.com', role: 'User' },
  ];

  constructor(
    private _toastr:ToastrService
  ) {  }

  openModal() {
    this.isOpenModal = true;
  }
  closeModal() {
    this.isOpenModal = false;
  }

  onClick(){
    this._toastr.success("clicked")
  }
}
