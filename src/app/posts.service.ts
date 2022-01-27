import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map ,tap} from "rxjs/operators";
import { Posts } from "./posts.model";

@Injectable({providedIn: "root"})
export class PostsService{
  error = new Subject<String>();
    constructor(private http: HttpClient){}

    createAndStorePost(title:string, content:string){
        const postData:Posts = {title:title, content:content}
        this.http
        .post<{name:string}>(
          'https://ng-complete-guide-531b2-default-rtdb.firebaseio.com/posts.json',
          postData,{
            observe: 'response'
          }
        )
        .subscribe(responseData => {
          console.log(responseData);
        }, error =>{this.error.next(error.message)});
    }

    fetchPosts(){
      return this.http.get<{[key:string]:Posts}>('https://ng-complete-guide-531b2-default-rtdb.firebaseio.com/posts.json',
      {headers : new HttpHeaders({"custom-header": "hello"}),
       params: new HttpParams().set('print','pretty')
    }).
      pipe(map(responseData => {
        const postsArray = [];
        for (const key in responseData){
        postsArray.push({...responseData[key], id:key})
        }
        return postsArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
      );

     
    }

    deletePosts(){
      return this.http.delete('https://ng-complete-guide-531b2-default-rtdb.firebaseio.com/posts.json',
      {
        observe:'events'
      }).pipe(tap(events=>{
        console.log(events);
        if(events.type === HttpEventType.Response){
          console.log(events.body);
        }
      }))
    }
}