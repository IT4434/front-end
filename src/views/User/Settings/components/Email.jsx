import { useEffect, useState } from "react";
import React from "react";
import { Col, Row } from "reactstrap";
import "../index.scss";
import { Button } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { SEND_VERIFY } from "src/redux/User/Settings/actionTypes";
import { VERIFY_EMAIL } from "src/redux/User/Settings/actionTypes";
import { SERVICE_URL_USER } from "src/constant/config";
import axios from "axios";
import { getToken } from "src/utils/token";
import { OPEN_INFO_ALERT } from "src/redux/User/Alerts/actionTypes";

export default function Email() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.User.user);
    const currentEmail = user.email;
    const tempEmail = user.temp_email;
    const [displayVerify, setDisplayVerify] = useState(false);
    const [email, setEmail] = useState(currentEmail === "" ? tempEmail : currentEmail);
    const [otp, setOtp] = useState();

    async function forgotPassword(payload) {
        await axios({
            method: "POST",
            url: `${SERVICE_URL_USER}/auth/password/forget`,
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            data: payload,
            timeout: 30000,
        }).then((res) => {
            dispatch({ type: OPEN_INFO_ALERT, payload: { message: "Please check your email!" } });
        });
    }
    const handleEmail = (e) => {
        // setDisplayVerify(!displayVerify);
        // dispatch({ type: SEND_VERIFY, payload: { user_id: user.user_id } });
        forgotPassword({ email: email });
    };
    const handleVerifyOTP = () => {
        dispatch({ type: VERIFY_EMAIL, payload: { user_id: user.user_id, otp: otp, email: email } });
    };
    return (
        <>
            <Row className="d-center mt-5">
                {/* <h1>{currentEmail === "" ? "Verify" : "Change"} Email</h1> */}
                <h1>Forgot Password</h1>
            </Row>

            <Col className="col-md-12 d-center" style={{ display: displayVerify ? "none" : "" }}>
                <Row className="rowEditProfile d-center">
                    <Col className="col-md-6">
                        <TextField onChange={(e) => setEmail(e.target.value)} size="small" label="Email" variant="filled" fullWidth defaultValue={currentEmail === "" ? tempEmail : currentEmail} />
                        <br />
                        <br />
                        <div style={{ display: "flex", justifyContent: "right" }}>
                            <Button variant="contained" color="primary" onClick={(e) => handleEmail()}>
                                Submit
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Col>

            <Col className="col-md-12 d-center" style={{ display: !displayVerify ? "none" : "" }}>
                <Row className="rowEditProfile d-center">
                    <Col className="col-md-6">
                        <TextField size="small" label="OTP Code" variant="filled" className="input" onChange={(e) => setOtp(e.target.value)} />
                        <br />
                        <br />
                        <Button variant="contained" color="primary" onClick={() => handleVerifyOTP()}>
                            OK
                        </Button>
                    </Col>
                </Row>
            </Col>
            <div style={{ height: "100px" }}></div>
        </>
    );
}
