import type { RequestHandler } from "./$types";
import { type CreateUrlResponse, CreateUrlResult, jsonToCreateUrlRequest } from "$pkg/types/api/CreateUrl";

export const POST: RequestHandler = async ({ request }) => {
	const response: CreateUrlResponse = {
		result: CreateUrlResult.Fail
	};

	console.log("This is a fake API. The real API is somewhere else.");
	const data = jsonToCreateUrlRequest(await request.json());
	console.log(data);

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
