import React, { Component } from 'react';
import { Alert, View, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import {
	Content,
	Form,
	Icon,
	Item,
	Text,
	H1,
	Picker,
	Container,
} from 'native-base';
import ImagePicker, { Options } from 'react-native-image-crop-picker';
import Permissions from 'react-native-permissions';
import Carousel from 'react-native-snap-carousel';
import { get } from 'lodash';

import { styles } from '../styles';
import { Person, Expense } from '../store/Expenses/types';
import {
	saveReceiptAction,
	getReceiptImagesAction,
	GetReceiptImagesAction,
	SaveReceiptAction,
	clearReceiptImagesAction,
	ClearReceiptImagesAction,
	deleteReceiptAction,
	DeleteReceiptAction,
} from '../store/Receipts/actions';
import {
	ReceiptRequest,
	ReceiptImagesRequest,
	ReceiptImageResponse,
	Receipt,
} from '../store/Receipts/types';
import { AppHeader } from '../components/AppHeader';
import { Loader } from '../components/Loader';
import { SliderEntry, sliderWidth, itemWidth } from '../components/SlideEntry';
import { getDate } from '../utilities/utilities';
import {
	StyledDateInput,
	StyledPicker,
	StyledTextArea,
	StyledButton,
	StyledSecondaryButton,
} from '../components/StyledInputs';
import { openModalAction, OpenModalAction } from '../store/Modal/actions';

const options: Options = {
	compressImageQuality: 0.75,
	compressImageMaxWidth: 1000,
	compressImageMaxHeight: 1000,
	multiple: true,
	includeBase64: true,
	mediaType: 'photo',
};

interface Props extends NavigationScreenProps {
	isLoading: boolean;
	people: Person[];
	username: string;
	password: string;
	success: boolean;
	images: ReceiptImageResponse[];
	imagesLoading: boolean;
	date: Date;

	// Dispatch props
	saveReceipt: (receiptRequest: ReceiptRequest) => SaveReceiptAction;
	getReceiptImages: (
		receiptImagesRequest: ReceiptImagesRequest,
	) => GetReceiptImagesAction;
	clearReceiptImages: () => ClearReceiptImagesAction;
	deleteReceipt: (
		username: string,
		password: string,
		ReceiptID: number,
	) => DeleteReceiptAction;
	openModal: (deleteAction: () => any) => OpenModalAction;
}

interface State {
	person: number | null;
	date: string;
	keywords: string;
	images: any[];
	loading: boolean;
}

export class UnconnectedAddEditReceipt extends Component<Props, State> {
	itemToEdit: Receipt = get(this.props.navigation, 'state.params.item');
	expenseItem: Expense = get(this.props.navigation, 'state.params.expenseItem');
	carouselRef: any = null;

	state = {
		person: !!this.itemToEdit
			? this.itemToEdit.PersonID
			: !!this.props.people && this.props.people.length
			? this.props.people[0].PersonID
			: null,
		date: !!this.itemToEdit // If we are editing use the date
			? getDate(this.itemToEdit.ReceiptDate)
			: !!this.expenseItem // If we came from an expense item use that date
			? getDate(this.expenseItem.ExpenseDate)
			: getDate(this.props.date), // Otherwise use global date
		keywords: !!this.itemToEdit ? decodeURI(this.itemToEdit.KeyWords) : '',
		images: [],
		loading: false,
	};

	componentDidMount() {
		const { username, password } = this.props;

		if (!!this.itemToEdit) {
			this.props.getReceiptImages({
				username,
				password,
				ReceiptID: this.itemToEdit.ReceiptID,
			});
		}
	}

	componentWillUnmount() {
		this.props.clearReceiptImages();
	}

	setCarouselRef = (c: any) => (this.carouselRef = c);

	onChangePerson = (person: number) => this.setState({ person });

	onChangeDate = (date: string) => this.setState({ date });

	onChangeKeywords = (keywords: string) => this.setState({ keywords });

	openImageDialog = () =>
		Alert.alert('Information', 'Select an Options', [
			{ text: 'Use Camera', onPress: this.openCamera },
			{ text: 'Select from gallery', onPress: this.openPicker },
		])

	openPicker = () => {
		this.setState({ loading: true });
		ImagePicker.openPicker(options)
			.then((images) => {
				// @ts-ignore -- Picker should always return an array
				const newImages = images.map((image: any) => ({
					ReceiptImage: image.data,
				}));
				const snapIndex = this.props.images.length + this.state.images.length;
				this.setState({
					images: [...this.state.images, ...newImages],
					loading: false,
				});
				this.carouselRef.snapToItem(snapIndex, false);
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	}

	openCamera = () => {
		this.setState({ loading: true });
		if (this.checkCamera()) {
			ImagePicker.openCamera(options)
				.then((image) => {
					// @ts-ignore -- Camera always returns single image type
					const newImage = { ReceiptImage: image.data };
					const snapIndex = this.props.images.length + this.state.images.length;
					this.setState({
						images: [...this.state.images, newImage],
						loading: false,
					});
					this.carouselRef.snapToItem(snapIndex, false);
				})
				.catch(() => {
					this.setState({ loading: false });
				});
		}
	}

	checkCamera = async () => {
		try {
			const response = await Permissions.request('camera');
			return response === 'authorized';
		} catch (err) {
			// TODO: Add an error popup if camera has an issue
			this.setState({ loading: false });
		}
		return false;
	}

	onSubmitPress = () => {
		Keyboard.dismiss();
		const data: ReceiptRequest = {
			receiptID: !!this.itemToEdit ? this.itemToEdit.ReceiptID : 0,
			username: this.props.username,
			password: this.props.password,
			date: this.state.date,
			keywords: this.state.keywords,
			photos: this.state.images,
		};
		if (this.expenseItem) {
			data.expenseID = this.expenseItem.ExpenseID;
		} else {
			data.personId = this.state.person || 0;
		}
		this.props.saveReceipt(data);
	}

	submitEnabled = () => {
		return !this.props.isLoading && !this.props.imagesLoading;
	}

	delete = () => {
		const { username, password } = this.props;
		if (!!this.itemToEdit) {
			this.props.openModal(() =>
				this.props.deleteReceipt(username, password, this.itemToEdit.ReceiptID),
			);
		}
	}

	renderItem({ item, index }: any) {
		return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
	}

	render() {
		return (
			<Container style={styles.wrapper}>
				<AppHeader
					navigation={this.props.navigation}
					back={true}
					delete={this.delete}
				/>
				<H1 style={styles.header}>
					{!!this.itemToEdit
						? 'Edit Receipt'
						: !!this.expenseItem
						? 'Add Receipt for Expense'
						: 'Add Receipt'}
				</H1>
				<Content>
					<Form style={styles.form}>
						<StyledDateInput
							date={this.state.date}
							onDateChange={this.onChangeDate}
							disabled={!!this.expenseItem}
						/>
						{!this.expenseItem && !get(this.itemToEdit, 'ExpenseID') ? (
							<StyledPicker
								selectedValue={this.state.person}
								onValueChange={this.onChangePerson}
								placeholder="Person"
								items={this.props.people.map((person) => (
									<Picker.Item
										key={person.PersonName}
										label={person.PersonName}
										value={person.PersonID}
									/>
								))}
							/>
						) : null}
						<StyledTextArea
							placeholder="Keywords"
							onChangeText={this.onChangeKeywords}
							value={this.state.keywords}
						/>
						<Item
							style={{
								...styles.input,
								flexGrow: 1,
								alignItems: 'flex-start',
								justifyContent: 'flex-start',
							}}
							rounded
						>
							<View style={{ flex: 1, flexDirection: 'column' }}>
								<View
									style={{
										margin: 10,
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Text style={{ fontSize: 14 }}>Images</Text>
									<TouchableOpacity
										onPress={this.openImageDialog}
										disabled={this.state.loading}
									>
										<Icon
											type="SimpleLineIcons"
											name="plus"
											style={{ color: 'orange' }}
										/>
									</TouchableOpacity>
								</View>
								<View style={{ alignSelf: 'center', flex: 1 }}>
									{!this.props.imagesLoading ? (
										<Carousel
											hasParallaxImages
											ref={this.setCarouselRef}
											data={[...this.props.images, ...this.state.images]}
											renderItem={this.renderItem}
											sliderWidth={sliderWidth}
											itemWidth={itemWidth}
											inactiveSlideScale={0.85}
											inactiveSlideOpacity={0.9}
											enableMomentum={true}
										/>
									) : (
										<Loader />
									)}
								</View>
							</View>
						</Item>
						<StyledButton
							disabled={!this.submitEnabled()}
							onPress={this.onSubmitPress}
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
	config: { people, isLoading, success },
	session: { username, password },
	currentReceipt: { images, isLoading: imagesLoading },
	data: { date },
}: any) => ({
	people,
	isLoading,
	username,
	password,
	success,
	images,
	imagesLoading,
	date,
});

const mapDispatchToProps = (dispatch: any) => ({
	saveReceipt: (receiptRequest: ReceiptRequest) =>
		dispatch(saveReceiptAction(receiptRequest)),
	getReceiptImages: (receiptImagesRequest: ReceiptImagesRequest) =>
		dispatch(getReceiptImagesAction(receiptImagesRequest)),
	clearReceiptImages: () => dispatch(clearReceiptImagesAction()),
	deleteReceipt: (username: string, password: string, ReceiptID: number) =>
		dispatch(deleteReceiptAction(username, password, ReceiptID)),
	openModal: (deleteAction: () => any) =>
		dispatch(
			openModalAction({
				message: 'Are you sure?',
				modalType: 'delete',
				okayAction: deleteAction,
			}),
		),
});

export const AddEditReceipt = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedAddEditReceipt);
