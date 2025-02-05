import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createProjectSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  developer_id: z.number(),
  location_id: z.number(),
  project_type:z.string(),
  total_units:z.string(),
  available_units:z.string(),
  launch_date:z.string(),
  completion_date:z.string(),
  status:z.string(),
  description:z.string(),
  project_size:z.string(),
  milestones:z.array(z.string()).optional(),
  features:z.array(z.string()).optional(),
});

// generate form types from zod validation schema
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
