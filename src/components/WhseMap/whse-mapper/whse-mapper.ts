import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { fabric } from 'fabric';
import { WhseLayout, WhseAisle, WhseSection, WhseShelf } from '../../../components/WhseMap/WhseMapClasses';

@Component({
  selector: 'whse-mapper',
  templateUrl: 'whse-mapper.html'
})
export class WhseMapperComponent  {
  @Output() changeLeft: EventEmitter<WhseSection> = new EventEmitter<WhseSection>();
  @Output() changeRight: EventEmitter<WhseSection> = new EventEmitter<WhseSection>();

}