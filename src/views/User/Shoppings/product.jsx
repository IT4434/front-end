import React, { useState, useEffect, Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    ListGroup,
    Form,
    FormGroup,
    Input,
    Media,
    Modal,
    ModalHeader,
    ModalBody,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "reactstrap";
import { ChevronDown, ChevronsDown, ChevronUp, Grid, List } from "react-feather";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import errorImg from "../../../assets/images/search-not-found.png";
import { getVisibleproducts } from "src/services/User/products";
import { SORT_BY, SEARCH_BY, ADD_TO_CART, ADD_TO_WISHLIST, watchfetchProducts, GET_LIST, TOTAL_PRICE } from "src/redux/User/Products/actionTypes";
import Carousal from "./components/filters/carousal";
import Allfilters from "./components/filters/allfilters";
import { data } from "./components/data";
import Slider from "react-slick";
import { items2 } from "./components/carousel/carouselComponent.jsx";
import { IMG_URL, SERVICE_URL_USER } from "src/constant/config";
import { getToken } from "src/utils/token";
import axios from "axios";
import { addToCart, addToFav } from "src/services/Admin/ManageProduct";
import { OPEN_INFO_ALERT, OPEN_SUCCESS_ALERT } from "src/redux/User/Alerts/actionTypes";

const Product = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [allProduct, setAllProduct] = useState();
    const filter_brand = useSelector((state) => state.filters.filter_brand);
    const filter_category = useSelector((state) => state.filters.filter_category);
    const productData = useSelector((state) => state.Product.productItems);
    const value = useSelector((state) => state.filters.value);

    useEffect(() => {
        getAllProduct();
        localStorage.setItem("navbarActive", "home");
    }, []);

    let temp = [];

    async function getProductByCategory(payload) {
        const res = await axios({
            method: "GET",
            url: `${SERVICE_URL_USER}/products/categories/${payload}`,
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        });
        return res.data;
    }
    async function getAllProduct() {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_USER}/products`,
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            // setAllProduct(res.data);
            dispatch({ type: GET_LIST, payload: res.data });
            // setProductData(res.data);
            let temp_arr = [];
            res.data.map((product) => {
                if (product.details.length > 0) {
                    product.details.map((item) => {
                        const t = getRndInteger(500, 1500);
                        let temp = {
                            id: product.id,
                            img: item.images?.length > 0 ? `${IMG_URL}/${item.images[0].image_path}` : "",
                            name: product.product_name,
                            note: product.description,
                            discription: product.description,
                            discountPrice: t,
                            status: "none",
                            price: item.price,
                            stock: "In stock",
                            review: "(250 review)",
                            category: product.category_id,
                            colors: [item.color],
                            size: ["M", "L", "XL"],
                            tags: [product.brand],
                        };
                        temp_arr.push(temp);
                    });
                    setAllProduct(temp_arr);
                }
            });
        });
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // eslint-disable-next-line
    const [layoutColumns, setLayoutColumns] = useState(3);

    const [open, setOpen] = useState(false);
    const [sidebaron, setSidebaron] = useState(true);
    const [singleProduct, setSingleProduct] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    // eslint-disable-next-line
    const [stock, setStock] = useState("");
    const [filterSidebar, setFilterSidebar] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const filters = useSelector((content) => content.filters);
    // const products = allProduct && getVisibleproducts(allProduct, filters);

    useEffect(() => {
        dispatch(watchfetchProducts());
        getCart();
    }, [dispatch]);

    async function getCart() {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_USER}/carts`,
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            dispatch({ type: ADD_TO_CART, payload: res.data });
            let temp = 0;
            res.data.map((item) => {
                temp += item.quantity * item.product_detail?.price;
                dispatch({ type: TOTAL_PRICE, payload: temp });
            });
        });
    }

    async function Search(payload) {
        const response = await axios({
            method: "GET",
            url: `${SERVICE_URL_USER}/search-products/`,
            headers: {
                "Content-Type": "application/json",
                Authorization: getToken(),
            },
            params: payload,
            timeout: 30000,
        }).then((res) => {
            dispatch({ type: GET_LIST, payload: res.data });
            console.log(res.data);
        });
        return response;
    }

    const filterSortFunc = (event) => {
        productData.map((product) => {
            if (product.details.length > 0) {
            }
        });
        let arr1 = productData.filter((product) => product.details.length > 0);
        arr1 = arr1.sort(function (a, b) {
            if (event == "LowestPrices") {
                return a.details[0].price - b.details[0].price;
            } else {
                if (event === "HighestPrices") {
                    return b.details[0].price - a.details[0].price;
                } else {
                    return;
                }
            }
        });
        let arr2 = productData.filter((product) => product.details.length === 0);
        // setProductData([...arr1, ...arr2]);
        dispatch({ type: GET_LIST, payload: [...arr1, ...arr2] });
    };

    const gridLayout = () => {
        document.querySelector(".product-wrapper-grid").classList.remove("list-view");
        var elems = document.querySelector(".gridRow").childNodes;
        [].forEach.call(elems, function (el) {
            el.className = "";
            el.classList.add("col-xl-3");
            el.classList.add("col-sm-6");
            el.classList.add("xl-4");
        });
    };

    const listLayout = () => {
        document.querySelector(".product-wrapper-grid").classList.add("list-view");
        var elems = document.querySelector(".gridRow").childNodes;
        [].forEach.call(elems, function (el) {
            el.className = "";
            el.classList.add("col-xl-12");
        });
    };

    const LayoutView = (layoutColumns) => {
        if (!document.querySelector(".product-wrapper-grid").classList.contains("list-view")) {
            var elems = document.querySelector(".gridRow").childNodes;
            [].forEach.call(elems, function (el) {
                el.className = "";
                el.classList.add("col-xl-" + layoutColumns);
            });
        }
    };

    const onClickFilter = () => {
        if (sidebaron) {
            setSidebaron(false);
            document.querySelector(".product-wrapper").classList.add("sidebaron");
        } else {
            setSidebaron(true);
            document.querySelector(".product-wrapper").classList.remove("sidebaron");
        }
    };

    const onOpenModal = (productId) => {
        setOpen(true);
        productData.forEach((product, i) => {
            if (product.id === productId) {
                setSingleProduct(product);
            }
        });
    };

    const onCloseModal = () => {
        setOpen(false);
    };

    const changeQty = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const handleAddToCart = (item, qty) => {
        if (item.details?.length !== 0) {
            addToCart({ product_id: item.details[0].id, quantity: qty });
            dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Add to cart success" } });
        } else {
            dispatch({ type: OPEN_INFO_ALERT, payload: { message: "Out of stock!!!" } });
        }
    };
    const addToFavorite = (item) => {
        addToFav({ product_id: item.id });
        dispatch({ type: OPEN_SUCCESS_ALERT, payload: { message: "Add to favorite success" } });
    };

    const handleSearchKeyword = (keyword) => {
        Search({ search: keyword });
        setSearchKeyword(keyword);
        dispatch({ type: SEARCH_BY, search: keyword });
    };

    const onClickDetailPage = (product) => {
        navigate(`${product.id}`);
        localStorage.setItem("navbarActive", "detail");
    };
    const slider1 = useRef();
    const slider2 = useRef();
    const [state, setState] = useState({ nav1: null, nav2: null });
    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current,
        });
    }, [dispatch]);
    const { nav1, nav2 } = state;

    return (
        <Fragment>
            <Container fluid={true} className="product-wrapper pt-5">
                <Col sm="12" xl="12" style={{ height: "100%" }}>
                    <Slider
                        style={{ paddingLeft: "5%", paddingRight: "5%", marginBottom: "30px" }}
                        easing="ease-in-out"
                        autoplay={true}
                        autoplaySpeed={3000}
                        asNavFor={nav2}
                        arrows={true}
                        ref={(slider) => (slider1.current = slider)}
                        className="product-slider"
                    >
                        {items2.map((item, i) => {
                            return (
                                <div className="item" key={i}>
                                    <Media src={item.src} style={{ height: "300px", width: "100%" }} alt="" className="img-fluid" />
                                </div>
                            );
                        })}
                    </Slider>
                </Col>
                <div className="product-grid">
                    <div className="feature-products">
                        <Row>
                            <Col md="6" className="products-total">
                                <div className="square-product-setting d-inline-block">
                                    <a className="icon-grid grid-layout-view" onClick={gridLayout} href="#javascript">
                                        <Grid />
                                    </a>
                                </div>
                                <div className="square-product-setting d-inline-block">
                                    <a className="icon-grid m-0 list-layout-view" onClick={listLayout} href="#javascript">
                                        <List />
                                    </a>
                                </div>
                                <span style={{ height: "50px !important" }} className="d-none-productlist filter-toggle" onClick={() => setFilterSidebar(!filterSidebar)}>
                                    <h6 className="mb-0">
                                        {"Filters"}
                                        <span className="ml-2">
                                            <i className="toggle-data fa fa-chevron-down"></i>
                                        </span>
                                    </h6>
                                </span>
                                <div className="grid-options d-inline-block">
                                    <ListGroup as="ul">
                                        <li>
                                            <a className="product-2-layout-view" onClick={() => LayoutView(6)} href="#javascript">
                                                <span className="line-grid line-grid-1 bg-primary"></span>
                                                <span className="line-grid line-grid-2 bg-primary"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="product-3-layout-view" onClick={() => LayoutView(4)} href="#javascript">
                                                <span className="line-grid line-grid-3 bg-primary"></span>
                                                <span className="line-grid line-grid-4 bg-primary"></span>
                                                <span className="line-grid line-grid-5 bg-primary"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="product-4-layout-view" onClick={() => LayoutView(3)} href="#javascript">
                                                <span className="line-grid line-grid-6 bg-primary"></span>
                                                <span className="line-grid line-grid-7 bg-primary"></span>
                                                <span className="line-grid line-grid-8 bg-primary"></span>
                                                <span className="line-grid line-grid-9 bg-primary"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="product-6-layout-view" onClick={() => LayoutView(2)} href="#javascript">
                                                <span className="line-grid line-grid-10 bg-primary"></span>
                                                <span className="line-grid line-grid-11 bg-primary"></span>
                                                <span className="line-grid line-grid-12 bg-primary"></span>
                                                <span className="line-grid line-grid-13 bg-primary"></span>
                                                <span className="line-grid line-grid-14 bg-primary"></span>
                                                <span className="line-grid line-grid-15 bg-primary"></span>
                                            </a>
                                        </li>
                                    </ListGroup>
                                </div>
                            </Col>
                            <Col md="6" className="text-right">
                                {/* <span className="f-w-600 m-r-5">{"ShowingProducts"}</span> */}
                                <div style={{ backgroundColor: "#ddd" }} className="select2-drpdwn-product select-options d-inline-block" onChange={(e) => filterSortFunc(e.target.value)}>
                                    <select className="form-control btn-square mb-0" name="select">
                                        <option value="Featured">{"Featured"}</option>
                                        <option value="LowestPrices">{"LowestPrices"}</option>
                                        <option value="HighestPrices">{"HighestPrices"}</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col xl="3">
                                <div className={`product-sidebar ${filterSidebar ? "" : "open"}`}>
                                    <div className="filter-section">
                                        <Card>
                                            <CardHeader
                                                onClick={onClickFilter}
                                                style={{
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    backgroundColor: "inherit",
                                                    borderBottom: 0,
                                                    height: "50px",
                                                }}
                                            >
                                                <h6 className="mb-0 f-w-600">{"Filters"}</h6>
                                                <span className="pull-right" style={{ color: "inherit" }}>
                                                    {sidebaron ? <ChevronDown /> : <ChevronUp />}
                                                </span>
                                            </CardHeader>
                                            <div className="left-filter">
                                                <CardBody className="filter-cards-view animate-chk">
                                                    <Allfilters />
                                                    <Carousal />
                                                    <div className="product-filter text-center mt-2">
                                                        <Media className="img-fluid banner-product m-auto" src={"https://images.unsplash.com/photo-1471357674240-e1a485acb3e1"} alt="" />
                                                    </div>
                                                </CardBody>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </Col>
                            <Col xl="9" sm="12">
                                <Form>
                                    <FormGroup className="m-0">
                                        <Input
                                            style={{ border: "0.5px solid #ddd" }}
                                            className="form-control"
                                            type="text"
                                            placeholder="search"
                                            defaultValue={searchKeyword}
                                            onChange={(e) => handleSearchKeyword(e.target.value)}
                                        />
                                        <i className="fa fa-search"></i>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </div>

                    <div className="product-wrapper-grid">
                        <Row className="gridRow">
                            {productData
                                ? productData?.map((item, i) => (
                                      <div className={`${layoutColumns === 3 ? "col-xl-3 col-sm-6 xl-4 col-grid-box" : "col-xl-" + layoutColumns}`} key={i}>
                                          <Card>
                                              <div className="product-box">
                                                  <div className="product-img">
                                                      {item.status === "sale" ? <span className="ribbon ribbon-danger">{item.status}</span> : ""}
                                                      {item.status === "50%" ? <span className="ribbon ribbon-success ribbon-right">{item.status}</span> : ""}
                                                      {item.status === "gift" ? (
                                                          <span className="ribbon ribbon-secondary ribbon-vertical-left">
                                                              {" "}
                                                              <i className="icon-gift"></i>
                                                          </span>
                                                      ) : (
                                                          ""
                                                      )}
                                                      {item.status === "love" ? (
                                                          <span className="ribbon ribbon-bookmark ribbon-vertical-right ribbon-info">
                                                              <i className="icon-heart"></i>
                                                          </span>
                                                      ) : (
                                                          ""
                                                      )}
                                                      {item.status === "Hot" ? <span className="ribbon ribbon ribbon-clip ribbon-warning">{item.status}</span> : ""}
                                                      <img
                                                          className="img-fluid"
                                                          src={
                                                              item.images.length > 0
                                                                  ? `${IMG_URL}/${item.images[0].image_path}`
                                                                  : item.details?.length > 0 && item.details[0].images.length > 0
                                                                  ? `${IMG_URL}/${item.details[0].images[0].image_path}`
                                                                  : "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1"
                                                          }
                                                          alt=""
                                                      />
                                                      <div className="product-hover">
                                                          <ul>
                                                              <li>
                                                                  <Button color="default" onClick={() => handleAddToCart(item, 1)}>
                                                                      <i className="icon-shopping-cart"></i>
                                                                  </Button>
                                                              </li>
                                                              <li>
                                                                  <Button color="default" data-toggle="modal" onClick={() => onOpenModal(item.id)}>
                                                                      <i className="icon-eye"></i>
                                                                  </Button>
                                                              </li>
                                                              <li>
                                                                  <Button color="default" onClick={() => addToFavorite(item)}>
                                                                      <i className="icon-heart"></i>
                                                                  </Button>
                                                              </li>
                                                          </ul>
                                                      </div>
                                                  </div>
                                                  <div className="product-details">
                                                      <div className="rating">
                                                          <i className="fa fa-star"></i>
                                                          <i className="fa fa-star"></i>
                                                          <i className="fa fa-star"></i>
                                                          <i className="fa fa-star"></i>
                                                          <i className="fa fa-star"></i>
                                                      </div>
                                                      <h4 onClick={() => onClickDetailPage(item)} className="font-primary">
                                                          {item.product_name}
                                                      </h4>
                                                      <p>{item.note}</p>
                                                      <div className="product-price">
                                                          {item.details?.length > 0 ? (
                                                              <>
                                                                  {"$"} {item.details.length > 0 && item.details[0].price}
                                                                  <del>{item.details[0].sale}%</del>
                                                              </>
                                                          ) : (
                                                              <span>Out of stock</span>
                                                          )}
                                                      </div>
                                                  </div>
                                              </div>
                                          </Card>
                                      </div>
                                  ))
                                : ""}

                            <Modal className="modal-lg modal-dialog-centered product-modal" isOpen={open}>
                                <ModalBody>
                                    <ModalHeader toggle={onCloseModal}>
                                        <div className="product-box row">
                                            <Col lg="6" className="product-img">
                                                <Media
                                                    className="img-fluid"
                                                    src={
                                                        singleProduct?.images?.length > 0
                                                            ? `${IMG_URL}/${singleProduct.images[0].image_path}`
                                                            : singleProduct.details?.length > 0 && singleProduct.details[0].images.length > 0
                                                            ? `${IMG_URL}/${singleProduct.details[0].images[0].image_path}`
                                                            : "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1"
                                                    }
                                                    alt=""
                                                />
                                            </Col>
                                            <Col lg="6" className="product-details  text-left">
                                                <h4>{singleProduct.product_name}</h4>
                                                <div className="product-price">
                                                    {singleProduct.details?.length > 0 ? (
                                                        <>
                                                            {"$"} {singleProduct.details.length > 0 && singleProduct.details[0].price}
                                                            <del>{singleProduct.details[0].sale}%</del>
                                                        </>
                                                    ) : (
                                                        <span>Out of stock</span>
                                                    )}
                                                </div>
                                                <div className="product-view">
                                                    <h6 className="f-w-600">{"ProductDetails"}</h6>
                                                    <p className="mb-0">{singleProduct.description}</p>
                                                </div>

                                                <div className="product-qnty">
                                                    <h6 className="f-w-600">{"Quantity"}</h6>
                                                    <fieldset>
                                                        <InputGroup className="bootstrap-touchspin">
                                                            <InputGroupAddon addonType="prepend">
                                                                <Button
                                                                    color="primary btn-square"
                                                                    disabled={quantity < 2 ? true : false}
                                                                    className="bootstrap-touchspin-down"
                                                                    onClick={() => setQuantity(quantity - 1)}
                                                                >
                                                                    <i className="fa fa-minus"></i>
                                                                </Button>
                                                            </InputGroupAddon>
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText className="bootstrap-touchspin-prefix" style={{ display: "none" }}></InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                className="touchspin text-center"
                                                                type="text"
                                                                name="quantity"
                                                                value={quantity}
                                                                onChange={(e) => changeQty(e)}
                                                                style={{ display: "block" }}
                                                            />
                                                            <InputGroupAddon addonType="append">
                                                                <InputGroupText className="bootstrap-touchspin-postfix" style={{ display: "none" }}></InputGroupText>
                                                            </InputGroupAddon>
                                                            <InputGroupAddon addonType="append" className="ml-0">
                                                                <Button color="primary btn-square" className="bootstrap-touchspin-up" onClick={() => setQuantity(quantity + 1)}>
                                                                    <i className="fa fa-plus"></i>
                                                                </Button>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                    </fieldset>
                                                    <div className="addcart-btn">
                                                        <Button color="primary" className="mr-2 mt-2" onClick={() => handleAddToCart(singleProduct, quantity)}>
                                                            {"AddToCart"}
                                                        </Button>
                                                        <Button onClick={() => onClickDetailPage(singleProduct)} color="primary" className="mr-2 mt-2">
                                                            {"ViewDetails"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Col>
                                        </div>
                                    </ModalHeader>
                                </ModalBody>
                            </Modal>
                        </Row>
                        {/* // ) } */}
                    </div>
                </div>
            </Container>
        </Fragment>
    );
};

export default Product;
