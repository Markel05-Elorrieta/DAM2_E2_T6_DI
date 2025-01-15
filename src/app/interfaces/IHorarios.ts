export interface IHorarios {
  dia:       Dia;
  hora:      string;
  profe_id:  number;
  modulo_id: number;
}

export enum Dia {
  JO = "J/O",
  LA = "L/A",
  MA = "M/A",
  VO = "V/O",
  X = "X",
}
