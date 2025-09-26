import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";
import { Text, View } from "react-native";

type BalanceCardProps = {
  summary: {
    balance: number | string;
    total_income: number | string;
    total_expense: number | string;
  };
};

export const BalanceCard = ({ summary }: BalanceCardProps) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>
        ₹
        {typeof summary.balance === "string"
          ? parseFloat(summary.balance).toFixed(2)
          : summary.balance.toFixed(2)}
      </Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +₹
            {typeof summary.total_income === "string"
              ? parseFloat(summary.total_income).toFixed(2)
              : summary.total_income.toFixed(2)}
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -₹
            {typeof summary.total_expense === "string"
              ? Math.abs(parseFloat(summary.total_expense)).toFixed(2)
              : Math.abs(summary.total_expense).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
