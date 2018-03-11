import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController, NavParams, NavController, ToastController, AlertController } from 'ionic-angular';


@Component({
  selector: 'app-user-modify',
  templateUrl: 'user-modify.component.html',
  //styleUrls: ['./user-modify.component.css']
})
export class UserModifyComponent implements OnInit {

  @Input()isEditBind:boolean = false;
  //@Output()bindUserDataChange = new EventEmitter<any>()
    
  userData:FormGroup;
  user:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
      this.user = navParams.data.parametersData;
   }

  ngOnInit() {
    this.createForm(this.user);
  }

  clickedUpdateUser(){
    const me = this;

    let isValid = me.userData.valid

    me.prepareAlert(isValid);

    if (isValid){
      //update user data
    }
  }

  addNewUser(){
    const me = this;

    let isValid = me.userData.valid

    me.prepareAlert(isValid, true);

    if (isValid){
      //save user data
    }
  }

  private prepareAlert(isValid:boolean, isNewUser = false){
    const me = this;
    if (isValid){
      let toast = me.toastCtrl.create({
        message: isNewUser ? "user added successfully" : "user modify successfully",
        duration: 1000,
        position: 'top'
      });
      toast.present();

      toast.onDidDismiss(() => {
        this.viewCtrl.dismiss();
      });
    } else {
      let alert = me.alertCtrl.create({
        title: "cant add user",
        subTitle: "please check your data and try again",
        buttons: ["OK"]
      })
      alert.present();
    }
  }

  private createForm(user: any){
    this.userData = this.formBuilder.group({
      personalId:  ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      userNamePolish: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      userNameEng: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]      
    });
    if (this.isEditBind){
      this.userData.setValue({
        personalId: user.personalID,
        userNamePolish: user.namePolish,
        userNameEng: user.nameEng
      });
    }
  }
}
