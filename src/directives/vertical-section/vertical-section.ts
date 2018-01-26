import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Directive, ElementRef } from '@angular/core';
import { fabric } from 'fabric';

@Directive({
  selector: '[vertical-section]' // Attribute selector
})
export class VerticalSectionDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
    console.log('Hello VerticalSectionDirective Directive');
  }

  ngAfterViewInit() {
    this.constructShelf();
  }
    constructShelf() {
      // create a wrapper around native canvas element (with id="c")
    //      console.log('+AVI', this.cnv);
    //      let domElement = this.cnv.nativeElement as HTMLElement;
    let domElement = this.el.nativeElement as HTMLElement;
    var canvas: fabric.Canvas = new fabric.Canvas(domElement, {
      backgroundColor: '#a34'
    });
    console.log('-AVI', canvas);
    let l = 0;
    // create a rectangle with angle=45
    let w = Math.floor(Math.random() * 10)+18;
    let h = Math.floor(Math.random() * 10)+18;
    l += Math.floor(Math.random() * 15)+w;
    let t = Math.floor(Math.random() * 100);
    let a = Math.floor(Math.random() * 45);
    var rect = new fabric.Rect({
      left: l,
      top: t,
      fill: 'yellow',
      width: w,
      height: h,
      angle: a,
    });
    console.log(rect);
    canvas.add(rect);
    w = Math.floor(Math.random() * 20)+18;
    h = Math.floor(Math.random() * 20)+18;
    a = Math.floor(Math.random() * 45);
    l += Math.floor(Math.random() * 15)+40;
    t = Math.floor(Math.random() * 100);
    var rect = new fabric.Rect({
      left: l,
      top: t,
      fill: 'red',
      width: w,
      height: h,
      angle: a,
    });
    console.log(rect);
    canvas.add(rect);
    w = Math.floor(Math.random() * 10)+18;
    h = Math.floor(Math.random() * 30)+18;
    a = Math.floor(Math.random() * 45);
    l += Math.floor(Math.random() * 15)+100;
    t = Math.floor(Math.random() * 100);
    var rect = new fabric.Rect({
      left: l,
      top: t,
      fill: 'green',
      width: w,
      height: h,
      angle: a,
    });
    console.log(rect);
    canvas.add(rect);
  }
}