import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/Todo';
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos:Todo[]

  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todoService.fetchTodo().subscribe(todos=>
      this.todos=todos
    );
    
  }

  removeTodo(todo){
    this.todos=this.todos.filter(function(t){
      return t.id!==todo.id;
    })
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo){
    let new_todo:Todo;
    this.todoService.addTodo(todo).subscribe(todo=> 
      this.todos.push(todo.Item)
    );
  }



}
