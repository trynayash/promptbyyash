
import { useState } from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAI } from "@/contexts/AIContext";

export const AIModelSelector = () => {
  const [open, setOpen] = useState(false);
  const { activeModel, availableModels, setActiveModel } = useAI();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          <div className="flex items-center">
            <span className="mr-2">
              {activeModel.logoUrl && (
                <img 
                  src={activeModel.logoUrl}  
                  alt={activeModel.name} 
                  className="w-5 h-5 rounded-full object-cover"
                />
              )}
            </span>
            <span className="truncate">{activeModel.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search AI models..." />
          <CommandEmpty>No AI model found.</CommandEmpty>
          <CommandGroup>
            {availableModels.map((model) => (
              <CommandItem
                key={model.id}
                value={model.id}
                onSelect={() => {
                  setActiveModel(model);
                  setOpen(false);
                }}
                className="flex items-center"
              >
                <div className="flex items-center flex-1">
                  {model.logoUrl && (
                    <img 
                      src={model.logoUrl}  
                      alt={model.name} 
                      className="w-5 h-5 rounded-full object-cover mr-2"
                    />
                  )}
                  <span>{model.name}</span>
                </div>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    activeModel.id === model.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AIModelSelector;
