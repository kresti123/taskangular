import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from './post.model';
import { NgForm } from '@angular/forms';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('putForm') putForm: NgForm;
  showLoading = false;
  loadedPosts = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }
  itemClick(postData: Post){
    console.log(postData);
    console.log(this.putForm);
    this.putForm.setValue({
      id: postData.id,
      title: postData.title,
      content: postData.content
    });
  }
//CREATE
  onCreatePost(postData: Post){ 
    this.postService.createAndPost(postData);
  }
  //UPDATE
  onUpdatePost(postData: Post){
    console.log(postData);
    this.postService.updatePost(postData).subscribe(
      response => {
        console.log(response);
      }
    );
  }
  //FETCH
  onFetchPosts() {
    this.fetchPosts();
  }
  private fetchPosts(){
    this.showLoading = true;  
    this.postService.fetchPosts()
    .subscribe(
      posts => {
        this.showLoading = false;
        this.loadedPosts = posts;
      }
     )
 }
 //CLEAR
  onClearPosts() {
    this.postService.deletePosts().subscribe(
      (data) => {
        this.loadedPosts = [];
      }
    );
  }


}
