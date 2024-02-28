import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Spinner from '../../assets/svgs/spinner.svg';
import { Container } from '../../components/Container';
import { useCredit } from '../../hooks/useCredit';

export const RouletteGame = () => {
    const rotation = useSharedValue(0);
    const [currentAngle, setCurrentAngle] = useState(0);
    const [currentColor, setCurrentColor] = useState('');
    const [playing, setPlaying] = useState(false);

    const { credits, setCredits } = useCredit();

    const easing = Easing.bezier(0.23, 1, 0.32, 1);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                rotateZ: `${rotation.value}deg`
            }]
        };
    });

    useEffect(() => {
        if (playing) {
            if (currentAngle <= 27 || currentAngle >= 328) {
                setCredits(credits - 50);
                setCurrentColor('Lilás');
            } else if (currentAngle <= 87 && currentAngle >= 28) {
                setCredits(credits + 100);
                setCurrentColor('Verde');
            } else if (currentAngle <= 147 && currentAngle >= 88) {
                setCredits(credits + 1000);
                setCurrentColor('Amarelo');
            } else if (currentAngle <= 207 && currentAngle >= 148) {
                setCredits(0);
                setCurrentColor('Vermelho');
            } else if (currentAngle <= 267 && currentAngle >= 208) {
                setCredits(credits - 50);
                setCurrentColor('Azul');
            } else if (currentAngle <= 327 && currentAngle >= 268) {
                setCredits(credits + 100);
                setCurrentColor('Rosa');
            }
        }
    }, [currentAngle]);

    const handleAngle = (value) => {
        setCurrentAngle(parseInt(value.toFixed(), 10));
    };

    const handlePress = () => {
        if (credits < 50) {
            Alert.alert("Sem créditos suficiente!");
            return;
        }

        setCredits(credits - 50);
        setPlaying(true);

        const minForce = 5000;
        const maxForce = 10000;
        const randomForce = Math.floor(Math.random() * (maxForce - minForce + 1)) + minForce;

        const minDuration = 2000;
        const maxDuration = 5000;
        const randomDuration = Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;

        rotation.value = withTiming(
            Math.abs(randomForce) / 7 + rotation.value,
            {
                duration: randomDuration,
                easing
            },
            () => {
                runOnJS(handleAngle)(rotation.value % 360);
            },
        );
    };

    return (
        <Container>
            <Text style={styles.credit}>Créditos: {credits}</Text>
            <View style={styles.pointer} />
            <Animated.View style={animatedStyles}>
                <Spinner width={380} height={380} />
            </Animated.View>
            <Button onPress={handlePress} title='rolar -50' />
            <Text>Current Angle: {currentAngle}</Text>
            <Text>Current Color: {currentColor}</Text>
        </Container>
    );
};

const styles = StyleSheet.create({
    pointer: {
        width: 10,
        height: 30,
        backgroundColor: 'black',
        position: 'absolute',
        top: 140,
        borderWidth: 2,
        borderColor: 'white',
        zIndex: 6000
    },
    credit: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});
