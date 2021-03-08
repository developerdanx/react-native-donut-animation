import React, { MutableRefObject } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

interface CountdownDonutProps {
  percentage: number;
  radius: number;
  strokeWidth?: number;
  duration: number;
  color: string;
  delay: number;
  textColor?: string;
  max: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const CountdownDonut: React.FC<CountdownDonutProps> = ({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = percentage * 1000,
  color = 'blue',
  delay = 0,
  textColor,
  max = 100,
}) => {
  const animatedValue = React.useRef(new Animated.Value(percentage)).current;
  const circleRef = React.useRef() as React.MutableRefObject<undefined>;
  const inputRef = React.useRef() as React.MutableRefObject<undefined>;

  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;

  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      animation(toValue === percentage ? 0 : percentage);
    });
  };

  React.useEffect(() => {
    animation(0);

    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPercentage = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPercentage) / 100;

        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }

      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
    });
    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, percentage]);

  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx='50%'
            cy='50%'
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill='transparent'
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx='50%'
            cy='50%'
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill='transparent'
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap='round'
          />
        </G>
      </Svg>
      <AnimatedInput
        ref={inputRef}
        underlineColorAndroid='transparent'
        editable={false}
        defaultValue='o'
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2, color: textColor ?? color },
          { fontWeight: 'bold', textAlign: 'center' },
        ]}
      />
    </View>
  );
};

export default CountdownDonut;

const styles = StyleSheet.create({});
