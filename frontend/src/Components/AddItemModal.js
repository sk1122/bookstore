import { useState, useEffect, useContext } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { AppContext } from "../context";
import { prefixURL } from "../config/config";

export default function AddItemModal({ show, setShow, name, items }) {
	const [data, category, dispatchUserEvent] = useContext(AppContext);

	const [itemName, setItemName] = useState("");
	const [itemCode, setItemCode] = useState("");
	const [itemCategory, setItemCategory] = useState("");
	const [author, setAuthor] = useState("");
	const [purchasePrice, setPurchasePrice] = useState("");
	const [stock, setStock] = useState("");

	const handleClose = () => setShow(false);

	const handleFormSubmit = () => {
		handleClose();

		const data = JSON.stringify({
			name: itemName,
			item_code: itemCode,
			category: itemCategory,
			author: author,
			price: purchasePrice,
			stock: stock,
			isItems: items,
		});

		fetch(prefixURL + "/api/v1/books", {
			method: "POST",
			body: data,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				dispatchUserEvent("RESET", {});
			});
	};

	function clearAllFields() {
		setItemName("");
		setItemCode("");
		setItemCategory("");
		setAuthor("");
		setPurchasePrice("");
		setStock("");
	}

	useEffect(() => {
		fetch(`${prefixURL}/api/v1/books/${name}`)
			.then((res) => res.json())
			.then((data) => {
				clearAllFields();
				if (!("_fieldsProto" in data)) return;
				if (!("name" in data._fieldsProto)) return;
				setItemName(data._fieldsProto.name.stringValue);
				if (!("category" in data._fieldsProto)) return;
				setItemCategory(data._fieldsProto.category.stringValue);
				if (!("item_code" in data._fieldsProto)) return;
				setItemCode(data._fieldsProto.item_code.stringValue);
				if (!("author" in data._fieldsProto)) return;
				setAuthor(data._fieldsProto.author.stringValue);
				if (!("price" in data._fieldsProto)) return;
				setPurchasePrice(data._fieldsProto.price.stringValue);
				if (!("stock" in data._fieldsProto)) return;
				setStock(data._fieldsProto.stock.stringValue);
			});
	}, [name]);

	return (
		<>
			<Modal size="lg" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Item to List</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Form>
							<Row>
								<Col xs={6}>
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlInput1"
									>
										<Form.Label>Item Name</Form.Label>
										<Form.Control
											type="text"
											placeholder="Item Name"
											value={itemName}
											onChange={(e) =>
												setItemName(e.target.value)
											}
										/>
									</Form.Group>
								</Col>
								<Col xs={6}>
									<Form.Group
										controlId="formFileMultiple"
										className="mb-3"
									>
										<Form.Label>Choose Images</Form.Label>
										<Form.Control type="file" multiple />
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col xs={6}>
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlInput1"
									>
										<Form.Label>Item Code</Form.Label>
										<Form.Control
											type="text"
											placeholder="Item Code"
											value={itemCode}
											onChange={(e) =>
												setItemCode(e.target.value)
											}
										/>
									</Form.Group>
								</Col>
								<Col xs={6}>
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlInput1"
									>
										<Form.Label>Item Category</Form.Label>
										<Form.Control
											type="text"
											placeholder="Item Category"
											value={itemCategory}
											onChange={(e) =>
												setItemCategory(e.target.value)
											}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlInput1"
									>
										<Form.Label>Author</Form.Label>
										<Form.Control
											type="text"
											placeholder="Author"
											value={author}
											onChange={(e) =>
												setAuthor(e.target.value)
											}
										/>
									</Form.Group>
								</Col>
								{!items ? (
									<Col>
										<Form.Group
											className="mb-3"
											controlId="exampleForm.ControlInput1"
										>
											<Form.Label>Stock</Form.Label>
											<Form.Control
												type="number"
												placeholder="Stock"
												value={stock}
												onChange={(e) =>
													setStock(e.target.value)
												}
											/>
										</Form.Group>
									</Col>
								) : (
									<span style={{ display: "hidden" }}></span>
								)}
							</Row>
							<Row>
								<Col xs={6}>
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlInput1"
									>
										<Form.Label>Purchase Price</Form.Label>
										<Form.Control
											type="number"
											placeholder="Purchase Price"
											value={purchasePrice}
											onChange={(e) =>
												setPurchasePrice(e.target.value)
											}
										/>
									</Form.Group>
								</Col>
							</Row>
						</Form>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleFormSubmit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
