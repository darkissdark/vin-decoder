export interface DecodeVinResultItem {
  VariableId: number;
  Variable: string;
  ValueId: string | null;
  Value: string | null;
}

export interface DecodeVinResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: DecodeVinResultItem[];
}

export interface VehicleVariable {
  ID: number;
  Name: string;
  Description: string;
  GroupName: string | null;
}

export interface VehicleVariablesResponse {
  Count: number;
  Message: string;
  SearchCriteria: null;
  Results: VehicleVariable[];
}

export interface VehicleVariableValue {
  Id: number;
  Name: string;
}

export interface VehicleVariableValuesResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleVariableValue[];
}
