// Prueba de Componenetes Isolated
import { HeroesComponent } from "../heroes/heroes.component";
import {of} from 'rxjs';

describe('HeroesComponent', () =>{
    let component:HeroesComponent;// Variable de tipo ( HeroComponent )
    let HEROES;
    let mockHeroService;

    //Arrange Principal
    beforeEach(() => {
        HEROES = [ // Inicializamos el arreglo con estos datos
          {id:1, name: 'SpiderDude', strength: 8},
          {id:2, name: 'Wonderful Woman', strength: 24},
          {id:3, name: 'Super Dude', strength: 55}
        ]

        //Nota en el Mock, le mandamos a crear solo los metodos que el componente esta usando
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']) // Creamos el mockHeroService, el Mock nos sirve para hacer un Fake, en este caso hacemos un fake del servicio y le indicamos que cree esos tres servicios que necesita el HeroesComponents

        component = new HeroesComponent(mockHeroService); // Inicializamos la variable component de tipo HeroesComponent, y le mandamos el Mock que creamos para que este funcione
      })

      it(' Debe eliminar el heroe indicado de la lista de heores ', ()=>{
       //Arrange
        component.heroes = HEROES;
        mockHeroService.deleteHero.and.returnValue(of(true)); //Aqui le indicamos que queremos que este servicio retorne un Observable, el (and) es importante porque indicamos que es un Mock y el (of(true)) para lo del Observable
        //Act
        component.delete(HEROES[2]);

        //Assert
        expect(component.heroes.length).toBe(2);
      })

      // Si en vez de it usamos xit, Karma omitira esa prueba
      it('Deberia llamar deleteHero', () =>{
        //Arrange
        component.heroes = HEROES;
        mockHeroService.deleteHero.and.returnValue(of(true)); //Aqui le indicamos que queremos que este servicio retorne un Observable, el (and) es importante porque indicamos que es un Mock y el (of(true)) para lo del Observable
        //Act
        component.delete(HEROES[2]);

        //Assert
      //  expect(mockHeroService.deleteHero).toHaveBeenCalled(); //Este (toHaveBeenCalled) funciona para indicar que el metodo fue llamado
        expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]); //Este (toHaveBeenCalledWith) funciona para indicar que el metodo fue llamado y que contiene un parametro
      })
})


// OJO al momento de hacer prueba seria bueno mantener la consola abierta, porque nos da mas inofrmación detallada
// En el JSON, en los scripts y en la parte de test, agregar "ng test --source-map=false", eso es muy util que lo hagamos
