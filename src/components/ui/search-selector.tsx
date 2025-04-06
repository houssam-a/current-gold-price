
import React, { useState, useEffect, useRef } from 'react';
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
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus the search input when dropdown is opened
  const handleOpenChange = (open: boolean) => {
    if (open && searchInputRef.current) {
      // Use a short timeout to ensure the dropdown has rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  };

  // Reset search when closed
  const handleSelectChange = (newValue: string) => {
    onValueChange(newValue);
    setSearchTerm('');
  };

  // Improved search filtering with debounce
  useEffect(() => {
    // Use debounce to avoid unnecessary filtering
    const debounceTimer = setTimeout(() => {
      if (searchTerm.trim() === '') {
        setFilteredOptions(options);
        return;
      }
      
      const searchTermLower = searchTerm.toLowerCase();
      
      // Improved search algorithm - prioritize startsWith matches
      const startMatches: Option[] = [];
      const containsMatches: Option[] = [];
      
      options.forEach(option => {
        const labelLower = option.label.toLowerCase();
        const valueLower = option.value.toLowerCase();
        
        if (labelLower.startsWith(searchTermLower) || valueLower.startsWith(searchTermLower)) {
          startMatches.push(option);
        } else if (labelLower.includes(searchTermLower) || valueLower.includes(searchTermLower)) {
          containsMatches.push(option);
        }
      });
      
      // Combine results with startsWith matches first
      setFilteredOptions([...startMatches, ...containsMatches]);
    }, 150); // 150ms debounce
    
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, options]);

  return (
    <div className={className}>
      <Select value={value} onValueChange={handleSelectChange} onOpenChange={handleOpenChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <div className="flex items-center border rounded-md px-3 py-1 mb-2">
              <Search className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input 
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-7 pl-0 text-sm"
                autoComplete="off"
              />
            </div>
          </div>
          {filteredOptions.length > 0 ? (
            <div className="max-h-[200px] overflow-y-auto">
              {filteredOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.flag && <span className="mr-2">{option.flag}</span>}
                  {option.label}
                </SelectItem>
              ))}
            </div>
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
