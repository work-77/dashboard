'use client';

import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import { Badge, Checkbox, Flex } from 'rizzui';
import { ProjectsTableDataType } from '.';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import { getFormattedDateString } from '@core/utils/get-formatted-date';

const columnHelper = createColumnHelper<ProjectsTableDataType>();

export const projectsColumns = [
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
    id: 'project_id',
    size: 100,
    header: 'Project ID',
    cell: ({ row }) => <>#{row.original.project_id}</>,
  }),
  columnHelper.accessor('project_name', {
    id: 'project_name',
    size: 300,
    header: 'Name',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={""}
        name={row.original.project_name}
      />
    ),
  }),
  columnHelper.display({
    id: 'developer_name',
    size: 100,
    header: 'Developer',
    cell: ({ row }) => row.original.developer_name,
  }),
  columnHelper.display({
    id: 'project_type',
    size: 100,
    header: 'Project Type',
    cell: ({ row }) => getStatusBadge(row.original.project_type),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 150,
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
  columnHelper.display({
    id: 'location_id',
    size: 300,
    header: 'Location',
    cell: ({ row }) => row.original.location_desc,
  }),
  columnHelper.display({
    id: 'available_units',
    size: 100,
    header: 'Available Units',
    cell: ({ row }) => row.original.available_units,
  }),
  columnHelper.display({
    id: 'total_units',
    size: 100,
    header: 'Total Units',
    cell: ({ row }) => row.original.total_units,
  }),
  columnHelper.display({
    id: 'description',
    size: 300,
    header: 'Description',
    cell: ({ row }) => row.original.description,
  }),
  columnHelper.display({
    id: 'milestones',
    size: 250,
    header: 'Milestones',
    cell: ({ row }) => row.original.milestones.length > 0 ? (
      <Flex align="center" gap="1">
        {row.original.milestones.map((milestone) => (
          <Badge
            rounded="lg"
            key={milestone.milestone_id}
            variant="outline"
            className="border-muted font-normal text-gray-500"
          >
            {milestone.milestone_name} {":"} {milestone.status}
          </Badge>
        ))}
      </Flex>
    ) : "None",
  }),
  columnHelper.display({
    id: 'features',
    size: 250,
    header: 'Features',
    cell: ({ row }) => row.original.milestones.length > 0 ? (
      <Flex align="center" gap="1">
        {row.original.features.map((feature) => (
          <Badge
            rounded="lg"
            key={feature.feature_id}
            variant="outline"
            className="border-muted font-normal text-gray-500"
          >
            {feature.feature_name}
          </Badge>
        ))}
      </Flex>
    ) : "None",
  }),
  columnHelper.display({
    id: 'launch_date',
    size: 100,
    header: 'Launch Date',
    cell: ({ row }) => getFormattedDateString(row.original.launch_date),
  }),
  columnHelper.display({
    id: 'completion_date',
    size: 100,
    header: 'Completion Date',
    cell: ({ row }) => getFormattedDateString(row.original.completion_date),
  }),
  columnHelper.display({
    id: 'price_range',
    size: 100,
    header: 'Price Range',
    cell: ({ row }) => row.original.price_range,
  }),
  columnHelper.display({
    id: 'price_range_SQ',
    size: 100,
    header: 'Price Range SQ',
    cell: ({ row }) => row.original.price_range_SQ,
  }),
  columnHelper.display({
    id: 'project_size',
    size: 100,
    header: 'Project Size',
    cell: ({ row }) => row.original.project_size,
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
        deletePopoverTitle={`Delete this project`}
        deletePopoverDescription={`Are you sure you want to delete this #${row.original.project_id} project?`}
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];
