import React, { useEffect, useState, useRef } from "react"
import { Label, Button, Spinner } from 'reactstrap'
import { Form } from 'react-bootstrap'
import Web3 from 'web3';
import { getFabricNetworks } from "src/services/User/tokens";

export default function Step0(props){
    const [networkType, setNetworkType] = useState('user_defined_network');
    const [network, setNetwork] = useState(undefined);
    const [connectingState, setConnectingState] = useState(0);
    const [networks, setNetworks] = useState([]);
    useEffect(() => {
        getFabricNetworks().then(res => {
            setNetworks(res.data)
        }).catch(err => {console.log(err)})
    },[])

    const [account, setAccount] = useState(undefined);

    const [enableSubmit, setEnableSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const web3Ref = useRef(undefined);


    const handleNetworkTypeChange = (value) => {
        setNetworkType(value);

        if(value === 'injected_network'){
            setNetwork({id: '', type: value});
            setConnectingState(1);
            setLoading(true);
            window.ethereum.request({method: 'eth_requestAccounts'}).then(res => {
                web3Ref.current = new Web3(window.ethereum);
                setConnectingState(2);

                web3Ref.current.eth.getAccounts().then(res => {
                    setAccount(res[0]);
                })
                setNetwork({id: 'injected_network', type: value});
                setLoading(false);
            });

            window.ethereum.on('accountsChanged', accounts => {
                if(accounts.length > 0){
                    setAccount(accounts[0]);
                    setConnectingState(2);
                }
                else{ 
                    // disconnect
                    setNetwork({id: '', type: networkType});
                    setConnectingState(0);
                    setAccount(undefined);
                }
            });
        }
        else if(value === 'user_defined_network'){
            setNetwork({id: '', type: value});
            setConnectingState(0);
            setAccount(undefined);
            web3Ref.current = undefined;
        }
    }

    const handleNetworkChange = (e) => {
        const newNetwork = e.target.value;
        setNetwork({id: newNetwork, type: networkType});
    }

    const connectingText = (state) => {
        switch(state){
            case 0: return 'Connect to Wallet';
            case 1: return 'Connecting to Wallet';
            case 2: return `Connected to ${account ? truncateAccountAddress(account) : 'undefined'}`;
            default: return 'Undefined state';
        }
    }

    const handleSubmit = e => {
        if(!enableSubmit){
            alert("Form is invalid. Please check again before continue.");
            return;
        }
        props.onDataChange({...props.data, network: network});
        props.jumpToStep(1);
    }

    useEffect(() => {
        let isValid = false;
        if(network && network !== ''){
            isValid = true;
        }
        
        setEnableSubmit(isValid);
        if(isValid) setErrorMessage('');

    }, [network])

    const truncateAccountAddress = (addr) => {
        if(!addr) return addr;
        return addr.substr(0, 5) + '...' + addr.substr(38, 3);
    }

    return (
        <div className="px-md-5">

            <Label className="mt-3">Network</Label>
            <div className="d-flex flex-row flex-wrap mb-3">
                <Button outline color="primary" className="px-2 mb-2 mr-2 text-nowrap" active={networkType === 'user_defined_network'} onClick={() => handleNetworkTypeChange('user_defined_network')}><span style={networkType === 'user_defined_network' ? {color: "white"} : {}}>
                    Use User-defined Network</span></Button>
                <Button outline color="primary" className="px-2 mb-2 mr-2 text-nowrap" active={networkType === "injected_network"} onClick={() => handleNetworkTypeChange('injected_network')} disabled={connectingState === 1}>
                    <span style={connectingState === 2 ? {color: "white"} : {}}>{connectingText(connectingState)}</span>
                </Button>
            </div>

            {networkType === 'user_defined_network' && <div>
                <Form.Control as="select" value={network ? network.name : ''} onChange={handleNetworkChange}>
                    <option value={''}>Select network</option>
                    {networks.map(network => <option data-value={network} value={network.network_id} key={network.network_id}>{network.name}</option>)}
                </Form.Control>
            </div>}

            <div className="d-flex justify-content-end align-items-center mt-5">
                <span className="text-danger mr-3">{errorMessage}</span>
                {loading && <Spinner animation="border" role="status"></Spinner>}
                <Button color='primary' onClick={handleSubmit} disabled={!enableSubmit}>{'Next'}</Button>
            </div>

        </div>
    )
}
