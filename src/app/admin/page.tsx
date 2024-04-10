import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaid: true },
    _count: true,
  });

  return {
    amount: data._sum.pricePaid || 0,
    count: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaid: true },
    }),
  ]);

  return {
    count: userCount,
    averageVal:
      userCount === 0 ? 0 : (orderData._sum.pricePaid || 0) / userCount,
  };
}

async function getProductData() {
  const [activeProducts, inactiveProducts] = await Promise.all([
    db.product.count({ where: { isAvailable: true } }),
    db.product.count({ where: { isAvailable: false } }),
  ]);

  return {
    activeCount: activeProducts,
    inactiveCount: inactiveProducts,
  };
}

export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.count)} orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(userData.averageVal)} average values`}
        body={formatNumber(userData.count)}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
