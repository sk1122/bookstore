export const prefixURL =
	process.env.NODE_ENV === "production"
		? "http://bookinterview.herokuapp.com"
		: "http://localhost:5000";
