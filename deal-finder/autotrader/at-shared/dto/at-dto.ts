export interface IFieldValue {
    Value: string;
    Display: string;
}

export interface IFieldValues {
    FieldName: string;
    FieldValues: IFieldValue[];
}

export interface QueryParams {
    priceLow: number;
    priceHigh: number;
    yearLow: number;
    yearHigh: number;
    distLow: number;
    distHigh: number;
    make: string;
    model: string;
    bodyStyle: string;
    region: string;
    tranmissionStyle: string;
  }
  