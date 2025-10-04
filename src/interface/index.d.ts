export interface LoginFormValues {
  username: string;
  password: string;
}

export interface TableProps<T> {
  dataSource: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectedRowKeys?: (string | number)[];
  setSelectedRowKeys?: (keys: (string | number)[]) => void;
  pagination?: {
    pageSize: number;
    current: number;
    total: number;
    onChange: (page: number) => void;
  };
}

// src/interface/index.ts
export interface NewIncidencia {
  title: string;
  description: string;
  status: "Open" | "Assigned" | "Resolved" | "Closed";
  priority: "High" | "Medium" | "Low";
  project_id: string;   // ID del proyecto
  reporter_id: string;  // ID del usuario que reporta
  assignee_id?: string | null; // ID del usuario asignado
}




// src/interface/proyecto.ts
export interface Proyecto {
  id: string;
  name: string;
  description: string;
  created_at: string;
  owner: string;         
  members: string[];     
  status?: string;
}
interface ProyectoConNombres extends Proyecto {
  ownerName: string;
  membersNames: string;
  reporterName: string;
  assigneeName: string;
}




export interface TareaBackend {
  id: string;
  title: string;
  description: string;
  status: "Pending" | "InProgress" | "InReview" | "Done";
  priority: "High" | "Medium" | "Low";
  project: { name: string };                       
  assignee: { username: string } | null;           
  sprint: { name: string } | null;                 
  parent: { title: string } | null;                
  dependencies: { title: string }[];     
  created_at: string;         
  updated_at: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  role: string;
  estado: "Activo" | "Inactivo";
}