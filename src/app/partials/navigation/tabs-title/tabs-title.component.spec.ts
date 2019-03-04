import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsTitleComponent } from './tabs-title.component';

describe('TabsTitleComponent', () => {
  let component: TabsTitleComponent;
  let fixture: ComponentFixture<TabsTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
