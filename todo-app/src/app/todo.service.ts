import { Injectable } from '@angular/core';
import { TODO } from '../utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  TodoArray: TODO[] = [];
  id: number = 0;
  todo: TODO = {} as TODO;

  AddTodo(todo: TODO) {
    this.todo = { id: this.id, ...todo };
    this.TodoArray.push(this.todo);
    this.id++;
  }

  UpdateTodo(todo: TODO) {
    this.TodoArray.map((t) => {
      if (t.id == todo.id) {
        t.text = todo.text;
        t.date = todo.date;
      }
    });
  }

  DeleteTodo(id: number) {
    this.TodoArray = this.TodoArray.filter((todo) => todo.id != id);
  }
}
