import { TODO } from './../../utils/interfaces';
import { Component, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    DrawerModule,
    InputTextModule,
    DatePicker,
    ToastModule,
  ],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  visible: boolean = false;
  form!: FormGroup;
  todo!: TODO;
  formSubmitted: boolean = false;
  EditTodo = input<TODO>();

  todoService = inject(TodoService);

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (this.EditTodo()) {
      const text = this.EditTodo()?.text;
      const date = this.EditTodo()?.date;
      this.form = this.fb.group({
        text: [text, Validators.required],
        date: [date, Validators.required],
      });
    } else {
      this.form = this.fb.group({
        text: ['', Validators.required],
        date: ['', Validators.required],
      });
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      const text = this.form.get('text')?.value;
      const date = this.form.get('date')?.value;
      // edit todo
      if (this.EditTodo()) {
        const ToDo = {
          id: this.EditTodo()?.id,
          text: text,
          date: date,
        };
        this.todoService.UpdateTodo(ToDo as TODO);
        this.messageService.add({
          severity: 'success',
          summary: 'Update',
          detail: 'Todo Updated Succefully',
          life: 3000,
        });
      } else {
        // add todo

        this.todo = {
          text: text,
          date: date,
          done: false,
        };
        this.todoService.AddTodo(this.todo);
        this.form.reset();
        this.formSubmitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Todo Added Succefully',
          life: 3000,
        });
      }
    }
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
