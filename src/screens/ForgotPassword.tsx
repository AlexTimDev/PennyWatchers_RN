import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { Content, Form, H1, Container, Text } from 'native-base';

import { styles } from '../styles';
import {
	forgotPasswordAction,
	ForgotPasswordAction,
} from '../store/Auth/actions';
import { NavigationScreenProps } from 'react-navigation';
import { StyledTextInput, StyledButton } from '../components/StyledInputs';
import { colors, emailRegex } from '../constants';

interface Props extends NavigationScreenProps {
	isLoading: boolean;
	email: string;

	// Dispatch props
	forgotPassword: (email: string) => ForgotPasswordAction;
}

interface State {
	email: string;
	emailValid: boolean | null;
}

class UnconnectedForgotPassword extends Component<Props, State> {
	state = {
		email: '',
		emailValid: null,
	};

	onChangeEmail = (email: string) => {
		this.setState({
			email,
			emailValid: !emailRegex.test(email),
		});
	}

	onSubmitPress = () => {
		Keyboard.dismiss();
		this.props.forgotPassword(this.state.email);
	}

	isButtonDisabled = () => this.props.isLoading || !!this.state.emailValid;

	render() {
		const { isLoading } = this.props;
		return (
			<Container style={styles.wrapper}>
				<Content contentContainerStyle={styles.container}>
					<H1 style={styles.header}>Penny Watchers</H1>
					<Form style={styles.form}>
						<StyledTextInput
							placeholder="Email"
							value={this.state.email}
							onChangeText={this.onChangeEmail}
							autoCapitalize="none"
							keyboardType="email-address"
						/>
						{this.state.emailValid ? (
							<Text style={styles.errorMessage}>
								Please enter a valid email
							</Text>
						) : null}
					</Form>
					<StyledButton
						onPress={this.onSubmitPress}
						disabled={this.isButtonDisabled()}
						loading={isLoading}
						text="Forgot Password"
					/>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
	forgotPassword: (email: string) => dispatch(forgotPasswordAction(email)),
});

export const ForgotPassword = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedForgotPassword);
