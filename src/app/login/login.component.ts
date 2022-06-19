import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitForm = false;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  loginSubmit(form: FormGroup) {
    this.submitForm = true;
    console.log(form.value);

    if (form.valid) {
      this.backendService.login(form.value).subscribe((data: any) => {
        if (data.status === 'success') {
          this.toaster.success('success', data.message);
          localStorage.setItem('authData', JSON.stringify(data));
          this.router.navigate(['home']);
        } else {
          this.toaster.error('error', data.message);
        }
      }, err => { console.log(err); }
      );
    }

  }

}
