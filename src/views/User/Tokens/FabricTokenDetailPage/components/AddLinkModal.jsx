import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Modal} from 'react-bootstrap'

import { getTokenDetail, getFTTokens } from 'src/services/User/tokens';

const AddLinkModal = () => {
    const [tokens_to_add, setTokensToAdd] = useState([])
    const [ftCurrentPage, setFTCurrentPage] = useState(1)
    const [ftPageCount, setFTPageCount] = useState(1)
    useEffect(async () => {
        try {
            let response = await getFTTokens(ftCurrentPage)
            setTokensToAdd(response.data.results)
            setFTPageCount(Math.ceil(response.data.count/pageSize))
        } catch (error) {
            alert("Something wrong happened. Please reload the page.");
        }
    }, [])
    

}