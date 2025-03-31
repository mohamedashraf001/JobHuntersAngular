import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetuserappsComponent } from './getuserapps.component';

describe('GetuserappsComponent', () => {
  let component: GetuserappsComponent;
  let fixture: ComponentFixture<GetuserappsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetuserappsComponent]
    });
    fixture = TestBed.createComponent(GetuserappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
