import { Component } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-irrigation-control',
  templateUrl: './irrigation-control.component.html',
  styleUrls: ['./irrigation-control.component.scss']
})
export class IrrigationControlComponent {
  breadCrumbItems: Array<{}>;

  modalRef?: BsModalRef;

  selectedIrrigationProcess: string = 'Automatic_Irrigation';

  manualIrrigationSwitch: boolean = false;

  constructor(private modalService: BsModalService) {
  }

  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  manualIrrigationSwitchMethode() {
    this.manualIrrigationSwitch = !this.manualIrrigationSwitch;
  }
}
