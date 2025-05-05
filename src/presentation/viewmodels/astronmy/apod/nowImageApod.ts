import { useState, useEffect } from "react";
import { GetItemsApods } from "../../../../data/service/astronomy/apod/apoService";

export function useApodViewModelImage(fecha: string) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("✅ Hook useApodViewModelImage está siendo importado");
  const fetchApod = async () => {
    try {
      setLoading(true);
      const service = new GetItemsApods();
      const data = await service.fetchItemsApod(fecha);
      setImageUrl(data.url);
    } catch (error) {
      console.error("Error al obtener imagen APOD", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fecha) {
      fetchApod(); 
    }
  }, [fecha]);

  return { imageUrl, loading };
}