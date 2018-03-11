import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProductService } from '../../shared/shared';

@Component({
  selector: 'page-barcode-scan',
  templateUrl: 'barcode-scan.html',
})
export class BarcodeScanPage {

  products: any;
  productsType: any;
  productsText: any;
  isScanned:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private productaService: ProductService, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    const me = this;
    console.log('ionViewDidLoad BarcodeScanPage');

    me.productaService.getListDetails().then(response => {
      me.products = response;
    })
  }

  goToRootPage(){
    this.navCtrl.popToRoot();
  }

  tappedScan(){
    const me = this;
    const toast = this.toastCtrl;
    me.barcodeScanner.scan().then((barcodeData) => {
      let createToast = toast.create({
        message:'scann was successfully',
        duration: 3000,
        position: 'top'
      });
      createToast.present();

      me.productsType = barcodeData.format;
      me.productsText = barcodeData.text
      me.isScanned = true;
    }, (err)=>{
      let createToast = toast.create({
        message:'dismissed scan, error:' + err,
        duration: 3000,
        position: 'top'
      }); 
      createToast.present();
      me.isScanned = false;
    });
  }
}
