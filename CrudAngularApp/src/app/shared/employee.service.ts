import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employee: Employee[]; //here we save all employees collections
  readonly baseURl = "http://localhost:3000/employees";

  constructor(private http : HttpClient) { }

  postEmployee(emp : Employee){
    return this.http.post(this.baseURl,emp);
  }
  getEmployeeList(){
    return this.http.get(this.baseURl);
  }

}
