import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { ConfirmationDialogService } from './../../service/confirmation-dialog.service';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html'
})

export class ApplicationsListComponent implements OnInit {
  Application: any = [];

  constructor(private apiService: ApiService, private confirmationDialogService: ConfirmationDialogService) {
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

  openConfirmationDialog(id, index) {
    this.confirmationDialogService.confirm('This action cannot be undone.', 'Are you sure you want to continue?')
    .then((confirmed) => {
      if (confirmed) {
        this.apiService.deleteReview(id).subscribe((data) => {
          this.Application.splice(index, 1);
        });
      }}
    ).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteReview(id, index) {
    if (window.confirm('This action cannot be undone. Are you sure you want to delete it?')) {
      this.apiService.deleteReview(id).subscribe((data) => {
        this.Application.splice(index, 1);
      });
    }
  }

}
