import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	FlatList,
	Keyboard,
	TouchableOpacity,
	SafeAreaView,
	ScrollView
} from 'react-native';
import { Content, Text, H1, Container, Form, Icon } from 'native-base';
import {
	NavigationScreenProps,
	NavigationEventSubscription,
} from 'react-navigation';

import { styles } from '../styles';
import { AppHeader } from '../components/AppHeader';
import { Loader } from '../components/Loader';
import { ListItem } from '../components/ListItem';
import { StyledTextInput, StyledButton } from '../components/StyledInputs';
import {
	GetInformationSearchAction,
	getInformationSearchAction,
	ClearSearchAction,
	clearSearchAction,
} from '../store/Data/actions';

import TreeView from '../components/react-native-final-tree-view';

import Permissions from 'react-native-permissions';
import { string } from 'prop-types';
import {getChangeMonth} from '../utilities/utilities'
const pageCount: number = 15;
	

function getIndicator(isExpanded: boolean , hasChildrenNodes: boolean) {
	
	if (hasChildrenNodes) {
		if (isExpanded) {
			return 'arrow-up';
		} else {
			return 'arrow-down';
		}
	}
}
function getColorIndicator(level: number){

	if (level==0) {
		return '#ffaa44';
	}else if (level==1){
		return '#777777'
	}else {
		return '#afeeee'
	}
} 
//--------------------------------------------------------
interface Props extends NavigationScreenProps {
	isLoading: boolean;
	username: string;
	password: string;
	search: any[];
	newArray: any[];
	// Dispatch props
	getSearch: (
		username: string,
		password: string,
		searchTerm: string,
	) => GetInformationSearchAction;
	clearSearch: () => ClearSearchAction;
}

interface State {
	keywords: string;
	curNum: number;
	treeviewdata:any;
}

export class UnconnectedSearch extends Component<Props, State> {
//---------------------------------------------------------------------------------
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}
	willFocusSubscription: NavigationEventSubscription | null = null;
	didBlurSubscription: NavigationEventSubscription | null = null;
	
	state = {
		keywords: '',
		curNum: 0,
		treeviewdata:this.props.newArray,
		scrollvalue:0,
	}

	componentWillReceiveProps(nextProps:any) {
		
		this.setState({treeviewdata :nextProps.newArray});
	
	 }
	
	// componentWillUnmount() {
	// 	this.willFocusSubscription!.remove();
	// }
		
	getSearch = () => {
		if (this.state.keywords) {
			this.props.getSearch(
				this.props.username,
				this.props.password,
				this.state.keywords,
			);    
		}
		Keyboard.dismiss();
	}
	
	onKeywordsChange = (keywords: string) => {
		this.setState({ keywords});	
		this.setState({treeviewdata:[]});
		console.log('keywords',keywords,this.state.treeviewdata);
	}


	// renderItem = ({ item, index }: any) => (
	// 	<ListItem item={item} index={index} navigation={this.props.navigation} />
	// )

	keyExtractor = () => 'key' + Math.random() * 10000;

	disableButton = () => this.props.isLoading || !this.state.keywords;

//-----------------------@@@ page Next and Prev method @@@-------------------------

	// pageToDisplay = () =>
	// 	this.props.search.slice(this.state.curNum, this.state.curNum + pageCount)

	// pageDown = () => this.setState({ curNum: this.state.curNum - pageCount });

	// pageUp = () => this.setState({ curNum: this.state.curNum + pageCount });

	// renderPageNavigation = () => {
	// 	const prevDisabled = this.state.curNum === 0;
	// 	const nextDisabled =
	// 		this.state.curNum > this.props.search.length - pageCount;

	// 	return (
	// 		<View
	// 			style={{
	// 				flexDirection: 'row',
	// 				justifyContent: 'center',
	// 				alignItems: 'center',
	// 			}}
	// 		>
	// 			<TouchableOpacity
	// 				style={{ padding: 15, marginRight: 25, flexDirection: 'row' }}
	// 				onPress={this.pageDown}
	// 				disabled={prevDisabled}
	// 			>
	// 				<Icon
	// 					type="SimpleLineIcons"
	// 					name="arrow-left"
	// 					style={{ fontSize: 20, color: prevDisabled ? '#AAA' : '#000' }}
	// 				/>
	// 				<Text style={{ color: prevDisabled ? '#AAA' : '#000' }}>Prev</Text>
	// 			</TouchableOpacity>
	// 			<TouchableOpacity
	// 				style={{ padding: 15, marginLeft: 25, flexDirection: 'row' }}
	// 				onPress={this.pageUp}
	// 				disabled={nextDisabled}
	// 			>
	// 				<Text style={{ color: nextDisabled ? '#AAA' : '#000' }}>Next</Text>
	// 				<Icon
	// 					type="SimpleLineIcons"
	// 					name="arrow-right"
	// 					style={{ fontSize: 20, color: nextDisabled ? '#AAA' : '#000' }}
	// 				/>
	// 			</TouchableOpacity>
	// 		</View>
	// 	);
	// }
