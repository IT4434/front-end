import axios from "axios";
import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import { SERVICE_URL_ADMIN, SERVICE_URL_USER } from "src/constant/config";
import { BRAND, CATEGORY, filterCategory, filterColor, filterPrice, FILTER_BRAND, FILTER_CATEGORY } from "src/redux/User/filter/action";
import { getToken } from "src/utils/token";
import RangeSlider from "../Slider";
const Allfilters = () => {
    async function getAllProduct() {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_USER}/products`,
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            let arr = [];
            res.data?.map((item) => {
                if (!arr.includes(item.brand)) {
                    arr.push(item.brand);
                }
            });
            setBrands(arr);
            dispatch({ type: BRAND, brand: arr });
        });
    }
    async function getCategories() {
        await axios({
            method: "GET",
            url: `${SERVICE_URL_ADMIN}/categories`,
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                type: "formData",
                Authorization: getToken(),
            },
            timeout: 30000,
        }).then((res) => {
            let arr = [];
            res.data.map((item) => {
                if (!arr.includes(item.category_name)) {
                    arr.push(item.category_name);
                }
            });
            setCategories(arr);
            dispatch({ type: CATEGORY, category: arr });
        });
    }
    useEffect(() => {
        getAllProduct();
        getCategories();
    }, []);

    const [brands, setBrands] = useState();
    const [categories, setCategories] = useState();
    const filteredBrand = useSelector((content) => content.filters.filter_brand);
    const filteredCategory = useSelector((content) => content.filters.filter_category);

    const prices = useSelector((content) => content.filters.value);
    const dispatch = useDispatch();
    const value = useSelector((content) => content.filters.value);

    const clickBrandHandle = (event, temp) => {
        const index = temp.indexOf(event.target.value);
        if (event.target.checked === true) {
            if (!temp.includes(event.target.value)) {
                temp.push(event.target.value);
            }
        } else {
            if (temp.includes(event.target.value)) {
                temp.splice(index, 1);
            }
        }

        dispatch({ type: FILTER_BRAND, filter_brand: temp });
    };
    const clickCategoryHandle = (event, temp) => {
        const index = temp.indexOf(event.target.value);
        if (event.target.checked) {
            if (!temp.includes(event.target.value)) {
                temp.push(event.target.value);
            }
        } else {
            if (temp.includes(event.target.value)) {
                temp.splice(index, 1);
            }
        }
        dispatch({ type: FILTER_CATEGORY, filter_category: temp });
    };

    return (
        <Fragment>
            <div className="product-filter">
                <h6 className="f-w-600">{"Category"}</h6>
                <div className="checkbox-animated mt-0">
                    {categories?.map((category, index) => {
                        return (
                            <label className="d-block" key={index}>
                                <input
                                    onClick={(e) => clickCategoryHandle(e, filteredCategory)}
                                    className="checkbox_animated"
                                    value={category}
                                    defaultChecked={false}
                                    id={category}
                                    type="checkbox"
                                    data-original-title=""
                                    title=""
                                />
                                {category}
                            </label>
                        );
                    })}
                </div>
            </div>
            <div className="product-filter">
                <h6 className="f-w-600">{"Brand"}</h6>
                <div className="checkbox-animated mt-0">
                    {brands?.map((brand, index) => {
                        return (
                            <label className="d-block" key={index}>
                                <input
                                    className="checkbox_animated"
                                    onClick={(e) => clickBrandHandle(e, filteredBrand)}
                                    value={brand}
                                    defaultChecked={false}
                                    id={brand}
                                    type="checkbox"
                                    data-original-title=""
                                    title=""
                                />
                                {brand}
                            </label>
                        );
                    })}
                </div>
            </div>

            <div>
                <div className="product-filter pb-0">
                    <h6 className="f-w-600">{"Price"}</h6>
                    {/* <InputRange maxValue={prices.max} minValue={prices.min} value={value} onChange={(value) => dispatch(filterPrice({ value }))} /> */}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>{prices.min}$</div>
                        <div>{prices.max}$</div>
                    </div>
                    <RangeSlider />
                </div>
            </div>
        </Fragment>
    );
};

export default Allfilters;
