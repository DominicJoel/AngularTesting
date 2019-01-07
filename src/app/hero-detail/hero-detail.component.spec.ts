import { TestBed, ComponentFixture, fakeAsync,tick, flush, async } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from '@angular/common';
import { of } from "rxjs/internal/observable/of";
import { FormsModule } from "@angular/forms";


describe('HeroDetailComponent', () => {

  let fixture: ComponentFixture<HeroDetailComponent>;
  let  mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {

    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => { return '3'; } }} // Para el que captura el Id del las rutas
    }

    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

      TestBed.configureTestingModule({
           imports: [FormsModule],//Para que reconozca lo que pertenece a los FormsModule
           declarations:[HeroDetailComponent],
           providers: [
             {provide: ActivatedRoute, useValue:mockActivatedRoute },
             {provide: HeroService, useValue:mockHeroService },
             {provide: Location, useValue:mockLocation }
           ]
      });

    fixture =  TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 1000  }));// LLamndo el Observable
  });

      it('Deberia renderizar el nombre de un heroe en un h2 tag', () =>{
           fixture.detectChanges(); //Inicializar el componente

           expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');// Esperamos que el h2 contenga eso
      });


//////////////////////////////////////////   Async /////////////////////////////////////
    //   it('Deberia llamar updateHero cuando save sea llamado' , async (() => { // Test a una función asíncrona con promesas
    //     mockHeroService.updateHero.and.returnValue(of({})); // Le mandamos vacío el (of) por el callBack que tiene la función Save, que está vacío por lo asíncorno
    //     fixture.detectChanges();

    //     fixture.componentInstance.save(); // Llamamos a la función Save

    //     fixture.whenStable().then(() => { // Mientras existan promesas pendientes no se llamará lo que está adentro
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //     });
    // }))

      //////////////////////////////////////////   Usando FakeAsync, es el mas recomendado /////////////////////////////////////

      it('Deberia llamar updateHero cuando save sea llamado' , fakeAsync (() => { // Test a una función asíncrona, fakeAsync funciona con promesas y setTimeouts
          mockHeroService.updateHero.and.returnValue(of({})); // Le mandamos vacío el (of) por el callBack que tiene la función Save, que está vacío por lo asíncorno
          fixture.detectChanges();

          fixture.componentInstance.save(); // Llamamos a la función Save
         // tick(250);// Esto hara la espera de 250 miliseconds, y luego pasara al expect, OJO, debemos tener cuidado con el nuemro de milis, debe ser igual o mayor que lo que esta en lo asíncrono, pero lo ideal es que sea igual
          flush(); // Esto hace lo mismo que Tick, lo unico que no lleva tiempo, porque el espera que se ejecute lo que se tiene que ejecutar primero y luego pasa al siguiente elemento

          expect(mockHeroService.updateHero).toHaveBeenCalled();
      }))


      //////////////// Forma no muy recomendada de hacer el test Asíncrono ///////////////////////////////////////
      // it('Deberia llamar updateHero cuando save sea llamado' , (done) => { // Test a una función asíncrona, (done) para notificarle a Jasmine que es una prueba asíncrona
      //     mockHeroService.updateHero.and.returnValue(of({})); // Le mandamos vacío el (of) por el callBack que tiene la función Save, que está vacío por lo asíncorno
      //     fixture.detectChanges();

      //     fixture.componentInstance.save(); // Llamamos a la función Save

      //     setTimeout(() =>{
      //          expect(mockHeroService.updateHero).toHaveBeenCalled();
      //          done();// Con esto el test va a esperar hasta que el metodo se ejecute
      //     }, 3000); // Lo ponemos en un timeOut por lo asíncrono de lo contrario no funciona, el tiempo va de acuerdo al que se establece en la función

      // })
})


//------------------------------------ IMPORTANTE -----------------------------------------------------//
// ng test --code-coverage // Para ver el progreso de nuestro test
