# NgMatForm

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

# Angular Material Forms example

This is a demo on how to create an angular material form using the angular and material CLI.

It includes:
* Routing
* Services
* Assets (json file)
* Reactive form control (including FormArray)
* Form validation (including messages)

## Initial Checks
- check npm setup for production only (this was an issue I faced during setup):
   ```bash
   npm config get production
   ```
   - If it's set to true make sure to set it to false for all dev-dependencies.
   ```bash
   npm config set -g production false
   ```   

## Initialize project:
- Make sure to have the latest version of node.
- Install the angular cli (command line interface)
```bash
$ npm install -g @angular/cli
```
- Creat a new angular project.
```bash
$ ng new ng-mat-form --routing
```
> --routing creates an additional app-routing.module.ts file and adds it to the
app.module.ts imports
- Move into your project folder.


## Folder structure (depends on angular cli version):
```code
├── .git
├── e2e
├── node_modules
├── src
│   ├── app
│   │   ├── app-routing.module.ts
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── browserlist
│   ├── favicon.ico
│   ├── index.html
│   ├── karma.config.js
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── tslint.json
├── angular.json
├── package.json
├── protractor.conf.js
├── README.md
└── tslint.json
```

## 1. Angular Material templates:
### Adding to cli
- Add the material cli options:
```bash
$ ng add @angular/material
```
   - If there are some issues with the latest version try this
   ```bash
   $ ng add @angular/material@6.2.1
   ```

This will add all required imports etc. to the project and make it material "ready".

It will also add cli options that can be used to add templates to the project.

### Navigation template:

Let's add a template for the navigation of the project via material cli:
```bash
$ ng generate @angular/material:material-nav --name myNavigation
```
This adds a new component to the project/src/app folder and makes sure that the component is setup in the app module:
```code
...
│   ├── app
│   │   ├── my-navigation
│   │   │   ├── my-navigation.component.css
│   │   │   ├── my-navigation.component.html
│   │   │   ├── my-navigation.component.spec.ts
│   │   │   ├── my-navigation.component.ts
│   │   ├── ...
...
```
#### File changes:
__app.component.html__:  

go to and check for the selector:
```typescript
...
@Component({
  selector: 'app-my-navigation',
  templateUrl: './my-navigation.component.html',
  styleUrls: ['./my-navigation.component.css']
})
...
```
Exchange the content of this file based on the selector, remove everything and only add the navigation component like this:
```html
<app-my-navigation></app-my-navigation>
```

Check it out:
```bash
$ ng serve --open
```

## 2. Data model
In this example app we would like to achieve the following:
Create a simple user and role model as a demo for the angular reactive forms including ngFor and a FormArray.

Even if it looks like, this is not about user authentication.

Let's start by creating a new folder in the app (src\app\model) called model.

Now we continue with the user model - we would like to include the following attributes:
- id
- username
- password
- email
- roles[ {roleId, expiryDate} ]

Name it user.model.ts and add the following content:
```typescript
export class User {
  constructor(public id:number = 0,
              public username:string = '',
              public password:string = '',
              public email:string = '',
              public roles:Roles[] = []
            ){}
}

class Roles {
    constructor(public roleId:number = 0,
                public expiryDate:Date = new Date()
              ){}
}

```

As of TypeScript's constructor syntax this will declare parameters and properties simultaneously and also initializes them automatically.

We will also creat a class for the roles as well (role.model.ts):
```typescript
export class Role {
  constructor(public id:number = 0,
              public name:string = '') {
  }
}
```
We will later link the User.roles[] to one or many Role.ids.

## 3. Mockup data in assets:

We also want some mockup data.
Let's create a file with some roles for a select on the form and for the roles[] of a user.

Move to the assets folder and create a file calles role.json with the following content:
```json
[{
    "id": 1,
    "name": "Administrator"
  },
  {
    "id": 2,
    "name": "Guest"
  },
  {
    "id": 3,
    "name": "Sales"
  },
  {
    "id": 4,
    "name": "Marketing"
  },
  {
    "id": 5,
    "name": "IT"
  }
]
```

