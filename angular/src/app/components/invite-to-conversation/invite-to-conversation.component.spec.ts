import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToConversationComponent } from './invite-to-conversation.component';

describe('InviteToConversationComponent', () => {
  let component: InviteToConversationComponent;
  let fixture: ComponentFixture<InviteToConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteToConversationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteToConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
