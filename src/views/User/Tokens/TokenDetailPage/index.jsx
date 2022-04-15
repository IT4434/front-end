import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import avatar_placeholder from "../../../../assets/images/user/7.jpg";
import { Row, Col, Container, Card, CardHeader, CardFooter, CardBody, Table, Media } from 'reactstrap';
import { PlusSquare } from 'react-feather';
import { Link } from "react-router-dom";
import { useLocation, useParams } from 'react-router';
import { getTokenDetail, getLinkedToken } from 'src/services/User/tokens';
import LinkedTokensCard from './components/LinkedTokensCard';
import AddLinkModal from './components/AddLinkModal'

const TokenDetailPage = () => {
    // const display_token = useSelector(state=>state.Token.display_token)
    const [display_token, setDisplayToken] = useState([])
    const [loaded, setLoaded] = useState(false)
    const params = useParams()

    useEffect(async () => {
        try {
            const response = await getTokenDetail({token_type: params.token_type, token_id: params.tokenid })
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
                                            <th>Address</th>
                                            <td>{display_token.address}</td>
                                        </tr>
                                        <tr>
                                            <th>Contract File</th>
                                            <td><a href={display_token.contract_file}>contract file</a></td>
                                        </tr>
                                        <tr>
                                            <th>Contract ABI</th>
                                            <td><a href={display_token.abi}>contract abi</a></td>
                                        </tr>
                                        <tr>
                                            <th>Status</th>
                                            <td>{display_token.status}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                </Row>
                            </CardBody>
                        </Card>
                        {!loaded ? <div></div> : <LinkedTokensCard linked_contract={display_token.id} handleButton/>}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TokenDetailPage