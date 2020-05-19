import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private snackBar: MatSnackBar) {
  }
  showToaster = (msg, panelClass) => {
    let config = new MatSnackBarConfig();
      config.verticalPosition = 'top',
      config.horizontalPosition = 'center';
       config.duration = 5000;
      if(typeof panelClass == 'string'){
        panelClass = [panelClass];
      }
      config.panelClass = panelClass,
      this.snackBar.open(msg, "CLOSE", config);
  }
}
