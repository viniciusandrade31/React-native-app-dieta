import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Budget } from "./src/types/budget";
import { mockBudgets } from "./src/data/mockBudgets";
import { BudgetListScreen } from "./src/screens/BudgetListScreen/BudgetListScreen";
import { BudgetFormScreen } from "./src/screens/BudgetFormScreen/BudgetFormScreen";

type Screen = "list" | "form";

export default function App() {
	const [screen, setScreen] = useState<Screen>("list");
	const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
	const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

	function handleCreateNew() {
		setSelectedBudget(null);
		setScreen("form");
	}

	function handleEditBudget(budget: Budget) {
		setSelectedBudget(budget);
		setScreen("form");
	}

	function handleSaveBudget(budget: Budget) {
		setBudgets((prev) => {
			const alreadyExists = prev.some((item) => item.id === budget.id);

			if (alreadyExists) {
				return prev.map((item) => (item.id === budget.id ? budget : item));
			}

			return [budget, ...prev];
		});

		setScreen("list");
		setSelectedBudget(null);
	}

	function handleDeleteBudget(budgetId: string) {
		setBudgets((prev) => prev.filter((item) => item.id !== budgetId));
	}

	function handleDuplicateBudget(budget: Budget) {
		const duplicatedBudget: Budget = {
			...budget,
			id: String(Date.now()),
			title: `${budget.title} (Cópia)`,
			createdAt: new Date().toISOString().split("T")[0],
		};

		setBudgets((prev) => [duplicatedBudget, ...prev]);
	}

	function handleCancelForm() {
		setScreen("list");
		setSelectedBudget(null);
	}

	return (
		<>
			<StatusBar style="light" />
			{screen === "list" ? (
				<BudgetListScreen
					budgets={budgets}
					onCreateNew={handleCreateNew}
					onEditBudget={handleEditBudget}
					onDeleteBudget={handleDeleteBudget}
					onDuplicateBudget={handleDuplicateBudget}
				/>
			) : (
				<BudgetFormScreen budgetToEdit={selectedBudget} onCancel={handleCancelForm} onSave={handleSaveBudget} />
			)}
		</>
	);
}
