export interface IReunionesAlumno {
  id: string;
  estado: string;
  nombre_profesor: string | null;
  apellidos_profesor: string | null;
  id_centro: string;
  titulo: string;
  asunto: string;
  aula: string;
  fecha: Date;
}
