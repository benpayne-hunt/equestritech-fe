export type Rider = {
  _id: string;
  foreName: string;
  surName: string;
  countryCode: string;
  sex: string;
  age: number;
  record: {
    [key: string]: number;
  }[];
  mountIds: string[];
  imageUrl: string;
}
