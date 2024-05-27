import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-foto-pokemon',
  templateUrl: './foto-pokemon.component.html',
  styleUrls: ['./foto-pokemon.component.scss']
})
export class FotoPokemonComponent {

 
  
  @Input()
  _pokemon?: Pokemon | undefined;
  public get pokemon(): Pokemon | undefined {
    return this._pokemon;
  }
  public set pokemon(value: Pokemon | undefined) {
    this._pokemon = value;
  }


 
 
}
  


