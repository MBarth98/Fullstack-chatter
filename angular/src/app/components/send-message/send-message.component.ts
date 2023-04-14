import { Component, Input } from '@angular/core';
import { Conversation } from 'src/app/types/Conversation';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent {

  @Input() src: Conversation = new Conversation("", [], []);

  constructor() { }
}
