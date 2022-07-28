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

export interface selectedPref {
  code: number;
  name: string;
}

export class selectedPrefData implements selectedPref {
  constructor(public code: number, public name: string) {
    this.code = code;
    this.name = name;
  }
}
