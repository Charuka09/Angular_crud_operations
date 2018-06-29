import { Employee } from './../shared/employee.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { EmployeeService } from './../shared/employee.service';

declare var M:any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm){
    if(form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id:"",
      name:"",
      position:"",
      office: "",
      salary: null
    }
  }

  onSubmit(form :NgForm){
    if(form.value._id == ""){
    this.employeeService.postEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshEmployeeList();
      M.toast({ html: 'saved successfully' , classs: 'rounded'});
    });
  }
  else{
    this.employeeService.putEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      M.toast({ html: 'saved successfully' , classs: 'rounded'});
      this.refreshEmployeeList();
    });
  }
  }
  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employee = res as Employee[];
    })
  }

  onEdit(emp :Employee){
    this.employeeService.selectedEmployee=emp;
  }

  onDelete(_id: string, form:NgForm){
    if(confirm('Are you sure to delete this record?') == true){
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html : 'Deleted successfully' , classes: 'rounded'});
      });

    }
  }

}
