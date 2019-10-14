import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo:Todo;
  @Output() removeTodo:EventEmitter<Todo> = new EventEmitter();


  constructor(private todoService:TodoService) { }

  ngOnInit() {
  }

  deleteTodo(){
    this.removeTodo.emit(this.todo);
  }

  toggleTodo(){
    this.todo.completed=!this.todo.completed;
    this.todoService.toggleTodo(this.todo).subscribe();
  }

  getClasses(){
    let classes={
      "todo":true,
      "completed":this.todo.completed
    }
    return classes;
  }

}
