describe('Primera Prueba', () => { //El (describe) funciona con dos parametros, primero el nombre de la prueba y segundo un callBack con lo que hara la prueba

let sut;

beforeEach(() => {// El "beforeEach" funciona para que antes de ejecutar cualquier prueba se ejecute el beforeEach
    sut ={} // En este caso lo utilizamos para volver a inicializar la variable (sut), de esta forma no se queda con data sucia, al momento de pruebas futuras
})

 it('debe ser true si es true', () => { // El (it) funciona para indicar lo que debe hacer la clase que estamos probando
   // Inicio
   sut.a = false;

   // Hecho
   sut.a = true;

   //Lo que esperamos
   expect(sut.a).toBe(true);
 })

});


///// Para probar hay que seguir una estructura, la recomendable es AAA

// Arrange : All necessary preconditions and inputs
// Act: On the object or class under test
// Assert : That the expected result have occured


// Y el DRY (don't repeat yourself)
// -- Remove duplication

// DAMP
// -- Repeat yourself if necessary


// OJO es importante recordar que una beuena prueba cuenta una historia

//////////////////////////////Tecnicas///////////////////////////////
// -- Move less interesting setup into beforeEach()
// -- Keep critical setup within the it()
// -- Include Arrange, Act, and Assert inside the it()
