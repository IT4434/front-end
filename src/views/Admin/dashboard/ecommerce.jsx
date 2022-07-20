import React, { Fragment, useState } from "react";
import ApexCharts from "react-apexcharts";
import Slider from "react-slick";
import { Container, Row, Col, Card, CardBody, CardHeader, Table } from "reactstrap";
import CountUp from "react-countup";
import { Monthlysales, columnCharts, totalearning, Riskfactorchart } from "./chartsData/apex-charts-data";
import { withGoogleMap, GoogleMap, withScriptjs } from "react-google-maps";
import { useEffect } from "react";
import { SERVICE_URL_ADMIN } from "src/constant/config";
import { getToken } from "src/utils/token";
import axios from "axios";

const Dashboard = (props) => {
    // eslint-disable-next-line
    const [bestSeller, setBestSeller] = useState();
    const img = [
        "https://kddi-h.assetsadobe3.com/is/image/content/dam/au-com/mobile/mb_img_58.jpg?scl=1",
        "https://t-mobile.scene7.com/is/image/Tmusprod/fg-OnePlus-N20-5G-nologo-2?wid=750&hei=750&fmt=png-alpha",
        "https://image.oppo.com/content/dam/oppo/common/mkt/v2-2/a16/series/A16-middlebanner-blue-640x480-mobile.jpg.thumb.webp",
    ];
    const [location, setlocation] = useState({
        address: false,
        mapPosition: {
            lat: 21.0051377,
            lng: 105.8433522,
        },
        markerPosition: {
            lat: 18.5204,
            lng: 73.8567,
        },
    });

    const BasicMap = withScriptjs(
        withGoogleMap((props) => <GoogleMap google={props.google} defaultZoom={15} defaultCenter={{ lat: location.mapPosition.lat, lng: location.mapPosition.lng }}></GoogleMap>)
    );
    async function getBestSeller() {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_ADMIN}/statics/month-top-product?month=06/2022`,
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            setBestSeller(res.data);
        });
    }
    useEffect(() => {
        getBestSeller();
    }, []);

    const settings = {
        className: "center",
        centerMode: true,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        centerPadding: "5px",
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Fragment>
            <Container fluid={true}>
                <Row className="size-column">
                    <Col xl="7 xl-100" className="box-col-12 ">
                        <Row className="dash-chart">
                            <Col xl="6" className="box-col-6" md="6">
                                <Card className="o-hidden">
                                    <CardHeader className="card-no-border">
                                        <div className="card-header-right">
                                            <ul className="list-unstyled card-option">
                                                <li>
                                                    <i className="fa fa-spin fa-cog"></i>
                                                </li>
                                                <li>
                                                    <i className="view-html fa fa-code"></i>
                                                </li>
                                                <li>
                                                    <i className="icofont icofont-maximize full-card"></i>
                                                </li>
                                                <li>
                                                    <i className="icofont icofont-minus minimize-card"></i>
                                                </li>
                                                <li>
                                                    <i className="icofont icofont-refresh reload-card"></i>
                                                </li>
                                                <li>
                                                    <i className="icofont icofont-error close-card"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="media">
                                            <div className="media-body">
                                                <p>
                                                    <span className="f-w-500 font-roboto">{"TodayTotalSale"}</span>
                                                    <span className="f-w-700 font-primary ml-2">{"89.21%"}</span>
                                                </p>
                                                <h4 className="f-w-500 mb-0 f-26">
                                                    {"$"}
                                                    <span className="counter">
                                                        <CountUp end={300056} />
                                                    </span>
                                                </h4>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="p-0">
                                        <div className="media">
                                            <div className="media-body">
                                                <div className="profit-card">
                                                    <ApexCharts id="spaline-chart" options={Monthlysales.options} series={Monthlysales.series} type="area" height={150} />
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl="6" className="box-col-6" md="6">
                                <Card className="o-hidden">
                                    <CardHeader className="card-no-border">
                                        <div className="card-header-right">
                                            <ul className="list-unstyled card-option">
                                                <li>
                                                    <i className="fa fa-spin fa-cog"></i>
                                                </li>
                                                <li>
                                                    <i className="view-html fa fa-code"></i>
                                                </li>
                                                <li>
                                                    <i className="icofont icofont-maximize full-card"></i>
                                                </li>
                                                <li>
                                                    <i className="icofont icofont-minus minimize-card"></i>
                                                </li>
                                                <li>
                                                    <i className="icofont icofont-refresh reload-card"></i>
                                                </li>
                                                <li>
                                                    <i className="icofont icofont-error close-card"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="media">
                                            <div className="media-body">
                                                <p>
                                                    <span className="f-w-500 font-roboto">{"TodayTotalVisits"}</span>
                                                    <span className="f-w-700 font-primary ml-2">{"35.00%"}</span>
                                                </p>
                                                <h4 className="f-w-500 mb-0 f-26 counter">
                                                    <CountUp end={9050} />
                                                </h4>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="pt-0">
                                        <div className="monthly-visit">
                                            <ApexCharts id="column-chart" options={columnCharts.options} series={columnCharts.series} type="bar" height={105} />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl="6" lg="12" md="6" className="box-col-6">
                                <Card className="o-hidden">
                                    <CardBody>
                                        <div className="ecommerce-widgets media">
                                            <div className="media-body">
                                                <p className="f-w-500 font-roboto">
                                                    {"OurSaleValue"}
                                                    <span className="badge pill-badge-primary ml-3">{"New"}</span>
                                                </p>
                                                <h4 className="f-w-500 mb-0 f-26">
                                                    {"$"}
                                                    <span className="counter">
                                                        <CountUp end={745425} />
                                                    </span>
                                                </h4>
                                            </div>
                                            <div className="ecommerce-box light-bg-primary">
                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl="6" lg="12" md="6" className="box-col-6">
                                <Card className="o-hidden">
                                    <CardBody>
                                        <div className="media">
                                            <div className="media-body">
                                                <p className="f-w-500 font-roboto">
                                                    {"TodayStockValue"}
                                                    <span className="badge pill-badge-primary ml-3">{"Hot"}</span>
                                                </p>
                                                <div className="progress-box">
                                                    <h4 className="f-w-500 mb-0 f-26">
                                                        {"$"}
                                                        <span className="counter">
                                                            <CountUp end={900004} />
                                                        </span>
                                                    </h4>
                                                    <div className="progress sm-progress-bar progress-animate app-right d-flex justify-content-end">
                                                        <div className="progress-gradient-primary" role="progressbar" style={{ width: "35%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                                            <span className="font-primary">{"88%"}</span>
                                                            <span className="animate-circle"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl="5 xl-50" className="box-col-12">
                        <Card className="o-hidden dash-chart">
                            <CardHeader className="card-no-border">
                                <div className="card-header-right">
                                    <ul className="list-unstyled card-option">
                                        <li>
                                            <i className="fa fa-spin fa-cog"></i>
                                        </li>
                                        <li>
                                            <i className="view-html fa fa-code"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-maximize full-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-minus minimize-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-refresh reload-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-error close-card"></i>
                                        </li>
                                    </ul>
                                </div>
                                <div className="media">
                                    <div className="media-body">
                                        <p>
                                            <span className="f-w-500 font-roboto">{"TotalProfit"}</span>
                                            <span className="font-primary f-w-700 ml-2">{"99.00%"}</span>
                                        </p>
                                        <h4 className="f-w-500 mb-0 f-26">
                                            {"$"}
                                            <span className="counter">
                                                <CountUp end={300056} />
                                            </span>
                                        </h4>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <div className="negative-container">
                                    <ApexCharts id="negative-chart" options={totalearning.options} series={totalearning.series} type="bar" height={320} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="4 xl-50" className="box-col-12">
                        <Card>
                            <CardHeader className="card-no-border">
                                <h5>{"New Products"}</h5>
                                <div className="card-header-right">
                                    <ul className="list-unstyled card-option">
                                        <li>
                                            <i className="fa fa-spin fa-cog"></i>
                                        </li>
                                        <li>
                                            <i className="view-html fa fa-code"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-maximize full-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-minus minimize-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-refresh reload-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-error close-card"></i>
                                        </li>
                                    </ul>
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <div className="our-product">
                                    <div className="table-responsive">
                                        <Table borderless>
                                            <tbody className="f-w-500">
                                                <tr>
                                                    <td>
                                                        <div className="media">
                                                            <img
                                                                className="img-fluid m-r-15 rounded-circle"
                                                                src={
                                                                    "https://scontent.fhan5-7.fna.fbcdn.net/v/t1.15752-9/278618197_4948876248501115_249196509047614764_n.png?stp=cp0_dst-png&_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=Kv5dxfga5WAAX-G8ZPo&_nc_ht=scontent.fhan5-7.fna&oh=03_AVJ1Jzbfg1oovx80laieKMdX8oAy3H038C8ENgUoJZ6X9Q&oe=628EB306"
                                                                }
                                                                alt=""
                                                            />
                                                            <div className="media-body">
                                                                <span>{"LG G63"}</span>
                                                                <p className="font-roboto">{"100 item"}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>{"CouponCode"}</p>
                                                        <span>{"PIX001"}</span>
                                                    </td>
                                                    <td>
                                                        <p>{"-10%"}</p>
                                                        <span>{"$100.00"}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="media">
                                                            <img
                                                                className="img-fluid m-r-15 rounded-circle"
                                                                src={
                                                                    "https://scontent.fhan5-7.fna.fbcdn.net/v/t1.15752-9/278618197_4948876248501115_249196509047614764_n.png?stp=cp0_dst-png&_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=Kv5dxfga5WAAX-G8ZPo&_nc_ht=scontent.fhan5-7.fna&oh=03_AVJ1Jzbfg1oovx80laieKMdX8oAy3H038C8ENgUoJZ6X9Q&oe=628EB306"
                                                                }
                                                                alt=""
                                                            />
                                                            <div className="media-body">
                                                                <span>{"Samsung 12"}</span>
                                                                <p className="font-roboto">{"12345 items"}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>{"CouponCode"}</p>
                                                        <span>{"PIX002"}</span>
                                                    </td>
                                                    <td>
                                                        <p>{"-12%"}</p>
                                                        <span>{"$123456.00"}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="media">
                                                            <img
                                                                className="img-fluid m-r-15 rounded-circle"
                                                                src={
                                                                    "https://scontent.fhan5-7.fna.fbcdn.net/v/t1.15752-9/278618197_4948876248501115_249196509047614764_n.png?stp=cp0_dst-png&_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=Kv5dxfga5WAAX-G8ZPo&_nc_ht=scontent.fhan5-7.fna&oh=03_AVJ1Jzbfg1oovx80laieKMdX8oAy3H038C8ENgUoJZ6X9Q&oe=628EB306"
                                                                }
                                                                alt=""
                                                            />
                                                            <div className="media-body">
                                                                <span>{"PC Acer Predator"}</span>
                                                                <p className="font-roboto">{"123 item"}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>{"CouponCode"}</p>
                                                        <span>{"PIX003"}</span>
                                                    </td>
                                                    <td>
                                                        <p>{"-12%"}</p>
                                                        <span>{"$123.00"}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="4 xl-50" className="box-col-12">
                        <Card>
                            <CardHeader className="card-no-border">
                                <h5>{Location}</h5>
                                <div className="card-header-right">
                                    <ul className="list-unstyled card-option">
                                        <li>
                                            <i className="fa fa-spin fa-cog"></i>
                                        </li>
                                        <li>
                                            <i className="view-html fa fa-code"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-maximize full-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-minus minimize-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-refresh reload-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-error close-card"></i>
                                        </li>
                                    </ul>
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <div className="dash-map">
                                    <div className="map-js-height" id="map">
                                        <div id="gmap-simple" className="map-block">
                                            <BasicMap
                                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCdXpLSJ3Ibdu-Phs9QOvpqb9d1DtPf7wQ&libraries=places"
                                                loadingElement={<div style={{ height: `100%` }} />}
                                                containerElement={<div style={{ height: "300px" }} />}
                                                mapElement={<div style={{ height: `100%` }} />}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="4 xl-50" className="box-col-12">
                        <Card>
                            <CardHeader className="card-no-border">
                                <h5>{"NewsUpdate"}</h5>
                                <div className="card-header-right">
                                    <ul className="list-unstyled card-option">
                                        <li>
                                            <i className="fa fa-spin fa-cog"></i>
                                        </li>
                                        <li>
                                            <i className="view-html fa fa-code"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-maximize full-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-minus minimize-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-refresh reload-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-error close-card"></i>
                                        </li>
                                    </ul>
                                </div>
                            </CardHeader>
                            <CardBody className="new-update pt-0">
                                <div className="activity-timeline">
                                    <div className="media">
                                        <div className="activity-line"></div>
                                        <div className="activity-dot-secondary"></div>
                                        <div className="media-body">
                                            <span>{"Update Product"}</span>
                                            <p className="font-roboto">{"Quisque a consequat ante Sit amet magna at volutapt."}</p>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="activity-dot-primary"></div>
                                        <div className="media-body">
                                            <span>{"James liked Nike Shoes"}</span>
                                            <p className="font-roboto">{"Aenean sit amet magna vel magna fringilla ferme."}</p>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="activity-dot-secondary"></div>
                                        <div className="media-body">
                                            <span>
                                                {"john just buy your product"}
                                                <i className="fa fa-circle circle-dot-secondary pull-right"></i>
                                            </span>
                                            <p className="font-roboto">{"Vestibulum nec mi suscipit, dapibus purus....."}</p>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="activity-dot-primary"></div>
                                        <div className="media-body">
                                            <span>
                                                {"Jihan Doe just save your product"}
                                                <i className="fa fa-circle circle-dot-primary pull-right"></i>
                                            </span>
                                            <p className="font-roboto">{"Curabitur egestas consequat lorem."}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="3 xl-100" className="risk-col box-col-12">
                        <Card className="total-users">
                            <CardHeader className="card-no-border">
                                <h5>{"RiskFactor"}</h5>
                                <div className="card-header-right">
                                    <ul className="list-unstyled card-option">
                                        <li>
                                            <i className="fa fa-spin fa-cog"></i>
                                        </li>
                                        <li>
                                            <i className="view-html fa fa-code"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-maximize full-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-minus minimize-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-refresh reload-card"></i>
                                        </li>
                                        <li>
                                            <i className="icofont icofont-error close-card"></i>
                                        </li>
                                    </ul>
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <div className="apex-chart-container goal-status text-center row">
                                    <div className="rate-card col-xl-12">
                                        <div className="goal-chart">
                                            <ApexCharts id="riskfactorchart" options={Riskfactorchart.options} series={Riskfactorchart.series} type="radialBar" height={350} />
                                        </div>
                                        <div className="goal-end-point">
                                            <ul>
                                                <li className="mt-0 pt-0">
                                                    <h6 className="font-primary">{"As From"}</h6>
                                                    <h6 className="f-w-400">{"24 March 2021"}</h6>
                                                </li>
                                                <li>
                                                    <h6 className="mb-2 f-w-400">{"TotalGoal"}</h6>
                                                    <h5 className="mb-0">{"$94,000.20"}</h5>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul className="col-xl-12">
                                        <li>
                                            <div className="goal-detail">
                                                <h6>
                                                    {" "}
                                                    <span className="font-primary">{"GoalArchive"} : </span>
                                                    {"$91,000.000"}
                                                </h6>
                                                <div className="progress sm-progress-bar progress-animate">
                                                    <div
                                                        className="progress-gradient-primary"
                                                        role="progressbar"
                                                        style={{ width: "60%" }}
                                                        aria-valuenow="75"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="goal-detail mb-0">
                                                <h6>
                                                    <span className="font-primary">{"Duration"}: </span>
                                                    {"9 Month"}
                                                </h6>
                                                <div className="progress sm-progress-bar progress-animate">
                                                    <div
                                                        className="progress-gradient-primary"
                                                        role="progressbar"
                                                        style={{ width: "50%" }}
                                                        aria-valuenow="75"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    ></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="btn-download btn btn-gradient f-w-500">{"DownloadDetails"}</div>
                                        </li>
                                    </ul>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="9 xl-100" className="box-col-12">
                        <Row>
                            <Col xl="12">
                                <Card>
                                    <CardBody>
                                        <div className="best-seller-table responsive-tbl">
                                            <div className="item">
                                                <div className="table-responsive product-list">
                                                    <Table borderless>
                                                        <thead>
                                                            <tr>
                                                                <th className="f-22">{"Best Seller"}</th>
                                                                <th>{"Brand"}</th>
                                                                <th>{"Description"}</th>
                                                                <th>{"Sold Quantity"}</th>
                                                                <th>{"Total"}</th>
                                                                <th className="text-right">{"Status"}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {bestSeller?.map((product, key) => {
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <div className="d-inline-block align-middle">
                                                                                <img className="img-40 m-r-15 rounded-circle align-top" src={img[key]} alt="" />
                                                                                <div className="status-circle bg-primary"></div>
                                                                                <div className="d-inline-block">
                                                                                    <span>{product?.product_name}</span>
                                                                                    <p className="font-roboto">{product?.id}</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>{product?.brand}</td>
                                                                        <td>{product?.description}</td>
                                                                        <td>{product?.sold_quantity}</td>
                                                                        <td>{product?.total}</td>
                                                                        <td className="text-right">
                                                                            <i className="fa fa-check-circle"></i>
                                                                            {"Stocking"}
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Dashboard;
