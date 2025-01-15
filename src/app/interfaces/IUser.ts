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
  telefono2: null;
  tipo_id:   number;
  argazkia:  null;
}
