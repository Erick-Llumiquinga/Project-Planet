import { Component } from '@angular/core';
import { IonicPage , NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import {HttpClient} from '../../../node_modules/@angular/common/http';
import { mapPage } from '../map/map';
import Swal from 'sweetalert2';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  formularioRegistro: FormGroup;

  constructor(public navCtrl: NavController, public FormBuilder: FormBuilder, public http: HttpClient) {
    this.formularioRegistro = this.myForm();
   
  }

  private myForm(){
    return this.FormBuilder.group({
      nombre: ['',Validators.required],
      correo: ['',Validators.required],
      clave: ['',Validators.required],
    })
  }

  enviarDatos(){
    var cabezera = {"headers": {"Content-Type": "application/json"}};
    this.http.post("https://localhost:8081/user/create",JSON.stringify(this.formularioRegistro.value),cabezera).subscribe(data =>{
      console.log(data);
      console.log(JSON.stringify(data));
      this.correcto();
      this.gotoMap();
    }, error =>{
      alert('Registro no completo');
      console.log(JSON.stringify(error));
    });
  }

  saveData(){
    console.log(JSON.stringify(this.formularioRegistro.value));
    this.enviarDatos();
  }


  gotoMap():void{
    this.navCtrl.setRoot(mapPage);
  
  }

  correcto(){
     alert("Datos correcto")
  }
}