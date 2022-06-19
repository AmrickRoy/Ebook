import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];
  constructor(
    private backendService: BackendService,
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    const payload = {
      userId : this.authService.getLoggedInUserID() 
    }
    this.backendService.getUsers(payload).subscribe((res:any)=>{
      	this.users = res.data;
    },err => {
      console.log(err);
    }
    )
  }
}
