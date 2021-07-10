export const prefixURL =
	process.env.NODE_ENV === "production"
		? "http://bookstoreinterview.herokuapp.com"
		: "http://localhost:5000";
