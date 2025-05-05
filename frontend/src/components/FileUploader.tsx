import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileEncode);

type FileUploaderProps = {
  files: File[];
  setFiles: (files: File[]) => void;
};

export function FileUploader({ files, setFiles }: FileUploaderProps) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium mb-2">
        Upload Dataset<span className="text-red-500">*</span>
      </label>
      <div className="cursor-pointer">
        <FilePond
          files={files}
          onupdatefiles={(fileItems) => {
            const fileList = fileItems.map((fileItem) => fileItem.file);
            const validFiles = fileList.filter(
              (file): file is File => file instanceof File
            );
            setFiles(validFiles);
          }}
          allowMultiple={true}
          acceptedFileTypes={["text/csv", "application/json", "application/zip"]}
          labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
          className="mt-2 cursor-pointer"
        />
      </div>
    </div>
  );
}