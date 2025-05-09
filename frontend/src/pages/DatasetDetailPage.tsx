import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo } from 'react';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

type Car = {
  make: string;
  model: string;
  price: number;
};

function DatasetDetailPage() {
  const { id } = useParams<{ id: string }>();

  const columnDefs = useMemo<ColDef<Car>[]>(() => [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" },
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" }
  ], []);

  const rowData = useMemo<Car[]>(() => [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
  ], []);

  return (
    <div className="py-8 px-4">
      <div className="mb-6">
        <Link
          to="/datasets"
          className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 text-sm font-medium mb-12 group transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to All Datasets</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">Dataset #{id}</h1>
      <p className="mb-6">This is where we'll load the table view for dataset {id}!</p>

      <div className="ag-theme-alpine">
        <AgGridReact<Car>
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
}

export default DatasetDetailPage;