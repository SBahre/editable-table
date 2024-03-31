import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface User {
  //isSelected: boolean;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  isEdit: boolean;
}

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
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ],
  templateUrl: './api-inline-reactive.component.html',
  styleUrl: './api-inline-reactive.component.scss',
})
export class ApiInlineReactiveComponent implements OnInit {
  tableForm!: FormGroup;
  displayedColumns = [
    'isSelected',
    'firstName',
    'lastName',
    'gender',
    'email',
    'birthDate',
    'isEdit',
  ];
  dataSource = new MatTableDataSource<User>();
  @ViewChild('tablePaginator') paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.tableForm = new FormGroup({
      tableRow: new FormArray([]),
    });
  }

  async ngOnInit() {
    this.dataSource.data = await this.userService.getUsersAsync();
    this.dataSource.paginator = this.paginator;
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

  isAllSelected() {
    return this.dataSource.data.every((item: any) => item.isSelected);
  }

  isAnySelected() {
    return this.dataSource.data.some((item: any) => item.isSelected);
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item: any) => ({
      ...item,
      isSelected: event.checked,
    }));
  }

  async removeRow(id: number) {
    /**Observable way */

    // this.userService.deleteUser(id).subscribe(() => {
    //   this.dataSource.data = this.dataSource.data.filter(
    //     (u: User) => u.id !== id
    //   );
    // });
    /**Promise way */
    await this.userService.deleteUserAsync(id);
    this.dataSource.data = this.dataSource.data.filter(
      (u: User) => u.id !== id
    );
    this.dataSource.data = [...this.dataSource.data];
  }
}
