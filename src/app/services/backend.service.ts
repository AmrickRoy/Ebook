import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {

  }
  getdata(){
    return {
      data: 'abc'
    };
  };
  

  register(payload: any) {
    return this.http.post('http://localhost/ebook/api/registration.php', payload);
  }


  login(payload: any) {
    return this.http.post('http://localhost/ebook/api/login.php', payload);
  }

  getUsers(payload: any) {
    return this.http.post('http://localhost/ebook/api/get_all_users.php', payload);
  }

  createPost(payload: any) {
    return this.http.post('http://localhost/ebook/api/create_post.php', payload);
  }

  getAllPost() {
    return this.http.get('http://localhost/ebook/api/get_all_posts.php');
  }

  getPostDetails(payload: any) {
    return this.http.post('http://localhost/ebook/api/get_post_details.php',payload);
  }

  getPostComments(payload: any) {
    return this.http.post('http://localhost/ebook/api/get_post_comments.php',payload);
  }

  getPostLikes(payload: any) {
    return this.http.post('http://localhost/ebook/api/get_post_likes.php',payload);
  }
 
  createComment(payload: any) {
    return this.http.post('http://localhost/ebook/api/create_comment.php', payload);
  }

  addRemoveLike(payload: any) {
    return this.http.post('http://localhost/ebook/api/add_remove_like.php', payload);
  }

  sendChatMessages(payload: any) {
    return this.http.post('http://localhost/ebook/api/send_chat_messages.php', payload);
  }

  getChatMessages(payload: any) {
    return this.http.post('http://localhost/ebook/api/get_chat_messages.php', payload);
  }


}
