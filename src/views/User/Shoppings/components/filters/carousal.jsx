import React from "react";
import { Row, Col, Media } from "reactstrap";
import Slider from "react-slick";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const Carousal = (props) => {
    var settings = {
        slidesToShow: 1,
        swipeToSlide: false,
        arrows: false,
        dots: false,
    };
    const [state, setState] = useState({ nav1: null, nav2: null });
    const slider1 = useRef();
    const slider2 = useRef();

    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current,
        });
    }, []);
    const { nav1, nav2 } = state;
    const one = "https://hanoicomputercdn.com/media/product/63453_nitrophim2.png";
    const two = "https://hanoicomputercdn.com/media/product/63453_laptop_acer_gaming_nitro_5_tiger_13.jpeg";
    const three = "https://hanoicomputercdn.com/media/product/250_64526_pc_gaming_hacom_36.jpg";

    return (
        <div>
            <hr />
            <div className="product-filter pb-0 new-products">
                <h6 className="f-w-600">{"New Products"}</h6>
                <div className="owl-carousel owl-theme" id="testimonial">
                    <Slider {...settings}>
                        <div className="item">
                            <Row className="product-box">
                                <Col md="6" className="product-img">
                                    <Slider autoplaySpeed={3000} autoplay={true} asNavFor={nav2} arrows={false} ref={(slider) => (slider1.current = slider)} className="product-slider">
                                        <div className="item">
                                            <Media
                                                src={"https://hanoicomputercdn.com/media/product/63862_laptop_asus_gaming_rog_strix_g513im_10.jpg"}
                                                style={{ width: "1000px" }}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="item">
                                            <Media
                                                src={"https://hanoicomputercdn.com/media/product/63862_laptop_asus_gaming_rog_strix_g513im_1.jpg"}
                                                style={{ width: "1000px" }}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="item">
                                            <Media
                                                src={"https://hanoicomputercdn.com/media/product/63862_laptop_asus_gaming_rog_strix_g513im_7.jpg"}
                                                style={{ width: "1000px" }}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </div>
                                    </Slider>
                                </Col>
                                <Col md="6" className="product-details text-left">
                                    <span>
                                        <i className="fa fa-star font-warning mr-1"></i>
                                        <i className="fa fa-star font-warning mr-1"></i>
                                        <i className="fa fa-star font-warning mr-1"></i>
                                        <i className="fa fa-star font-warning mr-1"></i>
                                        <i className="fa fa-star font-warning"></i>
                                    </span>
                                    <p className="mb-0">{"25925$"}</p>
                                    <div className="product-price">{"Laptop Acer Gaming Nitro 5"}</div>
                                </Col>
                            </Row>
                            <Row className="product-box">
                                <Col md="6" className="product-img">
                                    <Slider autoplaySpeed={2000} autoplay={true} asNavFor={nav2} arrows={false} ref={(slider) => (slider1.current = slider)} className="product-slider">
                                        <div className="item">
                                            <Media src={"https://hanoicomputercdn.com/media/product/61621_as7.png"} style={{ width: "1000px" }} alt="" className="img-fluid" />
                                        </div>
                                        <div className="item">
                                            <Media src={"https://hanoicomputercdn.com/media/product/61621_hacom_acer_aspire_7_0.jpeg"} style={{ width: "1000px" }} alt="" className="img-fluid" />
                                        </div>
                                        <div className="item">
                                            <Media
                                                src={"https://hanoicomputercdn.com/media/product/61621_laptop_acer_gaming_aspire_7_a715_42g_7.jpg"}
                                                style={{ width: "1000px" }}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </div>
                                    </Slider>
                                </Col>
                                <Col md="6" className="product-details text-left">
                                    <span>
                                        <i className="fa fa-star font-warning mr-1"></i>
                                        <i className="fa fa-star font-warning mr-1"></i>
                                        <i className="fa fa-star font-warning mr-1"></i>
                                        <i className="fa fa-star font-warning mr-1"></i>
                                        <i className="fa fa-star font-warning"></i>
                                    </span>
                                    <p className="mb-0">{"12364$"}</p>
                                    <div className="product-price">{"Laptop Dell Precision 4800"}</div>
                                </Col>
                            </Row>
                            <Row className="product-box">
                                <Col md="6" className="product-img">
                                    <Slider autoplaySpeed={2500} autoplay={true} asNavFor={nav2} arrows={false} ref={(slider) => (slider1.current = slider)} className="product-slider">
                                        <div className="item">
                                            <Media src={"https://hanoicomputercdn.com/media/product/65299_anh_sp_pcws_design57.jpg"} style={{ width: "1000px" }} alt="" className="img-fluid" />
                                        </div>
                                        <div className="item">
                                            <Media src={"https://hanoicomputercdn.com/media/product/66850_pc_gaming_hacom_thor_002.jpg"} style={{ width: "1000px" }} alt="" className="img-fluid" />
                                        </div>
                                        <div className="item">
                                            <Media src={three} style={{ width: "1000px" }} alt="" className="img-fluid" />
                                        </div>
                                    </Slider>
                                </Col>
                                <Col md="6" className="product-details text-left">
                                    <span>
                                        <i className="fa fa-star font-warning mr-1"></i>
                                        <i className="fa fa-star font-warning mr-1"></i>
                                        <i className="fa fa-star font-warning mr-1"></i>
                                        <i className="fa fa-star font-warning mr-1"></i>
                                        <i className="fa fa-star font-warning"></i>
                                    </span>
                                    <p className="mb-0">{"9847$"}</p>
                                    <div className="product-price">{"PC GAMING HACOM THOR"}</div>
                                </Col>
                            </Row>
                        </div>
                    </Slider>
                    <br />
                    <br />
                    <Slider autoplay={true} asNavFor={nav2} arrows={false} ref={(slider) => (slider1.current = slider)} className="product-slider">
                        <div className="item">
                            <Media src={one} style={{ width: "1000px" }} alt="" className="img-fluid" />
                        </div>
                        <div className="item">
                            <Media src={two} style={{ width: "1000px" }} alt="" className="img-fluid" />
                        </div>
                        <div className="item">
                            <Media src={three} style={{ width: "1000px" }} alt="" className="img-fluid" />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Carousal;
