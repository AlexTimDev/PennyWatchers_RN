import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { H1, Icon } from 'native-base';

interface Props {
	navigateToAdd: () => void;
	title: string;
}

export const HeaderWithAddIcon = (props: Props) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				marginTop: 10,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<H1>{props.title}</H1>
			<TouchableOpacity onPress={props.navigateToAdd}>
				<Icon
					type="SimpleLineIcons"
					name="plus"
					style={{ color: 'orange', marginLeft: 10 }}
				/>
			</TouchableOpacity>  
		</View>
	);
};
