import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Posts } from './posts.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers:['PostsService']
})
export class AppComponent implements OnInit {
  loadedPosts:Posts[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe((posts)=>{
          this.isFetching = false;
          this.loadedPosts = posts;
    }) 
  }

  onCreatePost(postData: Posts) {
    this.postService.createAndStorePost(postData.title,postData.content);
    
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe((posts)=>{
          this.isFetching = false;
          this.loadedPosts = posts;
    }); 
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
   
  }
}
