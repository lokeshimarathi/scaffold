import { View, StyleSheet, Text, ScrollView } from 'react-native';
import {
  Scaffold,
  type StatusBarProps,
  type AppBarProps,
} from '@lokeshmarathi/scaffold';

export default function App() {
  const statusBarConfig: StatusBarProps = {
    backgroundColor: '#007AFF',
    style: 'light-content',
    height: 60,
    title: 'My App',
    titleStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    contentAlignment: 'center',
    elevated: true,
  };

  const appBarConfig: AppBarProps = {
    height: 56,
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
    verticalAlignment: 'center',
    horizontalJustification: 'space-between',
    elevated: true,
    leading: {
      backIcon: <Text style={{ fontSize: 24 }}>☰</Text>,
      title: 'Menu',
      titleStyle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
      },
      paddingHorizontal: 8,
      paddingVertical: 0,
      gap: 8,
    },
    center: (
      <View style={styles.centerContainer}>
        <Text style={styles.centerTitle}>Scaffold Package</Text>
      </View>
    ),
    trailing: (
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Text style={styles.trailingIcon}>🔍</Text>
        <Text style={styles.trailingIcon}>⋯</Text>
      </View>
    ),
    rtl: false,
    ltr: true,
  };

  return <Scaffold statusBar={statusBarConfig} appBar={appBarConfig} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  trailingIcon: {
    fontSize: 18,
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 13,
    color: '#555555',
    marginVertical: 4,
  },
});
