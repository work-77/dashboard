'use client';

import { featuresData } from '@/data/projects-data';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { featuresColumns } from './columns';
import Table from '@core/components/table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';
import { useEffect, useState } from 'react';
import { fetchFeatures } from '@/data/backend-comms/database-communication';

export type FeaturesTableDataType = (typeof featuresData)[number];

export default function FeaturesTable() {
  const [features, setFeatures] = useState<FeaturesTableDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { table, setData } = useTanStackTable<FeaturesTableDataType>({
    tableData: features,
    columnConfig: featuresColumns,
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
      const getFeatures = async () => {
        try {
          const featuresData = await fetchFeatures();
          console.log('featuresData:',featuresData)
          setFeatures(featuresData.data);
        } catch (error) {
          setError('Failed to fetch features');
        } finally {
          setLoading(false);
        }
      };
    
      getFeatures();
    }, []);

  // Update table data when developers state changes
  useEffect(() => {
    setData(features);
  }, [features, setData]);

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
