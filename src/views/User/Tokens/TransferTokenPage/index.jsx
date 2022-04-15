import React, { useEffect, useState, useRef } from "react"
import { Container, Row, Col, Card, CardHeader, CardBody, Label } from 'reactstrap'
import { Spinner, Button, Badge, Form } from "react-bootstrap"
import Web3 from 'web3';
import { invokeBurnTransaction ,invokeTransaction, getFabricTokensByNetwork, getFabricNetworks, getNetworks, getTokenByNetwork, getBridgeContractInterface, getERC20ContractInterface } from "src/services/User/tokens";
import { setToken } from "src/utils/token";

const TransferTokenPage = () => {
    const [connected, setConnected] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [transfering, setTransfering] = useState(false);

    const [networks, setNetworks] = useState([]);
    const [fromTokens, setFromTokens] = useState([]);
    const [toTokens, setToTokens] = useState([]);

    const [fromNetworkType, setFromNetworkType] = useState('')
    const [fromNetworks, setFromNetworks] = useState([])
    
    const [toNetworkType, setToNetworkType] = useState('')
    const [toNetworks, setToNetworks] = useState([])

    const [accountAddress, setAccountAddress] = useState(undefined);

    const [fromNetwork, setFromNetwork] = useState(undefined);
    const [toNetwork, setToNetwork] = useState(undefined);

    const [fromToken, setFromToken] = useState(undefined);
    const [toToken, setToToken] = useState(undefined);

    const [amount, setAmount] = useState(0);
    const [maxAmount, setMaxAmount] = useState(0);
    const [toAddress, setToAddress] = useState('');

    const web3Ref = useRef(undefined);

    const rinkebyBridgeContractInterfaceRef = useRef(undefined);
    const erc20ContractInterfaceRef = useRef(undefined);

    useEffect(() => {
        getNetworks().then(res => {
            setFromNetworks(res.data);
            if(res.data.length > 0){
                setFromNetwork(res.data[0]);
            }
            setToNetworks(res.data);
            if(res.data.length > 0){
                setToNetwork(res.data[0]);
            }
        })

        getBridgeContractInterface({network: "Rinkeby Test Network"}).then(res => {
            rinkebyBridgeContractInterfaceRef.current = res.data;
        })

        getERC20ContractInterface().then(res => {
            erc20ContractInterfaceRef.current = res.data;
        })
    }, [])

    useEffect(() => {
        if(fromToken && toToken && amount > 0 && (toAddress||toNetworkType==='user_defined_network')) setEnableSubmit(true);
        else setEnableSubmit(false);
    }, [fromToken, toToken, amount, toAddress, fromNetworkType, toNetworkType])

    useEffect(() => {
        if(!fromNetwork) return;
        if(fromNetworkType==='injected_network'){
            getTokenByNetwork({network_name: fromNetwork.name}).then(res => {
                setFromTokens(res.data.results.filter(token => token.address));
                setFromToken(undefined);
            })
        }
        if(fromNetworkType==='user_defined_network'){
            getFabricTokensByNetwork({network: fromNetwork.name}).then(res => {
                setFromTokens(res.data);
                setFromToken(undefined);
            })
        }
        
    }, [fromNetwork])

    useEffect(() => {
        if(!toNetwork) return;

        if(!fromToken){
            setToToken(undefined);
            setToNetwork(undefined);
            return
        }
        
        if(toNetworkType==='injected_network'){
            getTokenByNetwork({network_name: toNetwork.name, linked_contract: fromToken.id}).then(res => {
                setToTokens(res.data.results);
                if(res.data.results.length > 0) setToToken(res.data.results[0]);
                else setToToken(undefined);
            })
        }
        if(toNetworkType==='user_defined_network'){
            getFabricTokensByNetwork({network: toNetwork.name}).then(res => {
                setToTokens(res.data);
                if(res.data.length > 0) setToToken(res.data[0]);
                else setToToken(undefined);
            })
        }
            
        
    }, [toNetwork, fromToken])

    useEffect(() => {
        if(!fromToken || !accountAddress){
            setMaxAmount('');
            return;
        };
        if(!fromToken.address){
            setMaxAmount(''); return;
        }

        async function getBalance(){
            const accounts = await web3Ref.current.eth.getAccounts();
            const contract = await new web3Ref.current.eth.Contract(erc20ContractInterfaceRef.current, fromToken.address);
            const _balance = await contract.methods.balanceOf(accounts[0]).call();
            const BN = web3Ref.current.utils.BN;
            let balance = new BN(_balance);

            setMaxAmount(balance.div((new BN(10)).pow(new BN(fromToken.decimal))).toNumber());
        }

        getBalance();

    }, [fromToken])

    useEffect(() => {
        if(maxAmount === '' || maxAmount === undefined) return;

        if(amount > maxAmount){
            setErrorMessage('Warning: Amount is too high');
        }
        else setErrorMessage('');

    }, [amount])

    const handleFromNetworkTypeChange = (value) => {
        setFromNetworkType(value);

        if(value === 'injected_network'){
            getNetworks().then(res => {
                setFromNetworks(res.data);
                if(res.data.length > 0){
                    setFromNetwork(res.data[0]);
                }
            })
        }
        else if(value === 'user_defined_network'){
            getFabricNetworks().then(res => {
                setFromNetworks(res.data);
                if(res.data.length > 0){
                    setFromNetwork(res.data[0]);
                }
            })
            setConnected(false)
            setConnecting(false)
        }
    }

    const handleToNetworkTypeChange = (value) => {
        setToNetworkType(value);

        if(value === 'injected_network'){
            getNetworks().then(res => {
                setToNetworks(res.data);
                if(res.data.length > 0){
                    setToNetwork(res.data[0]);
                }
            })
        }
        else if(value === 'user_defined_network'){
            getFabricNetworks().then(res => {
                setToNetworks(res.data);
                if(res.data.length > 0){
                    setToNetwork(res.data[0]);
                }
            })
        }
    }

    const handleConnectButtonClick = () => {
        setConnecting(true);
        window.ethereum.request({method: 'eth_requestAccounts'}).then(res => {
            web3Ref.current = new Web3(window.ethereum);

            if(res.length > 0) setAccountAddress(res[0]);

            setConnected(true);
            setConnecting(false);
        });
    }

    async function handleSubmit(){
        if (fromNetworkType==='injected_network'){
            const accounts = await web3Ref.current.eth.getAccounts();

            console.log("Attempt to send transaction from account", accounts[0]);
            
            // need abi and bin
    
            setTransfering(true);
    
            console.log(rinkebyBridgeContractInterfaceRef.current);
    
            try{
                const contract = await new web3Ref.current.eth.Contract(rinkebyBridgeContractInterfaceRef.current, "0x1d3B4f152D1a2e827c401C92Bb87f8c09184DA37");
    
                const tx = contract.methods.burn(fromToken.address, accounts[0], web3Ref.current.utils.toWei(amount, 'ether'));
    
                await tx.send({from: accounts[0], gas: "210000" });
    
                setTransfering(false);
    
                let newMaxAmount = maxAmount - amount;
    
                setMaxAmount(newMaxAmount);
    
                alert("Token is transferred successfully");
                if(toNetworkType==='user_defined_network'){
                    invokeTransaction({
                        token_name: toToken.token_name,
                        network_id: toNetwork.network_id,
                        quantity: amount
                    }).then(res => window.location.reload()).catch(err => {alert('Something wrong happens')})
                }
    
            } catch(error){
                console.log(error);
    
                alert("Something wrong happens. Please try again.");
                setTransfering(false);
            }
        }
        if (fromNetworkType==='user_defined_network'){
            invokeBurnTransaction({
                token_name: fromToken.token_name,
                network_id: fromNetwork.network_id,
                quantity: amount, 
                to_address: toAddress,
                to_token: toToken.address
            }).then(res => window.location.reload()).catch(err => {alert('Something wrong happens')})
        }
        
    }

    const handleFromNetworkChange = e => {
        const newFromNetwork = e.target.value;

        if(!newFromNetwork){
            setFromNetwork(undefined);
        }

        for(let i=0; i<networks.length; i++){
            if(networks[i].name === newFromNetwork) setFromNetwork(networks[i]);
        }
        if(networks.length >= 2){
            for(let i=0; i<networks.length; i++){
                if(networks[i].name !== newFromNetwork) setToNetwork(networks[i]);
            }
        }
    }

    const handleToNetworkChange = e => {
        const newToNetwork = e.target.value;
        for(let i=0; i<networks.length; i++){
            if(toNetworks[i].name === newToNetwork) setToNetwork(toNetworks[i]);
        }
    }

    const handleFromTokenChange = e => {
        const newFromTokenId = e.target.value;

        if(!newFromTokenId){
            setFromToken(undefined)
        }
        else{
            for(let i=0; i< fromTokens.length; i++){
                if(fromTokens[i].id === newFromTokenId) setFromToken(fromTokens[i]);
            }
        }
    }

    const handleToTokenChange = e => {
        const newToTokenId = e.target.value;

        if(!newToTokenId) setToken(undefined);
        else{
            for(let i=0; i< toTokens.length; i++){
                if(toTokens[i].id === newToTokenId) setToToken(toTokens[i]);
            }
        }
    }

    const handleAmountChange = e => {
        setAmount(e.target.value);
    }

    const handleToAddressChange = e => {
        setToAddress(e.target.value);
    }

    const isSubmittable = () => {
        let res = connected && !transfering && enableSubmit;

        if(maxAmount !== '' && maxAmount !== undefined && amount){
            res = res & (amount <= maxAmount);
            return res
        }
        if (fromNetworkType==='user_defined_network'){
            res=!transfering && enableSubmit
        }
        return res;
    }

    return (
        <>
            <Container>
                <Row className="pt-3">
                    <Col className="box-col-12">
                        <Card>
                            <CardHeader>
                                <h5>Transfer Token</h5>
                                <div className="media-body text-right">
                                </div>
                            </CardHeader>

                            <CardBody>
                                <div className="d-flex justify-content-center w-100 flex-column align-items-center">
                                    <div>
                                        {connected ? <h5><Badge pill bg="success">Connected to {accountAddress ? (accountAddress.substring(0, 6) + '...' + accountAddress.substring(accountAddress.length-4, accountAddress.length)) : ''}</Badge></h5> : <Button variant="outline-success" onClick={handleConnectButtonClick} disabled={connecting}>{connecting ? 'Connecting...' : 'Connect to wallet'}</Button>}
                                    </div>
                                </div>

                                <div className={"row mt-4 mx-5 justify-content-center " }>
                                    <div className="col col-5">
                                        <h5 className="text-center">From</h5>
                                        <div className="d-flex flex-row flex-wrap mb-1">
                                            <Button variant="outline-primary" className="px-2 mb-2 mr-2 text-nowrap" active={fromNetworkType === 'user_defined_network'} onClick={() => handleFromNetworkTypeChange('user_defined_network')}>
                                                <span style={fromNetworkType === 'user_defined_network' ? {color: "white"} : {}}>
                                                    Use User-defined Network
                                                </span>
                                            </Button>
                                            <Button variant="outline-primary" className="px-2 mb-2 mr-2 text-nowrap" active={fromNetworkType === "injected_network"} onClick={() => handleFromNetworkTypeChange('injected_network')} >
                                                <span style={fromNetworkType === 'injected_network' ? {color: "white"} : {}}>
                                                    Use Injected Ethereum Network
                                                </span>
                                            </Button>
                                        </div>
                                        <div className="mb-3">
                                            <Label>Network</Label>
                                            <Form.Control as="select" value={fromNetwork ? fromNetwork.name : ''} onChange={handleFromNetworkChange}>
                                                <option value=''>Select network</option>
                                                {fromNetworks.map(network => <option data-value={network} value={network.name} key={network.name}>{network.name}</option>)}
                                            </Form.Control>
                                        </div>
                                        <div className="mb-3">
                                            <Label>Token</Label>
                                            <Form.Control as="select" value={fromToken ? fromToken.id : ''} onChange={handleFromTokenChange} disabled={!fromNetwork}>
                                                <option value=''>Select token</option>
                                                {fromTokens.map(token => <option data-value={token} value={token.id} key={token.id}>{token.token_name} ({token.token_symbol})</option>)}
                                            </Form.Control>
                                        </div>
                                        <div className="mb-3">
                                            <Label>Amount</Label>
                                            <Form.Control type="number" value={amount} onChange={handleAmountChange}/>
                                            <p className="muted mt-2">Max amount: {maxAmount}</p>
                                        </div>

                                    </div>
                                    <div className="col col-5">
                                        <h5 className="text-center">To</h5>
                                        <div className="d-flex flex-row flex-wrap mb-1">
                                            <Button variant="outline-primary"
                                                    className="px-2 mb-2 mr-2 text-nowrap" 
                                                    active={toNetworkType === 'user_defined_network'} 
                                                    onClick={() => handleToNetworkTypeChange('user_defined_network')}
                                                    disabled={fromNetworkType==='user_defined_network' ? true : false}>
                                                <span style={toNetworkType === 'user_defined_network' ? {color: "white"} : {}}>
                                                    Use User-defined Network
                                                </span>
                                            </Button>
                                            <Button variant="outline-primary" className="px-2 mb-2 mr-2 text-nowrap" active={toNetworkType === "injected_network"} onClick={() => handleToNetworkTypeChange('injected_network')} >
                                                <span style={toNetworkType === 'injected_network' ? {color: "white"} : {}}>
                                                    Use Injected Ethereum Network
                                                </span>                                            
                                            </Button>
                                        </div>
                                        <div className="mb-3">
                                            <Label>Network</Label>
                                            <Form.Control as="select" value={toNetwork ? toNetwork.name : ''} onChange={handleToNetworkChange} disabled={!fromNetwork || !fromToken}>
                                                <option value=''>Select network</option>
                                                {toNetworks.filter(network => !fromNetwork || network.name !== fromNetwork.name).map(network => <option data-value={network} value={network.name} key={network.name}>{network.name}</option>)}
                                            </Form.Control>
                                        </div>

                                        <div className="mb-3">
                                            <Label>Token</Label>
                                            <Form.Control as="select" value={toToken ? toToken.id : ''} onChange={handleToTokenChange} disabled={!toNetwork}>
                                                <option value=''>Select token</option>
                                                {toTokens.map(token => <option value={token.id} key={token.id}>{token.token_name} ({token.token_symbol})</option>)}
                                            </Form.Control>
                                        </div>
                                        <div className="mb-3">
                                            <Label>To Address</Label>
                                            <Form.Control type="text" value={toAddress} onChange={handleToAddressChange} disabled={toNetworkType==='user_defined_network'}/>
                                        </div>

                                        
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end align-items-center">
                                    <span className="text-danger mr-3">{errorMessage}</span>
                                    {loading && <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>}
                                    <Button color='primary' onClick={handleSubmit} disabled={!isSubmittable()}>{transfering ? 'Tranfering...' : 'Transfer'}</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TransferTokenPage