import Overview from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { priceFormatter } from '@/lib/utils';
import {
  getGraphRevenue,
  getSalesCount,
  getStockCount,
  getTotalRevenue,
} from '@/services/store-service';
import { CreditCardIcon, DollarSign, PackageIcon } from 'lucide-react';
import { FC } from 'react';

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: FC<DashboardPageProps> = async ({
  params: { storeId },
}) => {
  const totalRevenue = await getTotalRevenue(storeId);
  const salesCount = await getSalesCount(storeId);
  const stockCount = await getStockCount(storeId);
  const graphRevenue = await getGraphRevenue(storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading description="Overview of your store" title="Dashboard" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>

              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {priceFormatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>

              <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {salesCount ? `+${salesCount}` : 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>

              <PackageIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardContent className="pl-2">
              <Overview data={graphRevenue} />
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
