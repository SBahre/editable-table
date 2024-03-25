import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReactiveComponent } from './table-reactive.component';

describe('TableReactiveComponent', () => {
  let component: TableReactiveComponent;
  let fixture: ComponentFixture<TableReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableReactiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
