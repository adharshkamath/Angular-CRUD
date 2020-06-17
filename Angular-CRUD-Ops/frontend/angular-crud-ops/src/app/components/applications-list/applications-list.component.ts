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
    this.readReview();
  }

  ngOnInit(): void {
  }

  readReview() {
    this.apiService.getReviews().subscribe((data) => {
      this.Application = data;
    });
  }

  editReview(id, index, newText) {
    this.apiService.updateReview(id, { review: newText }).subscribe((data) => {
      this.Application.splice(index, 1);
    });
  }


  deleteReview(id, index) {
    if (window.confirm('This action cannot be undone. Are you sure you want to delete it?')) {
      this.apiService.deleteReview(id).subscribe((data) => {
        this.Application.splice(index, 1);
      });
    }
  }

}
