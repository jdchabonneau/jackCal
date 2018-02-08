import { Component, AfterViewInit, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { fabric } from 'fabric';
import { WhseLayout, WhseAisle, WhseSection, WhseShelf } from '../../../components/WhseMap/WhseMapClasses';
import { TopViewDirective } from '../directives/top-view/top-view'

@Component({
  selector: 'whse-mapper',
  templateUrl: 'whse-mapper.html'
})
export class WhseMapperComponent  {
  closeSection = true;
  isShowingSection = false;
  adjustHeights = false;
  @ViewChild(TopViewDirective) topView: TopViewDirective

  constructor(private cdRef:ChangeDetectorRef){}
  closeSectionView(p) {
    this.closeSection = !this.closeSection;
  } 
  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }
    adjustShelves(p) {
    this.closeSection = !this.adjustHeights;
  } 

}