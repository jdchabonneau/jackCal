import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { fabric } from 'fabric';
import { WhseLayout, WhseAisle, WhseSection, WhseShelf } from '../../../components/WhseMap/WhseMapClasses';

@Component({
  selector: 'whse-map',
  templateUrl: 'whse-map.html'
})
export class WhseMapComponent implements AfterViewInit {
  @Output() changeLeft: EventEmitter<WhseSection> = new EventEmitter<WhseSection>();
  @Output() changeRight: EventEmitter<WhseSection> = new EventEmitter<WhseSection>();

  layout: WhseLayout;
  //  ngAfterViewInit(){

  ngAfterViewInit() {
    // create a wrapper around native canvas element (with id="c")
    this.layout = this.buildTestWhse();
    var cv = document.querySelector('canvas');
    fitToContainer(cv);

    function fitToContainer(canvas){
      // Make it visually fill the positioned parent
      canvas.style.width ='100%';
      canvas.style.height='100%';
      // ...then set the internal size to match
      alert(`${canvas.width} & ${canvas.height}`);
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      alert(`${canvas.width} & ${canvas.height}`);
    }
    
    var canvas: fabric.Canvas = new fabric.Canvas('c', {
      backgroundColor: '#eee'
    });

    this.layout.aisles[0].sections.splice(1, 1)

    // canvas.on('mouse:wheel', function(opt) {
    //   var delta = opt.e.deltaY;
    //   var zoom = canvas.getZoom();
    //   zoom = zoom + delta/200;
    //   if (zoom > 20) zoom = 20;
    //   if (zoom < 0.01) zoom = 0.01;
    //   canvas.setZoom(zoom);
    //   opt.e.preventDefault();
    //   opt.e.stopPropagation();
    // })

    canvas.on('mouse:down', function (opt) {
      var evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });

    canvas.on('mouse:move', function (opt) {
      if (this.isDragging) {
        var e = opt.e;
        this.viewportTransform[4] += e.clientX - this.lastPosX;
        this.viewportTransform[5] += e.clientY - this.lastPosY;
        this.renderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });

    canvas.on('mouse:up', function (opt) {
      this.isDragging = false;
      this.selection = true;
    });

    canvas.on('mouse:wheel', function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom = zoom + delta / 200;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.1) zoom = 0.1;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
      var vpt = this.viewportTransform;
      if (zoom < 400 / 1000) {
        this.viewportTransform[4] = 200 - 1000 * zoom / 2;
        this.viewportTransform[5] = 200 - 1000 * zoom / 2;
      } else {
        if (vpt[4] >= 0) {
          this.viewportTransform[4] = 0;
        } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
          this.viewportTransform[4] = canvas.getWidth() - 1000 * zoom;
        }
        if (vpt[5] >= 0) {
          this.viewportTransform[5] = 0;
        } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
          this.viewportTransform[5] = canvas.getHeight() - 1000 * zoom;
        }
      }
    });

    canvas.renderOnAddRemove = false;
    //    for (let aisle = 0; aisle < 100; aisle += 1) {
    //      this.buildAisle(canvas, 20, 10, aisle);
    //    }
    this.buildWhse(canvas, this.layout);

    canvas.renderAll();
    //   rect.on('mousedown', e => {
    //     console.log("cv-d:", e);
    //     canvas.toggleDragMode(true);
    //     //      let delta = new fabric.Point(10, 19);
    //     //      canvas.relativePan(delta);
    //     //this.trigger('moved');
    //   });

    //   rect.on('mouseup', e => {
    //     console.log("cv-u:", e);
    //     canvas.toggleDragMode(false);
    //     //      let delta = new fabric.Point(10, 19);
    //     //      canvas.relativePan(delta);
    //     //this.trigger('moved');
    //   })

    //   this.setUpDragging();
    //   // Handle dragmode change
 
    //   let dragMode = false;
    //   // $('#dragmode').change(_ => {
    //   //   dragMode = !dragMode;
    //   canvas.toggleDragMode(dragMode);
    //   // });


    //   // create a rectangle object
    //   //  console.log('22B', fabric.version);

    // }

    // setUpDragging() {
    //   const STATE_IDLE = 'idle';
    //   const STATE_PANNING = 'panning';
    //   fabric.Canvas.prototype.toggleDragMode = function (dragMode) {
    //     // Remember the previous X and Y coordinates for delta calculations
    //     let lastClientX;
    //     let lastClientY;
    //     // Keep track of the state
    //     let state = STATE_IDLE;
    //     // We're entering dragmode
    //     if (dragMode) {
    //       // Discard any active object
    //       this.discardActiveObject();
    //       // Set the cursor to 'move'
    //       this.defaultCursor = 'move';
    //       // Loop over all objects and disable events / selectable. We remember its value in a temp variable stored on each object
    //       this.forEachObject(function (object) {
    //         object.prevEvented = object.evented;
    //         object.prevSelectable = object.selectable;
    //         object.evented = false;
    //         object.selectable = false;
    //       });
    //       // Remove selection ability on the canvas
    //       this.selection = false;
    //       // When MouseUp fires, we set the state to idle
    //       this.on('mouse:up', function (e) {
    //         state = STATE_IDLE;
    //       });
    //       // When MouseDown fires, we set the state to panning
    //       this.on('mouse:down', (e) => {
    //         state = STATE_PANNING;
    //         lastClientX = e.e.clientX;
    //         lastClientY = e.e.clientY;
    //       });
    //       // When the mouse moves, and we're panning (mouse down), we continue
    //       this.on('mouse:move', (e) => {
    //         if (state === STATE_PANNING && e && e.e) {
    //           // let delta = new fabric.Point(e.e.movementX, e.e.movementY); // No Safari support for movementX and movementY
    //           // For cross-browser compatibility, I had to manually keep track of the delta

    //           // Calculate deltas
    //           let deltaX = 0;
    //           let deltaY = 0;
    //           if (lastClientX) {
    //             deltaX = e.e.clientX - lastClientX;
    //           }
    //           if (lastClientY) {
    //             deltaY = e.e.clientY - lastClientY;
    //           }
    //           // Update the last X and Y values
    //           lastClientX = e.e.clientX;
    //           lastClientY = e.e.clientY;

    //           let delta = new fabric.Point(deltaX, deltaY);
    //           this.relativePan(delta);
    //           this.trigger('moved');
    //         }
    //       });
    //     } else {
    //       // When we exit dragmode, we restore the previous values on all objects
    //       this.forEachObject(function (object) {
    //         object.evented = (object.prevEvented !== undefined) ? object.prevEvented : object.evented;
    //         object.selectable = (object.prevSelectable !== undefined) ? object.prevSelectable : object.selectable;
    //       });
    //       // Reset the cursor
    //       this.defaultCursor = 'default';
    //       // Remove the event listeners
    //       this.off('mouse:up');
    //       this.off('mouse:down');
    //       this.off('mouse:move');
    //       // Restore selection ability on the canvas
    //       this.selection = true;
    //     }
    //   };

  }

  buildTestWhse(): WhseLayout {
    let w = new WhseLayout();
    w.whseID = 33;
    w.whseName = "Crazy House";
    let hasNorthAccess = true;
    for (let i = 100; i < 200; i += 10) {
      let a = new WhseAisle();
      if (hasNorthAccess) {
        a.northAccess = true;
        a.southAccess = false;
      } else {
        a.northAccess = false;
        a.southAccess = true;
      }
      hasNorthAccess = !hasNorthAccess;
      a.aisleID = i;
      //      console.log(w,a);
      w.aisles.push(a);
      //      console.log(w,a);
      for (let k = 1; k < 20; k++) {
        let s = new WhseSection()
        s.sectionID = k;
        a.sections.push(s);
        if (k == 1) {
          for (let l = 2; l < 61; l += 2) {
            let h = new WhseShelf();
            h.shelfID = l;
            s.shelves.push(h);
          }
        } else {

          for (let l = 10; l < 61; l += 10) {
            let h = new WhseShelf();
            h.shelfID = l;
            s.shelves.push(h);
          }
        }
      }
    }
    //console.log(JSON.stringify(w));
    return w;
  }

  buildWhse(canvas, layout: WhseLayout) {
    for (let i = 0; i < layout.aisles.length; i++) {
      this.buildAisle(canvas, layout.aisles[i]);
    }
  }

  top = 0;
  whseID = 8;
  sectionWidth = 24;
  sectionHeight = 24;
  lft = 10;
  buildAisle(canvas, aisle: WhseAisle) {
    let nAccess: fabric.Rect = null;
    let sAccess: fabric.Rect = null;
    if (aisle.northAccess) {
      this.buildAisleway(canvas, nAccess, aisle)
    }
    for (let i = 0; i < aisle.sections.length; i++) {
      let rect = new fabric.Rect({
        //          left: i * 21 + 1 + lft,
        //          top: this.top,
        fill: 'white',
        width: this.sectionWidth,
        height: this.sectionHeight,
        originX: 'center',
        originY: 'center'
      });
      //        let text = new fabric.Text(aisle.sections[i].sectionID);
      let sectionID = aisle.sections[i].sectionID;
      let text = new fabric.Text(sectionID.toString(), {
        fontSize: 12,
        originX: 'center',
        originY: 'center'
      });
      let group = new fabric.Group([rect, text], {
        //        left: i * (this.sectionWidth + 1) + 1 + this.lft,
        //aisle.sections[i].sectionID
        left: (sectionID - 1) * (this.sectionWidth + 1) + 1 + this.lft,
        top: this.top,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        scan: `${this.whseID}-${aisle.aisleID}-${aisle.sections[i].sectionID}`,
        section: aisle.sections[i],
      });
      group.section['whseID'] = this.whseID;
      group.section['aisleID'] = aisle.aisleID;
      
      // "add" rectangle onto canvas
      group.on('mousedown', (e) => {
        console.log(e);
        if (e.e.altKey) {
          this.changeRight.emit(group.section);
          return;
        }
        this.changeLeft.emit(group.section);
      })
      canvas.add(group);
    }
    this.top += this.sectionHeight;
    if (aisle.southAccess) {
      this.buildAisleway(canvas, sAccess, aisle);
    }
  }

  buildAisleway(canvas: fabric.Canvas, rect: fabric.Rect, aisle: WhseAisle) {
    rect = new fabric.Rect({
      //      left: this.lft,
      //      top: this.top,
      fill: '#ddd',
      width: this.sectionWidth * 8,
      height: this.sectionHeight,
      originX: 'center',
      originY: 'center'
    });
    let text = new fabric.Text('aisle: ' + aisle.aisleID, {
      fontSize: 12,
      originX: 'center',
      originY: 'center'
    });
    let group = new fabric.Group([rect, text], {
      left: this.lft,
      top: this.top,
      selectable: false,
      hasBorders: false,
      hasControls: false,
    });
    this.top += this.sectionHeight;
    canvas.add(group);

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
}
