import React, { Fragment } from "react";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import { filterBrand, filterColor, filterPrice } from "src/redux/User/filter/action";
import { getBrands, getColors, getMinMaxPrice } from "src/services/User/products";
import { data } from "../data";
import RangeSlider from "../Slider";
const Allfilters = () => {
    // const data = useSelector((content) => content.Product.productItems);
    const brands = getBrands(data);
    const colors = getColors(data);
    // const prices = getMinMaxPrice(data);
    const filteredBrand = useSelector((content) => content.filters.brand);
    const prices = useSelector((content) => content.filters.value);
    const dispatch = useDispatch();
    const value = useSelector((content) => content.filters.value);

    const clickBrandHendle = (event, brands) => {
        var index = brands.indexOf(event.target.value);

        if (event.target.checked === true) brands.push(event.target.value);
        else brands.splice(index, 1);

        dispatch(filterBrand(brands));
    };

    return (
        <Fragment>
            <div className="product-filter">
                <h6 className="f-w-600">{"Category"}</h6>
                <div className="checkbox-animated mt-0">
                    {brands.map((brand, index) => {
                        return (
                            <label className="d-block" key={index}>
                                <input
                                    className="checkbox_animated"
                                    onClick={(e) => clickBrandHendle(e, filteredBrand)}
                                    value={brand}
                                    defaultChecked={filteredBrand.includes(brand) ? true : false}
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
            <div className="product-filter">
                <h6 className="f-w-600">{"Brand"}</h6>
                <div className="checkbox-animated mt-0">
                    {brands.map((brand, index) => {
                        return (
                            <label className="d-block" key={index}>
                                <input
                                    className="checkbox_animated"
                                    onClick={(e) => clickBrandHendle(e, filteredBrand)}
                                    value={brand}
                                    defaultChecked={filteredBrand.includes(brand) ? true : false}
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
