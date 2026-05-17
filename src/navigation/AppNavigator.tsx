import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator }
    from '@react-navigation/native-stack'

import DashboardScreen from '../screens/DashboardScreen'

import AddExpenseScreen from '../screens/AddExpenseScreen'

import AddIncomeScreen from '../screens/AddIncomeScreen'

import AddAssetScreen from '../screens/AddAssetScreen'

import AddLiabilityScreen from '../screens/AddLiabilityScreen'

import AllocationEditorScreen from '../screens/AllocationEditorScreen'



const Stack = createNativeStackNavigator()

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: '#0F1419' },
                    headerTintColor: '#5B8DEF',
                    headerTitleStyle: { fontWeight: '600', fontSize: 17 },
                    headerShadowVisible: false,
                    contentStyle: { backgroundColor: '#0F1419' },
                }}
            >
                <Stack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="AddExpense"
                    component={AddExpenseScreen}
                    options={{ title: 'Add Expense' }}
                />

                <Stack.Screen
                    name="AddIncome"
                    component={AddIncomeScreen}
                    options={{ title: 'Add Income' }}
                />

                <Stack.Screen
                    name="AddAsset"
                    component={AddAssetScreen}
                    options={{ title: 'Add Asset' }}
                />

                <Stack.Screen
                    name="AddLiability"
                    component={AddLiabilityScreen}
                    options={{ title: 'Add Liability' }}
                />

                <Stack.Screen
                    name="AllocationEditor"
                    component={AllocationEditorScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>

        </NavigationContainer>
    )
}