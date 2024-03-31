import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface IPeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  discoveryDate: Date;
}

const ELEMENT_DATA: IPeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    discoveryDate: new Date(2024, 11, 30),
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    discoveryDate: new Date(2024, 1, 30),
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    discoveryDate: new Date(2024, 11, 24),
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    discoveryDate: new Date(2024, 11, 5),
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    discoveryDate: new Date(2024, 11, 3),
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    discoveryDate: new Date(2024, 11, 13),
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    discoveryDate: new Date(2024, 9, 7),
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    discoveryDate: new Date(2024, 11, 8),
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    discoveryDate: new Date(2024, 4, 30),
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    discoveryDate: new Date(2024, 9, 8),
  },
  {
    position: 11,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    discoveryDate: new Date(2024, 12, 3),
  },
];
const COLUMNS_SCHEMA = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'name', //
    type: 'text',
    label: 'Element Name',
  },
  {
    key: 'weight',
    type: 'number',
    label: 'Weight',
  },
  {
    key: 'dateOfBirth',
    type: 'date',
    label: 'Date of Birth',
  },
  {
    key: 'symbol',
    type: 'text',
    label: 'Symbol',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

@Component({
  selector: 'app-table-reactive',
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
  ],
  templateUrl: './table-reactive.component.html',
  styleUrl: './table-reactive.component.scss',
})
export class TableReactiveComponent implements OnInit {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any; // = new MatTableDataSource<IPeriodicElement>(); //= ELEMENT_DATA;
  //dataSource = new MatTableDataSource<any>();

  columnsSchema: any = COLUMNS_SCHEMA;
  VOForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.dataSource.data = ELEMENT_DATA;
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });

    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        ELEMENT_DATA.map((val) =>
          this.fb.group({
            position: new FormControl(val.position),
            name: new FormControl(val.name),
            weight: new FormControl(val.weight),
            symbol: new FormControl(val.symbol),
            action: new FormControl('existingRecord'),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
          })
        )
      ), //end of fb array
    }); // end of form group cretation
    //this.isLoading = false;
    // this.dataSource = new MatTableDataSource(
    //   (this.VOForm.get('VORows') as FormArray).controls
    // );
    //this.dataSource.paginator = this.paginator;

    // const filterPredicate = this.dataSource.filterPredicate;
    // this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
    //   return filterPredicate.call(this.dataSource, data.value, filter);
    // };
  }

  addRow() {
    // const newRow = <IPeriodicElement>{
    //   id: Date.now(),
    //   name: '',
    //   discoveryDate: new Date(2024, 7, 7),
    //   position: 24,
    //   symbol: 'Nu',
    //   weight: 1,
    //   isEdit: true,
    // };
    // this.dataSource.data = [newRow, ...this.dataSource.data];

    const control = this.getFormArray();
    control.insert(0, this.initiateVOForm());
    //this.dataSource.data = new MatTableDataSource(control.controls);
  }

  initiateVOForm(): FormGroup {
    return this.fb.group({
      position: new FormControl(234),
      name: new FormControl(''),
      weight: new FormControl(''),
      symbol: new FormControl(''),
      action: new FormControl('newRecord'),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(true),
    });
  }

  getFormArray(): FormArray {
    let formArray = this.VOForm.get('VORows') as FormArray;
    return formArray;
  }

  getEditableControl(index: number): AbstractControl {
    let formArray = this.getFormArray();
    let editableControl = (formArray.at(index) as FormGroup).controls[
      'isEditable'
    ];
    return editableControl;
  }

  removeRow(id: number) {
    //this.dataSource.data = this.dataSource.data.filter((u: any) => u.id !== id);
  }

  //#region For header checkbox
  isAllSelected() {
    // return this.dataSource.data.every((item: any) => item.isSelected);
  }

  isAnySelected(): any {
    // return true;
    return this.dataSource.some((item: any) => item.isSelected);
  }

  /**
   * Updates the isSelected property of all items in the dataSource array.
   * @param event - The event object containing the checked state.
   */
  selectAll(event: any) {
    // this.dataSource.data = this.dataSource.data.map((item: any) => ({
    //   ...item,
    //   isSelected: event.checked,
    // }));
  }

  /**
   * Removes the selected rows from the data source.
   */
  removeSelectedRows() {
    // Open a confirmation dialog
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        // If the user confirms the deletion
        if (confirm) {
          // Filter out the selected rows from the data source
          // this.dataSource.data = this.dataSource.data.filter(
          //   (u: any) => !u.isSelected
          // );
        }
      });
  }
  //#endregion
}
