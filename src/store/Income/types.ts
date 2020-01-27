// updated by LJC

// export interface Income {
// 	IncomeID: number;
// 	IncomeDate: string;
// 	Source: string;
// 	GrossAmount: number;
// 	Deductions: number;
// 	NetAmount: number;
// 	ErrorCode: number;
// 	ErrorMessage: string | null;
// }

// export interface Income {
// 	IncomeID: number;
// 	// IncomeDate: string;
// 	IncomeYear: string;
// 	IncomeMonth: string;
// 	Source: string;
// 	GrossAmount: number;
// 	Deductions: number;
// 	NetAmount: number;
// 	ErrorCode: number;
// 	ErrorMessage: string | null;
// }

export interface Income {
	IncomeID: number;
	IncomeSource: string;
	IncomeIdentifier: string;
	GrossAmount: number;
	HelpString: string;
	Self: boolean;
	ErrorCode: number;
	ErrorMessage: string | null;
}

export interface IncomeRequest {
	username: string;
	password: string;
	month: string;
	year: string;
}

export interface IncomeResponse {
	month: string;
	year: string;
	IncomeList: Income[];
	ErrorCode: number;
	ErrorMessage: string | null;
}

export interface SaveIncomeRequest {
	username: string;
	password: string;
	IncomeID: number;
	Source: string;
	FrequencyID: number;
	IncomeYear: number;
	IncomeMonth: number;
	GrossAmount: number;
	deductionSource?: string;
	deductionAmount?: number;
	deductionID?: number;
	existingDeductions?: DeductionItem[];
}
// updated by LJC
export interface SaveIncomeListRequest {
	username: string;
	password: string;
	month: string;
	year: string;
	IncomeList?: Income[];
}

export interface SaveOtherRequest {
	username: string;
	password: string;
	month: string;
	year: string;
}

export interface GetPreviousIncomeListRequest {
	month: string;
	year: string;
}
// ---------end--------
export interface SaveIncomeResponse {
	IncomeID: number;
	Source: string;
	GrossAmount: number;
	Deductions: number;
	NetAmount: number;
	IncomeDate: string;
	ErrorCode: number;
	ErrorMessage: string;
}

export interface SaveDeductionRequest {
	username: string;
	password: string;
	deductionID: number;
	incomeID: number;
	deductionType: string;
	deductionAmount: number;
}

export interface SaveDeductionResponse {
	DeductionID: number;
	IncomeID: number;
	DeductionType: string;
	DeductionAmount: number;
	ErrorCode: number;
	ErrorMessage: string;
}

export interface GetDeductionRequest {
	username: string;
	password: string;
	incomeID: number;
}

export interface DeductionItem {
	DeductionID: number;
	IncomeID: number;
	DeductionType: string;
	DeductionAmount: number;
	ErrorCode: number;
	ErrorMessage: string;
}

export interface GetDeductionResponse {
	DeductionItemList: DeductionItem[];
	ErrorCode: number;
	ErrorMessage: string;
}

export interface ActualIncome {
	Username: string;
	Password?: string;
	ActualIncomeID?: number;
	PersonID: number;
	PersonName?: string;
	Source: string;
	ActualIncomeDate?: string;
	ActualIncomeAmount: number;
	ActualIncomeMonth: number;
	ActualIncomeYear: number;
}

export interface SaveActualIncomeResponse {
	Success: boolean;
	ErrorCode: number;
	ErrorMessage: string;
}
