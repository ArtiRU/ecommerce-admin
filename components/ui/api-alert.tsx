'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Server } from 'lucide-react';
import { FC } from 'react';
import toast from 'react-hot-toast';

interface ApiAlertProps {
  description: string;
  title: string;
  variant: 'admin' | 'public';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  admin: 'Admin',
  public: 'Public',
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  admin: 'destructive',
  public: 'secondary',
};

const ApiAlert: FC<ApiAlertProps> = ({
  description,
  title,
  variant = 'public',
}) => {
  const onCopy = async () => {
    await navigator.clipboard.writeText(description);
    toast.success('API Route copied to the clipboard.');
  };
  return (
    <Alert>
      <Server className="w-4 h-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button onClick={onCopy} size="icon" variant="outline">
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
