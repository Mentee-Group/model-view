import { DatasetUploadInput } from "@/types/DatasetTypes";

type ValidationResult = {
  isValid: boolean;
  errorMessage?: string;
};

export function validateDatasetData(data: DatasetUploadInput, hasFile: boolean): ValidationResult {
  if (!data.name.trim()) {
    return { isValid: false, errorMessage: "Dataset name is required." };
  }

  if (!data.description.trim()) {
    return { isValid: false, errorMessage: "Dataset description is required." };
  }

  if (!hasFile) {
    return { isValid: false, errorMessage: "Please upload at least one file." };
  }

  return { isValid: true };
}