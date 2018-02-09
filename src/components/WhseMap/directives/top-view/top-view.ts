import { WhseLayout, WhseAisle, WhseSection, WhseShelf } from './../../WhseMapClasses';
import { AfterViewInit, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Directive, ElementRef, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { fabric } from 'fabric';
import { leave } from '@angular/core/src/profile/wtf_impl';
import { TopViewMap } from './topViewMap'
import { TopViewVerSection } from './topViewVerSection'
import { DhiDataProvider } from '../../../../providers/dhi-data/dhi-data';

@Directive({
  selector: '[top-view]'
})
export class TopViewDirective implements OnInit, OnChanges {
  layout: WhseLayout;
  canvas: fabric.Canvas = null;
  height: number;
  width: number;
  public isShowingTopView = false;
  @Input() set swap(p) {
    if(!this.isShowingTopView && this.canvas){
      this.swapMapTypes();
    }
  }

  @Input() set adjustShelves(p) {
    if(!this.isShowingTopView && this.canvas){
      this.swapMapTypes();
    }
  }

  constructor(private el: ElementRef, private dhiDataProvider: DhiDataProvider) {
  }

  ngOnInit() {
    if (!this.canvas) {
      this.buildCanvas();
//      this.swapMapTypes();
    }
    this.canvas.renderAll();

  }

  swapMapTypes(whseSection? : WhseSection) {
    console.log(this);

    if (!this.isShowingTopView) {
      new TopViewMap(this.canvas).buildWhse(this.canvas, this.layout, e=>this.swapMapTypes(e));
    } else {
      //console.log(this,this.layout.aisles[1].sections[sectionNumber] )
//      new TopViewVerSection(this.canvas, e=>this.swapMapTypes(e)).buildSection(this.layout.aisles[1].sections[3]);
      new TopViewVerSection(this.canvas, e=>this.swapMapTypes(e)).buildSection(whseSection);
    }
    this.isShowingTopView = !this.isShowingTopView;
  }

  buildCanvas() {

    let domElement = this.el.nativeElement as HTMLElement;
    let canvas = this.el.nativeElement;
    // Make it visually fill the positioned parent
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.width = canvas.width;
    this.height = canvas.height;
    //      console.log('hw1:', this.height, this.width, domElement);
    this.canvas = new fabric.Canvas(domElement, {
      backgroundColor: '#333',
      height: this.height,
      width: this.width,
    });

    this.dhiDataProvider.getAilesWithSections(2).subscribe(
      resp=> {
         let aisles = resp.json();
          //let aisles = unsort.sort((a, b)=> {
          //  return parseInt(b.Key) > parseInt(a.Key);   // <== to compare numeric values
          //});;
         // w.map(w=>w.selected= w.ID == 2? true : false);
         // this.warehouses = w;
          console.log(aisles);
          this.layout = TopViewMap.buildTestWhse(aisles, 2);
          this.swapMapTypes();
        })
    }

  ngOnChanges(changes: SimpleChanges) {
  }

}
