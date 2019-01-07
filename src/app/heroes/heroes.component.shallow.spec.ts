
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs/internal/observable/of";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe('Heroes Component (shallow tests)',() => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroServie;
  let HEROES;

  @Component({ // Esto lo hacemos para quitar el ERROR_SCHEMA y poder trabajar con el childComponent (HeroComponent) que esta dentro del Html de HeroesComponent
    selector: 'app-hero',
    template: '<div></div>'
  })
   class FakeHeroComponent { //Esto es un componente fake porque las pruebas (shallow)  trabajan con un componente fake.
    @Input() hero: Hero;
  }


  beforeEach(() => {
       mockHeroServie = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']); //Aqui creamos el mockUp de los servicios junto a sus metodos
       HEROES = [
        { id:1 , name: 'SpiderDude', strength: 8 },
        { id:2 , name: 'Wonderful Woman', strength: 24 },
        { id:3 , name: 'SuperDude', strength: 55 }
       ]


        TestBed.configureTestingModule({
             declarations: [
                        HeroesComponent,
                        FakeHeroComponent
              ],
             providers:[
                   {provide: HeroService , useValue: mockHeroServie } // Aqui le indicamos que no queremos usar el real si no el Mock Up
             ],// Debemos tener cuidado con llamar al servicio real ya que este hace llamadas (Http) y podria alterarnos algún dato
             // schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
  })

     it('Deberia traer los heroes correctos del servicio' , () =>{ // Esta prueba es del Ts
       mockHeroServie.getHeroes.and.returnValue(of(HEROES));// Esto funciona para trabajar con los observables
        fixture.detectChanges(); // Este detecta los cambios y en este caso llama al OnInit tambn

        expect(fixture.componentInstance.heroes.length).toBe(3);
     });


     it('Deberia crear un (li) por cada heroe' , () => { // Esta prueba es para el HTML
      mockHeroServie.getHeroes.and.returnValue(of(HEROES));// Esto funciona para trabajar con los observables
       fixture.detectChanges(); // Este detecta los cambios

       expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });
})

//////////////////////////////////////////////////////////// OJO ////////////////////////////////////////////////////////////////

//Es importante que proebemos uno correcto y poner el dato mal a ver si lo pone incorrecto
