import React, { useEffect, useRef, useState } from "react";
import { Apps } from "@material-ui/icons";
import { Button } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { FilePlus, FolderPlus, List, Plus, Search } from "react-feather";
import StoragesData from "../common/StoragesData/StoragesData";
import { useDispatch, useSelector } from "react-redux";
import { storageActionTypes } from "../../../../redux/User/Storages/storageActionType";
import { storageService } from "../../../../services/User/storages.js";
import { OPEN_ERROR_ALERT } from "../../../../redux/User/Alerts/actionTypes";
import { exchangeSizeValue } from "../../../../utils/commonFunction";
import { useParams } from "react-router";
import ActionButton from "../common/ActionButton/ActionButton";

export default function DetailPlatfromFolder() {
    const storageData = useSelector((stores) => stores.Storage);
    const dispatch = useDispatch();
    const param = useParams();

    useEffect(() => {
        (async () => {
            const res = await storageService.getDataPlatformFolder(param.folderId);
            console.log(res.data.folder);
            if (res.status === "success") {
                dispatch({ type: storageActionTypes.setStorageData, payload: { ...res.data.folder, child_folders: res.data.folder.shared_folders, child_files: res.data.folder.shared_files } });
            } else {
                dispatch({ type: OPEN_ERROR_ALERT, payload: { message: "Have error when load data!" } });
            }
        })();
    }, [param, storageData.reload_data_storage]);

    return (
        <Container className="my_storage" style={{ maxWidth: "1605px", margin: "0 auto" }}>
            <div className="my_storage_header">
                <div className="my_storage_header_title">{storageData.data.name}</div>
            </div>
            <Row className="action_part">
                <Col lg={6}>
                    <div className="action_part_search_bar">
                        <span className="action_part_search_bar_icon">
                            <Search />
                        </span>
                        <input type="text" placeholder="Find in storage ..." />
                    </div>
                </Col>
                <Col lg={6}>
                    <div style={{ height: "100%", display: "flex", alignItems: "end", justifyContent: "right", position: "relative" }}>
                        <span style={{ opacity: 0.65, marginRight: "20px", cursor: "pointer" }} onClick={() => dispatch({ type: storageActionTypes.toggleViewMode })}>
                            {storageData.isGridViewMode ? <List /> : <Apps />}
                        </span>
                        <ActionButton />
                    </div>
                </Col>
            </Row>
            <StoragesData onRightClick={true} />
        </Container>
    );
}
