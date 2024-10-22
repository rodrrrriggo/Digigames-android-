import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

@Component({
  selector: 'app-probarapi',
  templateUrl: './probarapi.page.html',
  styleUrls: ['./probarapi.page.scss'],
})
export class ProbarapiPage implements OnInit {


  characters: Character[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('https://rickandmortyapi.com/api/character')
      .subscribe(res => {
        console.log(res);
        this.characters = res.results.filter((character: Character) => 
          character.status === 'Alive' && character.species === 'Human'
        );
      });
  }

}