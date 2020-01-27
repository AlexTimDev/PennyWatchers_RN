import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { logoutAction, LogoutAction } from '../store/Auth/actions';
import {
	initializeAction,
	InitializeAction,
} from '../store/Initialize/actions';

interface Props extends NavigationScreenProps {
	loggedIn: boolean;
	isLoading: boolean;

	// Dispatch props
	logout: () => LogoutAction;
	initialize: () => InitializeAction;
}

export class UnconnectedInitializer extends Component<Props> {
	componentDidMount() {
		this.props.initialize();
	}

	render() {
		return (
			<View
				style={{
					backgroundColor: '#FFF',
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Image source={require('../images/loader.gif')} />
				<Text>Penny Watchers</Text>
			</View>
		);
	}
}

const mapStateToProps = ({ session: { session, isLoading } }: any) => ({
	loggedIn: session.Validated,
	isLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
	logout: () => dispatch(logoutAction()),
	initialize: () => dispatch(initializeAction()),
});

export const Initializer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedInitializer);
