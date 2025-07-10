import { TodoService } from '../../todo.service';
import { Component, input, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TODO } from '../../../utils/interfaces';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-form',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    CommonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './edit-form.component.html',
})
export class EditFormComponent {
  visible: boolean = false;
  todo = input<TODO>();
  form!: FormGroup;

  todoService = inject(TodoService);

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const text = this.todo()?.text;
    const date = this.todo()?.date;
    this.form = this.fb.group({
      text: [text, Validators.required],
      date: [date, Validators.required],
    });
  }

  onSubmit() {
    const text = this.form.get('text')?.value;
    const date = this.form.get('date')?.value;
    const ToDo = {
      id: this.todo()?.id,
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
  }

  showDialog() {
    this.visible = true;
  }
}
