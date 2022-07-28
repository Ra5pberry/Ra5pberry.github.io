export interface PrefData {
  prefCode: number;
  prefName: string;
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

export interface ChartDataSet {
  label: string;
  data: number[];
}

export class Datasets implements ChartDataSet {
  constructor(public label: string, public data: number[]) {
    this.label = label;
    this.data = data;
  }
}
