import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";

function ListPlayers({ playerOptions }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers(playerOptions);
  }, [playerOptions]);

  return (
    <Row>
      <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Player Name</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.label}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default ListPlayers;
