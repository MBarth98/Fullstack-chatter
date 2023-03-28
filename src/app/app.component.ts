import {Component, OnInit} from '@angular/core';
import {FireService} from "./fire.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {

  constructor(public fireService: FireService) {

  }

  async ngOnInit() {

  }
}
