import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postForm: FormGroup;
  posts: any = [];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private backendService: BackendService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      content: ['', Validators.required]
    });
    this.getAllposts();
  }

  logout() {
    localStorage.removeItem('authData');
    this.router.navigate(['']);
  }

  postSubmit(form: FormGroup) {
    console.log(form.value);
    const payload = {
      userId: this.authService.getLoggedInUserID(),
      content: form.value.content
    }
    this.backendService.createPost(payload).subscribe((data: any) => {
      form.reset();
      this.toastr.success('New post added', 'success');
      this.getAllposts();
    }, err => { console.log(err); }
    );
  };

  getAllposts() {
    this.backendService.getAllPost().subscribe((res: any) => {
      this.posts = res.data;
    },err=>{console.log(err)}
    );
  };

}
