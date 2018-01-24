import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'shelf-section',
  templateUrl: 'shelf-section.html'
})
export class ShelfSectionComponent implements AfterViewInit {

  text: string;

  constructor() {
    this.text = 'shelf-section';
  }

  @ViewChild("cnv")
  private cnv: ElementRef

  ngAfterViewInit(){
      // create a wrapper around native canvas element (with id="c")
      console.log('+AVI', this.cnv);
      let domElement = this.cnv.nativeElement as HTMLElement;
      var canvas: fabric.Canvas = new fabric.Canvas(domElement, {
      backgroundColor: '#e34'
    });
    console.log('-AVI', canvas);
    // create a rectangle with angle=45
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
      angle: 45
    });
    canvas.add(rect);

  }

}
