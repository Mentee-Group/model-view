import { ArrowLeft } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import { AllCommunityModule, ColDef, ModuleRegistry, themeAlpine, colorSchemeLightCold } from 'ag-grid-community';
import { DataRow, fetchDataset } from '@/services/DatasetService';
import { Dataset } from '@/types/DatasetTypes';

ModuleRegistry.registerModules([AllCommunityModule]);
const theme = themeAlpine.withPart(colorSchemeLightCold);

function DatasetDetailPage() {
  const location = useLocation();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [rowData, setRowData] = useState<DataRow[]>([]);
  const { id } = useParams<{ id: string }>();
  const dataset = location.state?.dataset as Dataset | undefined;

  useEffect(() => {
    async function loadData() {
      if (!id) {
        return;
      }

      try {
        const response = await fetchDataset(dataset?.fileName);
        setColumnDefs(response.columnDefs);
        setRowData(response.rowData);
      } catch (err) {
        console.error(err);
      }
    }

    loadData();
  }, [id, dataset?.fileName]);

  return (
    <div className="py-8">
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
      <p className="mb-6">{dataset?.description}</p>

      <div style={{ height: '500px' }}>
        <AgGridReact
          theme={theme}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          domLayout="normal"
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            filter: true,
            sortable: true,
            resizable: true,
          }}
        />
      </div>
    </div>
  );
}

export default DatasetDetailPage;