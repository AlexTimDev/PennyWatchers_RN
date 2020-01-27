import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Content, Form, Text, H1, Container } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';

import { styles } from '../styles';
import { signupAction, SignupAction } from '../store/Auth/actions';
import { SignupRequest } from '../store/Auth/types';
import {
	StyledTextInput,
	StyledButton,
	StyledSecondaryButton,
} from '../components/StyledInputs';
import { emailRegex, colors } from '../constants';

interface Props extends NavigationScreenProps {
	isLoading: boolean;

	// Dispatch props
	signup: (signupRequest: SignupRequest) => SignupAction;
}

interface State extends SignupRequest {
	emailValid: boolean | null;
}

class UnconnectedSignUp extends Component<Props, State> {
	state = {
		Username: '',
		Password: '',
		FirstName: '',
		LastName: '',
		Email: '',
		emailValid: null,
	};

	onChangeUsername = (Username: string) => this.setState({ Username });

	onChangePassword = (Password: string) => this.setState({ Password });

	onChangeFirstName = (FirstName: string) => this.setState({ FirstName });

	onChangeLastName = (LastName: string) => this.setState({ LastName });

	onChangeEmail = (Email: string) =>
		this.setState({
			Email,
			emailValid: !emailRegex.test(Email),
		})

	onSubmitPress = () => this.props.signup(this.state);

	navigateToLogin = () => this.props.navigation.navigate('Login');

	isButtonDisabled = () =>
		!this.state.Username ||
		!this.state.Password ||
		!this.state.FirstName ||
		!this.state.LastName ||
		!this.state.Email ||
		this.state.emailValid

	render() {
		const { isLoading } = this.props;
		return (
			<Container style={styles.wrapper}>
				<Content contentContainerStyle={styles.container}>
					<H1 style={styles.header}>Penny Watchers</H1>
					<Form style={styles.form}>
						<StyledTextInput
							placeholder="Username"
							value={this.state.Username}
							onChangeText={this.onChangeUsername}
						/>
						<StyledTextInput
							placeholder="Password"
							value={this.state.Password}
							onChangeText={this.onChangePassword}
							secureTextEntry={true}
						/>
						<StyledTextInput
							placeholder="First Name"
							value={this.state.FirstName}
							onChangeText={this.onChangeFirstName}
						/>
						<StyledTextInput
							placeholder="Last Name"
							value={this.state.LastName}
							onChangeText={this.onChangeLastName}
						/>
						<StyledTextInput
							placeholder="Email"
							value={this.state.Email}
							onChangeText={this.onChangeEmail}
							autoCapitalize="none"
							keyboardType="email-address"
						/>
						{this.state.emailValid ? (
							<Text
								style={{
									textAlign: 'center',
									fontSize: 10,
									color: colors.ERROR,
								}}
							>
								Please enter a valid email
							</Text>
						) : null}
					</Form>
					<StyledButton
						onPress={this.onSubmitPress}
						disabled={this.isButtonDisabled()}
						text="Sign Up"
						loading={isLoading}
					/>
					<StyledSecondaryButton onPress={this.navigateToLogin} text="Login" />
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
	signup: (signupRequest: SignupRequest) =>
		dispatch(signupAction(signupRequest)),
});

export const SignUp = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedSignUp);
