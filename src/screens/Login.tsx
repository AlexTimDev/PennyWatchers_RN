import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Switch, TouchableOpacity } from 'react-native';
import { Button, Content, Form, Text, H1, Container } from 'native-base';

import { styles } from '../styles';
import { loginAction, LoginAction } from '../store/Auth/actions';
import { NavigationScreenProps } from 'react-navigation';
import {
	StyledTextInput,
	StyledButton,
	StyledSecondaryButton,
} from '../components/StyledInputs';

interface Props extends NavigationScreenProps {
	isLoading: boolean;
	username: string;
	password: string;

	// Dispatch props
	login: (username: string, password: string, remember: boolean) => LoginAction;
}

interface State {
	username: string;
	password: string;
	remember: boolean;
}

class UnconnectedLogin extends Component<Props, State> {
	state = {
		username: this.props.username || '',
		password: this.props.password || '',
		remember: !!this.props.username && !!this.props.password,
	};

	onChangeUsername = (username: string) => this.setState({ username });

	onChangePassword = (password: string) => this.setState({ password });

	onChangeRemember = () => this.setState({ remember: !this.state.remember });

	onSubmitPress = () =>
		this.props.login(
			this.state.username,
			this.state.password,
			this.state.remember,
		)

	isButtonDisabled = () =>
		this.props.isLoading || !this.state.username || !this.state.password

	navigateToSignUp = () => this.props.navigation.navigate('SignUp');

	navigateToForgotPassword = () =>
		this.props.navigation.navigate('ForgotPassword')

	render() {
		const { isLoading } = this.props;
		return (
			<Container style={styles.wrapper}>
				<Content contentContainerStyle={styles.container}>
					<H1 style={styles.header}>Penny Watchers</H1>
					<Form style={styles.form}>
						<StyledTextInput
							placeholder="Username"
							value={this.state.username}
							onChangeText={this.onChangeUsername}
						/>
						<StyledTextInput
							placeholder="Password"
							value={this.state.password}
							onChangeText={this.onChangePassword}
							secureTextEntry={true}
						/>
						<View
							style={{
								paddingVertical: 20,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text style={{ paddingRight: 10 }}>Remember Password</Text>
							<Switch
								value={this.state.remember}
								trackColor={{ false: '#DDD', true: '#6dbbc2' }}
								onValueChange={this.onChangeRemember}
							/>
						</View>
					</Form>
					<StyledButton
						onPress={this.onSubmitPress}
						disabled={this.isButtonDisabled()}
						text="Login"
						loading={isLoading}
					/>
					<StyledSecondaryButton
						onPress={this.navigateToSignUp}
						text="Signup"
					/>
					<TouchableOpacity onPress={this.navigateToForgotPassword}>
						<Text style={styles.buttonSecondaryTextStyle}>Forgot Password</Text>
					</TouchableOpacity>
					<Text style={{ fontSize: 8 }}>v2.0.1 P1</Text>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({
	session: { session, isLoading, username, password },
}: any) => ({
	session,
	isLoading,
	username,
	password,
});

const mapDispatchToProps = (dispatch: any) => ({
	login: (username: string, password: string, remember: boolean) =>
		dispatch(loginAction({ username, password, remember })),
});

export const Login = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedLogin);
