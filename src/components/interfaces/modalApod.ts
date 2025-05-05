import { ApodItem } from "../../domain/entidades/astronomy/apod/apodItem";

export interface ModalApodProps {
    visible: boolean;
    onClose: ()=> void;
    apodItem: ApodItem;
}