import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiInlineReactiveComponent } from './api-inline-reactive.component';

describe('ApiInlineReactiveComponent', () => {
  let component: ApiInlineReactiveComponent;
  let fixture: ComponentFixture<ApiInlineReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiInlineReactiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiInlineReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
