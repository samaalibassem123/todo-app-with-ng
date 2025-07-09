import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { DrawerModule } from 'primeng/drawer';
@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    DatePickerModule,
    DrawerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo-app';
  visible: boolean = false;
  text: string = '';
  date: string = '';
  id: number = 0;
  Todo: { id: number; date: string; text: string }[] = [];

  showDialog() {
    this.visible = true;
  }

  AddTodo() {
    this.Todo.push({ id: this.id, date: this.date, text: this.text });
    this.id++;
  }

  DeleteTodo(id: number) {
    this.Todo = this.Todo.filter((todo) => todo.id != id);
  }
}
