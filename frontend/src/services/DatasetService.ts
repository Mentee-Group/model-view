import { ColDef } from 'ag-grid-community';
import axios from 'axios';

const BASE_URL = '/api/v1';

export const uploadFile = async (files: File[]) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("file", file);
  }

  const response = await axios.post(`${BASE_URL}/upload-dataset`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export type DataRow = Record<string, string | number | boolean | null | undefined>;

export interface DataServiceResponse<T> {
  columnDefs: ColDef[];
  rowData: T[];
}

export const fetchDataset = async <T extends DataRow>(): Promise<DataServiceResponse<T>> => {
  try {
    const jsonData = await getMockDataset();
    
    if (!jsonData || !jsonData.data || !Array.isArray(jsonData.data) || jsonData.data.length === 0) {
      throw new Error('Invalid dataset format or empty dataset');
    }
    
    const firstRow = jsonData.data[0];
    const columnDefs = Object.keys(firstRow).map(key => ({
      headerName: key,
      field: key,
      cellRenderer: typeof firstRow[key] === 'boolean' ? 'checkboxCellRenderer' : undefined,
      filter: true,
      sortable: true,
    }));
    
    return {
      columnDefs,
      rowData: jsonData.data as T[],
    };
  } catch (error) {
    console.error('Error fetching dataset:', error);
    return {
      columnDefs: [],
      rowData: [],
    };
  }
}

function getMockDataset(): Promise<{ data: DataRow[] }> {
  const weatherData = {
    data: [
      { "Outlook": "Sunny", "Temperature": "Hot", "Humidity": "High", "Windy": false, "Weather": "Clear", "Play": "No" },
      { "Outlook": "Sunny", "Temperature": "Hot", "Humidity": "High", "Windy": true, "Weather": "Breezy", "Play": "No" },
      { "Outlook": "Overcast", "Temperature": "Hot", "Humidity": "High", "Windy": false, "Weather": "Cloudy", "Play": "Yes" },
      { "Outlook": "Rain", "Temperature": "Mild", "Humidity": "High", "Windy": false, "Weather": "Drizzle", "Play": "Yes" },
      { "Outlook": "Rain", "Temperature": "Cool", "Humidity": "Normal", "Windy": false, "Weather": "Light Rain", "Play": "Yes" },
      { "Outlook": "Rain", "Temperature": "Cool", "Humidity": "Normal", "Windy": true, "Weather": "Stormy", "Play": "No" },
      { "Outlook": "Overcast", "Temperature": "Cool", "Humidity": "Normal", "Windy": true, "Weather": "Windy", "Play": "Yes" },
      { "Outlook": "Sunny", "Temperature": "Mild", "Humidity": "High", "Windy": false, "Weather": "Clear", "Play": "No" },
      { "Outlook": "Sunny", "Temperature": "Cool", "Humidity": "Normal", "Windy": false, "Weather": "Pleasant", "Play": "Yes" },
      { "Outlook": "Rain", "Temperature": "Mild", "Humidity": "Normal", "Windy": false, "Weather": "Drizzle", "Play": "Yes" },
      { "Outlook": "Sunny", "Temperature": "Mild", "Humidity": "Normal", "Windy": true, "Weather": "Breezy", "Play": "Yes" },
      { "Outlook": "Overcast", "Temperature": "Mild", "Humidity": "High", "Windy": true, "Weather": "Humid", "Play": "Yes" },
      { "Outlook": "Overcast", "Temperature": "Hot", "Humidity": "Normal", "Windy": false, "Weather": "Hazy", "Play": "Yes" },
      { "Outlook": "Rain", "Temperature": "Mild", "Humidity": "High", "Windy": true, "Weather": "Stormy", "Play": "No" },
      { "Outlook": "Sunny", "Temperature": "Hot", "Humidity": "Normal", "Windy": false, "Weather": "Dry", "Play": "Yes" },
      { "Outlook": "Overcast", "Temperature": "Hot", "Humidity": "High", "Windy": true, "Weather": "Muggy", "Play": "Yes" },
      { "Outlook": "Rain", "Temperature": "Cool", "Humidity": "High", "Windy": false, "Weather": "Damp", "Play": "No" },
      { "Outlook": "Sunny", "Temperature": "Cool", "Humidity": "High", "Windy": true, "Weather": "Chilly", "Play": "No" },
      { "Outlook": "Overcast", "Temperature": "Mild", "Humidity": "Normal", "Windy": false, "Weather": "Moderate", "Play": "Yes" },
      { "Outlook": "Rain", "Temperature": "Hot", "Humidity": "Normal", "Windy": true, "Weather": "Thunderstorm", "Play": "No" },
      { "Outlook": "Sunny", "Temperature": "Mild", "Humidity": "High", "Windy": true, "Weather": "Dusty", "Play": "No" },
      { "Outlook": "Overcast", "Temperature": "Cool", "Humidity": "High", "Windy": false, "Weather": "Foggy", "Play": "Yes" },
      { "Outlook": "Rain", "Temperature": "Mild", "Humidity": "Normal", "Windy": true, "Weather": "Showers", "Play": "No" },
      { "Outlook": "Sunny", "Temperature": "Hot", "Humidity": "High", "Windy": false, "Weather": "Scorching", "Play": "No" },
      { "Outlook": "Rain", "Temperature": "Cool", "Humidity": "Normal", "Windy": false, "Weather": "Misty", "Play": "Yes" },
      { "Outlook": "Overcast", "Temperature": "Mild", "Humidity": "High", "Windy": true, "Weather": "Windy", "Play": "Yes" },
      { "Outlook": "Sunny", "Temperature": "Cool", "Humidity": "Normal", "Windy": true, "Weather": "Crisp", "Play": "Yes" },
      { "Outlook": "Rain", "Temperature": "Hot", "Humidity": "High", "Windy": false, "Weather": "Heavy Rain", "Play": "No" },
      { "Outlook": "Overcast", "Temperature": "Cool", "Humidity": "Normal", "Windy": false, "Weather": "Overcast", "Play": "Yes" },
      { "Outlook": "Sunny", "Temperature": "Mild", "Humidity": "Normal", "Windy": false, "Weather": "Fair", "Play": "Yes" }
    ]
  };
  
  return new Promise((resolve) => {
    resolve(weatherData);
  });
}