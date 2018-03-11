import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'app-modal-toolbar',
  templateUrl: 'modal-toolbar.component.html',
})
export class ModalToolbarComponent implements OnInit {
  title:string;

  constructor(public viewCtrl: ViewController) {
    let data = this.viewCtrl.data
    this.title = data.modalTitle;
   }

  ngOnInit() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
 