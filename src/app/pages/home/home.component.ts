import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Resultado } from 'src/app/components/interfaces/pokeapi';
import { Pokemon } from 'src/app/components/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private PokemonService: PokemonService){}
  @ViewChild('tarjetas') tarjetasElement!:ElementRef;

  listaPokemon:Resultado[] = [];


  pagina:number = 1;
  cargando:boolean = false;
  pokemonSeleccionado?:Pokemon;
  detalle:boolean = false;

 ngOnInit(): void {
  this.cargarLista();
  this.PokemonService.getById("1");
 }


async cargarLista(){
this.cargando =true;
this.listaPokemon = [...this.listaPokemon, ... await this.PokemonService.getByPage(this.pagina)];
this.cargando=false;
this.pagina++;
}

onScroll(e:any){
  if(this.cargando) return;
  if(
  Math.round(
    this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
  )
  ===e.srcElement.scrollHeight){
    this.cargarLista();
  }
}


async tarjetaClikeada(id:string){
  if(this.pokemonSeleccionado && id === this.pokemonSeleccionado?.id.toString ())
    return this.cambiarEstadoDetalle()
  this.pokemonSeleccionado = await this.PokemonService.getById(id);
}

cambiarEstadoDetalle(){
  if(this.pokemonSeleccionado) this.detalle = !this.detalle;
  console.log(this.detalle)
}

}