//-------------------------------------------------------------------------------------------------
	
	moveToPos = (click_x:number) => {
		console.log('click_x!!!!!!!!',click_x,this.state.scrollvalue);
		
		this.ListView_Ref!.scrollTo({ x: 0 , y:click_x-450+this.state.scrollvalue, animated: true });
	}
	handleScroll=(event: Object)=>{

			this.setState({scrollvalue : event.nativeEvent.contentOffset.y})
			//console.log(event.nativeEvent.contentOffset.y)	
	}
	
	render() {
		return (
			<React.Fragment>
				<AppHeader navigation={this.props.navigation} back={true} />
				<SafeAreaView style={{ flex: 1 }}>
					<H1 style={styles.header}>Search</H1>
					<Form style={styles.form}>
						<StyledTextInput
							placeholder="Keywords"
							value={this.state.keywords}
							onChangeText={this.onKeywordsChange}
						/>
						<StyledButton
							disabled={this.disableButton()}
							onPress={this.getSearch}
							text="Search"
						/>
					</Form>
					{!this.state.keywords ? (
						<Text style={{ textAlign: 'center' }}>
							Enter a search term above
						</Text>
					) : this.props.isLoading ? (
						<View style={{ alignSelf: 'center' }}>
							<Loader />
						</View>
					) 
					: !this.props.search.length ? (
						<Text style={{ textAlign: 'center' }}>
							No receipts match the search
						</Text>
					) : (
						<React.Fragment>
					
							 <ScrollView 
							 		onScroll={this.handleScroll} 
							 		ref={(ref) => {this.ListView_Ref = ref }}
									style={{
									flex: 1,	
									marginTop: 10,
									
								}}>
										<TreeView									
											data = {this.state.treeviewdata}
											moveToPos = {this.moveToPos}										
											renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
											return (
												
												level != 2 ?(		
													<View 			
														style={{
															flexDirection:'row', 
															borderRadius:2,
															borderColor: '#3F51B5',
															alignSelf: 'center',
															width: '90%',													
															marginTop:3,
															backgroundColor: getColorIndicator(level),													
															height: 36 - level * 5,
															paddingBottom:5 - 2 * level,
															paddingTop:5 - 2 * level,		
															paddingLeft: 10 + level * 20,																				
														}}	
													>	
														<Text style={styles.treeviewText}>							
															{node.name}																										
														</Text>
														<Icon
																type="SimpleLineIcons"
																name={getIndicator(isExpanded, hasChildrenNodes)}
																style={{ fontSize: 18, color: '#fff', fontWeight:'bold' }}
														/> 												
													
													</View>
												):(	
													
													  <ListItem item={node} index={0} navigation={this.props.navigation} />		
													
												 )
											);
										}}
									/>
								</ScrollView>  		
						</React.Fragment>
					)}
					
				</SafeAreaView>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({
	data: { isLoading, search,newArray },
	session: { username, password },
}: any) => ({
	isLoading,
	username,
	password,
	search,
	newArray
});

const mapDispatchToProps = (dispatch: any) => ({
	getSearch: (username: string, password: string, searchTerm: string) =>
		dispatch(getInformationSearchAction({ username, password, searchTerm })),
	clearSearch: () => dispatch(clearSearchAction()),
});

export const Search = connect(
	mapStateToProps,
	mapDispatchToProps,	
)(UnconnectedSearch);


