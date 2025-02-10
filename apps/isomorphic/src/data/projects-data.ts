import { STATUS } from "./users-data";

export const PROJECT_STATUS = {
  Upcoming: 'upcoming',
  Ongoing: 'ongoing',
  Completed: 'completed',
} as const;

export const PROJECT_TYPE = {
  Residential: 'residential',
  Commercial: 'commercial',
  MixedUse: 'mixeduse',
} as const;

export const developersData = [
  {
    id:'010',
    name:'Hamada Sokkar',
    phone_number:'0102431570',
    email:'example1@gmail.com',
    website:'https://example.com',
    logo:'https://example.com/photo',
    description:'...',
    status:STATUS.Active,
    created_at:'1/13/2025'
  },
  {
    id:'020',
    name:'Mohamed Ayman',
    phone_number:'0102431570',
    email:'example2@gmail.com',
    website:'https://example.com',
    logo:'https://example.com/photo',
    description:'...',
    status:STATUS.InActive,
    created_at:'1/13/2025'
  },
];

export const locationsData=[
  {
    location_id:"1",
    description:"best spot in town",
  },
];

export const featuresData=[
  {
    id: 1,
    name: "Amusement Park, Dining Outlets, Green Surrounding, Gymnasium, Health Care Centre, Kids Play Area, Parking Facility, Parks and Leisure Areas, Restaurants, Retail Outlets, Swimming Pool, Tennis Courts",
    is_amenity: 1,
    created_at: "2025-01-26T12:38:08.000000Z",
    updated_at: "2025-01-26T12:38:08.000000Z",
  },
] ;

export const projectsData=[
  {
    project_id: "1",
    developer_id: "1",
    developer_name:"",
    location_id: "1",
    location_desc:"",
    project_name: "Salamarise Villas",
    project_type: PROJECT_TYPE.Residential,
    total_units: 100,
    available_units: 50,
    launch_date: "2025-01-01",
    completion_date: "2026-01-01",
    status: PROJECT_STATUS.Ongoing,
    price_range: "$100,000 - $300,000",
    price_range_SQ: "$200 - $600",
    description: "A luxurious residential project offering modern amenities.",
    project_size: "50000 sq ft",
    milestones:[
      {
        milestone_id: 1,
        project_id: 1,
        milestone_name: "Example1",
        description: "Introducing The Crest at Sobha Hartland: Caribbean-inspired waterfront living with stunning views and world-class amenities.",
        status: "in_progress",
        actual_start_date: "2022-02-01",
        actual_end_date: null,
        planned_start_date: "2022-02-01",
        planned_end_date: "2025-07-29",
        completion_percentage: "51.64",
        deleted_at: null,
        created_at: "2025-01-27T08:43:28.000000Z",
        updated_at: "2025-01-27T08:43:28.000000Z",
      },
    ],
    features:[
      {
        feature_id: 10,
        feature_name: "Expert Engineering & Green Living",
        is_amenity: 1,
        created_at: "2025-01-27T08:43:28.000000Z",
        updated_at: "2025-01-27T08:43:28.000000Z",
        deleted_at: null,
        pivot: {
          project_id: 1,
          feature_id: 10
        },
      },
    ],
  }
];