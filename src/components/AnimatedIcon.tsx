import React from 'react';
import { Animated, Easing, View } from 'react-native';
import { Icon } from 'native-base';

const AIcon = Animated.createAnimatedComponent(Icon);

interface Props {
	name: string;
	type: string;
	color: string;
}

interface State {
	size: Animated.Value;
}

export class AnimatedIcon extends React.Component<Props, State> {
	state = {
		size: new Animated.Value(5),
	};

	componentDidMount() {
		Animated.spring(this.state.size, { toValue: 50 }).start();
	}

	render() {
		const { name, type, color } = this.props;
		return (
			<View style={{ minHeight: 60 }}>
				<AIcon
					name={name}
					type={type}
					style={{
						color,
						padding: 20,
						fontSize: this.state.size,
					}}
				/>
			</View>
		);
	}
}
