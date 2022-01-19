import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Posts } from "./posts.model";

@Injectable({providedIn: "root"})
export class PostsService{
    constructor(private http: HttpClient){}

    createAndStorePost(title:string, content:string){
        const postData:Posts = {title:title, content:content}
        this.http
        .post<{name:string}>(
          'https://ng-complete-guide-531b2-default-rtdb.firebaseio.com/posts.json',
          postData
        )
        .subscribe(responseData => {
          console.log(responseData);
        });
    }

    fetchPosts(){
      return this.http.get<{[key:string]:Posts}>('https://ng-complete-guide-531b2-default-rtdb.firebaseio.com/posts.json').
      pipe(map(responseData => {
        const postsArray = [];
        for (const key in responseData){
        postsArray.push({...responseData[key], id:key})
        }
        return postsArray;
      }));
    }


}