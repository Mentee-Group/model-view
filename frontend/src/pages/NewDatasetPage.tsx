import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import { uploadFile } from '@/services/DatasetService';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileEncode);

function NewDatasetPage() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<string[]>([]);
  const [problemStatements, setProblemStatements] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleAddTopic = (topic: string) => {
    if (topic && !topics.includes(topic)) {
      setTopics([...topics, topic]);
    }
  };

  const handleRemoveTopic = (index: number) => {
    setTopics((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddProblemStatement = (statement: string) => {
    if (statement) {
      setProblemStatements([...problemStatements, statement]);
    }
  };

  const handleRemoveProblemStatement = (index: number) => {
    setProblemStatements((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async(viewAfterCreate: boolean) => {
    const formElement = document.querySelector("form");
    if (!formElement) return;

    const formData = new FormData(formElement);
    const name = formData.get("name")?.toString().trim() || "";
    const description = formData.get("description")?.toString().trim() || "";
    const instructions = formData.get("instructions")?.toString().trim() || "";
    const modelType = formData.get("modelType")?.toString() || "";

    try {
      const uploadResponse = await uploadFile(files);
      console.log("Upload complete with response:", uploadResponse);

      const payload = {
        name,
        description,
        instructions,
        modelType,
        topics,
        problemStatements,
      };

    console.log("Submitting dataset:", payload);

      // TODO: Replace with actual dataset ID from backend
      const newDatasetId = "3";
      if (viewAfterCreate) {
        navigate(`/datasets/${newDatasetId}`);
      } else {
        navigate("/datasets");
      }
    } catch (err) {
      console.error("Error submitting dataset:", err);
    }
  };

  return (
    <div className="py-8 mb-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Dataset</h1>

        <form className="space-y-6">
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Name<span className="text-red-500">*</span></label>
            <input type="text" name="name" className="w-full border rounded p-2" required />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Description<span className="text-red-500">*</span></label>
            <textarea name="description" className="w-full border rounded p-2" rows={4} required />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Instructions</label>
            <textarea name="instructions" className="w-full border rounded p-2" rows={3} />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Topics</label>
            <input
              type="text"
              placeholder="Enter a topic and press Enter"
              className="text-sm w-full border rounded p-2"
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
                <span
                  key={idx}
                  className="bg-sky-100 text-sky-700 px-2 py-1 rounded text-sm flex items-center gap-1"
                >
                  {topic}
                  <button
                    type="button"
                    onClick={() => handleRemoveTopic(idx)}
                    className="text-sky-500 hover:text-sky-700 focus:outline-none cursor-pointer"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Suggested Model Types</label>
            <select name="modelType" className="text-sm w-full border rounded p-2">
              <option value="">Select a Model Type</option>
              <option value="classification">Classification</option>
              <option value="regression">Regression</option>
              <option value="clustering">Clustering</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Suggested Problem Statements</label>
            <input
              type="text"
              placeholder="Enter a statement and press Enter"
              className="text-sm w-full border rounded p-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddProblemStatement((e.target as HTMLInputElement).value.trim());
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {problemStatements.map((statement, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-800 px-3 py-1 rounded text-sm flex items-center gap-1"
                >
                  {statement}
                  <button
                    type="button"
                    onClick={() => handleRemoveProblemStatement(idx)}
                    className="text-slate-500 hover:text-slate-700 focus:outline-none cursor-pointer"
                    aria-label="Remove statement"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">
              Upload Dataset<span className="text-red-500">*</span>
            </label>
            <div className="cursor-pointer">
              <FilePond
                files={files}
                onupdatefiles={(fileItems) => {
                  const fileList = fileItems.map(fileItem => fileItem.file);
                  const validFiles = fileList.filter((file): file is File => file instanceof File);
                  setFiles(validFiles);
                }}
                allowMultiple={true}
                acceptedFileTypes={['text/csv', 'application/json', 'application/zip']}
                labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                className="mt-2 cursor-pointer"
              />
            </div>
          </div>


          <div className="flex justify-end gap-3 mb-8">
            <Link
              to="/datasets"
              className="px-6 py-2 border border-gray-300 text-white rounded bg-gray-600 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </Link>
            <DropdownMenu.Root modal={false}>
              <div className="inline-flex relative">
                <button
                  onClick={(e) => { e.preventDefault(); handleSubmit(false) }}
                  className="px-6 py-2 bg-sky-600 text-white rounded-l hover:bg-sky-700 focus:outline-none cursor-pointer"
                >
                  Create
                </button>
                <DropdownMenu.Trigger asChild>
                  <button className="px-2 py-2 bg-sky-600 text-white rounded-r hover:bg-sky-700 focus:outline-none cursor-pointer">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    align="end"
                    className="absolute right-0 mt-2 w-48 rounded-md bg-white border border-gray-200 shadow-lg py-1 z-50 animate-slide-down-and-fade"
                    sideOffset={3}
                  >
                    <DropdownMenu.Item
                      onSelect={() => handleSubmit(false)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Create
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onSelect={() => handleSubmit(true)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Create & View
                    </DropdownMenu.Item>
                    {/* <DropdownMenu.Item
                      onSelect={() => handleSubmit(true)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Preview
                    </DropdownMenu.Item> */}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </div>
            </DropdownMenu.Root>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewDatasetPage;