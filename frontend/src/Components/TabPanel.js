import { Container, Nav, Row, Col, Tab } from "react-bootstrap";
import Inventory from "./Inventory";
import Items from "./Items";
import HelpBar from "./HelpBar";

export default function TabPanel() {
	return (
		<Container>
			<br />
			<Tab.Container id="left-tabs-example" defaultActiveKey="first">
				<Row>
					<Col sm={3}>
						<Nav variant="pills" className="flex-column">
							<Nav.Item>
								<Nav.Link eventKey="first">
									<i className="fa fa-store"></i>
									Inventory
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="second">
									<i className="fa fa-store"></i>
									Items
								</Nav.Link>
							</Nav.Item>
						</Nav>
					</Col>
					<Col sm={9}>
						<Tab.Content>
							<Tab.Pane eventKey="first">
								<HelpBar items={false} />
								<Inventory></Inventory>
							</Tab.Pane>
							<Tab.Pane eventKey="second">
								<HelpBar items={true} />
								<Items></Items>
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</Container>
	);
}
