import {Component, OnInit, ViewChild, HostBinding} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeService } from 'src/app/service/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { InsertDialogComponent } from 'src/app/shared/insert-dialog/insert-dialog.component';
import { ToasterService } from 'src/app/service/toaster.service';
import {OverlayContainer} from "@angular/cdk/overlay";

const THEME_DARKNESS_SUFFIX = `-dark`;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  themes: string[] = [
		"deeppurple-amber",
		"indigo-pink",
		"pink-bluegrey",
		"purple-green",
	];
	
	@HostBinding('class') activeThemeCssClass: string;
	isThemeDark = false;
	activeTheme: string;
  
  setTheme(theme: string, darkness: boolean = null) {
		if (darkness === null)
			darkness = this.isThemeDark;
		else if (this.isThemeDark === darkness) {
			if (this.activeTheme === theme) return;
		} else
			this.isThemeDark = darkness;
		
		this.activeTheme = theme;
		
		const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme;
		
		const classList = this.overlayContainer.getContainerElement().classList;
		if (classList.contains(this.activeThemeCssClass))
			classList.replace(this.activeThemeCssClass, cssClass);
		else
			classList.add(cssClass);
		
		this.activeThemeCssClass = cssClass;
	}
	
	toggleDarkness() {
		this.setTheme(this.activeTheme, !this.isThemeDark);
	}

  constructor(private empservice:EmployeeService, public dialog: MatDialog, private toasterService:ToasterService, private overlayContainer: OverlayContainer)
    {  this.setTheme('indigo-pink', false);  }

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
    this.empservice.getEmployee().subscribe(res =>{
      this.showSpinner = false;
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
          this.showSpinner = false;
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
        this.showSpinner = false;
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
