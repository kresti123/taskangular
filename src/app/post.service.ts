
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class PostService{

    endPointURL:string ='https://auth-project-kresti-default-rtdb.asia-southeast1.firebasedatabase.app/';
    postURL: string = this.endPointURL+'post.json';

    constructor(private http: HttpClient) {}
    //CREATE
    createAndPost(postData: Post){
        this.http.post<{name:string}>(this.postURL, postData).subscribe(
          (data) => {
             console.log(data);
          }
        );
      }
      //FETCH
      fetchPosts(){
        return this.http.get<{[key: string]: Post}> (this.postURL)
        .pipe(
          map(responseData => {
            const postArray: Post[] = [];
            for(const key in responseData){
              if(responseData.hasOwnProperty(key)){
                postArray.push({...responseData[key], id: key})
              }
            }
            return postArray;
          })
        );
      }
    //UPDATE
    updatePost(postData: Post){
        const data = { [postData.id] : {
            title: postData.title,
            content: postData.content
        }};
        return this.http.put(this.postURL, data);
    }
    //DELETE
      deletePosts(){
        return this.http.delete(this.postURL);
        
     }
    }    
