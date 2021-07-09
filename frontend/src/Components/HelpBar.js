import { useEffect, useState, useContext } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { AppContext } from "../context";
import AddItemModal from "./AddItemModal";

export default function HelpBar({ items }) {
	const [data, category, dispatchUserEvent] = useContext(AppContext);

	const [categorys, setCategory] = useState("ALL_ITEMS");
	const [show, setShow] = useState(false);

	useEffect(() => {
		dispatchUserEvent("CHANGE_CATEGORY", { category: categorys });
	}, [categorys]);

	const handleShowChange = () => {
		setShow(true);
	};

	return (
		<Container>
			<Container>
				<h3>Books</h3>
			</Container>
			<Row>
				<Col xs={6}></Col>
				<Col
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Form.Control
						as="select"
						value={categorys}
						onChange={(e) => setCategory(e.target.value)}
						style={{ width: "100px" }}
					>
						<option value="ALL_ITEMS">All Items</option>
						{data.map((key) => (
							<option value={key.category}>{key.category}</option>
						))}
					</Form.Control>
					<Button
						variant="danger"
						style={{ marginLeft: "10px", marginRight: "10px" }}
					>
						Delete Selected Item
					</Button>
					<Button variant="primary" onClick={handleShowChange}>
						Add Item
					</Button>
				</Col>
			</Row>
			<AddItemModal
				show={show}
				setShow={setShow}
				items={items}
			></AddItemModal>
		</Container>
	);
}
