import { Injectable } from '@angular/core';
import { Resultado } from '../components/interfaces/pokeapi';
import { __await } from 'tslib';
import { Pokemon } from '../components/interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  async getByPage(page:number, size: number =40):Promise<Resultado[]>{
    if (page > 5) return[];
    const offset = size*(page-1);
    const res = await fetch (`https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`)
    const resJson = await res.json();
    if(resJson.results.length > 0) return resJson.results
    return [];
  }

 async getById(id:string):Promise<Pokemon>{
   const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)  
   return await res.json();

  } 

  async getDescripcion(id:string | number):Promise<string>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)  
    const resJson =  await res.json();
    const texto = resJson.flavor_text.entries.find((texto:any) => texto.lenguage.name === "es")
    return texto.flavor_text;
  }
}
