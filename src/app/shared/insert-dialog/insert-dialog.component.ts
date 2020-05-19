import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToasterService } from 'src/app/service/toaster.service';
import { DatePipe } from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';

export interface DialogData {
  title:any;
}

@Component({
  selector: 'app-insert-dialog',
  templateUrl: './insert-dialog.component.html',
  styleUrls: ['./insert-dialog.component.scss']
})
export class InsertDialogComponent implements OnInit {
  no:any;
  name:any;
  surname:any;
  dept:any;
  joindate:Date;
  title:any;
  public isUpdate = false;
  public isSubmit = true;
  value:any;
  isAdded: boolean = false;
  result:any;
  dataSource:any;

  insertForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(6)]),
    surname: new FormControl('', [Validators.required,Validators.minLength(6)]),
    dept: new FormControl('', [Validators.required,Validators.minLength(6)]),
    joindate: new FormControl('', [Validators.required]),
  });

  get Name(){
    return this.insertForm.get('name')
  }

  constructor(
    public dialogRef: MatDialogRef<InsertDialogComponent>, public datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public empservice:EmployeeService, private toasterService:ToasterService) {}

  ngOnInit() {
    this.empservice.changeEmitted$.subscribe((resp) => {
      this.value = resp;
      this.insertForm.get('name').setValue(this.value.name);
      this.insertForm.get('surname').setValue(this.value.surname);
      this.insertForm.get('dept').setValue(this.value.dept);
      this.insertForm.get('joindate').setValue(this.value.joindate);
      this.isUpdate = true;
      this.isSubmit = false;
      this.title = this.data.title;
    });
    this.title = this.data.title;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getEmployeeDetails() {
    this.empservice.getEmployee().subscribe(res =>{
      this.result = res;
      this.dataSource = new MatTableDataSource<Element>(this.result);
    });
  }

  formateDate(val) {
    return val != null ? this.datepipe.transform(val, 'dd-MMM-yyyy h:mm:ss a') : ''
  }


  onInsertSubmit() {
    const param = {
      name: this.insertForm.controls['name'].value,
      surname: this.insertForm.controls['surname'].value,
      dept: this.insertForm.controls['dept'].value,
      joindate: this.insertForm.controls['joindate'].value
    }    
    
    this.empservice.getInsertEmployee(param)
      .subscribe(res => {
        if (res) {
          console.log(res.status);

          let successMessage = 'Record Inserted Successfully...!!!';
          this.toasterService.showToaster(successMessage, 'success');
          this.toasterService.showToaster(successMessage, 'ok');
          this.getEmployeeDetails();
        }
      },
        error => {
          console.log("server side error...!!!");
          this.toasterService.showToaster('Unable to insert new record', 'snackbar-error');
        });
  }

  onUpdateSubmit() {
    let a = this.value.id;
    const param = {
      name: this.insertForm.controls['name'].value,
      surname: this.insertForm.controls['surname'].value,
      dept: this.insertForm.controls['dept'].value,
      joindate: this.insertForm.controls['joindate'].value
    }    
    
    this.empservice.getUpdateEmployee(a,param)
         .subscribe(res => {
          if (res.status === 'success') {
            console.log(res);
            let successMessage = 'Record Updated Successfully...!!!'
            this.toasterService.showToaster(successMessage, 'ok');
            this.getEmployeeDetails();
          } else if (res.status == 'failure') {
            console.log("server side error...!!!");
            this.toasterService.showToaster(res.message, 'snackbar-error');
          }
    });
  }

}
