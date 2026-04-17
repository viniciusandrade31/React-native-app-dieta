import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

interface AppInputProps extends TextInputProps {
	label: string;
}

export function AppInput({ label, ...rest }: AppInputProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput placeholderTextColor={colors.gray500} style={styles.input} {...rest} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: spacing.md,
	},
	label: {
		fontSize: 14,
		color: colors.text,
		marginBottom: spacing.xs,
		fontWeight: "600",
	},
	input: {
		minHeight: 48,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: 10,
		backgroundColor: colors.inputBackground,
		paddingHorizontal: spacing.md,
		color: colors.text,
		fontSize: 15,
	},
});
