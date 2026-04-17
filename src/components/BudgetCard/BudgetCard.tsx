import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Budget } from "../../types/budget";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { calculateFinalTotal, calculateSubtotal, formatCurrency } from "../../utils/budgetCalculantions";

interface BudgetCardProps {
	budget: Budget;
	onEdit: () => void;
	onDuplicate: () => void;
	onDelete: () => void;
}

export function BudgetCard({ budget, onEdit, onDuplicate, onDelete }: BudgetCardProps) {
	const subtotal = calculateSubtotal(budget.services);
	const total = calculateFinalTotal(subtotal, budget.discount);

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<View style={{ flex: 1 }}>
					<Text style={styles.title}>{budget.title}</Text>
					<Text style={styles.client}>{budget.client}</Text>
				</View>

				<StatusBadge status={budget.status} />
			</View>

			<View style={styles.content}>
				<Text style={styles.info}>Serviços: {budget.services.length}</Text>
				<Text style={styles.info}>Desconto: {budget.discount}%</Text>
				<Text style={styles.total}>{formatCurrency(total)}</Text>
			</View>

			<View style={styles.actions}>
				<TouchableOpacity onPress={onEdit}>
					<Text style={styles.actionText}>Editar</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={onDuplicate}>
					<Text style={styles.actionText}>Duplicar</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={onDelete}>
					<Text style={[styles.actionText, styles.deleteText]}>Excluir</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.card,
		borderRadius: 14,
		padding: spacing.lg,
		marginBottom: spacing.md,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: spacing.md,
	},
	title: {
		fontSize: 17,
		fontWeight: "700",
		color: colors.text,
	},
	client: {
		marginTop: 4,
		color: colors.textSecondary,
		fontSize: 14,
	},
	content: {
		marginTop: spacing.md,
		gap: 4,
	},
	info: {
		color: colors.textSecondary,
		fontSize: 14,
	},
	total: {
		marginTop: spacing.sm,
		fontSize: 18,
		fontWeight: "700",
		color: colors.text,
	},
	actions: {
		marginTop: spacing.lg,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	actionText: {
		fontSize: 14,
		fontWeight: "600",
		color: colors.primaryDark,
	},
	deleteText: {
		color: colors.danger,
	},
});
