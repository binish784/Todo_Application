import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor() { }

  @Output() addTodo:EventEmitter<any> = new EventEmitter();

  title="";

  
  ngOnInit() {
  }

  onSubmit(){
    let new_todo={
      title:this.title,
      completed:false
    }
    this.addTodo.emit(new_todo);
  }

}
