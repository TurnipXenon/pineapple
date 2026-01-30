import type { RemoteQueryFunction } from "@sveltejs/kit";

export type RevealInfoRemoteQuery =
	| {
			type: "string";
			run: RemoteQueryFunction<string, string>;
			key?: string;
	  }
	| {
			type: "void";
			run: RemoteQueryFunction<void, string>;
	  };
