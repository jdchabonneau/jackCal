import { WhseSection, WhseShelf } from './../../WhseMapClasses';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Directive, ElementRef, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { fabric } from 'fabric';
import { leave } from '@angular/core/src/profile/wtf_impl';

@Directive({
  selector: '[vertical-section]' // Attribute selector
})
export class VerticalSectionDirective implements AfterViewInit, OnChanges {

  @Input() whseSection: WhseSection;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    //this.constructShelf();
  }

  ngOnChanges(changes: SimpleChanges) {
    // const name: SimpleChange = changes.name;
    // console.log('prev value: ', name.previousValue);
    // console.log('got name: ', name.currentValue);
    //this.constructShelf();
    this.constructSection();
    //this.whseSection = name.currentValue;
  }

  constructSection() {
    if (!this.whseSection) { return; }

    if (!this.canvas) {
      let domElement = this.el.nativeElement as HTMLElement;
      this.canvas = new fabric.Canvas(domElement, {
        backgroundColor: '#333',
        height: this.height,
        width: this.width,
      });
    }
    this.canvas.clear();
    this.canvas.setBackgroundColor('#333');
    this.drawFrame();

    for (let i = 0; i < this.whseSection.shelves.length; i++) {
      this.drawShelf(this.whseSection.shelves[i].shelfID, false);
      this.drawContent();
    }
  }
  canvas: fabric.Canvas
  height = 510;
  width = 400;
  drawFrame() {
    //draw bottom
    var rect = new fabric.Rect({
      left: 0,
      top: this.height - 10,
      fill: 'brown',
      width: this.width,
      height: 10,
      selectable: false,
      hasBorders: false,
      hasControls: false,
    });

rect.on('mouseup', e=>{
if(this.editShelfMode){
  this.constructSection();
  this.editShelfMode = false;
}
})

    this.canvas.add(rect);
    //draw Left
    var rect = new fabric.Rect({
      left: 0,
      top: 0,
      fill: 'brown',
      width: 10,
      height: this.height,
      selectable: false,
      hasBorders: false,
      hasControls: false,
    });
    this.canvas.add(rect);
    //draw Right
    var rect2 = new fabric.Rect({
      left: this.width - 10,
      top: 0,
      fill: 'brown',
      width: 10,
      height: this.height,
      selectable: false,
      hasBorders: false,
      hasControls: false,
    });
    this.canvas.add(rect2);
    //draw Center
    var rect2 = new fabric.Rect({
      left: (this.width - 5) / 2,
      top: 0,
      fill: 'brown',
      width: 10,
      height: this.height,
      selectable: false,
      hasBorders: false,
      hasControls: false,
    });
    this.canvas.add(rect2);

  }

  editShelves() {
    for (let shelfNum = 10; shelfNum < 61; shelfNum += 2) {
      if (!this.whseSection.shelves.find(p => p.shelfID == shelfNum)) {
        this.drawShelf(shelfNum, true);
      }
    }
  }
  shelveColor = "yellow";
  addableColor = "white";
  editShelfMode = false;

  drawShelf(shelfNum: number, isAddable: boolean) {
    let text = new fabric.Text(shelfNum.toString(), {
      fontSize: 10,
      originX: 'center',
      originY: 'center'
    });

    let addButton = new fabric.Text('+', {
      fontSize: 13,
      fill: 'green',
      originX: 12,
      originY: 'center'
    });

    let removeButton = new fabric.Text('--', {
      fontSize: 13,
      originX: 14,
      fill: 'red',
      originY: 'center'
    });

    var rect = new fabric.Rect({
      originX: 'center',
      originY: 'center',
      fill: isAddable ? this.addableColor : this.shelveColor,
      width: this.width - 20,
      height: 10,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      shelfNum: shelfNum
      //      opacity: isAddable ? 0.4 : 1,
    });
    let group = new fabric.Group([rect, text, addButton, removeButton], {
      left: 10,
      top: (60 - shelfNum) * 10 -10,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      subTargetCheck: true,
      opacity: isAddable ? 0.4 : 1,
      shelfNum: shelfNum
    });
console.log(shelfNum, group.top);
    rect.on('mouseup', (e) => {
      if (this.editShelfMode) {
        //         this.editShelfMode=false;
        if (e.target.getFill() == this.shelveColor) {
          //e.target.setColor(this.addableColor);
          let index = this.whseSection.shelves.findIndex(s => s.shelfID == e.target.shelfNum);
          if (index > -1) {
            this.whseSection.shelves.splice(index, 1);
          }
        }
        else {
          var res = this.binaryFind(e.target.shelfNum, this.whseSection.shelves);
          let element = new WhseShelf();
          element.shelfID = e.target.shelfNum;
          if (!res.found) this.whseSection.shelves.splice(res.index, 0, element);
          //e.target.setColor(this.shelveColor);
        }
        //     var obj = this.canvas.getActiveObject();
        // obj.set({
        //     opacity: 1
        // });
        //e.target.set({ opacity: 1 });
        this.constructSection();
        this.editShelves();
        this.canvas.renderAll();

      } else {
        this.editShelfMode = true;
        this.editShelves();
      }
      console.log(e, e.target, this);
    })

    //  group.on('mouseup', (e) => {
    //    console.log('group', e.e.target, this);
    //  })


    this.canvas.add(group);

  }

  Contents

  binaryFind(searchElement: number, array: WhseShelf[]) {
    'use strict';

    var minIndex = 0;
    var maxIndex = array.length - 1;
    var currentIndex;
    var currentElement;

    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0;
      currentElement = array[currentIndex].shelfID;

      if (currentElement < searchElement) {
        minIndex = currentIndex + 1;
      }
      else if (currentElement > searchElement) {
        maxIndex = currentIndex - 1;
      }
      else {
        return { // Modification
          found: true,
          index: currentIndex
        };
      }
    }

    return { // Modification
      found: false,
      index: currentElement < searchElement ? currentIndex + 1 : currentIndex
    };
  }

  drawContent() {
    for(let shelf=10; shelf < 60;shelf +=10){
      this.drawBox({shelf: shelf, position:"10", height:40})
    }
  }

  drawBox(box)
{
  var rect = new fabric.Rect({
    left: 10,
    top: 10,
    fill: 'green',
    width: (this.width-25)/2,
    height: 80,
  });
  //    console.log(rect);
  this.canvas.add(rect);
  var rect = new fabric.Rect({
    left: (this.width-25)/2+20,
    top: 10,
    fill: 'red',
    width: (this.width-25)/2-5,
    height: 80,
  });
  //    console.log(rect);
  this.canvas.add(rect);
}

  constructShelf() {
    // create a wrapper around native canvas element (with id="c")
    //      console.log('+AVI', this.cnv);
    //      let domElement = this.cnv.nativeElement as HTMLElement;
    let domElement = this.el.nativeElement as HTMLElement;
    var canvas: fabric.Canvas = new fabric.Canvas(domElement, {
      backgroundColor: '#234',
      height: '500'
    });
    let l = 0;
    // create a rectangle with angle=45
    let w = Math.floor(Math.random() * 10) + 18;
    let h = Math.floor(Math.random() * 10) + 18;
    l += Math.floor(Math.random() * 15) + w;
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
    //    console.log(rect);
    canvas.add(rect);
    w = Math.floor(Math.random() * 20) + 18;
    h = Math.floor(Math.random() * 20) + 18;
    a = Math.floor(Math.random() * 45);
    l += Math.floor(Math.random() * 15) + 40;
    t = Math.floor(Math.random() * 100);
    var rect = new fabric.Rect({
      left: l,
      top: t,
      fill: 'red',
      width: w,
      height: h,
      angle: a,
    });
    //  console.log(rect);
    canvas.add(rect);
    w = Math.floor(Math.random() * 10) + 18;
    h = Math.floor(Math.random() * 30) + 18;
    a = Math.floor(Math.random() * 45);
    l += Math.floor(Math.random() * 15) + 100;
    t = Math.floor(Math.random() * 100);
    var rect = new fabric.Rect({
      left: l,
      top: t,
      fill: 'green',
      width: w,
      height: h,
      angle: a,
    });
    //    console.log(rect);
    canvas.add(rect);
  }
}