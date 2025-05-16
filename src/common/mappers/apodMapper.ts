import { ApodItem } from "../../domain/entidades/astronomy/apod/apodItem";
import { ApodModel } from "../../data/models/astronomy/apod/apodModel";

export function mapApodModelToEntity(model: ApodModel): ApodItem {
  return {
    title: model.title,
    explanation: model.explanation,
    url: model.url,
    date: model.date,
  };
}