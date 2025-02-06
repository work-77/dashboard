'use client';

import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import { Badge, Checkbox, Flex } from 'rizzui';
import { FeaturesTableDataType } from '.';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import { getFormattedDateString } from '@core/utils/get-formatted-date';

const columnHelper = createColumnHelper<FeaturesTableDataType>();

export const featuresColumns = [
  columnHelper.display({
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select all Rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select Row"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
  columnHelper.display({
    id: 'id',
    size: 100,
    header: 'Feature ID',
    cell: ({ row }) => <>#{row.original.id}</>,
  }),
  columnHelper.accessor('name', {
    id: 'name',
    size: 300,
    header: 'Name',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={""}
        name={row.original.name}
      />
    ),
  }),
  
  columnHelper.display({
    id: 'action',
    size: 140,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <TableRowActionGroup
        id={row.original.id} 
        baseRoute="features"
        deletePopoverTitle={`Delete this feature`}
        deletePopoverDescription={`Are you sure you want to delete this #${row.original.id} project?`}
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];
