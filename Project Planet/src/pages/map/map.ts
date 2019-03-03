import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import L from 'leaflet';
import 'rxjs/add/operator/map';
import { Http, Connection } from '@angular/http';
import 'rxjs/add/observable/of';
import Swal from 'sweetalert2';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class mapPage {
  propertyList = [];
  map: L.Map;
  templateUrl: L.PointTuple;
  center: L.PointTuple;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    this.leafletMap();
    this.loadJSON();
  }
  loadJSON() {
    //Realizamos una petición a nuestro WebService
    this.http.get('https://localhost:44312/api/direcciones')
      .map(res => res.json())
      .subscribe(data => {
        //agregamos la información recuperada a una propiedad de nuestra clase
        this.propertyList = data;
        console.log(data);
      },
        err => console.log("error is " + err), //En caso de tener una respuesta negativa imprimimos en consola el error

        () => this.markers()

      );
  }
  leafletMap() {
    this.map = L.map("map").fitWorld();
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 20,
      attribution: '© Elaborado y diseñado por Drim-THC',
      id: 'mapbox.streets'
    }).addTo(this.map);
    this.map.locate({ setView: true, maxZoom: 16 }).on('locationfound', (e) => {
      let markerGroup = L.featureGroup();
      let marker: any = L.marker([e.latitude, e.longitude]).bindPopup('Estas Aqui').addTo(this.map).openPopup();
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      console.log('Se ha recuperado tu ubicación exitosamente');
    })
  }

  markers() {
    function process(date){
      var parts = date.split("-");
      return new Date(parts[2], parts[1] - 1, parts[0]);
   }
    console.log("Eventos Recuperados: " + this.propertyList.length);
    
    var f = new Date();
    var hoy = (f.getFullYear()+"-"+ (f.getMonth() + 1) + "-" +f.getDate());

   //Recuperamos nuestro array "propertyList" y recorremos cada una de sus propiedades
    for (let property of this.propertyList) {
        let markerGroup = L.featureGroup();
        let marker: any = L.marker([property.latitud, property.longitud]).on('click', () => {
          var contenido = '<div style="position: center"><table border="1px">' +
            '<tr><td><b>Nombre:</b></td><td colspan=3>' + property.nombreEmpresa + '</td></tr>' +
            '<tr><td><b>Descripcion:</b></td><td>' + property.descripcion + '</td></tr>' +
            '<tr><td><b>Contactos:</b></td><td colspan=3>' + property.contactos + '</td></tr>' +
            '<tr><td><b>Enlace:</b></td><td>' + property.enlace + '</td></tr>'+'</table></div>'
          Swal({
            title: "<i>Project Planet</i>",
            html: contenido,
            confirmButtonText: "<u>Atras</u>",
            width: '800px',
          });
        })
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);
      }
  }
  }

