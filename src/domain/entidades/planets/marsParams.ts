export interface MarsParams {
    rover: 'curiosity' | 'opportunity' | 'spirit'; // deben ser obligatorios por que son los carritos 
    earthDate?: string; // fecha esta la dejo como opcional
    solDate?: number;        // día marciano, alternativo a fehca ne la tierra
    camera?: string;     // camara es opcional, algunos tinee más de una camara
    page?: number;  //manejar paginado 
}