/**
 * SlideEntry component for use in Snap Carousel
 * Example used from source library
 * https://github.com/archriss/react-native-snap-carousel/blob/master/example/src/styles/SliderEntry.style.js
 */
import React, { Component } from 'react';
import {
	View,
	Modal,
	Image,
	TouchableOpacity,
	StyleSheet,
	Platform,
	Dimensions,
} from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import PhotoView from 'react-native-photo-view-ex';
import { Icon, Text } from 'native-base';

const { width, height } = Dimensions.get('window');

interface Props {
	data: any;
	even?: boolean;
	parallax?: boolean;
	parallaxProps?: any;
}
export class SliderEntry extends Component<Props> {
	state = {
		modalVisible: false,
	};

	get image() {
		const { data, parallax, parallaxProps, even } = this.props;

		return parallax ? (
			<ParallaxImage
				source={{ uri: 'data:image/jpeg;base64,' + data.ReceiptImage }}
				containerStyle={[
					styles.imageContainer,
					even ? styles.imageContainerEven : {},
				]}
				style={styles.image}
				parallaxFactor={0.35}
				showSpinner={true}
				spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
				{...parallaxProps}
			/>
		) : (
			<Image
				source={{ uri: 'data:image/jpeg;base64,' + data.ReceiptImage }}
				style={styles.image}
			/>
		);
	}

	toggleModal = () => this.setState({ modalVisible: !this.state.modalVisible });

	render() {
		const { even } = this.props;

		return (
			<React.Fragment>
				<TouchableOpacity
					activeOpacity={1}
					style={styles.slideInnerContainer}
					onPress={this.toggleModal}
				>
					<View style={styles.shadow} />
					<View
						style={[
							styles.imageContainer,
							even ? styles.imageContainerEven : {},
						]}
					>
						{this.image}
						<View
							style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
						/>
					</View>
				</TouchableOpacity>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}
				>
					<View style={[styles.modalContainer, styles.modalBackgroundStyle]}>
						<View style={styles.innerContainerTransparentStyle}>
							<Icon
								type="SimpleLineIcons"
								name="close"
								color="#FFF"
								fontSize={32}
								style={{ zIndex: 999, fontSize: 32, color: '#FFF' }}
								onPress={this.toggleModal}
							/>
							<PhotoView
								source={{
									uri: 'data:image/jpeg;base64,' + this.props.data.ReceiptImage,
								}}
								minimumZoomScale={0.5}
								maximumZoomScale={3}
								androidScaleType="center"
								style={{ width: width - 40, height: height - 100 }}
								resizeMode="contain"
							/>
						</View>
					</View>
				</Modal>
			</React.Fragment>
		);
	}
}

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
	'window',
);

function wp(percentage: number) {
	const value = (percentage * viewportWidth) / 100;
	return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

const styles = StyleSheet.create({
	slideInnerContainer: {
		width: itemWidth,
		height: slideHeight,
		paddingHorizontal: itemHorizontalMargin,
		paddingBottom: 18, // needed for shadow
	},
	shadow: {
		position: 'absolute',
		top: 0,
		left: itemHorizontalMargin,
		right: itemHorizontalMargin,
		bottom: 18,
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 10,
		borderRadius: entryBorderRadius,
	},
	imageContainer: {
		flex: 1,
		marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
		backgroundColor: 'white',
		borderTopLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius,
	},
	imageContainerEven: {
		backgroundColor: '#000',
	},
	image: {
		...StyleSheet.absoluteFillObject,
		resizeMode: 'cover',
		borderRadius: IS_IOS ? entryBorderRadius : 0,
		borderTopLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius,
	},
	// image's border radius is buggy on iOS; let's hack it!
	radiusMask: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: entryBorderRadius,
		backgroundColor: 'white',
	},
	radiusMaskEven: {
		backgroundColor: '#000',
	},
	textContainer: {
		justifyContent: 'center',
		paddingTop: 20 - entryBorderRadius,
		paddingBottom: 20,
		paddingHorizontal: 16,
		backgroundColor: 'white',
		borderBottomLeftRadius: entryBorderRadius,
		borderBottomRightRadius: entryBorderRadius,
	},
	textContainerEven: {
		backgroundColor: '#000',
	},
	title: {
		color: '#000',
		fontSize: 13,
		fontWeight: 'bold',
		letterSpacing: 0.5,
	},
	titleEven: {
		color: 'white',
	},
	subtitle: {
		marginTop: 6,
		color: '#666',
		fontSize: 12,
		fontStyle: 'italic',
	},
	subtitleEven: {
		color: 'rgba(255, 255, 255, 0.7)',
	},

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
		width,
		height,
		padding: 20,
		backgroundColor: '#333',
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
});
