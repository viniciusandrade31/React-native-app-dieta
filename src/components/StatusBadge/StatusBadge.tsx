import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BudgetStatus } from "../../types/budget";
import { colors } from "../../constants/colors";

interface StatusBadgeProps {
	status: BudgetStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
	const labelMap = {
		draft: "Rascunho",
		approved: "Aprovado",
		rejected: "Rejeitado",
	};

	return (
		<View
			style={[
				styles.badge,
				status === "draft" && styles.draft,
				status === "approved" && styles.approved,
				status === "rejected" && styles.rejected,
			]}>
			<Text style={styles.text}>{labelMap[status]}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	badge: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 20,
		alignSelf: "flex-start",
	},
	draft: {
		backgroundColor: colors.warning,
	},
	approved: {
		backgroundColor: colors.success,
	},
	rejected: {
		backgroundColor: colors.danger,
	},
	text: {
		fontSize: 12,
		fontWeight: "700",
		color: colors.gray900,
	},
});
