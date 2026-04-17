import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Budget, BudgetStatus, ServiceItem } from "../../types/budget";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { AppInput } from "../../components/AppInput/AppInput";
import { AppButton } from "../../components/AppButton/AppButton";
import { ServiceItemRow } from "../../components/ServiceItemRow/ServiceItemRow";
import {
	calculateDiscountValue,
	calculateFinalTotal,
	calculateSubtotal,
	formatCurrency,
} from "../../utils/budgetCalculantions";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

interface BudgetFormScreenProps {
	budgetToEdit?: Budget | null;
	onCancel: () => void;
	onSave: (budget: Budget) => void;
}

export function BudgetFormScreen({ budgetToEdit, onCancel, onSave }: BudgetFormScreenProps) {
	const [title, setTitle] = useState(budgetToEdit?.title ?? "");
	const [client, setClient] = useState(budgetToEdit?.client ?? "");
	const [status, setStatus] = useState<BudgetStatus>(budgetToEdit?.status ?? "draft");
	const [discount, setDiscount] = useState(String(budgetToEdit?.discount ?? 0));
	const [services, setServices] = useState<ServiceItem[]>(budgetToEdit?.services ?? []);

	const [serviceName, setServiceName] = useState("");
	const [serviceQuantity, setServiceQuantity] = useState("");
	const [serviceUnitPrice, setServiceUnitPrice] = useState("");
	const [showStatusConfirm, setShowStatusConfirm] = useState(false);
	const [nextStatus, setNextStatus] = useState<BudgetStatus | null>(null);

	const discountNumber = Number(discount) || 0;

	const subtotal = useMemo(() => calculateSubtotal(services), [services]);
	const discountValue = useMemo(() => calculateDiscountValue(subtotal, discountNumber), [subtotal, discountNumber]);
	const total = useMemo(() => calculateFinalTotal(subtotal, discountNumber), [subtotal, discountNumber]);

	function handleAddService() {
		if (!serviceName.trim()) return;
		if (!serviceQuantity || !serviceUnitPrice) return;

		const newService: ServiceItem = {
			id: String(Date.now()),
			name: serviceName,
			quantity: Number(serviceQuantity),
			unitPrice: Number(serviceUnitPrice),
		};

		setServices((prev) => [...prev, newService]);
		setServiceName("");
		setServiceQuantity("");
		setServiceUnitPrice("");
	}

	function handleRemoveService(serviceId: string) {
		setServices((prev) => prev.filter((item) => item.id !== serviceId));
	}

	function requestStatusChange(newStatus: BudgetStatus) {
		if (newStatus === status) return;
		setNextStatus(newStatus);
		setShowStatusConfirm(true);
	}

	function confirmStatusChange() {
		if (nextStatus) {
			setStatus(nextStatus);
		}
		setNextStatus(null);
		setShowStatusConfirm(false);
	}

	function handleSave() {
		const budget: Budget = {
			id: budgetToEdit?.id ?? String(Date.now()),
			title,
			client,
			status,
			services,
			discount: discountNumber,
			createdAt: budgetToEdit?.createdAt ?? new Date().toISOString().split("T")[0],
		};

		onSave(budget);
	}

	return (
		<SafeAreaView style={styles.safe}>
			<ScrollView style={styles.container} contentContainerStyle={styles.content}>
				<Text style={styles.title}>{budgetToEdit ? "Editar orçamento" : "Novo orçamento"}</Text>
				<Text style={styles.subtitle}>Preencha os dados e acompanhe os valores em tempo real</Text>

				<View style={styles.card}>
					<AppInput label="Título" placeholder="Digite o título do orçamento" value={title} onChangeText={setTitle} />

					<AppInput label="Cliente" placeholder="Digite o nome do cliente" value={client} onChangeText={setClient} />

					<Text style={styles.sectionLabel}>Status</Text>
					<View style={styles.statusContainer}>
						{(["draft", "approved", "rejected"] as BudgetStatus[]).map((item) => (
							<TouchableOpacity
								key={item}
								style={[styles.statusButton, status === item && styles.statusButtonActive]}
								onPress={() => requestStatusChange(item)}>
								<Text style={[styles.statusButtonText, status === item && styles.statusButtonTextActive]}>
									{item === "draft" ? "Rascunho" : item === "approved" ? "Aprovado" : "Rejeitado"}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<View style={styles.card}>
					<Text style={styles.sectionTitle}>Adicionar serviço</Text>

					<AppInput
						label="Nome do serviço"
						placeholder="Ex.: Pintura"
						value={serviceName}
						onChangeText={setServiceName}
					/>

					<AppInput
						label="Quantidade"
						placeholder="Ex.: 2"
						keyboardType="numeric"
						value={serviceQuantity}
						onChangeText={setServiceQuantity}
					/>

					<AppInput
						label="Valor unitário"
						placeholder="Ex.: 350"
						keyboardType="numeric"
						value={serviceUnitPrice}
						onChangeText={setServiceUnitPrice}
					/>

					<AppButton title="Adicionar serviço" onPress={handleAddService} />
				</View>

				<View style={styles.card}>
					<Text style={styles.sectionTitle}>Serviços adicionados</Text>

					{services.length === 0 ? (
						<Text style={styles.emptyText}>Nenhum serviço adicionado ainda.</Text>
					) : (
						services.map((item) => (
							<ServiceItemRow key={item.id} item={item} onRemove={() => handleRemoveService(item.id)} />
						))
					)}
				</View>

				<View style={styles.card}>
					<Text style={styles.sectionTitle}>Resumo financeiro</Text>

					<AppInput
						label="Desconto (%)"
						placeholder="Ex.: 10"
						keyboardType="numeric"
						value={discount}
						onChangeText={setDiscount}
					/>

					<View style={styles.summaryRow}>
						<Text style={styles.summaryLabel}>Subtotal</Text>
						<Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
					</View>

					<View style={styles.summaryRow}>
						<Text style={styles.summaryLabel}>Desconto calculado</Text>
						<Text style={styles.summaryValue}>{formatCurrency(discountValue)}</Text>
					</View>

					<View style={styles.summaryRow}>
						<Text style={styles.totalLabel}>Total final</Text>
						<Text style={styles.totalValue}>{formatCurrency(total)}</Text>
					</View>
				</View>

				<View style={styles.footerButtons}>
					<AppButton title="Cancelar" variant="secondary" style={styles.footerButton} onPress={onCancel} />
					<AppButton title="Salvar orçamento" style={styles.footerButton} onPress={handleSave} />
				</View>
			</ScrollView>

			<ConfirmModal
				visible={showStatusConfirm}
				title="Alterar status"
				message="Deseja realmente alterar o status deste orçamento?"
				confirmText="Alterar"
				cancelText="Cancelar"
				onCancel={() => {
					setShowStatusConfirm(false);
					setNextStatus(null);
				}}
				onConfirm={confirmStatusChange}
			/>
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
	},
	content: {
		padding: spacing.lg,
		paddingBottom: spacing.xxxl,
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
	card: {
		backgroundColor: colors.card,
		borderRadius: 14,
		padding: spacing.lg,
		marginBottom: spacing.md,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.text,
		marginBottom: spacing.md,
	},
	sectionLabel: {
		fontSize: 14,
		fontWeight: "600",
		color: colors.text,
		marginBottom: spacing.sm,
	},
	statusContainer: {
		flexDirection: "row",
		gap: spacing.sm,
		flexWrap: "wrap",
	},
	statusButton: {
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.border,
		backgroundColor: colors.surface,
	},
	statusButtonActive: {
		backgroundColor: colors.primary,
		borderColor: colors.primaryDark,
	},
	statusButtonText: {
		color: colors.text,
		fontSize: 14,
		fontWeight: "600",
	},
	statusButtonTextActive: {
		color: colors.gray900,
	},
	emptyText: {
		color: colors.textSecondary,
		fontSize: 14,
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: spacing.sm,
	},
	summaryLabel: {
		fontSize: 14,
		color: colors.textSecondary,
	},
	summaryValue: {
		fontSize: 14,
		fontWeight: "600",
		color: colors.text,
	},
	totalLabel: {
		fontSize: 16,
		fontWeight: "700",
		color: colors.text,
	},
	totalValue: {
		fontSize: 18,
		fontWeight: "700",
		color: colors.primaryDark,
	},
	footerButtons: {
		flexDirection: "row",
		gap: spacing.sm,
		marginTop: spacing.sm,
	},
	footerButton: {
		flex: 1,
	},
});
