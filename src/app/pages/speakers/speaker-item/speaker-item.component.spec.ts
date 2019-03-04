import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerItemComponent } from './speaker-item.component';

describe('SpeakerItemComponent', () => {
  let component: SpeakerItemComponent;
  let fixture: ComponentFixture<SpeakerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
