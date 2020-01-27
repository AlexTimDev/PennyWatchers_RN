/********
 * Bill Reducer
 */
import { AnyAction } from 'redux';

import { ReportLineItem } from './types';
import { LOGOUT } from '../Auth/actions';
import { GET_REPORT_FAILURE, GET_REPORT, GET_REPORT_SUCCESS } from './actions';

export interface ReportState {
	isLoading: boolean;
	error: any;
	report: any;
}

export const defaultState: ReportState = {
	report: {},
	isLoading: false,
	error: null,
};

export const report = (
	state = defaultState,
	action: AnyAction,
): ReportState => {
	switch (action.type) {
		case GET_REPORT_SUCCESS:
			try {
				const newReport: any = {
					grandTotal: 0,
					TaxTotal: 0,
					categories: {},
				};

				action.reportResponse.MonthlyReport.forEach((item: ReportLineItem) => {
					newReport.grandTotal += item.Twelve;
					newReport.TaxTotal += item.TaxTwelve;
					if (!newReport.categories[item.Category]) {
						newReport.categories[item.Category] = {
							total: 0,
							tax: 0,
							Category: item.Category,
							items: [],
						};
					}
					newReport.categories[item.Category].total += item.Twelve;
					newReport.categories[item.Category].tax += item.TaxTwelve;
					newReport.categories[item.Category].items.push(item);
				});
				return { ...state, isLoading: false, report: newReport };
			} catch (error) {
				return state;
			}

		case GET_REPORT_FAILURE:
			return { ...state, error: action.error, isLoading: false };

		case GET_REPORT:
			return { ...state, isLoading: true, error: false };

		case LOGOUT:
			return defaultState;

		default:
			return state;
	}
};
