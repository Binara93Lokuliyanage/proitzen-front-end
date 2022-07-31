import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { getByEmpNo } from '../classes/getByEmpNo';
import { addEmployee } from '../classes/addEmployee';
import { addSalary } from '../classes/addSalary';
import { addTitle } from '../classes/addTitle';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  listEmployees: any;
  salaryData: any;
  titleData: any;

  empData={
    emp_no:"",
    first_name:"",
    last_name:"",
    birth_date:"",
    gender:"",
    hire_date:""
  };

  titleDetails={
    title:"",
    from_date:"",
    to_date:"",
  };

  salDetails={
    salary:"",
    from_date:"",
    to_date:"",
  };
  disableStatus: boolean;
  disableStatusSal: boolean;
  constructor(private router: Router, private apiService: ApiServiceService) { }

  ngOnInit(): void {
    document.getElementById('empDataLoader').style.display = 'none';
    document.getElementById('empEditLoader').style.display = 'none';
    this.apiService.listEmployees()
    .subscribe
    (
      data => {
        this.listEmployees = data;
      }
    );
  }
  tableRowClicked(emp){
    
    document.getElementById('profileData').innerHTML = emp.first_name + " " + emp.last_name +"<br><br>" + emp.birth_date +"<br><br>" + emp.gender +"<br><br>" + emp.hire_date ;
    document.getElementById('empDataLoader').style.display = 'block';
    document.getElementById('empEditLoader').style.display = 'none';

    this.empData.emp_no = emp.emp_no;
    this.empData.first_name = emp.first_name;
    this.empData.last_name = emp.last_name;
    this.empData.birth_date = emp.birth_date;
    this.empData.gender = emp.gender;
    this.empData.hire_date = emp.hire_date;

    const param = new getByEmpNo();
    param.emp_no = emp.emp_no;
    this.apiService.getSalaries(param)
    .subscribe
    (
      data => {
        this.salaryData = data;
        this.salDetails.salary = data[0].salary;
        this.salDetails.from_date = data[0].from_date;
        this.salDetails.to_date = data[0].to_date;
      }
    );
    this.apiService.getTitles(param)
    .subscribe
    (
      data => {
        this.titleData = data;
        this.titleDetails.title = data[0].title;
        this.titleDetails.from_date = data[0].from_date;
        this.titleDetails.to_date = data[0].to_date;
      }
    );
  }
  EditEmp(){
    document.getElementById('saveSubmit').style.display = 'none';
    document.getElementById('updateSubmit').style.display = 'block';
    document.getElementById('empDataLoader').style.display = 'none';
    document.getElementById('empEditLoader').style.display = 'block';
    this.disableStatus = true;
    this.disableStatusSal = true;
    document.getElementById('addTitleBtn').style.visibility = 'visible';
    document.getElementById('deleteTitleBtn').style.visibility = 'visible';
    document.getElementById('addSalBtn').style.visibility = 'visible';
    document.getElementById('deleteSalBtn').style.visibility = 'visible';
    localStorage.setItem('readyNewTitle','false');
    localStorage.setItem('readyNewSal','false');
    
  }
  addEmployee(){
    this.empData.emp_no = '';
    this.empData.first_name = '';
    this.empData.last_name = '';
    this.empData.birth_date = '';
    this.empData.gender = '';
    this.empData.hire_date = '';
    this.salDetails.salary = '';
    this.salDetails.to_date = '';
    this.salDetails.from_date = '';
    this.titleDetails.title = '';
    this.titleDetails.to_date = '';
    this.titleDetails.from_date = '';

    document.getElementById('empDataLoader').style.display = 'none';
    document.getElementById('empEditLoader').style.display = 'block';
    document.getElementById('addTitleBtn').style.visibility = 'hidden';
    document.getElementById('deleteTitleBtn').style.visibility = 'hidden';
    document.getElementById('addSalBtn').style.visibility = 'hidden';
    document.getElementById('deleteSalBtn').style.visibility = 'hidden';
    document.getElementById('saveSubmit').style.display = 'block';
    document.getElementById('updateSubmit').style.display = 'none';
    this.disableStatus = false;
    this.disableStatusSal = false;
  }
  addNewEmployee(){
    if(this.empData.first_name === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter First Name !'
    } else if(this.empData.last_name === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Last Name !'
    } else if(this.empData.birth_date === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Date of Birth !'
    } else if(this.empData.gender === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Select Gender !'
    } else if(this.empData.hire_date === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Select Hire Date !'
    } else if(this.salDetails.salary === null || this.salDetails.salary === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Salary Amount !'
    }  else if(this.salDetails.from_date === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Salary From Date !'
    }  else if(this.salDetails.to_date === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Salary To Date !'
    }  else if(this.titleDetails.title === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Title !'
    }  else if(this.titleDetails.from_date === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Title From Date !'
    }  else if(this.titleDetails.to_date === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Title To Date !'
    } else if(this.titleDetails.to_date < this.titleDetails.from_date){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Title From Date can not be a later date than to date !'
    } else if(this.salDetails.to_date < this.salDetails.from_date){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Salary From Date can not be a later date than to date !'
    } else {
      const param = new addEmployee();
      param.first_name = this.empData.first_name;
      param.last_name = this.empData.last_name;
      param.birth_date = this.empData.birth_date;
      param.gender = this.empData.gender;
      param.hire_date = this.empData.hire_date;

    this.apiService.addEmployee(param)
    .subscribe
    (
      data => {
        
          const param2 = new addSalary();
          param2.emp_no = null;
        param2.salary = this.salDetails.salary;
        param2.from_date = this.salDetails.from_date;
        param2.to_date = this.salDetails.to_date;

        this.apiService.addSalary(param2)
    .subscribe
    (
      data => {
        const param3 = new addTitle();
        param3.emp_no = null;
    param3.title = this.titleDetails.title;
    param3.from_date = this.titleDetails.from_date;
    param3.to_date = this.titleDetails.to_date;

    this.apiService.addTitle(param3)
    .subscribe
    (
      data => {
        document.getElementById('empDataLoader').style.display = 'none';
        document.getElementById('empEditLoader').style.display = 'none';
        this.apiService.listEmployees()
    .subscribe
    (
      data => {
        this.listEmployees = data;
      }
    );
      }
    );
      }
    );
     
      }
    );
    }

  }
  closeError(){
    document.getElementById('errorMsg').style.visibility = 'hidden';

  }
  deletTitleBtnClicked(){
    const param3 = new addTitle();
    param3.emp_no = this.empData.emp_no;
param3.title = this.titleDetails.title;
param3.from_date = this.titleDetails.from_date;

this.apiService.deleteTitle(param3)
.subscribe
(
  data => {
    document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Title Deleted Successfully'
      document.getElementById('empDataLoader').style.display = 'none';
      document.getElementById('empEditLoader').style.display = 'none';
  }
)

  }
  addTitleBtnclicked(){
    localStorage.setItem('readyNewTitle','true');
    
    document.getElementById('addTitleBtn').style.visibility = 'hidden';
    document.getElementById('deleteTitleBtn').style.visibility = 'hidden';
    this.disableStatus = false;
    this.titleDetails.title = '';
    this.titleDetails.from_date = '';
    this.titleDetails.to_date = '';
  }
  deletSalBtnClicked(){
    const param3 = new addSalary();
    param3.emp_no = this.empData.emp_no;
param3.from_date = this.titleDetails.from_date;

this.apiService.deleteSalary(param3)
.subscribe
(
  data => {
    document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Salary Deleted Successfully'
      document.getElementById('empDataLoader').style.display = 'none';
      document.getElementById('empEditLoader').style.display = 'none';
  }
)

  }
  addSalBtnclicked(){
    localStorage.setItem('readyNewSal','true');
    
    document.getElementById('addSalBtn').style.visibility = 'hidden';
    document.getElementById('deleteSalBtn').style.visibility = 'hidden';
    this.disableStatusSal = false;
    this.salDetails.salary = '';
    this.salDetails.from_date = '';
    this.salDetails.to_date = '';
  }
  updateEmployee(){
    if(this.empData.first_name === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter First Name !'
    } else if(this.empData.last_name === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Last Name !'
    } else if(this.empData.birth_date === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Date of Birth !'
    } else if(this.empData.gender === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Select Gender !'
    } else if(this.empData.hire_date === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Select Hire Date !'
    } else if(this.salDetails.salary === null || this.salDetails.salary === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Salary Amount !'
    }  else if(this.salDetails.from_date === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Salary From Date !'
    }  else if(this.salDetails.to_date === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Salary To Date !'
    }  else if(this.titleDetails.title === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Title !'
    }  else if(this.titleDetails.from_date === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Title From Date !'
    }  else if(this.titleDetails.to_date === ''){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Please Enter Title To Date !'
    } else if(this.titleDetails.to_date < this.titleDetails.from_date){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Title From Date can not be a later date than to date !'
    } else if(this.salDetails.to_date < this.salDetails.from_date){
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Salary From Date can not be a later date than to date !'
    } else {
      const param = new addEmployee();
      param.emp_no = this.empData.emp_no;
      param.first_name = this.empData.first_name;
      param.last_name = this.empData.last_name;
      param.birth_date = this.empData.birth_date;
      param.gender = this.empData.gender;
      param.hire_date = this.empData.hire_date;

    this.apiService.updateEmployee(param)
    .subscribe
    (
      data => {
        if(localStorage.getItem('readyNewTitle') === 'true'){
          const param3 = new addTitle();
        param3.emp_no = this.empData.emp_no;
    param3.title = this.titleDetails.title;
    param3.from_date = this.titleDetails.from_date;
    param3.to_date = this.titleDetails.to_date;

    this.apiService.addTitle(param3)
    .subscribe
    (
      data => {
        
    }
    )
        }
        if(localStorage.getItem('readyNewSal') === 'true'){
          const param3 = new addSalary();
        param3.emp_no = this.empData.emp_no;
    param3.salary = this.salDetails.salary;
    param3.from_date = this.salDetails.from_date;
    param3.to_date = this.salDetails.to_date;

    this.apiService.addSalary(param3)
    .subscribe
    (
      data => {
      }
    )
      }
      document.getElementById('errorMsg').style.visibility = 'visible'
      document.getElementById('errorTxt').innerHTML = 'Employee Updated Successfully'
      document.getElementById('empDataLoader').style.display = 'none';
      document.getElementById('empEditLoader').style.display = 'none';
      this.apiService.listEmployees()
    .subscribe
    (
      data => {
        this.listEmployees = data;
      }
    );
      }
    )
  }
}
cancelSave(){
  
  document.getElementById('empDataLoader').style.display = 'none';
  document.getElementById('empEditLoader').style.display = 'none';
}
}