
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Option {
  value: string;
  label: string;
  flag?: string;
}

interface SearchSelectorProps {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder?: string;
  className?: string;
}

export function SearchSelector({
  options,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder = "Search...",
  className
}: SearchSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  useEffect(() => {
    if (searchTerm) {
      const filtered = options.filter(
        option => 
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options]);

  return (
    <div className={className}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <div className="flex items-center border rounded-md px-3 py-1 mb-2">
              <Search className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-7 pl-0 text-sm"
              />
            </div>
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.flag && <span className="mr-2">{option.flag}</span>}
                {option.label}
              </SelectItem>
            ))
          ) : (
            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
              No results found
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
