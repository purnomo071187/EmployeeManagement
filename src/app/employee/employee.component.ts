import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee.model';

@Component({
  selector: 'cf-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})

export class EmployeeComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Username : [''],
      FirstName : [''],
      LastName : [''],
      Email : [''],
      BirthDate : [''],
      BasicSalary : [''],
      Status : [''],
      Group : [''],
      Description : ['']
    })
    this.getAllPegawai();
  }

  clickAddPegawai(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.Username = this.formValue.value.Username;
    this.employeeModelObj.FirstName = this.formValue.value.FirstName;
    this.employeeModelObj.LastName = this.formValue.value.LastName;
    this.employeeModelObj.Email = this.formValue.value.Email;
    this.employeeModelObj.BirthDate = this.formValue.value.BirthDate;
    this.employeeModelObj.BasicSalary = this.formValue.value.BasicSalary;
    this.employeeModelObj.Status = this.formValue.value.Status;
    this.employeeModelObj.Group = this.formValue.value.Group;
    this.employeeModelObj.Description = this.formValue.value.Description;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      alert("Data Pegawai telah ditambahkan.")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllPegawai();
    },
    err=>{
      alert("Data tidak tersimpan!");
    })
  }

  getAllPegawai(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  hapusPegawai(row: any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Data Pegawai telah terhapus!");
      this.getAllPegawai();
    })
  }

  editPegawai(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id
    this.formValue.controls['Username'].setValue(row.Username)
    this.formValue.controls['FirstName'].setValue(row.FirstName)
    this.formValue.controls['LastName'].setValue(row.LastName)
    this.formValue.controls['Email'].setValue(row.Email)
    this.formValue.controls['BirthDate'].setValue(row.BirthDate)
    this.formValue.controls['BasicSalary'].setValue(row.BasicSalary)
    this.formValue.controls['Status'].setValue(row.Status)
    this.formValue.controls['Group'].setValue(row.Group)
    this.formValue.controls['Description'].setValue(row.Description)
  }

  updateEmployeeDetails(){
    this.employeeModelObj.Username = this.formValue.value.Username;
    this.employeeModelObj.FirstName = this.formValue.value.FirstName;
    this.employeeModelObj.LastName = this.formValue.value.LastName;
    this.employeeModelObj.Email = this.formValue.value.Email;
    this.employeeModelObj.BirthDate = this.formValue.value.BirthDate;
    this.employeeModelObj.BasicSalary = this.formValue.value.BasicSalary;
    this.employeeModelObj.Status = this.formValue.value.Status;
    this.employeeModelObj.Group = this.formValue.value.Group;
    this.employeeModelObj.Description = this.formValue.value.Description;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Data telah di update.");
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllPegawai();
    })
  }

}
