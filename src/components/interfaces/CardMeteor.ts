export interface MeteorCardProps {
    name: string;
    approachDate: string; // Cambiar `date` por `approachDate`
    diameterMin: number; // Cambiar `diameter` por `diameterMin`
    diameterMax: number; // Cambiar `diameter` por `diameterMax`
    velocity?: number; // Opcional si es necesario
    isHazardous: boolean;
    onPress: () => void;
  }
  