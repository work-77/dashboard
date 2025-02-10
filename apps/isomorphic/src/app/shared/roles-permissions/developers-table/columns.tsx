'use client';

import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import { Badge, Checkbox, Flex } from 'rizzui';
import { DevsTableDataType } from '.';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import { getFormattedDateString } from '@core/utils/get-formatted-date';
import EditDeveloper from '../edit-developer';
import { DeveloperDataType } from '../roles-permissions.types';

const columnHelper = createColumnHelper<DeveloperDataType>();

export const devsColumns = [
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
    header: 'ID',
    cell: ({ row }) => <>#{row.original.developer_id}</>,
  }),
  columnHelper.accessor('name', {
    id: 'fullName',
    size: 300,
    header: 'Name',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.logo}
        name={row.original.name}
        description={row.original.email}
      />
    ),
  }),
  columnHelper.accessor('phone_number', {
    id: 'phone',
    size: 150,
    header: 'phone',
    cell: ({ row }) => {
      row.original.phone_number
      console.log('row', row)
    },
  }),
  columnHelper.accessor('website', {
    id: 'website',
    size: 150,
    header: 'Website',
    enableSorting: false,
    cell: ({ row }) =>row.original.website,
  }),
  columnHelper.accessor('description', {
    id: 'desc',
    size: 300,
    header: 'Description',
    enableSorting: false,
    cell: ({ row }) => row.original.description,
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 150,
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
  columnHelper.accessor('created_at', {
    id: 'createdAt',
    size: 200,
    header: 'Created',
    cell: ({ row }) =>{
      console.log('rrrrrrrrrrrrrrrrr',row) 
      getFormattedDateString(row.original.created_at)}
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
        id={row.original.developer_id} 
        viewComponent={<EditDeveloper  developerId={row.original.developer_id} />}
        baseRoute="re-developers"
        deletePopoverTitle={`Delete this developer`}
        deletePopoverDescription={`Are you sure you want to delete this #${row.original.developer_id} developer?`}
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];
