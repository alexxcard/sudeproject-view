"use client";
import { TableProps } from "@/interface";
import React from "react";

export default function Table<T extends { id?: string | number }>({
  dataSource,
  columns,
  loading,
  selectedRowKeys,
  setSelectedRowKeys,
  pagination,
}: TableProps<T>) {
  const toggleSelect = (id: string | number) => {
    if (!setSelectedRowKeys) return;
    const newKeys = selectedRowKeys?.includes(id)
      ? selectedRowKeys.filter((k) => k !== id)
      : [...(selectedRowKeys || []), id];
    setSelectedRowKeys(newKeys);
  };

  return (
    <div className="relative w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {setSelectedRowKeys && <th className="p-2 w-10"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-2 text-left whitespace-nowrap border-b border-gray-200"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((record, index) => {
            const id = record.id || index;
            const isSelected = selectedRowKeys?.includes(id);

            return (
              <tr
                key={id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                {setSelectedRowKeys && (
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(id)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="p-2 whitespace-nowrap border-b border-gray-200"
                  >
                    {col.render ? col.render(record) : (record as any)[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {pagination && (
        <div className="flex justify-end items-center mt-2 space-x-2 text-sm">
          <button
            disabled={pagination.current === 1}
            onClick={() => pagination.onChange(pagination.current - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {pagination.current} de{" "}
            {Math.ceil(pagination.total / pagination.pageSize)}
          </span>
          <button
            disabled={
              pagination.current >=
              Math.ceil(pagination.total / pagination.pageSize)
            }
            onClick={() => pagination.onChange(pagination.current + 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
