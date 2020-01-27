import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Icon } from 'native-base';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

import { logoutAction, LogoutAction } from '../store/Auth/actions';
import { HeaderLogo } from './HeaderLogo';

interface Props extends NavigationScreenProps {
	isLoggedIn: boolean;
	back?: boolean;
	logout: () => LogoutAction;
	delete: () => void;
}

export class UnconnectedHeader extends Component<Props> {
	logout = () => {
		this.props.logout();
		this.props.navigation.navigate('Login');
	}

	// Used to navigate back from the modals.  goBack closes the modals.
	back = () => this.props.navigation.goBack();

	onSearchPress = () => {
		if (this.props.navigation.state.routeName !== 'Search') {
			this.props.navigation.navigate('Search');
		}
	}

	render() {
		return (
			<Header
				androidStatusBarColor="#666"
				noShadow={false}
				style={styles.header}
			>
				<Left style={{ flex: 1 }}>
					{this.props.back ? (
						<TouchableOpacity style={{ padding: 10 }} onPress={this.back}>
							<Icon
								type="SimpleLineIcons"
								name="arrow-left"
								style={{ fontSize: 20 }}
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity style={{ padding: 10 }} onPress={this.logout}>
							<Icon
								type="SimpleLineIcons"
								name="logout"
								style={{ fontSize: 20 }}
							/>
						</TouchableOpacity>
					)}
				</Left>
				<Body style={{ flex: 1, alignItems: 'center', padding: 10 }}>
					<HeaderLogo margin={false} />
				</Body>
				<Right style={{ flex: 1 }}>
					{this.props.delete ? (
						<TouchableOpacity
							style={{ padding: 10 }}
							onPress={this.props.delete}
						>
							<Icon
								type="SimpleLineIcons"
								name="trash"
								style={{ fontSize: 20 }}
							/>
						</TouchableOpacity>
					) : null}
					<TouchableOpacity
						style={{ padding: 10 }}
						onPress={this.onSearchPress}
					>
						<Icon
							type="SimpleLineIcons"
							name="magnifier"
							style={{ fontSize: 20 }}
						/>
					</TouchableOpacity>
				</Right>
			</Header>
		);
	}
}

const mapStateToProps = ({ session }: any) => ({
	isLoggedIn: !!session.session.Validated,
});

const mapDispatchToProps = (dispatch: any) => ({
	logout: () => dispatch(logoutAction()),
});

export const AppHeader = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedHeader);

const styles = StyleSheet.create({
	header: {
		padding: 10,
		height: 75,
		backgroundColor: '#F8F8F8',
	},
});
