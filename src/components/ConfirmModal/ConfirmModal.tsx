import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { AppButton } from "../AppButton/AppButton";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

interface ConfirmModalProps {
	visible: boolean;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	onCancel: () => void;
	onConfirm: () => void;
}

export function ConfirmModal({
	visible,
	title,
	message,
	confirmText = "Confirmar",
	cancelText = "Cancelar",
	onCancel,
	onConfirm,
}: ConfirmModalProps) {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.overlay}>
				<View style={styles.modal}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.message}>{message}</Text>

					<View style={styles.actions}>
						<AppButton title={cancelText} variant="secondary" style={styles.button} onPress={onCancel} />
						<AppButton title={confirmText} variant="danger" style={styles.button} onPress={onConfirm} />
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.45)",
		alignItems: "center",
		justifyContent: "center",
		padding: spacing.xl,
	},
	modal: {
		width: "100%",
		backgroundColor: colors.card,
		borderRadius: 16,
		padding: spacing.xl,
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.text,
	},
	message: {
		marginTop: spacing.sm,
		fontSize: 14,
		color: colors.textSecondary,
		lineHeight: 20,
	},
	actions: {
		flexDirection: "row",
		gap: spacing.sm,
		marginTop: spacing.xl,
	},
	button: {
		flex: 1,
	},
});