## 4. Services
Next point to cover are the services that we would like to use.
We are going to create a service for the role to read all roles from the json file. This could later be changed to target a rest api or whatever.
We also want to make sure to place it in the service folder.

```bash
$ ng generate service service/role
```

### File changes

__app.module.ts:__  
add the import for the HttpClient:
```typescript
...
import { HttpClientModule } from '@angular/common/http';
...
```

and add it to the imports after the BrowserModule:
```typescript
...
@NgModule({
  ...
  imports: [
    BrowserModule,
    HttpClientModule,
    ...]
  ...
})
...
```
__role.service.ts:__  
Change the role service to look like this:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../model/role.model';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roleUrl = 'assets/role.json';

  constructor(private http: HttpClient) { }

  getRoleList(): Observable<Role[]>  {
    return this.http.get<Role[]>(this.roleUrl);
  }
}
```

We added imports for HttpClient, for the Role model, for Observable from rxjs.

Then we make sure to provide it in the root via the @Injectable and we also add the HttpClient via DI in the constructor.

We also write a method to return the observable that streams a list of roles based on the role.json that we defined earlier.



## 5. Routing:
### Prerequesites:
The routing file should be already installed and availabe in the app folder.
- app-routing.module.ts

We also need a component as a target for the initial page and the menu item.  
For that we will create the user-form component:
```bash
$ ng generate component user-form
```

This will create the component file and also add them in the app module via the declaration.


### File Changes:

__app-routing.module.ts:__  
add the component to the router module:
```javascript
...
import{ UserFormComponent } from './user-form/user-form.component';
...
```

and add the routes to the Routes:
```javascript
...
const routes: Routes = [
  { path: '', redirectTo: '/user-form', pathMatch: 'full' },
  { path: 'user-form', component: UserFormComponent }
];
...
```

__my-navigation.component.html:__  
The next things we need to do is to change the router links and add the router outlet (router hook) to the navigation content.

First, change the navigation links to our actual target url that we setup in the routing file:
```html
...
<mat-nav-list>
  <a mat-list-item routerLink="/user-form">Register</a>
</mat-nav-list>
...
```
Then move the router-outlet tag to the end of the side nav content:
```html
...
   <span>Application Title</span>
  </mat-toolbar>
 <router-outlet></router-outlet>
