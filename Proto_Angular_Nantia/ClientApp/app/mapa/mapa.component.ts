import { Component, OnInit } from '@angular/core';
import { MarkerService } from '../service/marker.service';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  providers: [MarkerService, RequestService]
})
export class MapaComponent  {

  //Posicion Inicial
  Lat: number =  -34.4493549;
  Long: number = -56.4004827;
  zoom:number = 14;
  
  nombreMarcador:string;
  latitudMarcador:string;
  longitudMarcador:string;
  marcadorMovil:string;


  //Marcadores
  markers:marker[];

  constructor(
    private _markerService:MarkerService,
    private _requestService:RequestService) {
   this.markers = this._markerService.obtenerMarcadores();
   //this.
     }

   marcadorCliqueado(marcador:marker,index:number){
  	console.log("Marcador cliqueado: " + marcador.Nombre);
  }

  mapCliqueado($event:any){
  	console.log("Mapa Cliqueado");

  	var nuevoMarcador ={
  		Nombre: "Sin Titulo",
  		Lat: $event.coords.lat,
  		Long:$event.coords.lng,
  		Movil: true
  	}

  	this.markers.push(nuevoMarcador);
    this._markerService.agregarMarcador(nuevoMarcador);
  }

  posicionFinalMarcador(marcador:any, $event:any){
  	console.log("Posicion Final:",marcador,$event);

  	var actuaMarcador ={
  		Nombre: marcador.Nombre,
  		Lat: parseFloat(marcador.Lat) ,
  		Long:parseFloat(marcador.Long),
  		Movil: true
  	}

  	var nuevaLat = $event.coords.lat;
  	var nuevaLong = $event.coords.lng;

    console.log('nuevaLat: '+ nuevaLat);
  	console.log('nuevaLong: '+ nuevaLong);
    console.log('actuaMarcador: '+ actuaMarcador.Nombre);

    this._markerService.actualizarMarcador(actuaMarcador, nuevaLat, nuevaLong);	
  }

  agregarMarcador(){
    console.log('Agregando Marcador');


    if (this.marcadorMovil == 'si') {
       var esMovil = true;
    }else{
      var esMovil = false;
    }
    
    console.log(esMovil);
    var nuevoMarcador ={
      Nombre:this.nombreMarcador,
      Lat:parseFloat(this.latitudMarcador),
      Long:parseFloat(this.longitudMarcador),
      Movil:esMovil
    }

    this.markers.push(nuevoMarcador);
    this._markerService.agregarMarcador(nuevoMarcador);
   }

   ngOnInit(){
     console.log(this._requestService.getPrueba);
     this._requestService.getPuntos().subscribe(
       result => {
         this.markers = result;
         //console.log(result);
         if(!this.markers){
           console.log("Error en el servidor");
         }

       },
       error => {
         var errorMessage = <any>error;
         console.log(errorMessage);
       })

   }


}
//tipo de Marcado
interface marker{
	Nombre?:string;
	Lat:number;
	Long:number;
	Movil:boolean;
}