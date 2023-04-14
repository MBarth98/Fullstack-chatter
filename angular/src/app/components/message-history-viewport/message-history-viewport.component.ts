import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Conversation } from 'src/app/types/Conversation';

@Component({
  selector: 'app-message-history-viewport',
  templateUrl: './message-history-viewport.component.html',
  styleUrls: ['./message-history-viewport.component.scss']
})
export class MessageHistoryViewportComponent {

  @Input() src!: Conversation | null;
  @Output() srcChange: EventEmitter<Conversation> = new EventEmitter<Conversation>();

  constructor() { }


}
