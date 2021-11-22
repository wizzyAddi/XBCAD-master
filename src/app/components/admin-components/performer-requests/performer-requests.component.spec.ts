import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerRequestsComponent } from './performer-requests.component';

describe('PerformerRequestsComponent', () => {
  let component: PerformerRequestsComponent;
  let fixture: ComponentFixture<PerformerRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformerRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
