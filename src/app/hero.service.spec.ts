import { TestBed,inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"; // Para poder simular el Http

// Test a los servicios

describe('HeroService', () => {

  let mockMessageService; // Este mock es para un servicio que se usa en el HeroService llmado (MessageService)
  let httpTestingController:HttpTestingController;
   let service : HeroService;


    beforeEach(() => {

     mockMessageService = jasmine.createSpyObj(['add']); //Esto pertenece a MessageService, que lo vamso a utilizar para el HeroService

       TestBed.configureTestingModule({
         imports: [ HttpClientTestingModule ],
          providers: [
            HeroService,
            {provide: MessageService, useValue: mockMessageService} // Para que reconozc ese mock que pertenece a ese servicio
          ]
       });

       ////////////////////////  Importante, así relacionamos el servicio con el http /////////////////////////////////////////////////////////
      httpTestingController = TestBed.get(HttpTestingController); // Para que pueda reconocer la inyeccion del http el servicio que estamos utilizando
      service = TestBed.get(HeroService);
    })

    describe('getHero', () => {

       it('Debería llamar al get con la URL correcta',() =>{
             service.getHero(4).subscribe(); // Esta se ejecuta despues que el flush se ejecute, esto es para suscribirnos a al metodo que hace la llamada
            // service.getHero(3).subscribe(); // Esta se ejecuta despues que el flush se ejecute

               const req = httpTestingController.expectOne('api/heroes/4'); // esto es para el request
                 req.flush({id: 4 , name: 'SuperDude', strength: 100}); // Lo que esperamos que retorne
                 httpTestingController.verify();// Esto es para que verifique que esta recibiendo exactamente lo que esperamos
         });
    })
})


/////////////////////////////////////////////// Importante ///////////////////////////////////////////////

// -------------------------------- Para las llamadas podemos usar el test Bed
        //  httpTestingController = TestBed.get(HttpTestingController); // Para que pueda reconocer la inyeccion del http el servicio que estamos utilizando
      // service = TestBed.get(HeroService);

// -------------------------------- O usar el inject
// describe('getHero', () => {
//   it('Debería llamar al get con la URL correcta',
//            inject([HeroService, HttpTestingController],
//               (service : HeroService, controller: HttpTestingController) => { // Aqui le iyectamos los servicios a los que le vamos a hacer el testing, junto con el controller para poder simular las llamadas http

//                 service.getHero(4).subscribe();
//   }));
// })
