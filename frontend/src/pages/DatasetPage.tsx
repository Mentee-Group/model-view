import { MoreHorizontal, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Dataset } from '@/types/DatasetTypes';

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

function handleMenuClick(callback: () => void) {
  return (e: React.MouseEvent) => {
    e.stopPropagation();
    callback();
  };
}

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

function DatasetPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const mounted = useMounted();

  const newDataset = location.state?.newDataset as Dataset | undefined;
  const allDatasets = newDataset
    ? [newDataset, ...datasets]
    : datasets;

  useEffect(() => {
    if (!mounted) return;
    if (location.state?.showSuccessToast) {
      const id = toast.success('Dataset uploaded successfully!');
      return () => {
        toast.dismiss(id);
      };
    }
  }, [mounted, location.state?.showSuccessToast]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className='py-8'>
      <div className='flex items-center justify-between mb-12'>
        <h1 className="text-3xl font-bold">Available Datasets</h1>
        <Link
          to="/datasets/new"
          className="flex items-center bg-sky-900 text-white px-4 py-2 rounded hover:bg-sky-800 hover:shadow-md shadow-none transition space-x-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Dataset</span>
        </Link>
      </div>

      <div>
        {allDatasets.map((dataset) => (
          <div
            key={dataset.id}
            className="cursor-pointer hover:bg-gray-50 transition border-b border-gray-200 bg-white relative"
            onClick={() => toggleExpand(dataset.id)}
          >
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-200 rounded-md"></div>

                <div>
                  <div className="text-lg font-semibold text-gray-800">{dataset.name}</div>
                  <div className="text-sm text-gray-500">
                    {dataset.creator} • {new Date(dataset.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <DropdownMenu.Root modal={false}>
                <DropdownMenu.Trigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-sky-100/70 transition cursor-pointer"
                  >
                    <MoreHorizontal />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content
                  align="end"
                  sideOffset={3}
                  className="bg-white rounded border border-gray-300 shadow-lg w-32 py-1 z-50 animate-slide-down-and-fade"
                >
                  <DropdownMenu.Item asChild>
                    <div
                      onClick={handleMenuClick(() => {
                        navigate(`/datasets/${dataset.id}`, {
                          state: { dataset },
                        });
                      })}
                      // onClick={handleMenuClick(() => {
                      //   navigate(`/datasets/${dataset.id}`);
                      // })}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      View
                    </div>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item asChild>
                    <div
                      onClick={handleMenuClick(() => {
                        console.log('Download clicked');
                      })}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Download
                    </div>
                  </DropdownMenu.Item>

                </DropdownMenu.Content>
              </DropdownMenu.Root>
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