import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import StepZilla from "react-stepzilla";
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";


const NewFabricTokenPage = () => {
    const [data, setData] = useState(undefined);
    const handleUpdateData = (newData) => {
        setData(newData);
    }

    const steps = [
        { name: "Basic information", component: <Step1 data={data} onDataChange={handleUpdateData}/>},
        { name: "Finish", component: <Step2 data={data} onDataChange={handleUpdateData}/> },
    ]

    return (
        <>
            <Container fluid={true}>
                <Row>
                    <Col className="box-col-12">
                        <Card style={{ marginTop: '2%' }}>
                            <CardHeader style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <h5>Create Your Fabric ERC20 Token</h5>
                                <div className="media-body text-right">
                                </div>
                            </CardHeader>

                            <CardBody style={{ padding: '10px 40px 40px 40px' }}>
                                <StepZilla
                                    steps={steps}
                                    showSteps={true}
                                    showNavigation={false}
                                    stepsNavigation={false}
                                    prevBtnOnLastStep={true}
                                    preventEnterSubmission={true}
                                    dontValidate={false}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NewFabricTokenPage