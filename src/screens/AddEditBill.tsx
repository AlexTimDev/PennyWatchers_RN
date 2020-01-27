import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Form, H1, Container, Text } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { get } from 'lodash';

import { styles } from '../styles';
import { AppHeader } from '../components/AppHeader';
import {
	StyledTextInput,
	StyledButton,
	StyledMoneyInput,
	StyledSecondaryButton,
} from '../components/StyledInputs';
import { BillRequest } from '../store/Bills/types';
import {
	saveBillAction,
	deleteBillAction,
	DeleteBillAction,
} from '../store/Bills/actions';
import { openModalAction, OpenModalAction } from '../store/Modal/actions';
import { formatDollar } from '../utilities/utilities';

interface Props extends NavigationScreenProps {
	isLoading: boolean;
	username: string;
	password: string;

	saveBill: (billRequest: BillRequest) => void;
	deleteBill: (
		username: string,
		password: string,
		billID: number,
	) => DeleteBillAction;
	openModal: (deleteAction: () => any) => OpenModalAction;
}

interface State {
	name: string;
	amount: string;
	dueDate: string;
	dayValid: boolean;
}

export class UnconnectedAddEditBill extends Component<Props, State> {
	itemToEdit: BillRequest = get(
		this.props.navigation,
		'state.params.item',
		null,
	);

	state = {
		name: !!this.itemToEdit ? this.itemToEdit.BillName : '',
		amount: !!this.itemToEdit
			? formatDollar(this.itemToEdit.BillAmount)
			: '$0.00',
		dueDate: !!this.itemToEdit ? this.itemToEdit.DueDate.toString() : '',
		dayValid: true,
	};

	onChangeName = (name: string) => this.setState({ name });
	onChangeAmount = (amount: string) => this.setState({ amount });
	onChangeDueDate = (dueDate: string) => {
		const dayValid = parseInt(dueDate, 10) > 0 && parseInt(dueDate, 10) <= 31;
		this.setState({ dueDate, dayValid });
	}

	onSubmitPress = () => {
		const { username, password } = this.props;
		const { name, amount, dueDate } = this.state;
		this.props.saveBill({
			username,
			password,
			BillID: !!this.itemToEdit ? this.itemToEdit.BillID : 0,
			BillName: name,
			BillAmount: parseFloat(amount.replace(/[^0-9.]/g, '')),
			DueDate: parseInt(dueDate, 10),
		});
	}

	delete = () => {
		const { username, password } = this.props;
		this.props.openModal(() =>
			this.props.deleteBill(username, password, this.itemToEdit.BillID),
		);
	}

	buttonDisabled = () =>
		!this.state.amount ||
		!this.state.name ||
		!this.state.dueDate ||
		!this.state.dayValid

	render() {
		return (
			<Container>
				<AppHeader
					navigation={this.props.navigation}
					back={true}
					delete={this.itemToEdit && this.delete}
				/>
				<H1 style={styles.header}>
					{!!this.itemToEdit ? 'Edit Bill Reminder' : 'Add a Bill Reminder'}
				</H1>
				<Content>
					<Form style={styles.form}>
						<StyledTextInput
							placeholder="Name"
							value={this.state.name}
							onChangeText={this.onChangeName}
						/>
						<StyledMoneyInput
							placeholder="Amount"
							value={this.state.amount}
							onChangeText={this.onChangeAmount}
						/>
						<StyledTextInput
							placeholder="Day of the Month"
							value={this.state.dueDate}
							onChangeText={this.onChangeDueDate}
							keyboardType="numeric"
						/>
						{!this.state.dayValid && !!this.state.dueDate ? (
							<Text style={styles.errorMessage}>Must be between 1 and 31</Text>
						) : null}
						<StyledButton
							onPress={this.onSubmitPress}
							disabled={this.buttonDisabled()}
							loading={this.props.isLoading}
							text="Save"
						/>
						{!!this.itemToEdit ? (
							<StyledSecondaryButton onPress={this.delete} text="Delete" />
						) : null}
					</Form>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({
	bills: { isLoading },
	session: { username, password },
}: any) => ({ isLoading, username, password });

const mapDispatchToProps = (dispatch: any) => ({
	saveBill: (billRequest: BillRequest) => dispatch(saveBillAction(billRequest)),
	deleteBill: (username: string, password: string, billID: number) =>
		dispatch(deleteBillAction(username, password, billID)),
	openModal: (deleteAction: () => any) =>
		dispatch(
			openModalAction({
				message: 'Are you sure?',
				modalType: 'delete',
				okayAction: deleteAction,
			}),
		),
});

export const AddEditBill = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedAddEditBill);
