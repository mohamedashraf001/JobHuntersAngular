import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetuserjobsComponent } from './getuserjobs.component';

describe('GetuserjobsComponent', () => {
  let component: GetuserjobsComponent;
  let fixture: ComponentFixture<GetuserjobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetuserjobsComponent]
    });
    fixture = TestBed.createComponent(GetuserjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
