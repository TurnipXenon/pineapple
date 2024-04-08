export const parseQueryTerms = (node: Element, querySet: Set<string>) => {
	// change all text content to gibberish
	for (const child of Array.from(node.children)) {
		if (child.nodeType === Node.ELEMENT_NODE) {
			parseQueryTerms(child, querySet);
			// todo: if it's a span and it wraps a word, and qt class then we count that as query
			// for (const childOfChild of child.childNodes) {
			// 	if (childOfChild.nodeType === Node.TEXT_NODE && childOfChild.textContent?.trim()) {
			// 		// todo analyze textcontent
			// 	}
			// }

			// Warning: below is not redundant and is a catch-all
			// Long-term solution: figure out the correct typing
			if ((typeof child.className === "string") && child.className?.includes("qt-")) {
				child.className.split(" ").forEach(c => {

					if (c.startsWith("qt-")) {
						querySet.add(c);
					}

				});
			}
		}
	}
};
