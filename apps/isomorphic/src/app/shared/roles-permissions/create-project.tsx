'use client';

import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import {
  CreateProjectInput,
  createProjectSchema,
} from '@/validators/create-project.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
    projectStatuses, projectTypes
} from '@/app/shared/roles-permissions/utils';
import { projectsData, developersData } from '@/data/projects-data';
import { fetchDevelopers, fetchLocations } from '@/data/backend-comms/database-communication';
import { addProject } from '@/data/backend-comms/database-communication';

export default function CreateProject() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [developers, setDevelopers] = useState([{label: '', value: ''}]);
  const [locations, setLocations] = useState([{label: '', value: ''}]);
  const [error, setError] = useState("");

  // TEMPORARLY GET DEVELOPER NAMES & LOCATIONS THROUGH API, 
  // SHOULD BE REMOVED AND SHOULD RECEIVE THE DATA FROM THE PARENT
  // COMPONENT WHEN THEY ARE SENT PROPERLY FROM THE BACKEND API!
  useEffect(() => {
    const getDevs = async ()=> {
      try {
        const developersData = await fetchDevelopers();
        const names=Object.values(developersData.data).map((dev: typeof developersData.data[0])=> ({
          label: dev.name? dev.name : '',
          value: dev.id? dev.id : '',
        }));

        setDevelopers(names);
      } catch (error) {
        setError('Failed to fetch developers');
      } finally{
        getLocations();
      }
    };

    const getLocations = async ()=> {
      try {
        const locationsData = await fetchLocations();
        const locs=Object.values(locationsData.data).map((loc: typeof locationsData.data[0])=> ({
          label: loc.description? loc.description : '',
          value: loc.location_id? loc.id : '',
        }));
        
        setLocations(locs);
      } catch (error) {
        setError('Failed to fetch locations');
      } 
    };

    getDevs();
  }, []);

  const onSubmit: SubmitHandler<CreateProjectInput> = async (data) => { 
    setLoading(true);
    setError("");
    try {
      const newProject = await addProject(data);
      console.log('Developer added:', newProject);
      // Optionally, update the UI or redirect the user
    } catch (error) {
      setError('Failed to add developer');
    }

    setLoading(true);
    console.log('formattedData', data);
    setLoading(false);
    setReset({
      name: '',
      description: '',
      project_type: '',
      project_size: '',
      total_units: '',
      available_units: '',
      launch_date: '',
      completion_date: '',
    });
    closeModal();
  };

  return (
    <div className="min-w-[500px]">
    <Form<CreateProjectInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createProjectSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new project
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Project Name"
              placeholder="Enter project's full name"
              {...register('name')}
              className="col-span-full"
              error={errors.name?.message}
            />
            <Input
              label="Description"
              placeholder="Enter project's description"
              className="col-span-full"
              {...register('description')}
              error={errors.description?.message}
            />

            <Controller
              name="location_id"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  className="col-span-full"
                  options={locations}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Location"
                  getOptionValue={(option) => option.value}
                  displayValue={(selected: string) =>
                    developers.find((option) => option.value === selected)
                      ?.label ?? ''
                  }
                  dropdownClassName="!z-[1] h-auto"
                  inPortal={false}
                />
                )}
              />

            <Controller
              name="developer_id"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={developers}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Developer"
                  getOptionValue={(option) => option.value}
                  displayValue={(selected: string) =>
                    developers.find((option) => option.value === selected)
                      ?.label ?? ''
                  }
                  dropdownClassName="!z-[1] h-auto"
                  inPortal={false}
                />
                )}
              />

              <Controller
              name="status"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={projectStatuses}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Status"
                  getOptionValue={(option) => option.value}
                  displayValue={(selected: string) =>
                    projectStatuses.find((option) => option.value === selected)
                      ?.label ?? ''
                  }
                  dropdownClassName="!z-[1] h-auto"
                  inPortal={false}
                />
              )}
            />

            <Controller
              name="project_type"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={projectTypes}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Type"
                  getOptionValue={(option) => option.value}
                  displayValue={(selected: string) =>
                    projectTypes.find((option) => option.value === selected)
                      ?.label ?? ''
                  }
                  dropdownClassName="!z-[1] h-auto"
                  inPortal={false}
                />
              )}
            />

            <Input
              label="Size"
              placeholder="Enter project's size"
              type='number'
              {...register('project_size')}
              error={errors.project_size?.message}
            />
            <Input
              label="Total Units"
              placeholder="Enter project's total number of units"
              type='number'
              {...register('total_units')}
              error={errors.total_units?.message}
            />
            <Input
              label="Available Units"
              placeholder="Enter project's available number of units"
              type='number'
              {...register('available_units')}
              error={errors.available_units?.message}
            />
            <Input
              label="Launch Date"
              placeholder="Enter project's launch date"
              className="col-span-full"
              type='date'
              {...register('launch_date')}
              error={errors.launch_date?.message}
            />
            <Input
              label="Completion Date"
              placeholder="Enter project's completion date"
              className="col-span-full"
              type='date'
              {...register('completion_date')}
              error={errors.completion_date?.message}
            />

            {/* <Input
              label="Email"
              placeholder="Enter project's Email Address"
              className="col-span-full"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Website"
              placeholder="Enter project's website"
              className="col-span-full"
              {...register('website')}
            />

            <Input
              label="Phone Number"
              placeholder="Enter project's phone number"
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
              defaultValue='InActive'
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
            /> */}

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
                Create Project
              </Button>
            </div>
          </>
        );
      }}
    </Form>
    </div>
  );
}
