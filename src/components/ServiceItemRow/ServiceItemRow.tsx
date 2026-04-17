import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ServiceItem } from "../../types/budget";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { calculateServiceTotal, formatCurrency } from "../../utils/budgetCalculantions";

interface ServiceItemRowProps {
	item: ServiceItem;
	onRemove?: () => void;
}

export function ServiceItemRow({ item, onRemove }: ServiceItemRowProps) {
	return (
		<View style={styles.container}>
			<View style={styles.info}>
				<Text style={styles.name}>{item.name}</Text>
				<Text style={styles.details}>
					{item.quantity} x {formatCurrency(item.unitPrice)}
				</Text>
			</View>

			<View style={styles.right}>
				<Text style={styles.total}>{formatCurrency(calculateServiceTotal(item))}</Text>

				{onRemove && (
					<TouchableOpacity onPress={onRemove}>
						<Text style={styles.remove}>Remover</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.gray100,
		borderRadius: 10,
		padding: spacing.md,
		marginBottom: spacing.sm,
		flexDirection: "row",
		justifyContent: "space-between",
		gap: spacing.sm,
	},
	info: {
		flex: 1,
	},
	name: {
		fontSize: 15,
		fontWeight: "700",
		color: colors.text,
	},
	details: {
		fontSize: 13,
		color: colors.textSecondary,
		marginTop: 4,
	},
	right: {
		alignItems: "flex-end",
	},
	total: {
		fontSize: 14,
		fontWeight: "700",
		color: colors.text,
	},
	remove: {
		marginTop: 6,
		color: colors.danger,
		fontSize: 13,
		fontWeight: "600",
	},
});
