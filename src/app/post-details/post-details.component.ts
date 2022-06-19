import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post: any;
  commentForm: FormGroup;
  comments: any = [];
  likes: [];
  likeCount = 0;
  likeText = "Like";

  constructor(
    private backendService: BackendService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.getPostDetails(params['id']);
      this.getPostComments(params['id']);
      // this.addRemoveLike(params['id']);
      this.getPostLikes(params['id']);
    });
  }

  commentSubmit(form: FormGroup) {
    console.log(form.value);

    const payload = {
      userId: this.authService.getLoggedInUserID(),
      postId: this.post.id,
      content: form.value.content,
    };
    this.backendService.createComment(payload).subscribe(
      (data) => {
        form.reset();
        this.toastr.success('Comment added', 'success');
        this.getPostComments(this.post.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPostDetails(postId: any) {
    const payload = {
      postId: postId,
    };

    this.backendService.getPostDetails(payload).subscribe(
      (res: any) => {
        this.post = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPostComments(postId: any) {
    const payload = {
      postId: postId,
    };
    this.backendService.getPostComments(payload).subscribe(
      (res: any) => {
        this.comments = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPostLikes(postId: any){
    const payload = {
      postId: postId
    };

    this.backendService.getPostLikes(payload).subscribe((res: any)=>{
      this.likes = res.data;
      this.likeCount = this.likes.length;

      //checking for the like status for a user..

      let likeState = this.likes.filter((like: any) => like.user.userId === this.authService.getLoggedInUserID());
      console.log('likeState => ',likeState);

      if (likeState.length === 0){
        this.likeText = "Like";
      }else{
        this.likeText = "Unlike";
      }
    },err=>{console.log(err)}
    )
  }

  addRemoveLike(postId: any) {
    const payload = {
      userId: this.authService.getLoggedInUserID(),
      postId: postId,
    };

    this.backendService.addRemoveLike(payload).subscribe(
      (data: any) => {
        console.log(data);
        if (data.status === 'added') {
          ++this.likeCount;
          this.likeText = "Unlike";
        } else if (data.status === 'removed') {
          --this.likeCount;
          this.likeText = "Like";
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
