import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

interface PromptTemplateProps {
  title: string;
  content: string;
  onSelect: () => void;
}

export function PromptTemplate({ title, content, onSelect }: PromptTemplateProps) {
  return (
    <div 
      className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50"
      onClick={onSelect}
    >
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-medium">{title}</h4>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{content}</p>
    </div>
  );
}
