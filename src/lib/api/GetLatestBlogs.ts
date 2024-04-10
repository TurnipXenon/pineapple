export const GetLatestBlogs = async () => {
	const resp = await fetch("http://turnipxenon.com/api/get-latest-blogs");
	if (!resp.ok) {
		return new Response(JSON.stringify([]));
	}
	return new Response(JSON.stringify(await resp.json()));
};
