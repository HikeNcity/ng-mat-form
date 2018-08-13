import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service'
import { Role } from '../model/role.model';
import { User } from '../model/user.model';
import { FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  roleList: Role[];
  user: User = new User();

  userForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', Validators.email],
    roles: this.fb.array([
      this.fb.group({
        roleId: ['', Validators.required],
        expiryDate: ['']
      })
    ])
  });

  userFormValidationMessages = {
    username: [
      { type: 'required', message: 'Username is required' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' }
    ],
    email: [
      { type: 'email', message: 'Enter a valid email' }
    ],
    roleId: [
      { type: 'required', message: 'Role is required' }
    ]
  };

  constructor(
    private roleService: RoleService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getRoleList();
  }

  get roles(): FormArray {
    return this.userForm.get('roles') as FormArray;
  }

  getRoleList(): void {
    this.roleService.getRoleList().subscribe(data => this.roleList = data);
  }

  addUserRole(): void {
    this.roles.push(this.fb.group({
      roleId: ['', Validators.required],
      expiryDate: ['']
    }));
  }

  removeUserRole(i: number): void {
    this.roles.removeAt(i);
  }

  onSubmit(): void {
    Object.assign(this.user, this.user, this.userForm.value);
  }

}
