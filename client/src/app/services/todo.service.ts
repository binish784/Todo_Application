import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

  httpOptions={
    headers:new HttpHeaders({
      "Content-Type":"application/json"
    })
  }

  url:string="https://todo-app-42419.herokuapp.com/api/todo";

  fetchTodo():Observable<Todo[]>{
    return this.http.get<Todo[]>(this.url,this.httpOptions);
  }

  toggleTodo(todo):Observable<any>{
    let update_url=this.url+ "/" + todo.id;
    return this.http.put<any>(update_url+"","",this.httpOptions);
  }

  addTodo(todo){
    let response=( this.http.post<any>(this.url,todo,this.httpOptions));
    return response;
  }

  deleteTodo(todo){
    return this.http.delete(this.url+"/"+todo.id,this.httpOptions);    
  }

}
