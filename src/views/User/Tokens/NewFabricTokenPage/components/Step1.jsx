import React, { useEffect, useState, useRef } from "react"
import { Label, Button, Media, Spinner, Input} from 'reactstrap'
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Form } from 'react-bootstrap'
import { HelpCircle } from 'react-feather'

import avatar_placeholder from "../../../../../assets/images/user/7.jpg";
import { createFabricToken } from "src/services/User/tokens";
import { getFabricNetworks } from"../../../../../services/User/tokens"

const DEFAULT_DECIMAL = 18;
const DEFAULT_INITIAL_SUPPLY = 1000;

export default function Step1(props){
    const [networks, setNetworks] = useState([])

    useEffect(() => {
        getFabricNetworks().then(res => {
            setNetworks(res.data)
        }).catch(err => {console.log(err)})
    },[])
    const [networkId, setNetworkId] = useState('')
    const [tokenStandard, setTokenStandard] = useState('ERC-20');
    const [tokenName, setName] = useState('');
    const [tokenSymbol, setSymbol] = useState('');

    const [iconUrl, setIconUrl] = useState(undefined);

    const [initialSupply, setInitialSupply] = useState(undefined);
    const [decimal, setDecimal] = useState(18);

    const [enableSubmit, setEnableSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const iconInputRef = useRef();

    const handleNetworkChange = e => {
        const network = e.target.value
        console.log(network)
        setNetworkId(network)
    }
    useEffect(() => {
        console.log(networkId)
    }, [networkId])

    const handleTokenStandardChange = (value) => {
        setTokenStandard(value);
    }

    const handleNameChange = e => {
        setName(e.target.value);
        console.log(tokenName)
    }

    const handleSymbolChange = e => {
        setSymbol(e.target.value.toUpperCase());
    }

    const handleInitialSupplyChange = e => {
        const newValue = e.target.value ? parseInt(e.target.value) : undefined;
        setInitialSupply(newValue);
    }

    const handleDecimalChange = e => {
        const newValue = e.target.value ? parseInt(e.target.value) : undefined;
        setDecimal(newValue);
    }

    const readUrl = (event) => {
        if(event.target.files.length === 0) return;
        var mimeType = event.target.files[0].type;
    
        if(mimeType.match(/image\/*/) == null) return;
    
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
            setIconUrl(reader.result)
        }
    }

    const handleSubmit = e => {
        if(!enableSubmit){
            alert("Form is invalid. Please check again before continue.");
            return;
        }
        createFabricToken({
            token_standard: tokenStandard,
            token_name: tokenName,
            token_symbol: tokenSymbol,
            token_icon: iconInputRef.current.files[0] || undefined,
            initial_supply: initialSupply,
            decimal: decimal,
            network: networkId
        }).then(res => {
            props.onDataChange({...props.data, contract: res.data});
            props.jumpToStep(1);
        }).catch(err => {
            alert("Something wrong happens. Please try again.");
        })
        
    }

    useEffect(() => {

        let isValid = true;
        if(networkId == ''){
            isValid = false;
            setErrorMessage('network must not be null')
        }
        else if(tokenName.trim().length == 0 || tokenName.trim().length > 64){
            isValid = false;
            setErrorMessage('Name is not valid');
        }
        else if(tokenSymbol.trim().length == 0 || tokenSymbol.trim().length > 64){
            isValid = false;
            setErrorMessage('Symbol is not valid');
        }
        else if(decimal !== undefined && (decimal < 0 || decimal > 32768)){
            isValid = false;
            setErrorMessage('Decimal is not valid');
        }
        else if(initialSupply !== undefined && initialSupply < 0){
            isValid = false;
            setErrorMessage('Initial supply is not valid');
        }
        setEnableSubmit(isValid);
        if(isValid) setErrorMessage('');

    }, [tokenName, tokenSymbol, initialSupply, decimal, tokenStandard, networkId])

    const handleAvatarClick = e => {
        iconInputRef.current.click();
    }


    return (
        <div className="px-mb-5">
            <div className="row mb-5">
                <div>
                    <Label>Choose Your Fabric Network</Label>
                    <FormControl fullWidth={true} style={{ marginBottom: "31px" }} required size="small">
                        <InputLabel >{"Fabric network"}</InputLabel>
                        <Select value={networkId} onChange={handleNetworkChange}>
                            {!networks ? <></> : networks.map((network, index) => 
                                <MenuItem value={network.network_id} key={index}>{network.name}</MenuItem>    
                            )}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col col-md-2 col-12 mb-3">
                    <div>
                        <Label>Icon</Label>
                        <div className="d-flex flex-row flex-grow-0">
                            <Media className="rounded-circle p-0" body alt="" src={iconUrl ? iconUrl : avatar_placeholder} style={{width: '100px', height: '100px', maxWidth: '100px', maxHeight: '100px'}} onClick={handleAvatarClick}/>
                            <input ref={iconInputRef} className="upload display-none" type="file" onChange={(e) => readUrl(e)}/>                            
                        </div>
                    </div>
                    
                </div>
                <div className="col col-md-5 col-12 mb-3">
                    <Label>Name*</Label>
                    <Form.Control type="text" value={tokenName} onChange={handleNameChange}/>
                </div>
                <div className="col col-md-5 col-12 mb-3">
                    <Label>Symbol*</Label>
                    <Form.Control type="text" value={tokenSymbol} onChange={handleSymbolChange}/>
                </div>
                <div className="col col-md-4 col-12 mb-3">
                    <div className="d-flex flex-row justify-content-between">
                        <Label>Initial Supply*</Label>
                        <span data-toggle='tooltip' title=''><HelpCircle width="12px"/></span>    
                    </div>
                    <Form.Control type="number" value={initialSupply} onChange={handleInitialSupplyChange} placeholder={DEFAULT_INITIAL_SUPPLY}/>
                </div>
                <div className="col col-md-4 col-12 mb-3">
                    <div className="d-flex flex-row justify-content-between">
                        <Label>Decimal*</Label>
                        <span data-toggle='tooltip' title=''><HelpCircle width="12px"/></span>    
                    </div>
                    <Form.Control type="number" value={decimal} onChange={handleDecimalChange} placeholder={DEFAULT_DECIMAL}/>
                </div>
            </div>

            <div className="d-flex justify-content-end align-items-center">
                <span className="text-danger mr-3">{errorMessage}</span>
                {loading && <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                <Button color='primary' onClick={handleSubmit} disabled={!enableSubmit}>{'Next'}</Button>
            </div>

        </div>
    )
}
