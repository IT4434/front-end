import React from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import { PlusSquare } from 'react-feather'
import CardToken from './components/CardToken'

const MyTokensPage = () => {
    return (
        <>
            <Container style={{ maxWidth: "1605px", margin: "0px auto", paddingTop: "30px" }}>
                <Row>
                    <Col sm={4} style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                        <strong style={{ font: "normal normal bold 24px/28px Roboto"}}>My Tokens</strong>
                    </Col>
                    <Col sm={8} style={{ display: "flex", alignItems: "center", justifyContent: "right" }}>
                        <div style={{ width: "100%", maxWidth: "648px" }}>
                            <div className="media-body text-right">
                                <Link to="new" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <PlusSquare className='mr-2' />Create New Tokens
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
                
                <Row>
                    <Col className="box-col-12">
                        <Card style={{ marginTop: '2%' }}>
                            <CardBody >
                                <Row>
                                    <CardToken />
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MyTokensPage