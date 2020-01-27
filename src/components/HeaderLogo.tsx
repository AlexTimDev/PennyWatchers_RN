import React from 'react';
import { Image } from 'react-native';

interface HeaderProps {
	margin: boolean;
}

export const HeaderLogo = ({ margin }: HeaderProps) => (
	<Image
		style={{ marginTop: margin ? 45 : 0, height: 45, width: 45 }}
		source={require('../images/logo.png')}
	/>
);
