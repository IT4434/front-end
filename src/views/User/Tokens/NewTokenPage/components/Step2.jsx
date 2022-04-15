import React, { useState, useEffect, useRef } from "react"
import { Spinner, Button, Badge } from "react-bootstrap"
import Web3 from 'web3';
import { getContractBinary, getContractInterface } from "../../../../../services/User/tokens";

export default function Step2(props){
    // const [enableSubmit, setEnableSubmit] = useState(true);
    // const [loading, setLoading] = useState(false);
    const [deploying, setDeploying] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // const [network, setNetwork] = useState(undefined);
    const [connected, setConnected] = useState(false);
    const [contract, setContract] = useState({});

    // const [connecting, setConnecting] = useState(false);

    const [account, setAccount] = useState(undefined);

    const web3Ref = useRef(undefined);

    const [contractBinary, setContractBinary] = useState(undefined);
    const [contractInterface, setContractInterface] = useState(undefined);

    async function handleSubmit(){
        const accounts = await web3Ref.current.eth.getAccounts();

        // console.log("Attempting to deploy from account", accounts[0]);
        console.log('binary', contractBinary.length);
        console.log('interface', contractInterface.length);

        console.log(contractInterface);
        console.log(contract);

        setDeploying(true);
        try{
            // const result = await new web3Ref.current.eth.Contract(contractInterface)
            // .deploy({data: contractBinary, arguments: contract.arguments})
            // .send({ gas: "10000000", gasPrice: "5000000000", from: accounts[0] });

            const deployingContract = await new web3Ref.current.eth.Contract(contractInterface);
            await deployingContract.deploy({data: contractBinary, arguments: contract.arguments}).send({from: accounts[0]});
            console.log(deployingContract);

            setDeploying(false);

            console.log("Contract deployed to", deployingContract.options.address);

            props.onDataChange({...props.data, contract: {...contract, address: deployingContract.options.address}});
            props.jumpToStep(3);
        } catch(error){
            console.error(error);
            alert("Something wrong happens. Please try again.");
            props.jumpToStep(0)
        }
        // const result = await new web3Ref.current.eth.Contract(contractInterface)
        //     .deploy({data: contractBinary, arguments: contract.arguments})
        //     .send({ gas: "10000000", gasPrice: "5000000000", from: accounts[0] });

        // setDeploying(false);

        // console.log("Contract deployed to", result.options.address);

        // props.onDataChange({...props.data, contract: {...contract, address: result.options.address}});
        // props.jumpToStep(2);
    }

    useEffect(() => {
        let valid = true;
        if(!connected) valid = false;

        // setEnableSubmit(valid);
    }, [connected])

    useEffect(() => {
        if(props.data.contract){
            setContract(props.data.contract);
        }
        else setContract({});
    }, [props.data])

    useEffect(() => {
        if(!contract || !contract.compiled_code) return;

        if(!contractBinary){
            getContractBinary({url: contract.compiled_code}).then(res => {
                setContractBinary(res.data);
            }).catch(err => {
                alert("Something wrong happened. Please reload the page.");
            })
        }
        if(!contractInterface){
            getContractInterface({url: contract.abi}).then(res => {
                setContractInterface(res.data);
            }).catch(err => {
                alert("Something wrong happened. Please reload the page.");
            })
        }
    }, [contract])

    useEffect(() => {
        if(props.data.network.type === 'injected_network'){
            window.ethereum.request({method: 'eth_requestAccounts'}).then(res => {
                web3Ref.current = new Web3(window.ethereum);

                web3Ref.current.eth.getAccounts().then(res => {
                    setAccount(res[0]);
                })
            })

            console.log('Use injected_network');
        }
        else if(props.data.network.type === 'user_defined_network'){
            console.log('Use user_defined_network');
        }
    }, []);

    const truncateAccountAddress = (addr) => {
        if(!addr) return addr;
        return addr.substr(0, 5) + '...' + addr.substr(38, 3);
    }
    
    return (
        <div className="mt-5">
            <div className="d-flex justify-content-center w-100 flex-column align-items-center">
                <div className="mb-3">
                    <h5>A new token is ready to be deployed</h5>
                    <span>Name: {contract.token_name}</span><br></br>
                    <span>Symbol: {contract.token_symbol}</span><br></br>
                    <span>Standard: {contract.token_standard}</span>
                </div>
                {props.data.network_type === 'injected_network' && <Badge pill bg="success">{`Connected to ${account ? truncateAccountAddress(account) : 'undefined'}`}</Badge>}
            </div>
            
            <div className="d-flex justify-content-end align-items-center">
                <span className="text-danger mr-3">{errorMessage}</span>
                <Button color='primary' onClick={handleSubmit} disabled={deploying}>{deploying ? 'Deploying...' : 'Deploy'}</Button>
            </div>
        </div>
    );
};
