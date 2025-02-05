'use client';

import { developersData } from '@/data/projects-data';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { devsColumns } from './columns';
import Table from '@core/components/table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';
import { useEffect, useState } from 'react';
import { fetchDevelopers } from '@/data/backend-comms/database-communication';

export type DevsTableDataType = (typeof developersData)[number];

export default function DevelopersTable() {
  const [developers, setDevelopers] = useState<DevsTableDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { table, setData } = useTanStackTable<DevsTableDataType>({
    tableData: developers,
    columnConfig: devsColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
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
    const getDevelopers = async () => {
      try {
        const data = await fetchDevelopers();
        setDevelopers(data.data);
      } catch (error) {
        setError('Failed to fetch developers');
      } finally {
        setLoading(false);
      }
    };
  
    getDevelopers();
  }, []);

  // Update table data when developers state changes
  useEffect(() => {
    setData(developers);
  }, [developers, setData]);

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
