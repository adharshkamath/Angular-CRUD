import { Employee } from './../../model/employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})

export class EmployeeEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  employeeData: Employee[];
  EmployeeProfile = ['Employee', 'Manager', 'Assistant Manager', 'Deputy Manager', 'Senior Manager', 'Team Lead'];
  EmployeeDepartment = ['Finance', 'Human Resources', 'Operations', 'Research and Development', 'Compliance'];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateEmployee();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,10}$')]],
      department: ['', [Validators.required]],
      salary: ['', [Validators.required]],
    });
  }


  updateProfile(e) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true
    });
  }

  updateDepartment(e) {
    this.editForm.get('department').setValue(e, {
      onlySelf: true
    });
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getEmployee(id) {
    this.apiService.getEmployee(id).subscribe(data => {
      this.editForm.setValue({
        name: data.name,
        email: data.email,
        designation: data.designation,
        phoneNumber: data.phoneNumber,
        department: data.department,
        salary: data.salary
      });
    });
  }

  updateEmployee() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      department: ['', [Validators.required]],
      salary: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.apiService.updateEmployee(id, this.editForm.value)
        .subscribe(res => {
          this.router.navigateByUrl('/employees-list');
          console.log('Content updated successfully!');
        }, (error) => {
          console.log(error);
        });
    }
  }

}
