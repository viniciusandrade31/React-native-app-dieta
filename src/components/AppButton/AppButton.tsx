import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle } from "react-native";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

type Variant = "primary" | "secondary" | "danger";

interface AppButtonProps extends TouchableOpacityProps {
	title: string;
	variant?: Variant;
	style?: ViewStyle;
}

export function AppButton({ title, variant = "primary", style, ...rest }: AppButtonProps) {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				variant === "primary" && styles.primary,
				variant === "secondary" && styles.secondary,
				variant === "danger" && styles.danger,
				style,
			]}
			activeOpacity={0.8}
			{...rest}>
			<Text style={[styles.text, variant === "secondary" && styles.secondaryText]}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		minHeight: 48,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: spacing.lg,
	},
	primary: {
		backgroundColor: colors.primary,
	},
	secondary: {
		backgroundColor: colors.card,
		borderWidth: 1,
		borderColor: colors.border,
	},
	danger: {
		backgroundColor: colors.danger,
	},
	text: {
		color: colors.gray900,
		fontWeight: "700",
		fontSize: 16,
	},
	secondaryText: {
		color: colors.text,
	},
});
