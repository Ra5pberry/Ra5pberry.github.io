export interface PrefData {
  result: {
    prefCode: number;
    prefName: string;
  };
}

export interface PopulationData {
  boundaryYear: number;
  data: {
    label: string;
    data: GraphData[];
  };
}

export interface GraphData {
  value: number;
  year: number;
}
