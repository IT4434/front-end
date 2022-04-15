import React, { Fragment } from "react"
import { Button } from "reactstrap"
import { updateToken } from "src/services/User/tokens"
import { Link } from "react-router-dom"
const Step2 = (props) => {
    const token_type = ['ERC-20', 'ERC-721'].includes(props.data.contract.token_standard) ? 'fungible' : 'non_fungible'
    const id = props.data.contract.id
    console.log(id)
    // console.log(id)
    // console.log(token_type)
    // const handleFinish = () => {
    //     updateToken({
    //         token_type: token_type,
    //         id: id,
    //         address: props.data.contract.address
    //     }).catch(err => {
    //         alert("Something wrong happens. Please try again.");
    //     })
    // }

    return (
        <div className="mt-5">
            <div className="d-flex justify-content-center w-100 flex-column align-items-center">
                <div className="mb-3">
                    <h5>Your token is deployed</h5>
                    <span>Name: {props.data.contract.token_name}</span><br></br>
                    <span>Symbol: {props.data.contract.token_symbol}</span><br></br>
                    <span>Standard: {props.data.contract.token_standard}</span><br></br>
                    <span>Address: {props.data.contract.address}</span><br></br>
                    <div className="media-body text-right">
                        <Link to={{
                                pathname: `/tokens/fabric/${id}/`,
                            }}
                            className="btn btn-primary" 
                            style={{ display: 'inline-flex', alignItems: 'top' }}
                            >
                                Finish
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step2