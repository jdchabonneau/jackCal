import { fabric } from 'fabric';
import { WhseLayout, WhseAisle, WhseSection, WhseShelf } from './../../WhseMapClasses';

export class TopViewVerSection {
  canvas: fabric.Canvas;
  callback;

  constructor(canvas: fabric.Canvas, callback) {
    this.canvas = canvas;
    this.height = canvas.height;
    this.width = canvas.width;
    this.callback = callback;

  }
  shelfHeight = 10;
  height: number;
  width: number;
  editShelfMode = false;

  drawFrame() {
    //draw bottom
    var rect = new fabric.Rect({
      left: 0,
      top: this.height - this.shelfHeight,
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
    this.constructSection(false);
    for (let shelfNum = 10; shelfNum < 62; shelfNum += 2) {
      if (!this.whseSection.shelves.find(p => p.shelfID == shelfNum)) {
        this.drawShelf(shelfNum, `${this.whseSection['whseID']}-${this.whseSection['aisleID']}-${shelfNum}-`, true);
      }
    }
  }
  shelveColor = "yellow";
  addableColor = "black";
  whseSection: WhseSection;

  shelfTop(shelfNum: number) {
    return (60 - shelfNum + 8) * this.height / 60 - 20;
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
      height: this.shelfHeight,
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
        this.constructSection(false);
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

  drawContent() {
    for (let shelf = 10; shelf < 31; shelf += 10) {
      this.drawBox({ shelf: shelf, position: "1a", height: this.distanceBetweenShelves(shelf) })
      this.drawBox({ shelf: shelf, position: "1b", height: this.distanceBetweenShelves(shelf) })
      this.drawBox({ shelf: shelf, position: "1C", height: this.distanceBetweenShelves(shelf) })
      this.drawBox({ shelf: shelf, position: "1D", height: this.distanceBetweenShelves(shelf) })
      this.drawBox({ shelf: shelf, position: "20", height: this.distanceBetweenShelves(shelf) })
    }
  }

  distanceBetweenShelves(bottomShelfNum: number) {
    let nearestSoFar = 1000;
    for (let s = 0; s < this.whseSection.shelves.length; s++) {
      let shNum = this.whseSection.shelves[s].shelfID;
      if (shNum > bottomShelfNum && shNum < nearestSoFar) {
        nearestSoFar = shNum;
      }
    }
    if (nearestSoFar === 1000) {
      nearestSoFar = bottomShelfNum + 10;
    }
    return this.shelfTop(bottomShelfNum) - this.shelfTop(nearestSoFar) - this.shelfHeight - 1;
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
      height: box.height,
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
        selectable: false,
        hasBorders: false,
        hasControls: false,
        //originX: 'center', originY: 'center', 
        //subTargetCheck: true,
      });
    group.on('mouseup', (e) => {
      this.selectPosition(group);
    });
    console.log(group.top, box, rect);
    this.canvas.add(group);
  }

  j = 5;
  sp2(position) {
    this.j = -this.j;
    // this.currentSelection.set('originX', 'center');
    // this.currentSelection.set('originY', 'center');
    this.currentSelection.set('angle', this.j);
    //console.log("ppp");
    position.animate('angle', 0, {
      duration: 320,
      onChange: this.canvas.renderAll.bind(this.canvas),
      easing: fabric.util.ease.easeOutExpo
    });
  }

  currentSelection: fabric.Group = null;

  selectPosition(position: fabric.Group) {
    if (this.currentSelection) {
      //unselect olf position
      clearInterval(this.currentSelection.intervalID);
      this.currentSelection.set('angle', 0);
      if (this.currentSelection === position) {
        //user clicked on currently selected position, just unselect it
        this.currentSelection = null;
        return;
      }
    }
    //select new position
    this.currentSelection = position;
    position.intervalID = setInterval(() => this.sp2(position), 360);
  }

  buildSection(whseSection: WhseSection) {
    this.whseSection = whseSection;
    this.constructSection();
  }


  constructSection(drawContent = true) {
    if (!this.whseSection) { return; }
    this.canvas.clear();
    this.drawFrame();

    for (let i = 0; i < this.whseSection.shelves.length; i++) {
      this.drawShelf(this.whseSection.shelves[i].shelfID, `${this.whseSection['whseID']}-${this.whseSection['aisleID']}-${this.whseSection.shelves[i].shelfID}-`, false);
    }
    if (drawContent) {
      this.drawContent();
    }
  }

}