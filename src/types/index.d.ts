export type ProfileProps = {
  session: string | undefined;
  name: string | undefined;
};

export type RowDataPriority = {
  priority: "Critical" | "High" | "Medium" | "Low";
};

export type RowDataStatus = {
  status: "Open" | "In Progress" | "Closed";
};
