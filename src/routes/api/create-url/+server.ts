import type { RequestHandler } from "./$types";
import { type CreateUrlResponse, CreateUrlResult, jsonToCreateUrlRequest } from "$pkg/types/api/CreateUrl";

export const POST: RequestHandler = async ({ request }) => {
	const response: CreateUrlResponse = {
		result: CreateUrlResult.Fail
	};

	const data = jsonToCreateUrlRequest(await request.json());

	if (data.password !== "FakePassword") {
		return new Response(JSON.stringify(response));
	}

	if (data.shortUrl === "already-used") {
		response.result = CreateUrlResult.Duplicate;
		return new Response(JSON.stringify(response));
	}

	response.result = CreateUrlResult.Success;
	return new Response(JSON.stringify(response));
};
