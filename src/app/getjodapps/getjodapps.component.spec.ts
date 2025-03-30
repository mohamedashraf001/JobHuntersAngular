import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetjodappsComponent } from './getjodapps.component';

describe('GetjodappsComponent', () => {
  let component: GetjodappsComponent;
  let fixture: ComponentFixture<GetjodappsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetjodappsComponent]
    });
    fixture = TestBed.createComponent(GetjodappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
