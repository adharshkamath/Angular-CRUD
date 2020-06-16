import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.css']
})

export class ApplicationsListComponent implements OnInit {
  Application: any = [];

  constructor(private apiService: ApiService) {
    this.readApplication();
  }

  ngOnInit(): void {
  }

  readApplication() {
    this.apiService.getApplications().subscribe((data) => {
      this.Application = data;
    });
  }

  approveApplication(id, index, value) {
    if (window.confirm('Are you sure?')) {
      this.apiService.approveApplication(id, { raise: value }).subscribe((data) => {
        this.Application.splice(index, 1);
      });
    }
  }


  rejectApplication(id, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.rejectApplication(id).subscribe((data) => {
        this.Application.splice(index, 1);
      });
    }
  }

}
