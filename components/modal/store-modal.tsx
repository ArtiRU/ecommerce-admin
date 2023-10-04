'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Modal from '@/components/ui/modal';
import { useModalStore } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1),
});

const StoreModal: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(formSchema),
  });
  const isLoading = form.formState.isSubmitting;
  const { isOpen, onClose } = useModalStore();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return (
    <Modal
      description="Add a new store to manage products and categories"
      isOpen={true}
      onClose={onClose}
      title="Create store"
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E-commerce" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={isLoading}
                  onClick={onClose}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={form.handleSubmit(onSubmit)}
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
