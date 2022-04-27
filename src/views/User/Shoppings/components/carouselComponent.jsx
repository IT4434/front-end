import React, { useState } from "react";
import { UncontrolledCarousel } from "reactstrap";
import img from "../../../../assets/images/ecommerce/card.png";
const items = [
    {
        src: img,
        altText: "Slide 1",
        caption: "Slide 1",
    },
    {
        src: img,
        altText: "Slide 2",
        caption: "Slide 2",
    },
    {
        src: img,
        altText: "Slide 3",
        caption: "Slide 3",
    },
];

export const Carsousel = (props) => {
    return <UncontrolledCarousel items={items} />;
};
