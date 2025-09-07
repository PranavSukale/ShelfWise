import { StockOverview } from "@/components/widgets/stock-overview"
import { SalesSummary } from "@/components/widgets/sales-summary"
import { AlertsCard } from "@/components/widgets/alerts-card"

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <StockOverview />
        </div>
        <SalesSummary />
      </div>
      <AlertsCard />
    </div>
  )
}
