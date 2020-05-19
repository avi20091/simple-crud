import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeService } from 'src/app/service/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { InsertDialogComponent } from 'src/app/shared/insert-dialog/insert-dialog.component';
import { ToasterService } from 'src/app/service/toaster.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private empservice:EmployeeService, public dialog: MatDialog, private toasterService:ToasterService) { }

  result:any;
  dataSource:any;
  rowData:any;
  displayedColumns: string[] = ['index', 'id', 'name', 'surname', 'dept','joindate','action'];
  showSpinner:boolean = true;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = sort;
    }
  }

  
  ngOnInit() {
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    this.showSpinner = false;
    this.empservice.getEmployee().subscribe(res =>{
      this.result = res;
      this.dataSource = new MatTableDataSource<Element>(this.result);
    });
  }

  openDeleteDialog () {
      const message = "Are you sure to delete this row ?";
      const title = "Delete Row"
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        minWidth: "400px",
        disableClose: true,
        data: { title: title, message: message }
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          let successMessage = 'Record Deleted Successfully...!!!'
          this.toasterService.showToaster(successMessage, 'ok');
          this.getEmployeeDetails();
        }
      });
  }

  openInsertDialog(){
    const title = "Insert";
    const dialogRef = this.dialog.open(InsertDialogComponent, {
      width: '250px',
      data:{title:title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        // let successMessage = 'Record Inserted Successfully...!!!'
        // this.toasterService.showToaster(successMessage, 'ok');
          this.getEmployeeDetails();
        }
    });
  }

  openUpdateDialog(){
    const title = "Update";
    const dialogRef = this.dialog.open(InsertDialogComponent, {
      width: '250px',
      data:{title:title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        let successMessage = 'Record Updated Successfully...!!!'
        this.toasterService.showToaster(successMessage, 'ok');
          this.getEmployeeDetails();
        }
    });
  }


  changeValue(record) {
    this.rowData = record;
    console.log("in emp comp", this.rowData)
    this.empservice.emitChange(this.rowData);
  }

}
