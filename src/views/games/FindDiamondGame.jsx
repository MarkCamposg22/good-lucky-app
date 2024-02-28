import { Alert, StyleSheet, Text, View } from "react-native"
import { useCredit } from '../../hooks/useCredit';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect, useState } from "react";

const Card = ({ value }) => {
    const { credits, setCredits } = useCredit();
    const spin = useSharedValue(0);

    const rStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(spin.value, [0, 1], [0, 180]);
        return {
            transform: [{
                rotateY: withTiming(`${spinValue}deg`, { duration: 500 })
            }]
        };
    });

    const bStyle = useAnimatedStyle(() => {
        const spinValue = interpolate(spin.value, [0, 1], [180, 360]);
        return {
            transform: [{
                rotateY: withTiming(`${spinValue}deg`, { duration: 500 })
            }],
        };
    });

    return (
        <View
            style={styles.card}
            onTouchEnd={() => {
                if (credits < 50) {
                    Alert.alert("Sem créditos suficiente!");
                    return;
                }

                spin.value = spin.value ? 0 : 1;

                setCredits(credits - 50);

                if (value === '💎') {
                    console.log('Achou o diamante')
                    setCredits(credits + 5000);
                }
            }}
        >
            <Animated.View style={[styles.front, rStyle]} />
            <Animated.View style={[styles.back, bStyle]}>
                <Text style={styles.icon}>{value}</Text>
            </Animated.View>
        </View>
    );
};

export const FindDiamondGame = () => {
    const { credits } = useCredit();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        handleLocationDiamond();
    }, []);

    const handleLocationDiamond = () => {
        const newCards = [];
        const randomPosition = Math.floor(Math.random() * 15);
        for (let i = 0; i <= 14; i++) {
            if (i === randomPosition) {
                console.log(randomPosition);
                newCards[i] = '💎';
            } else {
                newCards[i] = '';
            }
        }
        setCards(newCards);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.credits}>Créditos: {credits}</Text>
            <Text>-50 por tentativa</Text>
            <View style={styles.cards}>
                {cards.map((value, index) => {
                    return (
                        <Card key={index} value={value} />
                    );
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
    },
    credits: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    card: {},
    icon: {
        fontSize: 36
    },
    back: {
        height: 100,
        width: 100,
        backgroundColor: "#FF8787",
        borderRadius: 16,
        backfaceVisibility: "hidden",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },
    front: {
        height: 100,
        width: 100,
        backgroundColor: "#D8D9CF",
        borderRadius: 16,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    cards: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        justifyContent: 'center',
        marginTop: 70,
    }
});
