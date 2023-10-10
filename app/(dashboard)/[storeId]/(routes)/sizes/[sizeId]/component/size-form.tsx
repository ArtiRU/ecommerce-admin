'use client';

import AlertModal from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Size } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

interface SizeFormProps {
  initialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

const SizeForm: FC<SizeFormProps> = ({ initialData }) => {
  const params = useParams();
  const { push, refresh } = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: initialData || {
      name: '',
      value: '',
    },
    resolver: zodResolver(formSchema),
  });

  const [open, setOpen] = useState(false);
  const isLoading = form.formState.isSubmitting;

  const title = initialData ? 'Edit size' : 'Create size';
  const description = initialData ? 'Edit a size' : 'Create a new size';
  const toastMessage = initialData ? 'Size updated' : 'Size created';
  const action = initialData ? 'Save changes' : 'Create';

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          values,
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, values);
      }

      refresh();
      push(`/${params.storeId}/sizes`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      refresh();
      push(`/${params.storeId}/sizes`);
      toast.success('Size deleted.');
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading description={description} title={title} />
        {initialData && (
          <Button
            disabled={isLoading}
            onClick={() => setOpen(true)}
            size="icon"
            variant="destructive"
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="ml-auto" disabled={isLoading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
