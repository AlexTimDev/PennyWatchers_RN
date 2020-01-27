import { Action } from 'redux';
import { ReportRequest, ReportResponse } from './types';

// SAVE_BILL
export const GET_REPORT = 'GET_REPORT';
export const GET_REPORT_SUCCESS = 'GET_REPORT_SUCCESS';
export const GET_REPORT_FAILURE = 'GET_REPORT_FAILURE';

export interface GetReportAction extends Action {
	reportRequest: ReportRequest;
}
export interface GetReportSuccessAction extends Action {
	reportResponse: ReportResponse;
}
export interface GetReportFailureAction extends Action {
	error: any;
}

export const getReportAction = (
	reportRequest: ReportRequest,
): GetReportAction => ({
	type: GET_REPORT,
	reportRequest,
});

export const getReportSuccessAction = (
	reportResponse: ReportResponse,
): GetReportSuccessAction => ({
	type: GET_REPORT_SUCCESS,
	reportResponse,
});
export const getReportFailureAction = (error: any): GetReportFailureAction => ({
	type: GET_REPORT_FAILURE,
	error,
});
