import { Button, StyleSheet, Text, View } from "react-native";
import { Container } from "../components/Container";
import { useCredit } from "../hooks/useCredit";

export const Home = ({ navigation }) => {
    const { credits } = useCredit();

    return (
        <Container>
            <Text style={styles.credit}>Créditos: {credits}</Text>
            <View style={styles.buttons}>
                <Button
                    title="Jogo Roleta!"
                    onPress={() => navigation.navigate("RouletteGame")}
                />
                <Button
                    title="Ache o Diamante!"
                    onPress={() => navigation.navigate("FindDiamondGame")}
                />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '15%'
    },
    credit: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    }
});
