'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import {
  CreateDevInput,
  createDevSchema,
} from '@/validators/create-developer.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
    devStatuses,
} from '@/app/shared/roles-permissions/utils';
import { developersData } from '@/data/projects-data';
import axios from 'axios';
import { API_URL2 as API_URL } from '@/config/constants';
import { addDeveloper } from '@/data/backend-comms/database-communication';

export default function CreateDeveloper() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface developer
    {
      id:string;
      name:string;
      phone_number: string;
      email:string;
      website:string;
      logo:string;
      description:string;
      status:string;
      createdAt:string;
    }

  const onSubmit: SubmitHandler<CreateDevInput> = async (data) => {
    // set timeout ony required to display loading state of the create category button
    const formattedData = {
      ...data,
      status: data.status || 'inactive',
      website: data.website || '',
      description: data.description || '',
    };
  
    setLoading(true);
    setError(null);
    try {
      const newDeveloper = await addDeveloper(formattedData);
      console.log('Developer added:', newDeveloper);
      // Optionally, update the UI or redirect the user
    } catch (error) {
      setError('Failed to add developer');
    } finally {
      setLoading(false);
      setReset({
        fullName: '',
        email: '',
        website: '',
        phone: '',
        logo: '',
        description: '',
        status: 'inactive',
      });
      closeModal();
    }
  };

  return (
    <div className="min-w-[500px]">
    <Form<CreateDevInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createDevSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new developer
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Full Name"
              placeholder="Enter developer's full name"
              {...register('name')}
              className="col-span-full"
              error={errors.name?.message}
            />

            <Input
              label="Email"
              placeholder="Enter developer's Email Address"
              className="col-span-full"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Website"
              placeholder="Enter developer's website"
              className="col-span-full"
              {...register('website')}
            />

            <Input
              label="Phone Number"
              placeholder="Enter developer's phone number"
              className="col-span-full"
              {...register('phone_number')}
              error={errors.phone_number?.message}
            />

            <Input
              label="Description"
              placeholder="..."
              className="col-span-full"
              {...register('description')}
            />

            <Controller
              name="status"
              control={control}
              defaultValue='inactive'
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={devStatuses}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Status"
                  getOptionValue={(option) => option.value}
                  displayValue={(selected: string) =>
                    devStatuses.find((option) => option.value === selected)
                      ?.label ?? ''
                  }
                  dropdownClassName="!z-[1] h-auto"
                  inPortal={false}
                />
              )}
            />

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={closeModal}
                className="w-full @xl:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                Create Developer
              </Button>
            </div>
          </>
        );
      }}
    </Form>
    </div>
  );
}
