export interface IReuniones {
  id_reunion:  number;
  estado:      string;
  estado_eus:  null;
  profesor_id: number;
  alumno_id:   number;
  id_centro:   string;
  titulo:      string;
  asunto:      string;
  aula:        string;
  fecha:       Date;
}
