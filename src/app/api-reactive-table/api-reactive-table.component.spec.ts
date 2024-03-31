import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiReactiveTableComponent } from './api-reactive-table.component';

describe('ApiReactiveTableComponent', () => {
  let component: ApiReactiveTableComponent;
  let fixture: ComponentFixture<ApiReactiveTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiReactiveTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiReactiveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
