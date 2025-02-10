import TableRowActionGroup from "@core/components/table-utils/table-row-action-group"
import { createColumnHelper } from "@tanstack/react-table"
//import { AreasTableDataType } from ".";
import { Badge, Checkbox, Flex } from 'rizzui';
import AvatarCard from "@core/ui/avatar-card";
import EditArea from "../edit-area";
import { AreasDataType } from "../roles-permissions.types";

const columnHelper = createColumnHelper<AreasDataType>();

export const areasColumns = [
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
    cell: ({ row }) => <>#{row.original.area_id}</>,
  }),
  columnHelper.accessor('area_name', {
    id: 'fullName',
    size: 250,
    header: 'Name',
    enableSorting: false,
    cell: ({ row }) => (
      // <AvatarCard
      //   //src={row.original.logo}
      //   name={row.original.area_name}
      //   //description={row.original.email}
      // />
      <p>{row.original.area_name}</p>
    ),
  }),
  columnHelper.accessor('region', {
    id: 'region',
    size: 150,
    header: 'region',
    enableSorting: false,
    cell: ({ row }) => row.original.region,
  }),
  columnHelper.accessor('latitude', {
    id: 'latitude',
    size: 150,
    header: 'latitude',
    enableSorting: false,
    cell: ({ row }) =>row.original.latitude,
  }),
  columnHelper.accessor('longitude', {
    id: 'longitude',
    size: 150,
    header: 'longitude',
    enableSorting: false,
    cell: ({ row }) => row.original.longitude,
  }),
  columnHelper.accessor('description', {
    id: 'desc',
    size: 300,
    header: 'Description',
    enableSorting: false,
    cell: ({ row }) => row.original.description,
  }),
  columnHelper.accessor('population', {
    id: 'population',
    size: 150,
    header: 'population',
    enableSorting: false,
    cell: ({ row }) => row.original.population
  }),
  columnHelper.accessor('major_landmarks', {
    id: 'major_landmarks',
    size: 200,
    header: 'major_landmarks',
    enableSorting: false,
    cell: ({ row }) => row.original.major_landmarks
  }),
  columnHelper.accessor('dld_area_id', {
    id: 'dld_area_id',
    size: 150,
    header: 'dld_area_id',
    enableSorting: false,
    cell: ({ row }) => row.original.dld_area_id
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
        id={row.original.area_id}
        viewComponent={<EditArea  areaId={row.original.area_id} />}
        baseRoute="areas"
        deletePopoverTitle={`Delete this developer`}
        deletePopoverDescription={`Are you sure you want to delete this #${row.original.area_id} developer?`}
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
]