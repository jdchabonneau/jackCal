import {
  Component,
  AfterViewInit,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef
} from "@angular/core";
import { ModalController } from "ionic-angular";
import { fabric } from "fabric";
import {
  WhseLayout,
  WhseAisle,
  WhseSection,
  WhseShelf
} from "../../../components/WhseMap/WhseMapClasses";
import { TopViewDirective } from "../directives/top-view/top-view";
//import { DhiDataProvider } from '../../../providers/dhi-data/dhi-data';
import { WhseMapService } from "../../../providers/whseMapService";
import { WhseMapFindPage } from "../../../pages/whse-map-find/whse-map-find";

@Component({
  selector: "whse-mapper",
  templateUrl: "whse-mapper.html",
  providers: [WhseMapService]
})
export class WhseMapperComponent {
  closeSection = true;
  isShowingSection = false;
  adjustHeights = false;
  @ViewChild(TopViewDirective) topView: TopViewDirective;

  constructor(
    private cdRef: ChangeDetectorRef,
    //private dhiDataProvider: ,
    private whseMapService: WhseMapService,
    private modalController: ModalController
  ) {}

  closeSectionView(p) {
    this.closeSection = !this.closeSection;
  }

  // hilightItem(p){
  //   this.dhiDataProvider.getItemLocations(2, 19494).subscribe(resp=> {
  //     let r = resp.json();
  //     console.log(r);
  //   });
  // }

  hilightItem(p) {
    const modal = this.modalController.create("WhseMapFindPage");
    modal.onDidDismiss(data => {
      console.log(data);
      if (!data) {
        //Cancel was hi, do nothing
      } else {
        switch (data.action) {
          case "customer":
            this.whseMapService.highlightCustomer(data.id);
            break;
          case "item":
            this.whseMapService.highlightItem(data.id);
            break;
          case "all":
            this.whseMapService.highlightAll();
            break;
          case "nothing":
            this.whseMapService.highlightNone();
            break;
        }
      }
      //this.whseMapService.highlightAll();
    });
    modal.present();
    // this.dhiDataProvider.getLocationsByCustomer(1635, 2).subscribe(resp=> {
    //   let r = resp.json();
    //   console.log(r);
    // });
  }

  // hilightItem(p){
  //   this.dhiDataProvider.getOccupiedLocations(2).subscribe(resp=> {
  //     console.log(resp);
  //     let r = resp.json();
  //     console.log(r);
  //   });
  //}

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  adjustShelves(p) {
    this.closeSection = !this.adjustHeights;
  }
}
