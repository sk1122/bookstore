import { useState, useEffect, useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { AppContext } from "../context";
import AddItemModal from "./AddItemModal";

export default function Inventory() {
	const [data, category, dispatchUserEvent] = useContext(AppContext);

	const [show, setShow] = useState(false);
	const [name, setName] = useState("");

	const handleShowChange = (name) => {
		setName(name);
		setShow(true);
	};

	useEffect(() => {
		dispatchUserEvent("RESET", {});
	}, []);
	return (
		<Container>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>#</th>
						<th>Item Name</th>
						<th>Item Code</th>
						<th>Category</th>
						<th>Author</th>
						<th>Purchase Price</th>
						<th>Stock</th>
					</tr>
				</thead>
				<tbody>
					{data.map((key, idx) =>
						(key.category === category ||
							category === "ALL_ITEMS") &&
						!key.isItems ? (
							<tr
								key={idx}
								onClick={() => handleShowChange(key.name)}
							>
								<td>{idx + 1}</td>
								<td>{key.name}</td>
								<td>{key.item_code}</td>
								<td>{key.category}</td>
								<td>{key.author}</td>
								<td>{key.price}</td>
								<td>{key.stock}</td>
							</tr>
						) : (
							<span style={{ display: "hidden" }}></span>
						)
					)}
				</tbody>
			</Table>
			<AddItemModal
				show={show}
				setShow={setShow}
				name={name}
				items={false}
			></AddItemModal>
		</Container>
	);
}
