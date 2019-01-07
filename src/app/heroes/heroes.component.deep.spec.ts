
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Input, Component, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs/internal/observable/of";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";



////////////////////////////////////////////////////////////////// Inicio Crear directiva para el routerLink ///////////////////////////////////////////////////
@Directive({
   selector: '[routerLink]', // Indicando que estamos trabajando con esa directiva
   host: { '(click)': 'onClick()' } // Esto escuchara cuando se haga click y ejecutara el metodo
})
export class RouterLinkDirectiveStub { // Para el router Link
   @Input('routerLink') linkParams: any;
   navigatedTo:any = null;

   onClick() {
     this.navigatedTo = this.linkParams; //Aqui lo vamos a igualar para saber si recibio un valor cuando le hiceiron click
   }
}
////////////////////////////////////////////////////////////////// Fin Crear directiva para el routerLink ///////////////////////////////////////////////////


describe('Heroes Component (deep tests)',() => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroServie;
  let HEROES;

   //////////////////////////////////////// En las pruebas deep no necesitamos un fake component //////////////////////////////////////////////////////////////////
  // @Component({ // Esto lo hacemos para quitar el ERROR_SCHEMA y poder trabajar con el childComponent (HeroComponent) que esta dentro del Html de HeroesComponent
  //   selector: 'app-hero',
  //   template: '<div></div>'
  // })
  //  class FakeHeroComponent {
  //   @Input() hero: Hero;
  // }


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
                        HeroComponent, // En las pruebas deep trabajamos con el componente real
                        RouterLinkDirectiveStub // Para las rutas
                //        FakeHeroComponent
              ],
             providers:[
                   {provide: HeroService , useValue: mockHeroServie } // Aqui le indicamos que no queremos usar el real si no el Mock Up
             ],// Debemos tener cuidado con llamar al servicio real ya que este hace llamadas (Http) y podria alterarnos algún dato
          //    schemas: [NO_ERRORS_SCHEMA] // Esto nos quita algunos errores como el router, etc;
        })
        fixture = TestBed.createComponent(HeroesComponent);


  })

    it('Deberia renderizar cada heroe como un HeroComponent', ()=>{
         mockHeroServie.getHeroes.and.returnValue(of(HEROES));// Esto funciona para trabajar con los observables, esto simula la creacion de un metodo

         fixture.detectChanges(); //Esto es como llamar el OnInit del componente

         //------------------------------------- Importante----------------------------------------------//
         //fixture.debugElement.queryAll(By.directive(HeroComponent)); // Llamamos al childComponent(HeroComponent), que está en el componente de HeroesComponent co el (By.directive), porque aunque los componente lo llamamos elementos internamente angular lo reconoce como una directiva
         const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
         expect(heroComponentDEs.length).toEqual(3);

         // Podemos hacer un bucle para validar todos los heroes
         for (let i = 0; i < heroComponentDEs.length; i++) {
           expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);

         }
        });

    it(` Deberia llamar heroService.deleteHero cuando se presione el botón de eliminar en el componente de Hero `, () => { // Esto es para testear un evento en este caso un click
      spyOn(fixture.componentInstance, 'delete'); //Aqui le decimos a Jasmine que encuentre el metodo delete en el componente

        mockHeroServie.getHeroes.and.returnValue(of(HEROES));// Esto funciona para trabajar con los observables, esto simula la creacion de un metodo, primero se pone esto porque necesitamos crearlo para luego hacer la llamada en el OnInit

        fixture.detectChanges(); //Esto es como llamar el OnInit del componente

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent)); // Nos conectamos al Dom del HeroComponent

        ////////////////////////---------------------- En este caso le decimos que primero hay que cliquear para que lo ejecute -------------------------/////////////////////////////////////////////
        // heroComponents[0].query(By.css('button')).triggerEventHandler('click', {stopPropagation: () =>{}}) // Click es el nombre del evento y lo otro es el objeto del metodo que vamos a trabajar en este caso se llama stopPropagation que se encuentra donde se ejecuta el evento

       ///////////////////////------------------------ En este le decimos que se ejecute y ya una vez sea llamado ---------------------------------------///////////////////////////////////////////////
       (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined); // Cuando lo emitimos no es necesario mandar un objeto, podemos enviar undefine ya que angular se encarga del resto
        //  HeroComponent[0].triggerEventHandler('delete', null); //Aqui lo podemos hacer psandole en evento llamado en el Html directamente

       expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]); //Asegurarnos que fue llamado, Asi que una vez presionemos el boton que esta arriba llamara al metodo Delete
           // Si pasamos un heroComponents[0] diferente al del evento dara un error
      })

      it('Deberia agregar un nuevo heroe a la lsita cuando el botón add sea presionado', () => { // Esta se puede utilizar tanto en shallow como en Deep
          mockHeroServie.getHeroes.and.returnValue(of(HEROES));// Esto funciona para trabajar con los observables, esto simula la creacion de un metodo, primero se pone esto porque necesitamos crearlo para luego hacer la llamada en el OnInit
          fixture.detectChanges(); //Esto es como llamar el OnInit del componente
          const name = 'Mr. Black'

          mockHeroServie.addHero.and.returnValue(of({id: 5 , name:name, strength: 5 })); // Como el metodo recibe un obejto debemos enviar el objeto
          const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
          const addButton = fixture.debugElement.queryAll(By.css('button'))[0];// Con el [0] le indicamos que va a seleccionar el primer button

          inputElement.value = name; //Esto simula lo que recibio y cambia el valor del valor que tenia
          addButton.triggerEventHandler('click', null); //Se dispara cada vez que haga click en el boton de (addButton)
          fixture.detectChanges(); //Para ver que detecto el cambio

          const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent; //Ver el contenido que vive aqi

          expect(heroText).toContain(name);
      });

      it('debería tener la ruta correcta para el primer heroe', () => { // Probar las rutas
        mockHeroServie.getHeroes.and.returnValue(of(HEROES));// Esto funciona para trabajar con los observables, esto simula la creacion de un metodo, primero se pone esto porque necesitamos crearlo para luego hacer la llamada en el OnInit
        fixture.detectChanges(); //Esto es como llamar el OnInit del componente
           const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

           let routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub); //Esto me devuelve la instancia para este elemento en especifico

           //Presionar el anchorTag
           heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

            expect(routerLink.navigatedTo).toBe('/detail/1');
      })
})

//////////////////////////////////////////////////////////// OJO ////////////////////////////////////////////////////////////////

//Es importante que probemos uno correcto y poner el dato mal a ver si lo pone incorrecto
//Es bueno recordar que debemos pensar donde poner algunos fixtures para que de ese modo tenga un mejor funcionamiento


////////////////////////////////////////////////////////// Importante ///////////////////////////////////////////////////////////

// No testiamos el Framework, testiamos el codigo debemos asumir que el framework funciona bn
