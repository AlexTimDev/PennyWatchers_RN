/**
 * FadeView
 * View Component that can be used to handle fade animations
 */
import React from 'react';
import { Animated, ViewStyle } from 'react-native';

interface FadeViewState {
	fadeAnim: Animated.Value;
}

interface FadeViewProps {
	style?: ViewStyle;
	children?: JSX.Element | JSX.Element[];
}

export class FadeView extends React.Component<FadeViewProps, FadeViewState> {
	state = {
		fadeAnim: new Animated.Value(0), // Initial animation value
	};

	componentDidMount() {
		// Animate over time
		Animated.timing(this.state.fadeAnim, {
			toValue: 1,
			duration: 800,
		}).start();
	}

	render() {
		const { fadeAnim } = this.state;
		const { style, children, ...rest } = this.props;
		return (
			<Animated.View
				style={{
					...style,
					opacity: fadeAnim,
				}}
				{...rest}
			>
				{children}
			</Animated.View>
		);
	}
}
