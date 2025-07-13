import { TODO } from './../utils/interfaces';
import { Component, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { DrawerModule } from 'primeng/drawer';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TodoService } from './todo.service';
import { TodoFormComponent } from './todo-form/todo-form.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    DatePickerModule,
    DrawerModule,
    CheckboxModule,
    FormsModule,
    ToastModule,
    TodoFormComponent,
  ],
  providers: [MessageService],

  templateUrl: './app.component.html',
})
export class AppComponent {
  todoService = inject(TodoService);

  constructor(private messageService: MessageService) {}

  onDeleteTodo(id: number) {
    this.todoService.DeleteTodo(id);
    this.messageService.add({
      severity: 'success',
      summary: 'Delete',
      detail: 'Todo Deleted',
      life: 3000,
    });
  }
}
