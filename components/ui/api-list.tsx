'use client';

import ApiAlert from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';
import { useParams } from 'next/navigation';
import { FC } from 'react';

interface ApiListProps {
  entityIdName: string;
  entityName: string;
}

const ApiList: FC<ApiListProps> = ({ entityIdName, entityName }) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <>
      <ApiAlert
        description={`${baseUrl}/${entityName}`}
        title="GET"
        variant="public"
      />
      <ApiAlert
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        title="GET"
        variant="public"
      />
      <ApiAlert
        description={`${baseUrl}/${entityName}`}
        title="POST"
        variant="admin"
      />
      <ApiAlert
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        title="PATCH"
        variant="admin"
      />
      <ApiAlert
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        title="DELETE"
        variant="admin"
      />
    </>
  );
};

export default ApiList;
