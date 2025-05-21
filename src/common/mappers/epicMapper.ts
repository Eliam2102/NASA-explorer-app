import { EpicImage } from "../../domain/entidades/theme/epicTheme";
import { EpicImageResponse } from "../../data/models/themeEpic/epicModel";

export function mapEpicImageResponseToDomain(response: EpicImageResponse[]): EpicImage[] {
  return response.map((item) => ({
    id: item.identifier,
    date: item.date,
    imageName: item.image,
    caption: item.caption,
    centroidCoordinates: item.centroid_coordinates,
    dscovrPosition: item.dscovr_j2000_position,
    sunPosition: item.sun_j2000_position
  }));
}