import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contextmenu',
  templateUrl: 'contextMenu.html',
})

export class ContextmenuComponent{

  constructor() { }


  @Input() x=0;
  @Input() y=0;

}