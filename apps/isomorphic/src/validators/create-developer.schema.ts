import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from './common-rules';
import { defaultValues } from '@/app/shared/ecommerce/order/order-form/form-utils';

// form zod validation schema
export const createDevSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  email: validateEmail,
  website: z.string().optional(),  //validate site
  phone_number: z.string().min(1, { message: messages.phoneNumberIsRequired }),  //validate phone
  description: z.string().optional(),
  status: z.string().optional(),
});

// generate form types from zod validation schema
export type CreateDevInput = z.infer<typeof createDevSchema>;
