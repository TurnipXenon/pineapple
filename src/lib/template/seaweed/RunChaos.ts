const chaoticWordBank = ["niko", "toba", "seal", "aquarium", "ojisan", "baikal"];

const runChaos = (node: Element) => {
	// change all text content to gibberish
	for (let child of Array.from(node.children)) {
		if (child.nodeType === Node.ELEMENT_NODE) {
			runChaos(child);
			for (const childOfChild of child.childNodes) {
				if (childOfChild.nodeType === Node.TEXT_NODE && childOfChild.textContent?.trim()) {
					const max = childOfChild.textContent.length;
					childOfChild.textContent = "";
					while (childOfChild.textContent.length < max) {
						childOfChild.textContent += (chaoticWordBank[Math.floor(Math.random() * chaoticWordBank.length)] + " ");
					}
				}
			}

			// change all links to crouton
			if (child.hasAttribute("href")) {
				child.setAttribute("href", "https://crouton.net/");
			}

			// change all images to niko if aria != hidden?
			if (child.hasAttribute("src") && !child.hasAttribute("aria-hidden")) {
				if (child.hasAttribute("alt")) {
					child.setAttribute("src", "https://p.potaufeu.asahi.com/a2b9-p/picture/21583312/5c3310aec77068e24844c663aa62b37c.jpg");
				} else {
					child.setAttribute("src", "https://video.twimg.com/ext_tw_video/1318728494256410624/pu/vid/640x360/TMklz6hiTkQu3xhn.mp4");
					child.setAttribute("muted", "true");
				}
			}
			if (child.tagName.trim() === "VIDEO") {
				child.setAttribute("src", "https://video.twimg.com/ext_tw_video/1318728494256410624/pu/vid/640x360/TMklz6hiTkQu3xhn.mp4");
				child.setAttribute("muted", "true");
			}

			// change all button events
			if (child.tagName.trim() === "BUTTON") {
				// remove anon function: https://stackoverflow.com/a/41343451/17836168
				child.setAttribute("disabled", "true");
			}
		}
	}
};
