import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import avatar_placeholder from "../../../../../assets/images/user/7.jpg";
import { Row, Col, Container, Card, CardHeader, CardFooter, CardBody, Table, Media } from 'reactstrap';
import { PlusSquare } from 'react-feather';
import { Link } from "react-router-dom";
import { useLocation, useParams } from 'react-router';
import { getTokenDetail, getLinkedToken } from 'src/services/User/tokens';

const LinkedTokensCard = (props) => {
    const linked_contract = props.linked_contract
    const [linked_tokens, setLinkedTokens] = useState([{}])

    useEffect(async () => {
        getLinkedToken({linked_contract: linked_contract}).then(res => {
            setLinkedTokens(res.data.results)
            console.log(linked_tokens)
        }).catch(err => {
            alert("Something wrong happened. Please reload the page.");
        })
    }, [])

    return (
        <>
            <Card style={{ marginTop: '2%' }}>
                            <CardHeader style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <h5>Linked to</h5>
                                <div className="media-body text-right">
                                    <Link to="new" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <PlusSquare className='mr-2' />Add link
                                    </Link>
                                </div>
                            </CardHeader>

                            <CardBody >
                                <Row>
                                <Table hover borderless responsive>
                                    <thead>
                                        <tr>
                                            <th>Token name</th>
                                            <th>Network</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {linked_tokens.map((token, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{token.token_name}</td>
                                                    <td>
                                                        {}
                                                    </td>
                                                </tr>   
                                            )
                                        })}
                                        
                                    </tbody>
                                </Table>
                                </Row>
                            </CardBody>
                        </Card>
        </>
    )
}

export default LinkedTokensCard