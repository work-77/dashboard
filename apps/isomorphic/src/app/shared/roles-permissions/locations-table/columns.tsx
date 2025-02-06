'use client';

import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import { Badge, Checkbox, Flex } from 'rizzui';
import { LocationsTableDataType } from '.';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import { getFormattedDateString } from '@core/utils/get-formatted-date';

const columnHelper = createColumnHelper<LocationsTableDataType>();

export const locationsColumns = [
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
    id: 'location_id',
    size: 100,
    header: 'Location ID',
    cell: ({ row }) => <>#{row.original.location_id}</>,
  }),
  columnHelper.accessor('description', {
    id: 'description',
    size: 300,
    header: 'Description',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={""}
        name={row.original.description}
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
      id={row.original.location_id}
      baseRoute="locations" 
        deletePopoverTitle={`Delete this location`}
        deletePopoverDescription={`Are you sure you want to delete this #${row.original.location_id} project?`}
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];
