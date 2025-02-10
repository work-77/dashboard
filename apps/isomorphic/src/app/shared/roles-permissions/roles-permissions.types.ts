//Areas type
export type AreasDataType = {
    dld_area_id: number;
    area_id: number;
    area_name: string;
    region: string;
    latitude: string;
    longitude: string;
    description: string;
    population: number;
    major_landmarks: string;
};

//Developer type
export type DeveloperDataType = {
    id: string;
    name: string;
    phone_number: string;
    email: string;
    website?: string;
    logo: string;
    description?: string;
    status: string;
    created_at: string;
}

//Locations type
export type locationsDataType = {
    location_id: number,
    description: string,
}

// //Features type
// export type featuresDataType = {
//     id: number,
//     name: string,
//     is_amenity: number,
//     created_at: string,
//     updated_at: string,
// }

export enum PROJECT_TYPE {
    Residential = "Residential",
    Commercial = "Commercial",
    MixedUse = "Mixed Use",
}

export enum PROJECT_STATUS {
    Ongoing = "Ongoing",
    Completed = "Completed",
    Upcoming = "Upcoming",
}

//Milestone type
export type MilestoneDataType = {
    milestone_id: number;
    project_id: number;
    milestone_name: string;
    description: string;
    status: string;
    actual_start_date: string | null;
    actual_end_date: string | null;
    planned_start_date: string;
    planned_end_date: string;
    completion_percentage: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
};

//Feature type
export type FeatureDataType = {
    feature_id: number;
    feature_name: string;
    is_amenity: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    pivot: {
        project_id: number;
        feature_id: number;
    };
};

// Project type
export type ProjectDataType = {
    project_id: string;
    developer_id: string;
    developer_name: string;
    location_id: string;
    location_desc: string;
    project_name: string;
    project_type: PROJECT_TYPE;
    total_units: number;
    available_units: number;
    launch_date: string;
    completion_date: string;
    status: PROJECT_STATUS;
    price_range: string;
    price_range_SQ: string;
    description: string;
    project_size: string;
    milestones: MilestoneDataType[];
    features: FeatureDataType[];
};

//Reviews type
export type ReviewsDataType = {

};


//DldAreas type
export type DldAreasDataType = {

};

//Charts type
export type ChartsDataType = {

};

//Address type
export const AddressDataType = {

}

//Reservations type 
export const ReservationsDataType = {

}