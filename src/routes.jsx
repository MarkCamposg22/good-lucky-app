import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './views/Home';
import { RouletteGame } from './views/games/RouletteGame';
import { FindDiamondGame } from './views/games/FindDiamondGame';

const Stack = createNativeStackNavigator();

export const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: "Início" }}
                />
                <Stack.Screen
                    name="RouletteGame"
                    component={RouletteGame}
                    options={{ title: "Jogo Roleta!" }}
                />
                <Stack.Screen
                    name="FindDiamondGame"
                    component={FindDiamondGame}
                    options={{ title: "Ache o Diamante!" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
