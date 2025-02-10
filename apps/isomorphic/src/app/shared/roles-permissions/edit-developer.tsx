"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { fetchAreaDetails } from "@/data/backend-comms/database-communication";

const API_URL = "http://192.168.1.119/realstateproject/public/api/dashboard";

export default function EditDeveloper({ developerId }: { developerId: number }) {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    area_name: "",
    region: "",
    latitude: "",
    longitude: "",
    description: "",
    population: "",
    major_landmarks: "",
  });

  useEffect(() => {
    const getAreaDetails = async () => {
      try {
        const response = await fetchAreaDetails(developerId); 
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching area details:", error);
      } finally {
        setLoading(false);
      }
    };
  
    getAreaDetails();
  }, [developerId]);
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}//${developerId}`, formData);
      alert("Area updated successfully!");
    } catch (error) {
      console.error("Error updating area:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Edit Area: {formData.area_name}</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="area_name" className="block text-sm font-medium text-gray-700">
          Area Name
        </label>
        <input
          id="area_name"
          name="area_name"
          value={formData.area_name}
          onChange={handleChange}
          placeholder="Enter area name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
          Region
        </label>
        <input
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          placeholder="Enter region"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
          Latitude
        </label>
        <input
          id="latitude"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          placeholder="Enter latitude"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
          Longitude
        </label>
        <input
          id="longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          placeholder="Enter longitude"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
        <label htmlFor="population" className="block text-sm font-medium text-gray-700">
          Population
        </label>
        <input
          id="population"
          name="population"
          type="number"
          value={formData.population}
          onChange={handleChange}
          placeholder="Enter population"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="major_landmarks" className="block text-sm font-medium text-gray-700">
          Major Landmarks
        </label>
        <input
          id="major_landmarks"
          name="major_landmarks"
          value={formData.major_landmarks}
          onChange={handleChange}
          placeholder="Enter major landmarks"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save Changes
      </button>
    </form>
  </div>
  
  );
}
