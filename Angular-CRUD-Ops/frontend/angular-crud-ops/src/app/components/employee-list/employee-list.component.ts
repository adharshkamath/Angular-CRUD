import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { ConfirmationDialogService } from './../../service/confirmation-dialog.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})

export class EmployeeListComponent implements OnInit {

  Employee: any = [];

  constructor(private apiService: ApiService, private confirmationDialogService: ConfirmationDialogService) {
    this.readEmployee();
  }

  ngOnInit() {}

  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
    });
  }

  openConfirmationDialog(employee, index) {
    this.confirmationDialogService.confirm('This action cannot be undone.', 'Are you sure you want to continue?')
    .then((confirmed) => {
      if (confirmed) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        });
      }}
    ).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  removeEmployee(employee, index) {
    if (window.confirm('This action cannot be undone. Are you sure you want to delete it?')) {
      this.apiService.deleteEmployee(employee._id).subscribe((data) => {
        this.Employee.splice(index, 1);
      });
    }
  }

}
