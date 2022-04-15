import React, { useEffect, useState } from 'react';
import { PlusSquare } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import avatar_placeholder from "../../../../../assets/images/user/7.jpg";
import more from "../../../../../assets/images/user/three-horizontal-dots-icon-6.png"
import { Row, Col, Card, CardHeader, CardFooter, CardBody, Table, Media, Dropdown,DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { DISPLAY_TOKEN } from '../../../../../redux/User/Tokens/actionTypes'
import { tokensActions } from 'src/redux/User/Tokens/reducer'
import PropTypes from "prop-types"
import { getFTTokens, getNFTTokens } from 'src/services/User/tokens';
import CustomTablePagination from './CustomTablePagination';
import CustomDropdown from './CustomDropdown';
// import { getFabricTokens } from 'src/services/User/tokens';

const CardToken = (prop) => {
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(tokensActions.getFTTokens())
    // }, [])
    // useEffect(() => {
    //     dispatch(tokensActions.getNFTTokens())
    // }, [])
    // const list_ft_tokens = useSelector(state => state.Token.list_ft_tokens)
    // const list_nft_tokens = useSelector(state => state.Token.list_nft_tokens)

    const pageSize = 10

    const [ftPageCount, setFTPageCount] = useState(1)
    const [ftCurrentPage, setFTCurrentPage] = useState(1)
    const [ftPageData, setFTPageData] = useState([{}])
    
    const [nftPageCount, setNFTPageCount] = useState(1)
    const [nftCurrentPage, setNFTCurrentPage] = useState(1)
    const [nftPageData, setNFTPageData] = useState([{}])
    const [isLoading, setIsLoading] = useState(true)

    // const [fabricFtData, setFabricFtData] = useState([{}])

    // console.log(list_ft_tokens)
    useEffect(async () => {
        try {
            let response = await getFTTokens(ftCurrentPage)
            setFTPageData(response.data.results)
            setFTPageCount(Math.ceil(response.data.count/pageSize))
        } catch (error) {
            alert("Something wrong happened. Please reload the page.");
        }
    }, [])
    
    useEffect(async () => {
        try {
            let response = await getNFTTokens(nftCurrentPage)
            setNFTPageData(response.data.results)
            setNFTPageCount(Math.ceil(response.data.count/pageSize))
        } catch (error) {
            alert("Something wrong happened. Please reload the page.");
        }
    }, [])

    // useEffect(async () => {
    //     getFabricTokens()
    //     .then(res => setFabricFtData(res.data))
    //     .catch(err => alert("Something wrong happened. Please reload the page."))
    // }, [])

    // console.log(ftPageData)

    async function handleFTPageClick(e, index) {
        e.preventDefault();
        try {
            let response = await getFTTokens(index)
            setFTPageData(response.data.results)
            setFTPageCount(Math.ceil(response.data.count/pageSize))
            setFTCurrentPage(index)
        } catch (error) {
            alert("Something wrong happened. Please reload the page.");
        }
    }
    
    async function handleFTPreviousClick(e) {
        e.preventDefault();
        const index = ftCurrentPage - 1;
        try {
            let response = await getFTTokens(index)
            setFTPageData(response.data.results)
            setFTPageCount(Math.ceil(response.data.count/pageSize))
            setFTCurrentPage(index)
        } catch (error) {
            alert("Something wrong happened. Please reload the page.");
        }
    }
    
    async function handleFTNextClick(e) {
        e.preventDefault();
        const index = ftCurrentPage + 1;
        try {
            let response = await getFTTokens(index)
            setFTPageData(response.data.results)
            setFTPageCount(Math.ceil(response.data.count/pageSize))
            setFTCurrentPage(index)
        } catch (error) {
            alert("Something wrong happened. Please reload the page.");
        }
    }

    async function handleNFTPageClick(e, index) {
        e.preventDefault();
        setNFTCurrentPage(index)
        try {
            let response = await getNFTTokens(index)
            setNFTPageData(response.data.results)
            setNFTPageCount(Math.ceil(response.data.count/pageSize))
            setNFTCurrentPage(index)
        } catch (error) {
            alert("Something wrong happened. Please reload the page.");
        }
      }
    
    async function handleNFTPreviousClick(e) {
        e.preventDefault();
        const index = nftCurrentPage - 1;
        try {
            let response = await getNFTTokens(index)
            setNFTPageData(response.data.results)
            setNFTPageCount(Math.ceil(response.data.count/pageSize))
            setNFTCurrentPage(index)
        } catch (error) {
            alert("Something wrong happened. Please reload the page.");
        }
      }
    
    async function handleNFTNextClick(e) {
        e.preventDefault();
        const index = nftCurrentPage + 1;
        try {
            let response = await getNFTTokens(index)
            setNFTPageData(response.data.results)
            setNFTPageCount(Math.ceil(response.data.count/pageSize))
            setNFTCurrentPage(index)
        } catch (error) {
            alert("Something wrong happened. Please reload the page.");
        }
    }
    return (
        <>
        <Col className="box-col-10">
            <Card style={{ border: '1px solid #ddd' }}>
                <CardHeader style={{ border: 'none', padding: '20px 20px 20px 30px', minHeight: "5px" }}>
                    <h5 style={{ display: 'flex' }}>
                        Fungible tokens
                    </h5>
                </CardHeader>
                <CardBody style={{padding: '20px'}}>
                    <Table hover responsive className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Icon</th>
                                <th>Token name</th>
                                <th>Symbol</th>
                                <th>Standard</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ftPageData.map((token, index) => {
                                let token_type = ['ERC-20', 'ERC-721'].includes(token.token_standard) ? 'fungible' : 'non_fungible'
                                let isChoosen = false
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>
                                        <img className="rounded-circle" 
                                                src={token.token_icon ? token.token_icon : avatar_placeholder} 
                                                style={{
                                                    width: '30px', 
                                                    height: '30px', 
                                                    maxWidth: '50px', 
                                                    maxHeight: '50px'}}/>

                                        </td>
                                        <td>{token.token_name}</td>
                                        <td>{token.token_symbol}</td>
                                        <td>{token.token_standard}</td>
                                        <td>
                                            <CustomDropdown token={token} token_type={token_type}/>
                                        </td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </Table>
                    
                </CardBody>
                <CardFooter style={{padding: '20px'}}>
                    <CustomTablePagination 
                        pagesCount={ftPageCount} 
                        currentPage = {ftCurrentPage}
                        handleNextClick = {handleFTNextClick}
                        handlePreviousClick = {handleFTPreviousClick}
                        handlePageClick = {handleFTPageClick}
                    />
                </CardFooter>
            </Card>
        </Col >
        <Col className="box-col-10">
        <Card style={{ border: '1px solid #ddd' }}>
            <CardHeader style={{ border: 'none', padding: '20px 20px 20px 30px', minHeight: "5px" }}>
                <h5 style={{ display: 'flex' }}>
                    Non-fungible tokens
                </h5>
            </CardHeader>
            <CardBody>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Icon</th>
                            <th>Token name</th>
                            <th>Symbol</th>
                            <th>Standard</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {nftPageData.map((token, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>
                                        <img className="rounded-circle" 
                                            src={token.token_icon ? token.token_icon : avatar_placeholder} 
                                            style={{
                                                width: '30px', 
                                                height: '30px', 
                                                maxWidth: '50px', 
                                                maxHeight: '50px'}}/>
                                    </td>
                                    <td>{token.token_name}</td>
                                    <td>{token.token_symbol}</td>
                                    <td>{token.token_standard}</td>
                                    <td>
                                        <div className="media-body text-right">
                                            <Link to={`${token.id}`} 
                                                        className="btn" 
                                                        style={{ display: 'inline-flex', alignItems: 'top' }}
                                                        onClick={() => {
                                                            dispatch({type: DISPLAY_TOKEN, payload: token})
                                                        }}>
                                                <img 
                                                    src={more} 
                                                    style={{
                                                    width: '30px', 
                                                    height: '30px', 
                                                    maxWidth: '50px', 
                                                    maxHeight: '50px'}}/>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </Table>
            </CardBody>
            <CardFooter style={{padding: '20px'}}>
                <CustomTablePagination 
                    pagesCount={nftPageCount} 
                    currentPage = {nftCurrentPage}
                    handleNextClick = {handleNFTNextClick}
                    handlePreviousClick = {handleNFTPreviousClick}
                    handlePageClick = {handleNFTPageClick}
                />
            </CardFooter>
        </Card>
        </Col>
        
    </>
    )
}

export default CardToken