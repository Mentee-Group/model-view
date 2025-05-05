import { KeyboardEvent } from "react";

type TagInputProps = {
  label: string;
  placeholder?: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tagClassName?: string;
};

export function TagInput({
  label,
  placeholder = "",
  tags,
  setTags,
  tagClassName = "bg-sky-100 text-sky-700",
}: TagInputProps) {
  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      const trimmed = input.value.trim();
      if (trimmed) {
        handleAddTag(trimmed);
        input.value = "";
      }
    }
  };

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="text-sm w-full border rounded p-2"
        onKeyDown={handleKeyDown}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className={`${tagClassName} px-2 py-1 rounded text-sm flex items-center gap-1`}
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(idx)}
              className="text-sky-500 hover:text-sky-700 focus:outline-none cursor-pointer"
              aria-label="Remove tag"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
