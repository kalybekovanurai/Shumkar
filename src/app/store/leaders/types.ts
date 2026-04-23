export interface Leader {
  id: number;
  name: string;
  avatar: string;
  score: number;
  streak: number;
}

export interface LeadersState {
  leaders: Leader[];
  loading: boolean;
  error: string | null;
}
