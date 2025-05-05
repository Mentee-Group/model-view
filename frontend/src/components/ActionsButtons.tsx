import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Link } from "react-router-dom";

type ActionButtonsProps = {
  onSubmit: (viewAfterSubmit: boolean) => void | Promise<void>;
};

export function ActionButtons({ onSubmit }: ActionButtonsProps) {
  return (
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
            onClick={(e) => { 
              e.preventDefault(); 
              onSubmit(false); 
            }}
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
                onSelect={() => onSubmit(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Create
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => onSubmit(true)}
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
  );
}