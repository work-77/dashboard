'use client';

import { Badge, Box, Button, Flex, Input, Text, Title } from 'rizzui';
import StatusField from '@core/components/controlled-table/status-field';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { PiMagnifyingGlassBold, PiTrashDuotone } from 'react-icons/pi';
import ModalButton from '@/app/shared/modal-button';
import { PROJECT_STATUS } from '@/data/projects-data';
import CreateProject from '../create-project';


interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
}

export default function Filters<TData extends Record<string, any>>({
  table,
}: TableToolbarProps<TData>) {
  const isFiltered =
    table.getState().globalFilter || table.getState().columnFilters.length > 0;
  return (
    <Box className="mb-4 @container">
      <Flex
        gap="3"
        align="center"
        justify="between"
        className="w-full flex-wrap @4xl:flex-nowrap"
      >
        <Title
          as="h3"
          className="rizzui-title-h3 order-1 whitespace-nowrap pe-4 text-base font-semibold sm:text-lg"
        >
          Locations
        </Title>
        
        <Input
          type="search"
          clearable={true}
          placeholder="Search for locations..."
          value={table.getState().globalFilter ?? ''}
          onClear={() => table.setGlobalFilter('')}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
          className="order-3 h-9 w-full @2xl:order-2 @2xl:ms-auto @2xl:h-auto @2xl:max-w-60 @4xl:order-3"
        />
        <Box className="order-2 ms-4 @2xl:order-3 @2xl:ms-0 @4xl:order-4 @4xl:shrink-0">
          <ModalButton
            label="Add New Location"
            view={<CreateProject />}
            customSize="600px"
            className="mt-0"
          />
        </Box>
      </Flex>
    </Box>
  );
}

function renderOptionDisplayValue(value: string) {
  switch (value) {
    case PROJECT_STATUS.Ongoing:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      );
    case PROJECT_STATUS.Upcoming:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            {value}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-orange-dark" />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            {value}
          </Text>
        </div>
      );
  }
}
