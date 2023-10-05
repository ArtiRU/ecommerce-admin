'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useModalStore } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';
import { Store } from '@prisma/client';
import { PopoverTriggerProps } from '@radix-ui/react-popover';
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher: FC<StoreSwitcherProps> = ({ className, items = [] }) => {
  const { onOpen } = useModalStore();
  const [storeOpen, setStoreOpen] = useState(false);
  const params = useParams();
  const { push } = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId,
  );

  const onSelectStore = (store: { label: string; value: string }) => {
    setStoreOpen(false);
    push(`/${store.value}`);
  };

  const onAddStore = () => {
    setStoreOpen(false);
    onOpen();
  };

  return (
    <Popover onOpenChange={setStoreOpen} open={storeOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn('w-[200px] justify-between', className)}
          role="combobox"
          size="sm"
          variant="outline"
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          Current Store
          <ChevronsUpDown className="ml-auto w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  className="text-sm cursor-pointer"
                  key={store.value}
                  onSelect={() => onSelectStore(store)}
                >
                  <StoreIcon className="mr-2 w-4 h-4" />
                  {store?.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4 opacity-100',
                      currentStore?.value && 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem className="cursor-pointer" onSelect={onAddStore}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
