'use client';

import { projectsData, locationsData } from '@/data/projects-data';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { projectsColumns } from './columns';
import Table from '@core/components/table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';
import { useEffect, useState } from 'react';
import { DevsTableDataType} from '../developers-table';
import { fetchDevelopers, fetchLocations, fetchProjects } from '@/data/backend-comms/database-communication';

export type ProjectsTableDataType = (typeof projectsData)[number];
export type LocationDataType = (typeof locationsData)[number];

export default function ProjectsTable() {
  const [projects, setProjects] = useState<ProjectsTableDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { table, setData } = useTanStackTable<ProjectsTableDataType>({
    tableData: projects,
    columnConfig: projectsColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.project_id !== row.project_id));
          table.resetRowSelection();
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
          table.resetRowSelection();
        },
        
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
      const getProjects = async () => {
        try {
          const projectsData = await fetchProjects();
          getDevelopers(projectsData.data);
        } catch (error) {
          setError('Failed to fetch projects');
        }
      };

      const getDevelopers = async (projectsData: ProjectsTableDataType[]) => {
        try {
          const developersData = await fetchDevelopers();
          //const developersMap = new Map(developersData.data.map((dev: DevsTableDataType) => [dev.id, dev.name]));
          const updatedProjects = projectsData.map((project: ProjectsTableDataType) => {
            const developer = developersData.data.find((dev: DevsTableDataType) => dev.id === project.developer_id);
            return {
              ...project,
              developer_name: developer.name ? developer.name : 'Unknown Developer',
            };
          });
          getLocations(updatedProjects);
        } catch (devsError) {
          setError('Failed to fetch developers');
        } 
      };

      const getLocations=async (projectsData: ProjectsTableDataType[]) => {
        try {
          const locationsData = await fetchLocations();
          const updatedProjects = projectsData.map((project: ProjectsTableDataType) => {
            const location = locationsData.data.find((location: LocationDataType) => location.location_id === project.location_id);
            return {
              ...project,
              location_desc: location.description ? location.description : 'Unknown Location',
            };
          });
          setProjects(updatedProjects);
        }
        catch (locsError){
          setError('Failed to fetch locations');
        }
        finally {
          setLoading(false);
        }
      };
    
      getProjects();
    }, []);

  // Update table data when developers state changes
  useEffect(() => {
    setData(projects);
  }, [projects, setData]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-14">
      <Filters table={table} />
      <Table
        table={table}
        variant="modern"
        classNames={{
          container: 'border border-muted rounded-md',
          rowClassName: 'last:border-0',
        }}
      />
      <TableFooter table={table} />
      <TablePagination table={table} className="py-4" />
    </div>
  );
}
