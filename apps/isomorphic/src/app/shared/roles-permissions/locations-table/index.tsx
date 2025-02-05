'use client';

import { locationsData } from '@/data/projects-data';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { locationsColumns } from './columns';
import Table from '@core/components/table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';
import { useEffect, useState } from 'react';
import { fetchFeatures, fetchLocations } from '@/data/backend-comms/database-communication';

export type LocationsTableDataType = (typeof locationsData)[number];

export default function LocationsTable() {
  const [locations, setLocations] = useState<LocationsTableDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { table, setData } = useTanStackTable<LocationsTableDataType>({
    tableData: locations,
    columnConfig: locationsColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.location_id !== row.location_id));
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
      const getLocations = async () => {
        try {
          const locationsData = await fetchLocations();
          setLocations(locationsData.data);
        } catch (error) {
          setError('Failed to fetch locations');
        } finally {
          setLoading(false);
        }
      };
    
      getLocations();
    }, []);

  // Update table data when developers state changes
  useEffect(() => {
    setData(locations);
  }, [locations, setData]);

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
