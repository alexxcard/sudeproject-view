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
