import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-applications-create',
  templateUrl: './applications-create.component.html',
  styleUrls: ['./applications-create.component.css']
})
export class ApplicationsCreateComponent implements OnInit {
  submitted = false;
  appraisalForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private apiService: ApiService
  ) {  }

  ngOnInit(): void {
    this.updateApplication();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.appraisalForm = this.fb.group({
      name: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      review: ['', [Validators.required]]
    });
  }

  updateApplication() {
    this.appraisalForm = this.fb.group({
      name: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      review: ['', [Validators.required]]
    });
  }

  getDetails(id) {
    this.apiService.getEmployee(id).subscribe(data => {
      this.appraisalForm.setValue({
        name: data.name,
        salary: data.salary,
        review: data.review
      });
    });
  }


  updateName(e) {
    this.appraisalForm.get('name').setValue(e, {
      onlySelf : true
    });
  }

  get myForm() {
    return this.appraisalForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.appraisalForm.valid) {
      return false;
    }
    else {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.apiService.addReview(id, this.appraisalForm.value.review).subscribe(
        (res) => {
          console.log('Application successfully created!');
          this.ngZone.run(() => this.router.navigateByUrl('/applications-list'));
        }, (error) => {
          console.log(error);
        });
    }
  }

}
