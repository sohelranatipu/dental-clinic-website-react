import React from "react";

import { Col, Row } from "react-bootstrap";
import Dentist from "../../Components/Dentist/Dentist";
import useDentists from "../../Hooks/useDentists";

const Dentists = () => {
  const { dentists } = useDentists();
  return (
    <div className="dentists container">
      <div className="service_info">
        <h3 className="service_title ">#Our experienced dentist</h3>
        <h1 className="text-center mt-3 service_title_big">
          Top Dentist For{" "}
          <span>
            Specialized And <br /> Experienced
          </span>{" "}
          Dentist
        </h1>
      </div>

      <Row xs={1} md={2} lg={4} className="g-4 mt-lg-3 mt-2">
        {dentists?.map((dentist) => (
          <Col>
            <Dentist key={dentist.id} dentist={dentist}></Dentist>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dentists;
