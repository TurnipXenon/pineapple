export interface CreateUrlRequest {
	queryParams: string;
	shortUrl: string;
	password: string;
}

export enum CreateUrlResult {
	Fail = 0,
	Success = 1,
	Duplicate = 2
}

export interface CreateUrlResponse {
	result: CreateUrlResult;
}

export const jsonToCreateUrlRequest = (json: Record<string, never>): CreateUrlRequest => {
	return {
		queryParams: json["queryParams"] ?? "",
		shortUrl: json["shortUrl"] ?? "",
		password: json["password"] ?? ""
	};
};

export const jsonToCreateUrlResponse = (json: Record<string, never>): CreateUrlResponse => {
	const enumIndex = json["result"] as number;
	return {
		result: CreateUrlResult[enumIndex] ? enumIndex : CreateUrlResult.Fail
	};
};
