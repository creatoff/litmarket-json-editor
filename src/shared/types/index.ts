export type Row = Record<Columns, string>;

export type State = {
  rows: Row[];
};

export type Columns = "name" | "value";
