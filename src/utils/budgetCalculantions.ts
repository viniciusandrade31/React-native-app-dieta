import { ServiceItem } from "../types/budget";

export function calculateServiceTotal(service: ServiceItem): number {
	return service.quantity * service.unitPrice;
}

export function calculateSubtotal(services: ServiceItem[]): number {
	return services.reduce((acc, service) => {
		return acc + calculateServiceTotal(service);
	}, 0);
}

export function calculateDiscountValue(subtotal: number, discountPercentage: number): number {
	return subtotal * (discountPercentage / 100);
}

export function calculateFinalTotal(subtotal: number, discountPercentage: number): number {
	return subtotal - calculateDiscountValue(subtotal, discountPercentage);
}

export function formatCurrency(value: number): string {
	return value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
}
