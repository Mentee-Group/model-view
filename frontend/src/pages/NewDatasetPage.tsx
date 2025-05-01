import { ArrowLeft } from 'lucide-react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NewDatasetPage() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<string[]>([]);
  const [problemStatements, setProblemStatements] = useState<string[]>([]);

  const handleAddTopic = (topic: string) => {
    if (topic && !topics.includes(topic)) {
      setTopics([...topics, topic]);
    }
  };

  const handleAddProblemStatement = (statement: string) => {
    if (statement) {
      setProblemStatements([...problemStatements, statement]);
    }
  };

  // Later we’ll replace with real submit logic
  const handleSubmit = (viewAfterCreate: boolean) => {
    const newDatasetId = "3";
    if (viewAfterCreate) {
      navigate(`/datasets/${newDatasetId}`);
    } else {
      navigate("/datasets");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-6">
        <Link
          to="/datasets"
          className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 text-sm font-medium mb-12 group transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to All Datasets</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Create Dataset</h1>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name<span className="text-red-500">*</span></label>
          <input type="text" className="w-full border rounded p-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description<span className="text-red-500">*</span></label>
          <textarea className="w-full border rounded p-2" rows={4} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Instructions</label>
          <textarea className="w-full border rounded p-2" rows={3} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Topics</label>
          <input 
            type="text" 
            placeholder="Enter a topic and press Enter" 
            className="w-full border rounded p-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTopic((e.target as HTMLInputElement).value.trim());
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {topics.map((topic, idx) => (
              <span key={idx} className="bg-sky-100 text-sky-700 px-2 py-1 rounded text-sm">{topic}</span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Suggested Model Types</label>
          <select className="w-full border rounded p-2">
            <option value="">Select a model type</option>
            <option value="classification">Classification</option>
            <option value="regression">Regression</option>
            <option value="clustering">Clustering</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Suggested Problem Statements</label>
          <input 
            type="text" 
            placeholder="Enter a statement and press Enter" 
            className="w-full border rounded p-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddProblemStatement((e.target as HTMLInputElement).value.trim());
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <ul className="list-disc pl-5 mt-2">
            {problemStatements.map((statement, idx) => (
              <li key={idx} className="text-sm">{statement}</li>
            ))}
          </ul>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload Dataset<span className="text-red-500">*</span></label>
          <div className="border-2 border-dashed rounded p-6 text-center text-gray-500">
            Drag and drop file here
          </div>
          <div className="mt-2">
            <button type="button" className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600">
              Browse Files
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Create
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(true)}
            className="px-6 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
          >
            Create & View
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewDatasetPage;