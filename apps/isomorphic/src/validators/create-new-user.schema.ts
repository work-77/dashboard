import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateConfirmPassword, validateEmail, validatePassword } from './common-rules';

// form zod validation schema
export const createNewUserSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameIsRequired }),
  lastName: z.string().min(1, { message: messages.lastNameIsRequired }),
  email: validateEmail,
  role: z.string().min(1, { message: messages.roleIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
  phone: z.string().optional(),  //validate phone
  password: validatePassword,  
  confirmPassword:validateConfirmPassword,
});

// generate form types from zod validation schema
export type CreateNewUserInput = z.infer<typeof createNewUserSchema>;
