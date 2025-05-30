export interface Routine {
  id: number;
  name: string;
  type: string;
  difficulty: string;
  duration: string;
  description?: string;
  goal?: string;
  workouts: any[];
  schedule?: Record<string, number>;
}
