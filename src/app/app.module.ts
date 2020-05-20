import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './components/employee/employee.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatSnackBarModule, MatInputModule, MatDialogModule, MatRadioModule, MatToolbarModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { EmployeeService } from './service/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
import { InsertDialogComponent } from './shared/insert-dialog/insert-dialog.component';
import { ToasterService } from './service/toaster.service';
import { DatePipe } from '@angular/common';
import { MatSpinnerOverlayComponent } from './components/mat-spinner-overlay/mat-spinner-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DeleteDialogComponent,
    InsertDialogComponent,
    MatSpinnerOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatTableModule,
    MatGridListModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTooltipModule       
  ],
  providers: [EmployeeService, ToasterService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent, InsertDialogComponent],
  exports: [MatProgressSpinnerModule]
})
export class AppModule { }
