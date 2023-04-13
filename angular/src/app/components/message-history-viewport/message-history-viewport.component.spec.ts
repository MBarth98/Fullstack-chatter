import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHistoryViewportComponent } from './message-history-viewport.component';

describe('MessageHistoryViewportComponent', () => {
  let component: MessageHistoryViewportComponent;
  let fixture: ComponentFixture<MessageHistoryViewportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageHistoryViewportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageHistoryViewportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
