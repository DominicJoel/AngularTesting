import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroComponent (shallow test)', () => {
  let fixture: ComponentFixture<HeroComponent>; // Para manejar lo que devuelve el (TestBed.createComponent) y sus accesorios o propiedades(fixture) con esta variable


   beforeEach(()=>{
     // El testBed nos permite probar ambas cosas, el componente y su plantilla corriendo ambos juntos
       TestBed.configureTestingModule({
           declarations: [HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]// Con esto le decimos a angular que ignore los elementos y atributos desconocidos tales como (Routing,etc) debemos tener cuidado con usarlo mucho porque nos oculta errores de ortografias etc, asi que solo se usa si es absolutamente necesarias.
       }); // Estamos creando un modulo especificamente para testing, porque solo nos interesa probar un solo componente y su plantilla no los demas.

      fixture = TestBed.createComponent(HeroComponent); // Aqui creamos el componente para probar, porque este en sí devuelve un fixture(accesorios) que son utilizados para pruebas porque contiene mas propiedades que un componente normal
      // fixture.componentInstance. // Ya con esto podemos acceder a todo lo del componente real(Variables, metodos, etc.)
   })

   it('Deberia tener el heroe correcto ', () =>{
        fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 }; // Como es una variable que se obtiene desde otro componente la hard codiamos para manejarla aqui

        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
   });

   it('Deberia mostrar el nombre del heroe en en un anchor tag', () =>{ // Parte del HTML
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 }; // Como es una variable que se obtiene desde otro componente la hard codiamos para manejarla aqui
    fixture.detectChanges(); // Para que detecte los cambios, porque al principio esta vacio y al cambiar es que captura el elemento, por eso detectamos los cambios

    // Forma con debug
    let de =  fixture.debugElement.query(By.css('a')); // El debugElement es como un elemento Nativo , (query) permite tener referencia a un solo nodo, y queryAll a varios nodos, con este podemos acceder a clases (.) o id(#)
    expect(de.nativeElement.textContent).toContain('SuperDude');

    // Otra forma con Native Element
    // expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude'); // Este captura los elemtos del DOM, HTML es como si manejamos el DOM desde JavaScript, (querySelector) permite selecionar el elemento necesitado , (textContent) muestra lo que esta dentro de esa etiqueta,(toContain) que contenga esto lo que estamos seleccionando
    // Otra forma llamando con debug directamente el elemento
    // expect(fixture.debugElement.query(By.css('a'))).toContain('SuperDude') // El debugElement es como un elemento Nativo , (query) permite tener referencia a un solo nodo, y queryAll a varios nodos, con este podemos acceder a clases (.) o id(#)

   })

}) // El indicar que es (shallow) es solo para propositos del curso
