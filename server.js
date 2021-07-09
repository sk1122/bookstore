const express = require("express");
const path = require("path");
const fs = require("firebase-admin");
const cors = require("cors");

const serviceAccount = require("./keys/firebase-key.json"); // Firebase Key
const app = express();

// Initialize FireStore
fs.initializeApp({
	credential: fs.credential.cert(serviceAccount),
});

const db = fs.firestore();

// Serve static files from the React app
app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"https://bookstoreinterview.herokuapp.com/",
		],
	})
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("/api/v1/books", async (req, res) => {
	var data = {};
	await db
		.collection("books")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				data[doc.id] = doc.data();
			});
		});
	var arrData = Object.keys(data).map((key) => {
		return data[key];
	});
	res.send(arrData);
});

app.get("/api/v1/books/:id", async (req, res) => {
	const { id } = req.params;
	const bookDB = await db.collection("books").doc(id).get();
	res.send(bookDB);
});

app.post("/api/v1/books", async (req, res) => {
	const book = req.body;

	try {
		const bookDB = await db.collection("books");
		const newBook = bookDB.doc(book["name"]);

		await newBook.set(book);
	} catch (error) {
		res.status(400).send("Error");
	}

	res.status(200).send({ status: "OK" });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/frontend/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Started on " + port);
});
