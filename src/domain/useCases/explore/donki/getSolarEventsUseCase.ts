// Importamos la entidad del dominio que representa una erupción solar.
// Esta entidad está simplificada y adaptada para la lógica de negocio de la app.
import { SolarFlare } from "../../../entidades/explore/donki/solar";

// Importamos el repositorio concreto que se encarga de obtener los datos desde la capa de infraestructura (API NASA).
// Este repositorio implementa la lógica de acceso a datos, aislando el UseCase de detalles externos.
import { SolarRepository } from "../../../repository/explore/donki/solar/solarRepository";


// Definimos el caso de uso que representa una operación del dominio.
// En este caso, obtener eventos de erupciones solares desde la fuente de datos externa.
export class GetSolarFlaresUseCase {

    // Inyectamos el repositorio mediante el constructor.
    // Esto permite invertir las dependencias (principio SOLID), facilitando pruebas y desacoplamiento.
    constructor (private repository: SolarRepository) {}

    /**
     * Ejecuta el caso de uso de obtener erupciones solares entre dos fechas.
     *
     * @param start_date - Fecha de inicio en formato 'YYYY-MM-DD'.
     * @param end_date - Fecha de fin en formato 'YYYY-MM-DD'.
     * @returns Una promesa que resuelve con un arreglo de entidades `SolarFlare` del dominio.
     */
    async execute(start_date: string, end_date: string): Promise<SolarFlare[]> {
        // Llama al repositorio para obtener los datos del origen (API) y devuelve
        // la respuesta adaptada al modelo de dominio.
        return this.repository.getSolar(start_date, end_date);
    }
}