import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { fabric } from 'fabric'

/**
 * Generated class for the WMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-w-map',
  templateUrl: 'w-map.html',
})
export class WMapPage {

  layout : WhseLayout; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  //  ngAfterViewInit(){
  ionViewWillEnter() {
    // create a wrapper around native canvas element (with id="c")
    this.layout = this.buildTestWhse();
    var canvas: fabric.Canvas = new fabric.Canvas('c', {
      backgroundColor: 'blue'
    });

    let rect = new fabric.Rect({
      left: 0,
      top: 0,
      fill: 'yellow',
      width: canvas.width,
      height: canvas.height,
      selectable: false,
      hasBorders: false,
      hasControls: false,
    });
    canvas.add(rect);

    canvas.renderOnAddRemove = false;
//    for (let aisle = 0; aisle < 100; aisle += 1) {
//      this.buildAisle(canvas, 20, 10, aisle);
//    }
this.buildWhse(canvas, this.layout);

    canvas.renderAll();
    rect.on('mousedown', e => {
      console.log("cv-d:", e);
      canvas.toggleDragMode(true);
      //      let delta = new fabric.Point(10, 19);
      //      canvas.relativePan(delta);
      //this.trigger('moved');
    });

    rect.on('mouseup', e => {
      console.log("cv-u:", e);
      canvas.toggleDragMode(false);
      //      let delta = new fabric.Point(10, 19);
      //      canvas.relativePan(delta);
      //this.trigger('moved');
    })

    this.setUpDragging();
    // Handle dragmode change

    let dragMode = false;
    // $('#dragmode').change(_ => {
    //   dragMode = !dragMode;
    canvas.toggleDragMode(dragMode);
    // });


    // create a rectangle object
    //  console.log('22B', fabric.version);

  }

  setUpDragging() {
    const STATE_IDLE = 'idle';
    const STATE_PANNING = 'panning';
    fabric.Canvas.prototype.toggleDragMode = function (dragMode) {
      // Remember the previous X and Y coordinates for delta calculations
      let lastClientX;
      let lastClientY;
      // Keep track of the state
      let state = STATE_IDLE;
      // We're entering dragmode
      if (dragMode) {
        // Discard any active object
        this.discardActiveObject();
        // Set the cursor to 'move'
        this.defaultCursor = 'move';
        // Loop over all objects and disable events / selectable. We remember its value in a temp variable stored on each object
        this.forEachObject(function (object) {
          object.prevEvented = object.evented;
          object.prevSelectable = object.selectable;
          object.evented = false;
          object.selectable = false;
        });
        // Remove selection ability on the canvas
        this.selection = false;
        // When MouseUp fires, we set the state to idle
        this.on('mouse:up', function (e) {
          state = STATE_IDLE;
        });
        // When MouseDown fires, we set the state to panning
        this.on('mouse:down', (e) => {
          state = STATE_PANNING;
          lastClientX = e.e.clientX;
          lastClientY = e.e.clientY;
        });
        // When the mouse moves, and we're panning (mouse down), we continue
        this.on('mouse:move', (e) => {
          if (state === STATE_PANNING && e && e.e) {
            // let delta = new fabric.Point(e.e.movementX, e.e.movementY); // No Safari support for movementX and movementY
            // For cross-browser compatibility, I had to manually keep track of the delta

            // Calculate deltas
            let deltaX = 0;
            let deltaY = 0;
            if (lastClientX) {
              deltaX = e.e.clientX - lastClientX;
            }
            if (lastClientY) {
              deltaY = e.e.clientY - lastClientY;
            }
            // Update the last X and Y values
            lastClientX = e.e.clientX;
            lastClientY = e.e.clientY;

            let delta = new fabric.Point(deltaX, deltaY);
            this.relativePan(delta);
            this.trigger('moved');
          }
        });
      } else {
        // When we exit dragmode, we restore the previous values on all objects
        this.forEachObject(function (object) {
          object.evented = (object.prevEvented !== undefined) ? object.prevEvented : object.evented;
          object.selectable = (object.prevSelectable !== undefined) ? object.prevSelectable : object.selectable;
        });
        // Reset the cursor
        this.defaultCursor = 'default';
        // Remove the event listeners
        this.off('mouse:up');
        this.off('mouse:down');
        this.off('mouse:move');
        // Restore selection ability on the canvas
        this.selection = true;
      }
    };

  }

  buildTestWhse(): WhseLayout {
    let w = new WhseLayout();
    w.whseID = 33;
    w.whseName = "Crazy House";
    for (let i = 100; i < 200; i += 10) {
      let a = new WhseAisle();
      a.aisleID = i;
//      console.log(w,a);
      w.aisles.push(a);
//      console.log(w,a);
      for (let k = 1; k < 20; k++) {
        let s = new WhseSection()
        s.sectionID = k;
        a.sections.push(s);
        for (let l = 10; l < 51; l += 10) {
          let h = new WhseShelf();
          h.shelfID = l;
          s.shelves.push(h);
        }
      }
    }
    console.log(JSON.stringify(w));
    return w;
  }

  buildWhse(canvas, layout:WhseLayout){

    for(let i = 0; i < layout.aisles.length; i++){
      this.buildAisle(canvas, layout.aisles[i]);
    }
  }

  top = 0;
  whseID = 8;
  buildAisle(canvas, aisle:WhseAisle) {
    const lft = 10;
    for (let i = 0; i < aisle.sections.length; i++) {
        let rect = new fabric.Rect({
          left: i * 21 + 1 + lft,
          top: this.top,
          fill: 'white',
          width: 20,
          height: 20,
          selectable: false,
          hasBorders: false,
          hasControls: false,
          scan: `${this.whseID}-${aisle.aisleID}-${aisle.sections[i].sectionID}`,
        });
        // "add" rectangle onto canvas
        rect.on('mousedown', e => {
          console.log("md:", e.target.scan);
          //      let delta = new fabric.Point(10, 19);
          //      canvas.relativePan(delta);
          //this.trigger('moved');
        })
        canvas.add(rect);       
    }
    this.top += 27;
  }

    buildAisleOld(canvas, numSections, lft, aisle) {
      let rect;
    for (let i = 0; i < numSections; i++) {
      rect = new fabric.Rect({
        left: i * 20 + 1 + lft,
        top: aisle * 25,
        fill: 'red',
        width: 20,
        height: 20,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        scan: `00-${aisle}-${i}`,
      });
      // "add" rectangle onto canvas
      rect.on('mousedown', e => {
        console.log("md:", e.target.scan);
        //      let delta = new fabric.Point(10, 19);
        //      canvas.relativePan(delta);
        //this.trigger('moved');
      })
      canvas.add(rect);

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WMapPage');
  }
}

class WhsePosition {
}

class WhseShelf {
  shelfID: number;
}

class WhseSection {
  sectionID: number;
  x: number[]=[];
  shelves: WhseShelf[]=[];
}

class WhseAisle {
  aisleID: number;
  sections: WhseSection[]=[];
}

class WhseLayout {
  whseID: number;
  whseName: string;
  aisles: WhseAisle[]=[];
}
