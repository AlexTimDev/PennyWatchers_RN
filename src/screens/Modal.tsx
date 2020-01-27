import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Modal as RNModal, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'native-base';
import { get } from 'lodash';

import { ModalMessage } from '../store/Modal/types';
import { closeModalAction, CloseModalAction } from '../store/Modal/actions';
import { AnimatedIcon } from '../components/AnimatedIcon';

interface Props extends ModalMessage {
	closeModal: () => CloseModalAction;
}

const ModalIcon = ({ modalType }: any) => {
	switch (modalType) {
		case 'success':
			return <AnimatedIcon type="SimpleLineIcons" name="check" color="green" />;
		case 'error':
			return <AnimatedIcon type="SimpleLineIcons" name="shield" color="red" />;
		case 'delete':
			return <AnimatedIcon type="SimpleLineIcons" name="trash" color="white" />;
		default:
			return null;
	}
};

class UnconnectedModal extends Component<Props> {
	okay = () => {
		if (!!this.props.okayAction) {
			this.props.okayAction();
		}
		this.props.closeModal();
	}

	cancel = () => {
		if (!!this.props.cancelAction) {
			this.props.cancelAction();
		}
		this.props.closeModal();
	}

	renderButtons = () => {
		if (this.props.modalType === 'progress') {
			return <Image source={require('../images/loader.gif')} />;
		}
		if (this.props.modalType === 'delete' || !!this.props.cancelAction) {
			return (
				<View style={{ flexDirection: 'row' }}>
					<Button
						style={{ ...styles.buttonStyle, marginRight: 20 }}
						onPress={this.cancel}
						warning
						bordered
					>
						<Text>{get(this.props, 'cancelLabel', 'No')}</Text>
					</Button>
					<Button style={styles.buttonStyle} onPress={this.okay} warning>
						<Text>{get(this.props, 'okayLabel', 'Yes')}</Text>
					</Button>
				</View>
			);
		}

		return (
			<Button style={styles.buttonStyle} onPress={this.okay} warning>
				<Text>{get(this.props, 'okayLabel', 'OK')}</Text>
			</Button>
		);
	}

	render() {
		const modalVisible = !!this.props.message;
		return (
			<RNModal animationType="fade" transparent={true} visible={modalVisible}>
				<View style={[styles.modalContainer, styles.modalBackgroundStyle]}>
					<View style={styles.innerContainerTransparentStyle}>
						<ModalIcon modalType={this.props.modalType} />
						<Text style={{ color: 'white', paddingBottom: 40 }}>
							{this.props.message}
						</Text>
						<View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
							{this.renderButtons()}
						</View>
					</View>
				</View>
			</RNModal>
		);
	}
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#333',
	},
	modalBackgroundStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	innerContainerTransparentStyle: {
		width: 300,
		padding: 20,
		backgroundColor: '#333',
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonStyle: {
		width: 120,
		justifyContent: 'center',
	},
});

const mapStateToProps = ({ modal }: any) => ({
	...modal,
});

const mapDispatchToProps = (dispatch: any) => ({
	closeModal: () => dispatch(closeModalAction()),
});

export const Modal = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedModal);
