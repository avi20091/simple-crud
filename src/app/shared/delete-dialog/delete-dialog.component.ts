import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToasterService } from 'src/app/service/toaster.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  title: string;
  message: string;
  value:any;
  result:any;
  dataSource:any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogModel, private empservice:EmployeeService, private toasterService:ToasterService) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
    this.empservice.changeEmitted$.subscribe((resp) => {
      this.value = resp;
      console.log("in delete comp",this.value);
    });
  }

  getEmployeeDetails() {
    this.empservice.getEmployee().subscribe(res =>{
      this.result = res;
      this.dataSource = new MatTableDataSource<Element>(this.result);
      this.dataSource.sort = this.sort;
    });
  }

  onConfirm(seq_no): void {
    this.dialogRef.close(true);
    let a = this.value.id;

    this.empservice.getDeleteEmployee(a)
         .subscribe(res => {
          if (res.status === "OK") {
            console.log(res.status);
            let successMessage = 'Record Deleted Successfully...!!!'
            this.toasterService.showToaster(successMessage, 'ok');
            this.getEmployeeDetails();
          } else if (res.status == 'failure') {
            console.log("server side error...!!!");
            this.toasterService.showToaster(status, 'snackbar-error');
          }
    });
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class DeleteDialogModel {

  constructor(public title: string, public message: string) {
  }
}
