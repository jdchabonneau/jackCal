import { fabric } from 'fabric';
import { WhseLayout, WhseAisle, WhseSection, WhseShelf } from './../../WhseMapClasses';

export class TopViewMap {

    top = 0;
    whseID = 8;
    sectionWidth = 24;
    sectionHeight = 24;
    lft = 10;
    canvas: fabric.Canvas

    constructor(canvas: fabric.Canvas) {
        this.canvas = canvas;
    }

    static buildTestWhse(): WhseLayout {
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

    buildWhse(canvas, layout: WhseLayout, callback) {
        console.log(this);
        this.canvas.clear();
        for (let i = 0; i < layout.aisles.length; i++) {
            this.buildAisle(canvas, layout.aisles[i], callback);
        }
    }

    buildAisle(canvas, aisle: WhseAisle, callback) {
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
//                if (e.e.altKey) {
                    //     this.changeRight.emit(group.section);
//                    return;
 //               }
                   callback(group.section);
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
//            width: this.sectionWidth * 8,
            width: canvas.width-1,
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

    addCanvasUI() {
        this.canvas.on('mouse:down', function (opt) {
            var evt = opt.e;
            if (evt.altKey === true) {
                this.isDragging = true;
                this.selection = false;
                this.lastPosX = evt.clientX;
                this.lastPosY = evt.clientY;
            }
        });

        this.canvas.on('mouse:move', function (opt) {
            if (this.isDragging) {
                var e = opt.e;
                this.viewportTransform[4] += e.clientX - this.lastPosX;
                this.viewportTransform[5] += e.clientY - this.lastPosY;
                this.renderAll();
                this.lastPosX = e.clientX;
                this.lastPosY = e.clientY;
            }
        });

        this.canvas.on('mouse:up', function (opt) {
            this.isDragging = false;
            this.selection = true;
        });

        this.canvas.on('mouse:wheel', function (opt) {
            var delta = opt.e.deltaY;
            var zoom = this.canvas.getZoom();
            zoom = zoom + delta / 200;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.1) zoom = 0.1;
            this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
            var vpt = this.viewportTransform;
            if (zoom < 400 / 1000) {
                this.viewportTransform[4] = 200 - 1000 * zoom / 2;
                this.viewportTransform[5] = 200 - 1000 * zoom / 2;
            } else {
                if (vpt[4] >= 0) {
                    this.viewportTransform[4] = 0;
                } else if (vpt[4] < this.canvas.getWidth() - 1000 * zoom) {
                    this.viewportTransform[4] = this.canvas.getWidth() - 1000 * zoom;
                }
                if (vpt[5] >= 0) {
                    this.viewportTransform[5] = 0;
                } else if (vpt[5] < this.canvas.getHeight() - 1000 * zoom) {
                    this.viewportTransform[5] = this.canvas.getHeight() - 1000 * zoom;
                }
            }
        });

        this.canvas.renderOnAddRemove = false;
    }


}
