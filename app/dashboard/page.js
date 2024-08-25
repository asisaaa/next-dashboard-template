import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from "@/app/lib/data";

export default async function Page() {
  try {
    // Fetch data
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();
    const {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
    } = await fetchCardData(); 
    const cardData = await fetchCardData();

    return (
      <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            title="Collected"
            value={cardData.totalPaidInvoices}
            type="collected"
          />
          <Card
            title="Pending"
            value={cardData.totalPendingInvoices}
            type="pending"
          />
          <Card
            title="Total Invoices"
            value={cardData.numberOfInvoices}
            type="invoices"
          />
          <Card
            title="Total Customers"
            value={cardData.numberOfCustomers}
            type="customers"
          />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-8">
          <div className="md:col-span-2 lg:col-span-5">
            <RevenueChart revenue={revenue} />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <LatestInvoices latestInvoices={latestInvoices} />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Page Error:", error);
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <p className="text-red-500">Failed to load dashboard data. Please try again later.</p>
      </div>
    );
  }
}
