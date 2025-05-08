import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile } from '@/services/DatasetService';
import { TagInput } from '@/components/TagInput';
import { FormField } from '@/components/FormField';
import { FileUploader } from '@/components/FileUploader';
import { ActionButtons } from '@/components/ActionsButtons';
import { toast } from 'sonner';
import { DatasetUploadInput } from '@/types/DatasetTypes';
import { validateDatasetData } from '@/utils/ValidateDatasetData';

function NewDatasetPage() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<string[]>([]);
  const [problemStatements, setProblemStatements] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async(viewAfterCreate: boolean) => {
    const formElement = document.querySelector("form");
    if (!formElement) return;

    const formData = new FormData(formElement);

    const datasetData: DatasetUploadInput = {
      name: formData.get("name")?.toString().trim() || "",
      description: formData.get("description")?.toString().trim() || "",
      instructions: formData.get("instructions")?.toString().trim() || "",
      modelType: formData.get("modelType")?.toString() || "",
      topics,
      problemStatements,
    };

    const validation = validateDatasetData(datasetData, files.length > 0);
    if (!validation.isValid) {
      toast.error(validation.errorMessage);
      return;
    }

    try {
      const uploadResponse = await uploadFile(files);
      console.log("Upload complete with response:", uploadResponse);
      console.log("Submitting dataset:", datasetData);

      // TODO: Replace with actual dataset ID from backend
      const newDatasetId = "3";
      navigate(viewAfterCreate ? `/datasets/${newDatasetId}` : "/datasets", {
        state: { showSuccessToast: true, newDataset: datasetData },
      });
    } catch (err) {
      console.error("Error submitting dataset:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="py-8 mb-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Dataset</h1>

        <form className="space-y-6">
          <FormField 
            label="Name" 
            name="name" 
            required 
          />
          
          <FormField 
            label="Description" 
            name="description" 
            type="textarea" 
            rows={4}
            required 
          />
          
          <FormField 
            label="Instructions" 
            name="instructions" 
            type="textarea" 
            rows={3}
          />

          <TagInput
            label="Topics"
            placeholder="Enter a topic and press Enter"
            tags={topics}
            setTags={setTopics}
          />

          <FormField 
            label="Suggested Model Types" 
            name="modelType" 
            type="select" 
            className="text-sm"
          >
            <option value="">Select a Model Type</option>
            <option value="classification">Classification</option>
            <option value="regression">Regression</option>
            <option value="clustering">Clustering</option>
          </FormField>

          <TagInput
            label="Suggested Problem Statements"
            placeholder="Enter a statement and press Enter"
            tags={problemStatements}
            setTags={setProblemStatements}
            tagClassName="bg-slate-100 text-slate-800"
          />

          <FileUploader 
            files={files} 
            setFiles={setFiles} 
          />

          <ActionButtons onSubmit={handleSubmit} />
        </form>
      </div>
    </div>
  );
}

export default NewDatasetPage;