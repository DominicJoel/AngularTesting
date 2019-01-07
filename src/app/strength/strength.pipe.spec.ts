
// Prueba Isolated ( O independiente  ) de los pipes

import { StrengthPipe } from "./strength.pipe";

describe(" StrengthPipe ", () => {
    it('Deberia mostrar weak si la longitud es 5', ()=>{
        // Arrange
        let pipe = new StrengthPipe; // Inicializamos la clase del Pipe

        //Act
        let val = pipe.transform(5); //Utilizamos el metodo transform de la clase

        //Asserts
        expect(val).toEqual('5 (weak)'); // Validamos que funcione correctamente

    })

    it('Deberia mostrar strong si la longitud es 10', ()=>{
      // Arrange
      let pipe = new StrengthPipe; // Inicializamos la clase del Pipe

      //Act
      let val = pipe.transform(10); //Utilizamos el metodo transform de la clase

      //Asserts
      expect(val).toEqual('10 (strong)'); // Validamos que funcione correctamente

  })



})
