import React, {useState} from "react"

import { Media, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import more from "../../../../../assets/images/user/three-horizontal-dots-icon-6.png"
import PropTypes from "prop-types"


const CustomDropdown = (token, token_type) => {
    const [dropdownIsOpened, setDropdownIsOpened] = useState(false)
    function toggle() {
        setDropdownIsOpened(!dropdownIsOpened)
    }
    const _token=token

    return (
        <div style={{padding: '0px'}}>
            <Dropdown style={{padding: '0px'}} isOpen={dropdownIsOpened} toggle={toggle
            }>
                <DropdownToggle
                    tag="span"
                    onClick={toggle}
                    data-toggle="dropdown"
                    aria-expanded={dropdownIsOpened}
                >
                    <img
                        src={more} 
                        style={{
                        width: '30px', 
                        height: '30px', 
                        maxWidth: '50px', 
                        maxHeight: '50px'}}/>
                </DropdownToggle>
                <DropdownMenu>
                    <div onClick={toggle}>
                        <Link to={{
                                pathname: `${_token.token.id}/${_token.token_type}`,
                            }} 
                            // className="btn" 
                            style={{ display: 'inline-flex', alignItems: 'top' }}
                        >
                            Detail
                        </Link>
                    </div>
                    <div onClick={toggle}>
                        <Link to={{
                                pathname: `transfer`,
                            }} 
                            // className="btn" 
                            style={{ display: 'inline-flex', alignItems: 'top' }}
                        >
                            Transfer
                        </Link></div>
                </DropdownMenu>
                
            </Dropdown>
        </div>
    )
}

export default CustomDropdown