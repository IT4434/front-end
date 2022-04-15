import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import avatar_placeholder from "../../../../assets/images/user/7.jpg";
import { Row, Col, Container, Card, CardHeader, CardFooter, CardBody, Table, Media } from 'reactstrap';
import { useLocation, useParams } from 'react-router';
import { getFabricTokenDetail, getLinkedToken } from 'src/services/User/tokens';
import LinkedTokensCard from './components/LinkedTokensCard';

const FabricTokenDetailPage = () => {
    // const display_token = useSelector(state=>state.Token.display_token)
    const [display_token, setDisplayToken] = useState([])
    const [loaded, setLoaded] = useState(false)
    const params = useParams()

    useEffect(async () => {
        try {
            const response = await getFabricTokenDetail({id: params.tokenid })
            setDisplayToken(response.data)
            setLoaded(true)
            console.log(display_token)
        } catch(error){
            alert("Something wrong happens!")
        }
    }, [])
    

    return (
        <>
            <Container fluid={true}>
                <Row>
                    <Col className="box-col-12">
                        <Card style={{ marginTop: '2%' }}>
                            <CardHeader style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <h5>Token Detail</h5>
                            </CardHeader>

                            <CardBody >
                                <Row>
                                <Table hover borderless responsive>
                                    <thead>
                                        <tr>
                                            <th>Attribute</th>
                                            <th>Value</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Icon</th>
                                            <td>
                                                <Media className="rounded-circle" 
                                                body alt="" 
                                                src={display_token.token_icon ? display_token.token_icon : avatar_placeholder} 
                                                style={{
                                                    width: '30px', 
                                                    height: '30px', 
                                                    maxWidth: '50px', 
                                                    maxHeight: '50px'}}/>
                                            </td>
                                        </tr>   
                                        <tr>
                                            <th>Name</th>
                                            <td>{display_token.token_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Symbol</th>
                                            <td>{display_token.token_symbol}</td>
                                        </tr>
                                        <tr>
                                            <th>Token Standard</th>
                                            <td>{display_token.token_standard}</td>
                                        </tr>
                                        <tr>
                                            <th>Network</th>
                                            <td>{display_token.network_id}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                </Row>
                            </CardBody>
                        </Card>
                        {/* {!loaded ? <div></div> : <LinkedTokensCard linked_contract={display_token.id}/>} */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default FabricTokenDetailPage