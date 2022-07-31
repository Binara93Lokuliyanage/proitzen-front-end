import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  public ipAddress: any =  'http://localhost/proitzen/api/';
  constructor(private httpclient: HttpClient) { }

  public listEmployees(): Observable<any> {
        
    return this.httpclient.get(this.ipAddress + 'employees/listEmployees.php');
}
public getSalaries(param: any): Observable<any> {
        
  return this.httpclient.post(this.ipAddress + 'employees/getSalaries.php', param);
}
public getTitles(param: any): Observable<any> {
        
  return this.httpclient.post(this.ipAddress + 'employees/getTitles.php', param);
}
public addEmployee(param: any): Observable<any> {
        
  return this.httpclient.post(this.ipAddress + 'employees/addEmployee.php', param);
}
public addSalary(param: any): Observable<any> {
        
  return this.httpclient.post(this.ipAddress + 'employees/addSalary.php', param);
}
public addTitle(param: any): Observable<any> {
        
  return this.httpclient.post(this.ipAddress + 'employees/addTitle.php', param);
}
public deleteTitle(param: any): Observable<any> {
        
  return this.httpclient.post(this.ipAddress + 'employees/deleteTitle.php', param);
}
public deleteSalary(param: any): Observable<any> {
        
  return this.httpclient.post(this.ipAddress + 'employees/deleteSalary.php', param);
}
public updateEmployee(param: any): Observable<any> {
        
  return this.httpclient.post(this.ipAddress + 'employees/updateEmployee.php', param);
}
}

