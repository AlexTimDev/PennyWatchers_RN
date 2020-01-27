import React from 'react';
import { TextInput, Image, StyleSheet } from 'react-native';

interface LoaderProps {
	size?: 'small' | 'large';
}
export const Loader = (props: LoaderProps) => (
	<Image
		style={{ height: 30, width: 30 }}
		source={require('../images/loader.gif')}
	/>
);
