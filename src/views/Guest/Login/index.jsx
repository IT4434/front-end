import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
// import { Twitter, Facebook, GitHub } from 'react-feather'
// import Logo from 'src/assets'

import { useDispatch, useSelector } from "react-redux";
import { setLocalToken, setRemember, setSessionToken } from "src/utils/token";
import { getRouteByRole, setLocalRole, setSessionRole } from "src/utils/role";
import { setLocalUser, setSessionUser } from "src/utils/user";
import { OPEN_ERROR_ALERT } from "src/redux/User/Alerts/actionTypes";
import { OPEN_WARNING_ALERT } from "src/redux/User/Alerts/actionTypes";
import { OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";
import { imagePath } from "../../../constant/imagePath";
import { loginAdmin, loginUser } from "src/services/Guest/login";
import { CATEGORY } from "src/redux/User/Settings/actionTypes";

const Login = (props) => {
    const dispatch = useDispatch();

    const [togglePassword, setTogglePassword] = useState(false);
    const user = useSelector((state) => state.User.user);
    const [state, setState] = useState({
        email: "",
        password: "",
        remember: true,
    });
    const [role, setRole] = useState("user");

    const navigate = useNavigate();

    const HideShowPassword = (tPassword) => {
        setTogglePassword(!tPassword);
    };
    const handleForgotPass = () => {
        dispatch({ type: CATEGORY, payload: "email" });
        navigate("/settings");
    };

    async function hdLogin(e) {
        e.preventDefault();
        var response;
        try {
            const data = {
                email: state.email,
                password: state.password,
            };
            if (data.email === "") {
                dispatch({ type: OPEN_WARNING_ALERT, payload: { message: "Enter your email, please!" } });
            } else if (data.email === "") {
                dispatch({ type: OPEN_WARNING_ALERT, payload: { message: "Enter your user name, please!" } });
            } else {
                if (role === "user") {
                    response = await loginUser(data);
                } else {
                    response = await loginAdmin(data);
                    console.log("admin", response);
                }
                const body = response.data;
                if (body.access_token) {
                    if (state.remember) {
                        setLocalToken(body.access_token);
                        setLocalRole("user");
                        body.user?.id && setLocalUser(body.user.id);
                        setRemember(true);
                        if (role === "user") {
                            navigate("/products");
                        } else {
                            navigate("/admin/dashboard");
                        }
                    } else {
                        setSessionToken(body.access_token);
                        setSessionRole("user");
                        setSessionUser(body.user.id);
                        setRemember(false);
                    }
                    // await dispatch(userActions.getProfile({ user_id: body.data.user_id }));
                    dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Logged in successfully!" } });
                    setTimeout(() => {
                        // navigate(getRouteByRole("user"));
                    }, 900);
                } else {
                    dispatch({ type: OPEN_ERROR_ALERT, payload: { message: "Login Fail!!!" } });
                    console.error(body);
                }
            }
        } catch (error) {
            dispatch({ type: OPEN_ERROR_ALERT, payload: { message: "Login error!" } });
            console.error(error);
        }
    }

    return (
        <Container fluid={true} className="p-0">
            <Row>
                <Col xs="12">
                    <div className="login-card">
                        <div>
                            <div>
                                <a className="logo" href="#javascript">
                                    <img className="img-fluid " src={"https://soict.hust.edu.vn/wp-content/uploads/logo-soict-hust-1.png"} height="40" width="125" alt="" />
                                    {/* <img className="img-fluid for-dark" src={imagePath.LOGO_DARK} height="40" width="125" alt="" /> */}
                                </a>
                            </div>
                            <div className="login-main">
                                <Form className="theme-form">
                                    <h4>{"Login Super Market"}</h4>
                                    <p></p>
                                    <FormGroup>
                                        <Label className="col-form-label">{"Email"}</Label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            name="username"
                                            value={state.email}
                                            onChange={(e) => {
                                                setState({ ...state, email: e.target.value });
                                            }}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="col-form-label">{"Password"}</Label>
                                        <Input
                                            className="form-control"
                                            type={togglePassword ? "text" : "password"}
                                            name="password"
                                            value={state.password}
                                            onChange={(e) => {
                                                setState({ ...state, password: e.target.value });
                                            }}
                                            required
                                        />
                                        <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}>
                                            <span className={togglePassword ? "" : "show"}></span>
                                        </div>
                                    </FormGroup>

                                    <div className="form-group mb-0">
                                        <div className="checkbox ml-3">
                                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                <Input
                                                    id="user"
                                                    type="checkbox"
                                                    checked={role === "user"}
                                                    onChange={(e) => {
                                                        setRole("user");
                                                    }}
                                                />
                                                <Label className="text-muted" for="user">
                                                    User
                                                </Label>
                                                <Input
                                                    id="admin"
                                                    type="checkbox"
                                                    checked={role === "admin"}
                                                    onChange={(e) => {
                                                        setRole("admin");
                                                    }}
                                                />
                                                <Label className="text-muted" for="admin">
                                                    Admin
                                                </Label>
                                            </div>
                                        </div>

                                        <div className="checkbox ml-3">
                                            <Input
                                                id="checkbox1"
                                                type="checkbox"
                                                name="remember"
                                                checked={state.remember}
                                                onChange={(e) => {
                                                    setState({ ...state, remember: !state.remember });
                                                }}
                                            />
                                            <Label className="text-muted" for="checkbox1">
                                                Remember me
                                            </Label>
                                        </div>
                                        <Input type="submit" color="primary" className="btn btn-primary" onClick={hdLogin} value="Login"></Input>
                                    </div>

                                    <div style={{ cursor: "pointer" }} className="mt-4 mb-0" onClick={() => handleForgotPass()}>
                                        {"Forgot Password?"}
                                    </div>

                                    <p className="mt-4 mb-0">
                                        {"Don't have account?"}
                                        <a className="ml-2" href="/registry">
                                            {"Create Account"}
                                        </a>
                                    </p>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
