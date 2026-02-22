export interface OverviewResponse {
 
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface ChartDataset {
  label: string;
  data: number[];
}

export interface TrendResponse {
  labels: string[];
  datasets: ChartDataset[];
  meta: {
    range: string;
  };
}

export interface StatusResponse {
  labels: string[];
  datasets: ChartDataset[];
}

export interface UserRolesResponse {
  labels: string[];
  datasets: ChartDataset[];
}

export interface BestSellersResponse {
  labels: string[];
  datasets: ChartDataset[];
}

export interface Revenue{
  labels: string[];
  datasets: ChartDataset[];
}
