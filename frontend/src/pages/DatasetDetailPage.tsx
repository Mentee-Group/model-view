import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

function DatasetDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="py-8">
      <div className="mb-6">
        <Link
          to="/datasets"
          className="text-sky-600 hover:text-sky-700 flex items-center gap-1 text-sm font-medium mb-12 group transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Datasets</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">Dataset #{id}</h1>
      <p>This is where we'll load the table view for dataset {id}!</p>
      {/* Later we'll use AG Grid or TanStack here */}
    </div>
  );
}

export default DatasetDetailPage;
