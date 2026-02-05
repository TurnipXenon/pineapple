import { query } from "$app/server";
import { menuPageServerLoad } from "$pkg";

export const getParsnipDataRemote = query(menuPageServerLoad)
