import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  @Output() closeModal = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _service:UserService,
    private _toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.userForm = this._fb.group({
      name: ['', [Validators.required, this.validateEmpty]],
      email: ['', [Validators.required, Validators.email, this.validateEmpty]],
      address: ['', [Validators.required, this.validateEmpty]],
      mobile: ['', [Validators.required, this.validateMobile]],
      gender: ['', Validators.required],
    });
  }

  validateMobile(control: FormControl): ValidationErrors | null {    
    const mobile = control.value;
    const mobilePattern = /^[0-9]{10}$/;
    const isValid = mobilePattern.test(mobile);   
    if (mobile && !isValid) {
      return { invalidMobile: true };
    }
    return null;
  }

  validateEmpty(control: FormControl):ValidationErrors | null{
    const value = control.value || '';
    const checkEmpty = value.trim();   

    if (value && checkEmpty == '') {   
      return { isEmptySpace: true };
    }
    return null;
  }


  addUser() {
    if(this.userForm.valid){
      const userData = this.userForm.value
      this._service.registerUser(userData).subscribe({
        next :(res)=>{      
          this.resetUserForm()
          this._toastr.success("User Added")
        },
        error:(err)=>{
          this._toastr.error(err.message)
        }
      })
      
      
    }
  }

  modalClose() {
    this.closeModal.emit()
  }

  resetUserForm(){
    this.userForm.reset();
    this.closeModal.emit();
  }
}
