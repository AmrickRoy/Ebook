import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitForm = false;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required]
    })

    // console.log(this.backendService.getdata());
  }

  registerSubmit(form: FormGroup) {

    this.submitForm = true;
    console.log(form.value);

    if (form.valid) {
      this.backendService.register(form.value).subscribe((data: any) => {

        if (data.status === 'success') {
          this.toaster.success('success', data.message);
          this.router.navigate(['']);
        } else {
          this.toaster.error('error', data.message);
        }
        
      }, err => { console.log(err); }
      );
    };

  }

}
