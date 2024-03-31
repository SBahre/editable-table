import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatFormFieldAppearance,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

export interface User {
  isSelected: boolean;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  isEdit: boolean;
}

export const UserColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'firstName',
    type: 'text',
    label: 'First Name',
  },
  {
    key: 'lastName',
    type: 'text',
    label: 'Last Name',
  },
  {
    key: 'gender',
    type: 'select',
    label: 'Gender',
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email',
  },
  {
    key: 'birthDate',
    type: 'date',
    label: 'Date of Birth',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
@Component({
  selector: 'app-api-reactive-table',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
  templateUrl: './api-reactive-table.component.html',
  styleUrl: './api-reactive-table.component.scss',
})
export class ApiReactiveTableComponent implements OnInit {
  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<User>();
  resultsLength: number = 0;

  pageEvent!: PageEvent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private userService: UserService) {}

  async ngOnInit() {
    /**Observable way */
    // this.userService.getUsers().subscribe((res: any) => {
    //   this.dataSource.data = res;
    // });
    /**Promise way */
    this.dataSource.data = await this.userService.getUsersAsync();
    this.dataSource.paginator = this.paginator;

    this.resultsLength = this.dataSource.data.length;
  }

  async editRow(row: User) {
    /**Observable way */

    // if (row.id === 0) {
    //   this.userService.addUser(row).subscribe((newUser: User) => {
    //     row.id = newUser.id;
    //     row.isEdit = false;
    //   });
    // } else {
    //   this.userService.updateUser(row).subscribe(() => (row.isEdit = false));
    // }

    /**Promise way */
    if (row.id === 0) {
      let newUser = await this.userService.addUserAsync(row);
      row.id = newUser.id;
      row.isEdit = false;
    } else {
      await this.userService.updateUserAsync(row);
      row.isEdit = false;
    }
  }

  addRow() {
    const newRow: User = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      isEdit: true,
      isSelected: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
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

  //#region For header checkbox
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

  async removeSelectedRows() {
    const users = this.dataSource.data.filter((u: User) => u.isSelected);
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe(async (confirm) => {
        if (confirm) {
          /**Observable way */

          // this.userService.deleteUsers(users).subscribe(() => {
          //   this.dataSource.data = this.dataSource.data.filter(
          //     (u: User) => !u.isSelected
          //   );
          // });

          /**Promise way */
          for await (const user of users) {
            await this.userService.deleteUserAsync(user.id);
            this.dataSource.data = this.dataSource.data.filter(
              (u: User) => !u.isSelected
            );
          }
        }
      });
  }
  //#endregion

  onPageChange(event: PageEvent): any {
    console.log('PageIndex: ', event.pageIndex);
    console.log('PageSize: ', event.pageSize);
  }
}
