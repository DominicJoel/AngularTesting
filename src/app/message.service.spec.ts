
// Pruba de servicio Isolated
import { MessageService } from "./message.service";

describe( 'MessageService' ,()=>{

     let service:MessageService // Creamos una variable de tipo (MessageService)

     // Arrange que aplica para todos por eso lo ponemos en el beforeEach para no tener que estar repitiendo lo mismo
     beforeEach(()=>{ // Utilizamos este before para asegurarnos que antes de hacer cualquier prueba se inicialice la variable (service)
         service = new MessageService() // Inicializamos la variable antes de hacer cualquier prueba(it), para proteger de datos sucios
     })

     it ('Deberia no tener mensajes para comenzar',()=>{
         //Asserts
         expect(service.messages.length).toBe(0); // Probamos que el length de mensaje sea igual a 0, que es un arreglo de el servicio
     })

     it ('Deberia agregar un mensaje cuando el metodo add sea llamado',()=>{
        //Act
        service.add('Mensaje1');

        //Asserts
         expect(service.messages.length).toBe(1);//Validar que se le agrego algo al arreglo
     })

     it ('Deberia limpiar todos los mensajes cuando el metodo clear sea llamado',()=>{
      //Arrange
      service.add('Mensaje1');
      // Act
      service.clear();

      //Asserts
       expect(service.messages.length).toBe(0);//Validar que se le agrego algo al arreglo
    })

})
