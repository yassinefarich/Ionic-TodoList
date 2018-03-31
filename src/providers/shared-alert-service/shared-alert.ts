import {Injectable, Injector} from '@angular/core';
import {AlertController} from 'ionic-angular';

/*
  Generated class for the SharedAlertServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedAlertProvider {

  constructor(private injector: Injector) {
    console.log('Hello SharedAlertServiceProvider Provider');
  }

  public buildConfirmationAlert() {
    return this.injector.get(ConfirmationAlertBuilder)
  }

  public buildPromptAlert() {
    return this.injector.get(PromptAlertBuilder)
  }

}


@Injectable()
export class ConfirmationAlertBuilder {

  private title: string;
  private message: string;
  private okHandler: () => void

  constructor(public alertCtrl: AlertController) {
    console.log('Hello SharedAlertServiceProvider Provider');
  }

  public withTitle(title) {

    this.title = title;
    return this;
  }

  public withMessage(message) {
    this.message = message;
    return this;
  }

  public withOnOkHandler(okHandler) {
    this.okHandler = okHandler;
    return this;
  }

  public build() {

    return this.alertCtrl.create({
      title: this.title,
      message: this.message,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OK',
          handler: this.okHandler
        }
      ]
    });

  }

  public buildWithOneButton() {

    return this.alertCtrl.create({
      title: this.title,
      message: this.message,
      buttons: [
        {
          text: 'OK',
          handler: this.okHandler
        }
      ]
    });

  }
}


@Injectable()
export class PromptAlertBuilder {

  private title: string;
  private message: string;
  private okHandler: any;
  private cancelHandler: any;
  private inputs: any;

  constructor(public alertCtrl: AlertController) {
    console.log('Hello SharedAlertServiceProvider Provider');
  }

  public withTitle(title) {

    this.title = title;
    return this;
  }

  public withMessage(message) {
    this.message = message;
    return this;
  }

  public withOnOkHandler(okHandler) {
    this.okHandler = okHandler;
    return this;
  }

  public withInputs(inputs) {
    this.inputs = inputs;
    return this;
  }

  public withOnCancelHandler(cancelHandler) {
    this.cancelHandler = cancelHandler;
    return this;
  }

  public build() {
    return this.alertCtrl.create({
      title: this.title,
      message: this.message,
      inputs: this.inputs,
      buttons: [
        {
          text: 'Annuler',
          handler: this.cancelHandler
        },
        {
          text: 'Enregistrer',
          handler: this.okHandler
        }
      ]
    });

  }
}
