import { Budget } from "../types/budget";

export const mockBudgets: Budget[] = [
	{
		id: "1",
		title: "Orçamento Reforma Sala",
		client: "Maria Oliveira",
		status: "draft",
		discount: 10,
		createdAt: "2026-04-16",
		services: [
			{
				id: "1",
				name: "Pintura",
				quantity: 2,
				unitPrice: 350,
			},
			{
				id: "2",
				name: "Instalação elétrica",
				quantity: 1,
				unitPrice: 500,
			},
		],
	},
	{
		id: "2",
		title: "Orçamento Site Institucional",
		client: "Empresa Alpha",
		status: "approved",
		discount: 5,
		createdAt: "2026-04-14",
		services: [
			{
				id: "1",
				name: "Layout responsivo",
				quantity: 1,
				unitPrice: 1200,
			},
			{
				id: "2",
				name: "Página de contato",
				quantity: 1,
				unitPrice: 400,
			},
		],
	},
	{
		id: "3",
		title: "Manutenção Computadores",
		client: "Escola Nova Geração",
		status: "rejected",
		discount: 0,
		createdAt: "2026-04-10",
		services: [
			{
				id: "1",
				name: "Limpeza interna",
				quantity: 5,
				unitPrice: 120,
			},
		],
	},
];
