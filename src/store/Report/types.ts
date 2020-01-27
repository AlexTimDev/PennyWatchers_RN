export interface ReportRequest {
	username: string;
	password: string;
	month: number;
	year: number;
}

export interface ReportLineItem {
	Category: string;
	SubCat: string;
	One: number;
	Two: number;
	Three: number;
	Four: number;
	Five: number;
	Six: number;
	Seven: number;
	Eight: number;
	Nine: number;
	Ten: number;
	Eleven: number;
	Twelve: number;
	TaxTwelve: number;
}

export interface ReportResponse {
	MonthlyReport: ReportLineItem;
	ErrorCode: number;
	ErrorMessage: string;
}
