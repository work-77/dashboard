import { ROLE } from '@/config/constants';
import { STATUS, PERMISSIONS, STATUSES } from '@/data/users-data';
import { PROJECT_STATUS, PROJECT_TYPE } from '@/data/projects-data';

export const statuses = Object.values(STATUSES).map((status) => ({
  label: status,
  value: status,
}));

export const permissions = Object.values(PERMISSIONS).map((permission) => ({
  label: permission,
  value: permission,
}));

export const roles = Object.entries(ROLE).map(([key, value]) => ({
  label: value,
  value: key,
}));

export const devStatuses=Object.values(STATUS).map((status)=> ({
  label: status,
  value: status,
}));

export const userStatuses=Object.values(STATUS).map((status)=> ({
  label: status,
  value: status,
}));

export const projectStatuses=Object.values(PROJECT_STATUS).map((status)=>({
  label:status,
  value:status,
}))

export const projectTypes=Object.values(PROJECT_TYPE).map((type)=>({
  label:type,
  value:type,
}))