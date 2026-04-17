export type BudgetStatus = "draft" | "approved" | "rejected";

export interface ServiceItem {
	id: string;
	name: string;
	quantity: number;
	unitPrice: number;
}

export interface Budget {
	id: string;
	title: string;
	client: string;
	status: BudgetStatus;
	services: ServiceItem[];
	discount: number;
	createdAt: string;
}
