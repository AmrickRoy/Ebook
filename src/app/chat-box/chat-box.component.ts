import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  toUserId: any = null;
  messages: any = [];
  sender: any = null;
  receiver: any = null;
  currentUser: any = null;
  chatForm: any = FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private backendService: BackendService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['toUserId']);
      this.toUserId = params['toUserId'];
    });
    setInterval(() => {
      this.getChatMessages();
    }, 3000)
    this.currentUser = this.authService.getLoggedInUserID();

    this.chatForm = this.fb.group({
      text: ['', Validators.required],
    });
  }

  getChatMessages() {
    const payload = {
      fromUserId: this.authService.getLoggedInUserID(),
      toUserId: this.toUserId
    }
    this.backendService.getChatMessages(payload).subscribe((data: any) => {
      this.messages = data.messages;
      this.sender = data.sender;
      this.receiver = data.receiver;
      // console.log(this.messages);
    }, err => {
      console.log(err);
    });
  }

  chatSubmit(form: FormGroup) {
    console.log(form.value);

    const payload = {
      fromUserId: this.authService.getLoggedInUserID(),
      toUserId: this.toUserId,
      text: form.value.text
    }

    this.backendService.sendChatMessages(payload).subscribe((data: any) => {
      // console.log(data);
      form.reset();
      this.getChatMessages();
    }, err => {
      console.log(err);
    });
  }

}
