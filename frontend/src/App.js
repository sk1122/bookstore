import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";

import TabPanel from "./Components/TabPanel";
import { AppContext } from "./context";

export default function App() {
	const [data, setData] = useState([]);
	const [category, setCategory] = useState("ALL_ITEMS");

	function dispatchUserEvent(actionType, payload) {
		switch (actionType) {
			case "RESET":
				fetch("http://localhost:5000/api/v1/books")
					.then((res) => res.json())
					.then((datas) => {
						console.log(datas, "Started");
						setData(datas);
					});
				return;
			case "CHANGE_CATEGORY":
				setCategory(payload.category);
		}
	}

	const props = [data, category, dispatchUserEvent];

	return (
		<Container>
			<AppContext.Provider value={props}>
				<br />
				<TabPanel></TabPanel>
			</AppContext.Provider>
		</Container>
	);
}
