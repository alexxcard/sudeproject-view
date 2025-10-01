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
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}



export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  estado: string;
  created_at: string;
  updated_at: string;
}

export interface Tarea {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  due_date: string;
}