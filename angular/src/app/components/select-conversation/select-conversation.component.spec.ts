import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectConversationComponent } from './select-conversation.component';

describe('SelectConversationComponent', () => {
  let component: SelectConversationComponent;
  let fixture: ComponentFixture<SelectConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectConversationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
