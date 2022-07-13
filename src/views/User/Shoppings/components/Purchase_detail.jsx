import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import { Card, CardBody, CardHeader, Col, Media, Row } from "reactstrap";
import { AutoFixHigh, HourglassTopTwoTone, LocalShippingTwoTone } from "@mui/icons-material";
import { CheckCircle } from "@material-ui/icons";

function CustomizedTimeline() {
    return (
        <Timeline position="alternate">
            <TimelineItem>
                <TimelineOppositeContent sx={{ m: "auto 0" }} align="right" variant="body2" color="text.secondary">
                    9:30 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                        <HourglassTopTwoTone />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span">
                        Waiting
                    </Typography>
                    <Typography>Your product is waiting for approve</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
                    10:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                        <CheckCircle />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span">
                        Approve
                    </Typography>
                    <Typography>Your product is approved</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
                    11:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary" variant="outlined">
                        <AutoFixHigh />
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span">
                        Prepare
                    </Typography>
                    <Typography>Your product is preparing</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
                    11:30 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                    <TimelineDot color="secondary">
                        <LocalShippingTwoTone />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h6" component="span">
                        Shipping
                    </Typography>
                    <Typography>Your product is shipping</Typography>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}

export default function Purchase_detail() {
    return (
        <Fragment>
            <Row>
                <Col sm={12} md={12}>
                    <Card>
                        <CardHeader>
                            <h5>{"Order Details"}</h5>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={4}>
                                    <Media
                                        src={"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=-1&s=1"}
                                        style={{ width: "100%" }}
                                        alt=""
                                        className="img-fluid"
                                    />
                                </Col>
                                <Col md={8} className="d-flex" style={{ alignItems: "center" }}>
                                    <CustomizedTimeline />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}
