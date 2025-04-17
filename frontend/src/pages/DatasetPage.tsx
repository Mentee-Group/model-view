type Dataset = {
  id: number;
  name: string;
  description: string;
};

const datasets: Dataset[] = [
  { id: 1, name: "NBA Player Stats", description: "Seasonal player performance data." },
  { id: 2, name: "Stock Prices", description: "Historical stock market data." },
];

function DatasetPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Datasets</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {datasets.map((dataset) => (
            <tr key={dataset.id}>
              <td className="border px-4 py-2">{dataset.name}</td>
              <td className="border px-4 py-2">{dataset.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DatasetPage;