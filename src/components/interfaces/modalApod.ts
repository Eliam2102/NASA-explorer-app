import { ApodItem } from "../../domain/entidades/apodItem";

export interface ModalApodProps {
    visible: boolean;
    onClose: ()=> void;
    apodItem: ApodItem;
}