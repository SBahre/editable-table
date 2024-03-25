import { ComponentFixture, TestBed } from '@angular/core/testing';

import { V17OriginalComponent } from './v17-original.component';

describe('V17OriginalComponent', () => {
  let component: V17OriginalComponent;
  let fixture: ComponentFixture<V17OriginalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [V17OriginalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(V17OriginalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
