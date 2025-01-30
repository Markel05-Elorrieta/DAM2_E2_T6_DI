export interface IReunionesProfesor {
  id: string;
  estado: string;
  nombre_alumno: string | null;
  apellidos_alumno: string | null;
  id_centro: number;
  titulo: string;
  asunto: string;
  aula: string;
  fecha: Date;
}
