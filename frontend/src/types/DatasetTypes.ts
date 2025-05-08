export type DatasetUploadInput = {
  name: string;
  description: string;
  instructions?: string;
  modelType?: string;
  topics?: string[];
  problemStatements?: string[];
};