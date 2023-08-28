import fs from "fs";

const setupDefaultEnvironmentVariable = () => {
	console.info("Running environment variable checks");
	const REQUIRED_ENV = [
		"PUBLIC_CRINGE_USERNAME",
		"PUBLIC_TWEET1",
		"PUBLIC_TWEET2",
		"PUBLIC_TUMBLR",
		"PUBLIC_TWITTER_ID"
	];
	const ENV_FILEPATH = "./.env";
	const missingEnv = [...REQUIRED_ENV];

	// check if file exists
	const exists = fs.existsSync(ENV_FILEPATH);

	// iterate on every line to make sure every variable exists
	if (exists) {
		fs.readFileSync(ENV_FILEPATH, "utf-8")
			.split("\n")
			.forEach((line) => {
				// remove from missingEnv if it's there
				const varName = line.split("=")[0];
				const index = missingEnv.indexOf(varName);
				if (index !== -1) {
					missingEnv.splice(index, 1);
				}
			});
	} else {
		fs.writeFileSync(ENV_FILEPATH, "");
	}

	// append the remaining environments
	if (missingEnv.length > 0) {
		const newEnvLines = missingEnv.map((varName) => {
			return `${varName}="PLACEHOLDER"`;
		});
		newEnvLines.push(""); // final line empty
		fs.appendFileSync(ENV_FILEPATH, newEnvLines.join("\n"));
	}
	console.info("Finished environment variable checks");
};

setupDefaultEnvironmentVariable();
