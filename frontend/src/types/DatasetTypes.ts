export type DatasetUploadInput = {
  name: string;
  description: string;
  instructions?: string;
  modelType?: string;
  topics?: string[];
  problemStatements?: string[];
};

export type Dataset = {
  id: number;
  name: string;
  description: string;
  creator: string;
  createdAt: string;
  instructions?: string;
  modelType?: string;
  topics?: string[];
  problemStatements?: string[];
  fileName?: string;
};