'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import { Input, Button, ActionIcon, Title, Select, Password } from 'rizzui';
import {
  CreateNewUserInput,
  createNewUserSchema,
} from '@/validators/create-new-user.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
  roles,
  userStatuses,
} from '@/app/shared/roles-permissions/utils';
export default function CreateNewUser() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CreateNewUserInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    const formattedData = {
      ...data,
      createdAt: new Date(),
    };
    setLoading(true);
    setTimeout(() => {
      console.log('formattedData', formattedData);
      setLoading(false);
      setReset({
        fullName: '',
        email: '',
        role: '',
        status: 'InActive',
        password: '',
        confirmPassword: '',
      });
      closeModal();
    }, 600);
  };

  return (
    <div className="min-w-[500px]">
    <Form<CreateNewUserInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createNewUserSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new User
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="First Name"
              placeholder="Enter user's First name"
              {...register('firstName')}
              className="col-span-half"
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              placeholder="Enter user's Last name"
              {...register('lastName')}
              className="col-span-half"
              error={errors.lastName?.message}
            />

            <Input
              label="Email"
              placeholder="Enter user's Email Address"
              className="col-span-full"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Phone Number"
              placeholder="Enter user's Phone Number"
              className="col-span-full"
              {...register('phone')}
            />

            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <Password
              label="Confirm Password"
              placeholder="Enter confirm password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            <Controller
              name="role"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={roles}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Role"
                  className="col-span-half"
                  error={errors?.status?.message}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected: string) =>
                    roles.find((option) => option.value === selected)?.label ??
                    selected
                  }
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              defaultValue='inactive'
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={userStatuses}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Status"
                  className="col-span-half"
                  error={errors?.status?.message}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected: string) =>
                    userStatuses.find((option) => option.value === selected)
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
                Create User
              </Button>
            </div>
          </>
        );
      }}
    </Form>
    </div>
  );
}
