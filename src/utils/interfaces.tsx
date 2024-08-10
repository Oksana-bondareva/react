export interface ResultItem {
  name: string;
  mass: string;
  height: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

export interface ResultItems {
  data: ResultItem[];
}

export interface PeopleData {
  results: ResultItem[];
  count: number;
  next: string | null;
  previous: string | null;
}
