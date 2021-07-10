export const prefixURL =
	process.env.NODE_ENV === "production"
		? "https://bookstoreinterview.herokuapp.com"
		: "http://localhost:5000";
