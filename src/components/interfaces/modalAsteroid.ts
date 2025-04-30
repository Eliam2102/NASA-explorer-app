//import mi entidad del modelo para poder reutiliarla
import { Asteroid } from '../../domain/entidades/neows/asteroid';

export interface AsteroidModal {
    visible: boolean;
    onClose: ()=> void;
    asteroid: Asteroid;
}