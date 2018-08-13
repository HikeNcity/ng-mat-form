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
