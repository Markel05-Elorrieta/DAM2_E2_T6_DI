export interface IUser {
  id:        number;
  email:     string;
  username:  string;
  password:  string;
  nombre:    string;
  apellidos: string;
  dni:       string;
  direccion: string;
  telefono1: number | null;
  telefono2: number | null;
  tipo_id:   number;
  argazkia:  Argazkia | null;
}

export interface Argazkia {
  type: string;
  data: Uint8Array;
}
