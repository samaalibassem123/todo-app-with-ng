import { Component, EventEmitter, inject, Output } from '@angular/core';
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
import { TODO } from '../../../utils/interfaces';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-add-form',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    DrawerModule,
    InputTextModule,
    DatePicker,
    ToastModule,
  ],
  templateUrl: './add-form.component.html',
  providers: [MessageService],
})
export class AddFormComponent {
  visible: boolean = false;
  form: FormGroup;
  todo!: TODO;
  formSubmitted: boolean = false;

  todoService = inject(TodoService);

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.form = this.fb.group({
      text: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.todo = {
        text: this.form.get('text')?.value,
        date: this.form.get('date')?.value,
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

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