</mat-sidenav-content>
...
```
Check it out:
```bash
$ ng serve --open
```
You should see something like: user-form works! in the content area of the page.

## 6. Form control:
We already created the user-form component to set it up in our routing.

Now it's time to add some content to it.

### Prerequesites
We are planning to implement via the Reactive Forms way.
So first we need to make sure we have all required imports in the app module:

### File changes:

#### Module
Here we want to make sure that we have all the modules available in our form.  

__app.module.ts__  
Add the angular ReactiveFormsModule and the following material imports to the app modules:  

```typescript
...
import { ReactiveFormsModule }   from '@angular/forms';
import { ...
,MatInputModule, MatSelectModule, MatCardModule, MatNativeDateModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
...
imports: [
    ...
    ReactiveFormsModule,
    ...
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule
  ]
...
```

__user-form.component.ts__:  
Move to the user-form.component.ts file, there are quite some changes that we need to do here:

#### Model & Service
First we want to add the Model, the Service and we also want the service method to subscribe to the roleList observable:  
```typescript
...
import { RoleService } from '../service/role.service'
import { Role } from '../model/role.model';
import { User } from '../model/user.model';
...
export class UserFormComponent implements OnInit {
  roleList:Role[];
  user:User = new User();

  constructor(
    private roleService: RoleService) { }  

  ngOnInit() {
      this.getRoleList();
  }

  getRoleList(): void {
     this.roleService.getRoleList().subscribe(data => this.roleList = data);
  }

}
...
```
We now added a variable for the roleList that we will later on use for the dropdown options in the ui.
We added the user model that will be a representation of the user that is to be created.
We added the RoleService via Dependency Injection and we direclty call the getRoleList at ngOnInit.

#### FormBuilder
As the next step we will import the FormBuilder and create the userForm controls based on the user data model:  
```typescript
...
import { FormBuilder, FormArray } from '@angular/forms';
...
export class UserFormComponent implements OnInit {
  userForm = this.fb.group({
    username: [''],
    password: [''],
    email: [''],
    roles: this.fb.array([
      this.fb.group({
        roleId: [''],
        expiryDate: ['']
      })
    ])
  });
  constructor(
    ...    
    private fb: FormBuilder) { }
    ...
    get roles(): FormArray {
    return this.userForm.get('roles') as FormArray;
    }
    ...
    onSubmit(): void {
      Object.assign(this.user,this.user,this.userForm.value);
    }
  }
...
```
* The userForm reflects the same model as we have defined in the user.model.ts
* We also added a getter method for the roles to make it easier to access them direclty as a FormArray
* And we implemented the onSubmit() method that basically assigns the userForm to the user model

####  FormArray
Now we also want to be able to add and remove items of the FormArray roles.

```typescript
...
export class UserFormComponent implements OnInit {
  ...
  addUserRole(): void {
  this.roles.push(this.fb.group({
      roleId: [''],
      expiryDate: ['']
    }));
  }
  removeUserRole(i: number): void {
    this.roles.removeAt(i);
  }
 ...
}
...
```
* with this.roles we access the roles via the get method we defined and can use push and removeAt for adding/removing items.

__user-form.component.html__:  
We also need to completly change the file.
Add the following:
```html
<form novalidate [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <mat-card>
    <mat-form-field appearance="outline">
      <mat-label>username</mat-label>
      <input matInput formControlName="username">
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>password</mat-label>
      <input matInput type="password" formControlName="password">
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>email</mat-label>
      <input matInput formControlName="email">
    </mat-form-field>
  </mat-card>
  <mat-card>
    <div formArrayName="roles">
      <div *ngFor="let userRole of roles.controls; let i=index" [formGroupName]="i">
        <mat-form-field appearance="outline">
          <mat-label>role</mat-label>
          <mat-select formControlName="roleId">
            <mat-option *ngFor="let roleItem of roleList" [value]="roleItem.id">
              {{roleItem.name}}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <input matInput [matDatepicker]="picker" formControlName="expiryDate">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <button mat-raised-button (click)="removeUserRole(i)">
          <mat-icon aria-label="remove role">alarm</mat-icon>
        </button>

      </div>
      <button mat-raised-button (click)="addUserRole()">
        <mat-icon aria-label="add role">add</mat-icon>
      </button>
    </div>
  </mat-card>
    <mat-card>
  <button mat-raised-button type="submit">Submit</button>
    </mat-card>
</form>

<pre>{{userForm.value | json}}</pre>
<pre>{{user | json}}<pre>
```

Let's go through the most important points:

####  Form setup
```html
<form novalidate [formGroup]="userForm" (ngSubmit)="onSubmit()">
```  
* we add novalidate to disable standard validation
* as we imported the ReactiveFormsModule we now have access to its directives to bind the data
* with this we add [formGroup]="userForm" as a property binding to our userForm group from the component
* we also add a event binding for the ngSubmit to our onSubmit() methon in the component

####  Input fields
```html
...
<input matInput formControlName="username">
...
<input matInput type="password" formControlName="password">
...
<input matInput formControlName="email">
...
```  
* here we bind the form controls username, password and email to the input fields

#### Form Array  
```html
...
<div formArrayName="roles">
  <div *ngFor="let userRole of roles.controls; let i=index" [formGroupName]="i">
    ...
  </div>
  ...
</div>
...
```
* bind the form array to roles in the div that surrounds the ngFor and its content
* create another div that iterates through all controls (in this case the formgroup with no defined name) of the roles array - make sure to user roles.controls as we cannot iterate though a FormArray itself.
* bind the [formGroupName] to the index of the iteration -> this will enable a clear seperation between the different indices.

__select & input for the Form Array__  

Inside the form array we want to have a select(dropdown) and a date input field:
```html
...
<div formArrayName="roles">
  <div *ngFor ...>
    <mat-select formControlName="roleId">
      <mat-option *ngFor="let roleItem of roleList" [value]="roleItem.id">
        {{roleItem.name}}
      </mat-option>
    </mat-select>
    ...
    <input matInput [matDatepicker]="picker" formControlName="expiryDate">
    ...
  </div>
  ...
</div>
...
```

* bind the roleId to the form control
* use another ngFor to iterate over the complete roleList - this list comes from the role service and is not
bound to the form control or the user model -> its only used to populate the available options in the select!
* however we bind the [value] to the roleItem.id - that is the value we want to have as the roleId in the form control -> so the binding comes from the select formControlName ove the option [value].
* as another input we also add a date field bound to the form contol expiryDate.

__events for the Form Array__  
Adding buttons to remove and add roles:

```html
...
<div formArrayName="roles">
  <div *ngFor ...>
    ...
    <button mat-raised-button (click)="removeUserRole(i)">...</button>
  </div>
  <button mat-raised-button (click)="addUserRole()">...</button>
</div>
...
```

* bind the (click) in the ngFor to the removeUserRole and pass over the index
* bind the (click) outside the ngFor to the addUserRole

__submit__  
Add the following to submit (via the onSumbit() method):
```html
...
<button mat-raised-button type="submit">Submit</button>
...
```

__preview__  
By adding the following code to the end to the html:
```html
...
<pre>{{userForm.value | json}}</pre>
<pre>{{user | json}}<pre>
```
* we are now able to see a representation of the userForm and also the user model at the bottom of the page.


## 7. Form validation
With the setup we have, the validation is not a big problem anymore.

Let's add some basic validation rules.
We add the following validation rules & respective validation messages:
- username -> mandatory
- password -> mandatory & min 8 characters
- email -> valid email (inbuild validation)
- roleId -> mandatory

### File Changes
#### Validation ts
__user-form.component.ts__  
here is the code:
```typescript
...
import { ..., Validators } from '@angular/forms';
...
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
```
* added Validators into the FormBuilder controls
* added userFormValidationMessages for each control that we want to validate

#### Validation html
Let's add the validation messages into our html file using mat-error and ng directives.
There are multiple metadata properties in the form controls that we can use (on form controls and also form groups):

* __untouched__ True if control has not lost focus yet.
* __touched__ True if control has lost focus.
* __pristine__ True if user has not interacted with the control yet.
* __dirty__ True if user has already interacted with the control.
* __valid__ True if the control passes all validation rules.
* __invalid__ True if the control does not pass all validation rules.
* __hasError(<validation_rule>)__ True if the control is in error for the given validation rule  
...

In the html file we add the required attribute to all required form fields: We also add the <mat-error> tag twice - first one to iterate through all validating messages for the given form field - the second one to display the error message(s) that are defined via ngIf:

Example for username:
```html
...
<input matInput formControlName="username" required>
<mat-error *ngFor="let validation of userFormValidationMessages.username">
  <mat-error *ngIf="userForm.get('username').hasError(validation.type)
  && (userForm.get('username').dirty
  || userForm.get('username').touched)">{{validation.message}}</mat-error>
</mat-error>

<button mat-raised-button type="submit" [disabled]="userForm.invalid">Submit</button>
...
```
Continue for the other fields using the same logic.

For the FormArray fields there is a slightly different logic - we do not user userForm.get(), instead we use userRole.get() as this is part of the iteration we use in the parent ngFor.
```html
...
<div *ngFor="let userRole of roles.controls; let i=index" [formGroupName]="i">
  ...
  <mat-error *ngFor="let validation of userFormValidationMessages.roleId">
    <mat-error *ngIf="userRole.get('roleId').hasError(validation.type)
    && (userRole.get('roleId').dirty
    || userRole.get('roleId').touched)">{{validation.message}}</mat-error>
  </mat-error>
  ...
</div>
```
