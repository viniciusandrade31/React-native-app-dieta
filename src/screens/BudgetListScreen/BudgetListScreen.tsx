import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Budget, BudgetStatus } from "../../types/budget";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { BudgetCard } from "../../components/BudgetCard/BudgetCard";
import { AppButton } from "../../components/AppButton/AppButton";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

type FilterType = "all" | BudgetStatus;
type SortType = "recent" | "title" | "value";

interface BudgetListScreenProps {
	budgets: Budget[];
	onCreateNew: () => void;
	onEditBudget: (budget: Budget) => void;
	onDeleteBudget: (budgetId: string) => void;
	onDuplicateBudget: (budget: Budget) => void;
}

export function BudgetListScreen({
	budgets,
	onCreateNew,
	onEditBudget,
	onDeleteBudget,
	onDuplicateBudget,
}: BudgetListScreenProps) {
	const [filter, setFilter] = useState<FilterType>("all");
	const [sortBy, setSortBy] = useState<SortType>("recent");
	const [budgetToDelete, setBudgetToDelete] = useState<Budget | null>(null);

	const filteredBudgets = useMemo(() => {
		let result = [...budgets];

		if (filter !== "all") {
			result = result.filter((budget) => budget.status === filter);
		}

		if (sortBy === "title") {
			result.sort((a, b) => a.title.localeCompare(b.title));
		}

		if (sortBy === "recent") {
			result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
		}

		if (sortBy === "value") {
			result.sort((a, b) => {
				const totalA = a.services.reduce((acc, service) => acc + service.quantity * service.unitPrice, 0);
				const totalB = b.services.reduce((acc, service) => acc + service.quantity * service.unitPrice, 0);
				return totalB - totalA;
			});
		}

		return result;
	}, [budgets, filter, sortBy]);

	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.container}>
				<Text style={styles.title}>Orçamentos</Text>
				<Text style={styles.subtitle}>Visualize, filtre e gerencie seus orçamentos</Text>

				<View style={styles.filters}>
					{(["all", "draft", "approved", "rejected"] as FilterType[]).map((item) => (
						<TouchableOpacity
							key={item}
							style={[styles.filterButton, filter === item && styles.filterButtonActive]}
							onPress={() => setFilter(item)}>
							<Text style={[styles.filterText, filter === item && styles.filterTextActive]}>
								{item === "all"
									? "Todos"
									: item === "draft"
										? "Rascunho"
										: item === "approved"
											? "Aprovado"
											: "Rejeitado"}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.sortContainer}>
					<Text style={styles.sortLabel}>Ordenar por:</Text>

					<View style={styles.sortButtons}>
						{(["recent", "title", "value"] as SortType[]).map((item) => (
							<TouchableOpacity
								key={item}
								style={[styles.sortButton, sortBy === item && styles.sortButtonActive]}
								onPress={() => setSortBy(item)}>
								<Text style={[styles.sortButtonText, sortBy === item && styles.sortButtonTextActive]}>
									{item === "recent" ? "Recentes" : item === "title" ? "Título" : "Valor"}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<FlatList
					data={filteredBudgets}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.listContent}
					renderItem={({ item }) => (
						<BudgetCard
							budget={item}
							onEdit={() => onEditBudget(item)}
							onDuplicate={() => onDuplicateBudget(item)}
							onDelete={() => setBudgetToDelete(item)}
						/>
					)}
				/>

				<AppButton title="Novo orçamento" onPress={onCreateNew} />

				<ConfirmModal
					visible={!!budgetToDelete}
					title="Excluir orçamento"
					message="Tem certeza que deseja excluir este orçamento? Essa ação não poderá ser desfeita."
					confirmText="Excluir"
					cancelText="Cancelar"
					onCancel={() => setBudgetToDelete(null)}
					onConfirm={() => {
						if (budgetToDelete) {
							onDeleteBudget(budgetToDelete.id);
						}
						setBudgetToDelete(null);
					}}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: colors.background,
	},
	container: {
		flex: 1,
		padding: spacing.lg,
	},
	title: {
		color: colors.textLight,
		fontSize: 28,
		fontWeight: "700",
	},
	subtitle: {
		color: "#CFCFCF",
		marginTop: spacing.xs,
		marginBottom: spacing.lg,
	},
	filters: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: spacing.sm,
		marginBottom: spacing.md,
	},
	filterButton: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 20,
		backgroundColor: colors.gray700,
	},
	filterButtonActive: {
		backgroundColor: colors.primary,
	},
	filterText: {
		color: colors.textLight,
		fontSize: 13,
		fontWeight: "600",
	},
	filterTextActive: {
		color: colors.gray900,
	},
	sortContainer: {
		marginBottom: spacing.md,
	},
	sortLabel: {
		color: colors.textLight,
		marginBottom: spacing.sm,
		fontWeight: "600",
	},
	sortButtons: {
		flexDirection: "row",
		gap: spacing.sm,
	},
	sortButton: {
		backgroundColor: colors.gray700,
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 10,
	},
	sortButtonActive: {
		backgroundColor: colors.surface,
	},
	sortButtonText: {
		color: colors.textLight,
		fontSize: 13,
	},
	sortButtonTextActive: {
		color: colors.text,
		fontWeight: "700",
	},
	listContent: {
		paddingBottom: spacing.lg,
	},
});
