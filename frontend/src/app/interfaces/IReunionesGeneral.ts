export interface IReunionesGeneral {
    id: string;
    estado: string;
    nombre_alumno: string | null;
    apellidos_alumno: string | null;
    nombre_profesor: string | null;
    apellidos_profesor: string | null;
    id_centro: number;
    titulo: string;
    asunto: string;
    aula: string;
    fecha: Date;
  }
  