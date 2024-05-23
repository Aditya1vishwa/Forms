import React, { useState } from "react";
import "./AdminPanel.css";
import { formProvider } from "../../context/FormContextProvider";
import { Button, Tooltip, IconButton, InputBase } from "@mui/material";
import CreateSbadmin from "../Dialogs/CreateSbadmin";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { apiConfig } from "../../apiConfig";
import axios from "axios";

const AdminPanel = () => {
  const {
    user,
    subadmins,
    createSubadmins,
    subForms,
    setAdmin,
    admin,
    allcat,
    setAllcat,
  } = formProvider();
  const [create, setCreate] = useState(false);
  console.log(subForms, "sdfbghjuytrf");
  const [cat, setcat] = useState("");
  const handlecategory = async () => {
    console.log(admin.token);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      };
      const { data } = await axios.post(
        apiConfig.create_category,
        { name: cat },
        config
      );
      var i = allcat;
      i = [...i, data.data.name];
      setAllcat(i);
      setcat("");
      toast.success(data.message);
      console.log(allcat);
    } catch (e) {
      toast.error(e.response.data.message);
      setcat("");
    }
  };
  const handlesubcreate = () => {};

  return (
    <div className="admin-div-main">
      <div className="Admin-nav-div">
        <nav className="Admin-nav">
          <div className="form-logo">
            <img src="../image/logo.png" width={40} />
            <h2 className="admin-logo-text">Forms</h2>
          </div>
          <span className="Admin-details">
            <img
              src="../image/hii.png"
              width={35}
              style={{ marginRight: -5 }}
            />
            <h5>Hii Aditya</h5>
            <Tooltip title="About User">
              <button style={{ background: "none", border: "none" }}>
                <img
                  src="../image/user1.jpeg"
                  width={38}
                  height={38}
                  style={{ borderRadius: 40, marginTop: 3 }}
                />
              </button>
            </Tooltip>
            <Tooltip title="Logout">
              <button
                style={{
                  background: "none",
                  border: "none",
                  marginLeft: 5,
                  paddingTop: 5,
                }}>
                <RiLogoutBoxLine
                  size={18}
                  onClick={() => {
                    localStorage.removeItem("user");
                    toast.success("Admin Logout Succesfully");
                  }}
                />
              </button>
            </Tooltip>
          </span>
        </nav>
      </div>
      <div className="Admin-content">
        <div className="sub-admin">
          <div className="admin-subsec-nav">
            <h3 className="sub-admin-title">Sub Admin</h3>
            <div className="Add-cat">
              <InputBase
                placeholder="Add new category"
                value={cat}
                onChange={(e) => setcat(e.target.value)}
              />
              <MdAddCircleOutline
                size={20}
                className="add-btn"
                onClick={handlecategory}
              />
            </div>
          </div>
          <div className="sub-admin-display">
            <Tooltip title="Create New Subadmin">
              <div
                className="create-new-sub"
                variant="text"
                onClick={() => setCreate(true)}>
                <img
                  src="https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png"
                  width={120}
                  onClick={handlesubcreate}
                  style={{}}
                />
              </div>
            </Tooltip>
            {subadmins.map((data) => {
              console.log(data);
              return (
                <div className="created-subadmins">
                  <img
                    src={URL.createObjectURL(data.img)}
                    width={70}
                    height={70}
                    style={{ borderRadius: 70 }}
                  />
                  <div variant="text">
                    <p
                      style={{
                        width: 120,
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: 500,
                        margin: "10px 0px 2px 0px",
                      }}>
                      {data.username}
                    </p>
                    <p
                      style={{
                        width: 120,
                        textAlign: "center",
                        margin: 0,
                        fontSize: 10,
                      }}>
                      {data.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="admin-template-sec">
          <div className="admin-template-sec-hadding">
            <h3>All forms</h3>
            {subForms.map((data, index) => {
              var desc = data.formDesc.substring(0, 14) + "..";
              return (
                <Tooltip
                  title={
                    <div style={{ display: "flex" }}>
                      <p className="form-action">Form link</p>
                      <p
                        className="form-action-del"
                        onClick={() => handleDelete(index)}>
                        Delete
                      </p>
                    </div>
                  }
                  placement="bottom">
                  <Button
                    className="form-show"
                    variant="text"
                    onClick={() => handlEditform(index, data.formid)}>
                    <div className="form-get-button">
                      <img src="../image/form-cover.png" width={50} />
                      <h4 className="formname">{data.formName}</h4>
                      <p className="formcat">Cat:{data.formCat}</p>
                      <p className="formdesc">desc: {desc}</p>
                    </div>
                  </Button>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
      <CreateSbadmin open={create} setopen={setCreate} />
    </div>
  );
};

export default AdminPanel;
