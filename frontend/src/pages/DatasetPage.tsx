import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

type Dataset = {
  id: number;
  name: string;
  description: string;
  creator: string;
  createdAt: string;
};

const datasets: Dataset[] = [
  {
    id: 1,
    name: "NBA Player Stats",
    description: "Detailed seasonal performance of NBA players including advanced metrics.",
    creator: "John Doe",
    createdAt: "2024-11-15",
  },
  {
    id: 2,
    name: "Stock Prices",
    description: "Historical stock prices from major US exchanges.",
    creator: "Jane Smith",
    createdAt: "2023-09-10",
  },
];


function DatasetPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Available Datasets</h2>
      <div>
        {datasets.map((dataset) => (
          <div
            key={dataset.id}
            className="cursor-pointer hover:bg-gray-50 transition border-b border-gray-200 bg-white"
            onClick={() => toggleExpand(dataset.id)}
          >
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                <div>
                  <div className="text-lg font-semibold text-gray-800">{dataset.name}</div>
                  <div className="text-sm text-gray-500">
                    {dataset.creator} • {new Date(dataset.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreHorizontal />
              </button>
            </div>
            {expandedId === dataset.id && (
              <div className="px-4 pb-4 text-sm text-gray-700">{dataset.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatasetPage;