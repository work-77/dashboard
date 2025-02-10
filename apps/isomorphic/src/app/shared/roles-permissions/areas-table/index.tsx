'use client';

import { fetchAreas } from "@/data/backend-comms/database-communication";
import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import { useEffect, useState } from "react";

import Table from '@core/components/table';
import Filters from "./filters";
import TableFooter from "@core/components/table/footer";
import TablePagination from "@core/components/table/pagination";
import { areasColumns } from "./columns";
import { AreasDataType } from "../roles-permissions.types";

export default function AreasTable() {
const [areas, setAreas] = useState<AreasDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { table, setData } = useTanStackTable<AreasDataType>({
    tableData: areas,
    columnConfig: areasColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.area_id !== row.id));
          table.resetRowSelection();
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
          table.resetRowSelection();
        },
      },
      enableColumnResizing: false,
    },
  });


  useEffect(() => {
    const getAreas = async () => {
      try {
        const data = await fetchAreas();
        setAreas(data.data);
      } catch (error) {
        setError('Failed to fetch Areas');
      } finally {
        setLoading(false);
      }
    };
  
    getAreas();
    console.log(getAreas)
  }, []);



  useEffect(() => {
    setData(areas);
  }, [areas, setData]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div className="mt-14">
        <Filters table={table} />
        <Table
          table={table}
          variant="modern"
          classNames={{
            container: 'border border-muted rounded-md',
            rowClassName: 'last:border-0',
          }}
        />
        <TableFooter table={table} />
        <TablePagination table={table} className="py-4" />
      </div>
    );

}