import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-api-inline-reactive',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    HttpClientModule,
  ],
  templateUrl: './api-inline-reactive.component.html',
  styleUrl: './api-inline-reactive.component.scss',
})
export class ApiInlineReactiveComponent implements OnInit {
  tableForm!: FormGroup;
  columns = ['firstName', 'lastName', 'gender', 'email', 'birthDate'];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.tableForm = new FormGroup({
      tableRow: new FormArray([]),
    });
  }

  async ngOnInit() {
    let users = await this.userService.getUsersAsync();
    console.log(users);
  }

  addRow(): FormGroup {
    return this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      gender: new FormControl(''),
      email: new FormControl(''),
      birthDate: new FormControl(''),
    });
  }

  getFormArray() {
    if (this.tableForm !== undefined) {
      let formArray = this.tableForm.get('tableRow') as FormArray;
      return formArray;
    } else {
      return null;
    }
  }

  onAddRow() {
    let formGroup = this.addRow();
    let formArray = this.getFormArray();
    formArray!.push(formGroup);
  }

  onDeleteClick(index: number) {
    let formArray = this.getFormArray();
    formArray!.removeAt(index);
  }
}
