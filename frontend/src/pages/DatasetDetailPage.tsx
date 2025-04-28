import { useParams } from 'react-router-dom';

function DatasetDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-4">Dataset #{id}</h1>
      <p>This is where we'll load the table view for dataset {id}!</p>
      {/* Later we'll use AG Grid or TanStack here */}
    </div>
  );
}

export default DatasetDetailPage;
