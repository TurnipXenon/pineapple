import type { RequestHandler } from "./$types";
import { GetLatestBlogs } from "$pkg/api/GetLatestBlogs";

export const GET: RequestHandler = GetLatestBlogs;
