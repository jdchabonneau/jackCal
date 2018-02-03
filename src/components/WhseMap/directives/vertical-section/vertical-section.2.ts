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
      let canvas = this.el.nativeElement;
      // Make it visually fill the positioned parent
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      // ...then set the internal size to match
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      console.log('pp2', domElement, domElement.style.width, domElement.style.width)
      //      this.width = parseInt(domElement.style.width);
      //      this.height = parseInt(domElement.style.height);
      this.width = canvas.width;
      this.height = canvas.height;
      //      console.log('hw1:', this.height, this.width, domElement);
      this.canvas = new fabric.Canvas(domElement, {
        backgroundColor: '#333',
        height: this.height,
        width: this.width,
      });
      //      console.log('hw2:', this.height, this.width, this.canvas);
    }
    this.canvas.clear();
    this.canvas.setBackgroundColor('#333');
    this.drawFrame();
    this.canvas.renderAll();


    for (let i = 0; i < this.whseSection.shelves.length; i++) {
      this.drawShelf(this.whseSection.shelves[i].shelfID, `${this.whseSection['whseID']}-${this.whseSection['aisleID']}-${this.whseSection.shelves[i].shelfID}-`, false);
    }
    this.drawContent();
  }
  canvas: fabric.Canvas
  height: number;
  width: number;
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
    rect.on('mouseup', e => {
      if (this.editShelfMode) {
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
      left: (this.width - 10) / 2,
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
        this.drawShelf(shelfNum, `${this.whseSection['whseID']}-${this.whseSection['aisleID']}-${shelfNum}-`, true);
      }
    }
  }
  shelveColor = "yellow";
  addableColor = "white";
  editShelfMode = false;

  shelfTop(shelfNum: number) {
    return (60 - shelfNum) * 10 - 20;
  }

  drawShelf(shelfNum: number, scanPrefix: string, isAddable: boolean) {
    let text = new fabric.Text(shelfNum.toString(), {
      fontSize: 10,
      originX: 'center',
      originY: 'center'
    });

    let scanLocation = new fabric.Text(`${this.whseSection['whseID']}-${this.whseSection['aisleID']}-${this.whseSection.sectionID}-${shelfNum}-`, {
      fontSize: 10,
      originX: -2,
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
    let group = new fabric.Group([rect, text, addButton, removeButton, scanLocation], {
      left: 10,
      top: this.shelfTop(shelfNum),
      selectable: false,
      hasBorders: false,
      hasControls: false,
      subTargetCheck: true,
      opacity: isAddable ? 0.4 : 1,
      shelfNum: shelfNum
    });
    console.log(shelfNum, group.top, scanLocation);
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

  drawContent() {alert(976);
    for (let shelf = 10; shelf < 61; shelf += 10) {
      console.log(shelf)
      this.drawBox({ shelf: shelf, position: "1a", height: 40 })
      this.drawBox({ shelf: shelf, position: "1b", height: 40 })
      //this.drawBox({ shelf: shelf, position: "1C", height: 40 })
      this.drawBox({ shelf: shelf, position: "1D", height: 40 })
      this.drawBox({ shelf: shelf, position: "20", height: 40 })
    }
  }

  drawBox(box) {
    let lft;
    let wdth = (this.width - 25) / 2 - 5;
    lft = (box.position[0] === '1') ? 10 : (this.width - 25) / 2 + 20;
    switch (box.position[1]) {
      case 'a': case 'A':
        wdth = (wdth - 3) / 4;
        break;
      case 'b': case 'B':
        wdth = (wdth - 3) / 4;
        lft += wdth + 1;
        break;
      case 'c': case 'C':
        wdth = (wdth - 3) / 4;
        lft += wdth * 2 + 2;
        break;
      case 'd': case 'D':
        wdth = (wdth - 3) / 4;
        lft += wdth * 3 + 3;
        break;
    }
    var rect = new fabric.Rect({
      fill: 'green',
      width: wdth,
      height: 40,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      subTargetCheck: true,
    });
    let text = new fabric.Text(`${box.shelf}-${box.position}`, {
      fontSize: 14,
      originX: 0,
      originY: 0
    });
    let group = new fabric.Group([rect, text],
      {
        left: lft,
        //        top: (this.height - 10) / 60 * (59 - box.shelf),
        top: this.shelfTop(box.shelf) - rect.height,
        selectable: true,
        hasBorders: false,
        hasControls: false,
        //subTargetCheck: true,
      });
    group.on('mouseup', (e) => {
      console.log(this, group);
    });
    console.log(group.top, box, rect);
    this.canvas.add(group);
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