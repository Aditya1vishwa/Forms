import React, { useEffect, useState } from "react";
import "./Form.css";
import { CiImageOn } from "react-icons/ci";
import { Button, Box, MenuItem, Menu, InputBase, Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { formProvider } from "../../context/FormContextProvider";
import Slider from "@mui/material/Slider";
import validation from "../validation";
import Drop from "../Drop";

const Form = ({ img, cat }) => {
  const {
    subForms,
    setSubForms,
    category,
    setcategory,
    forms,
    setform,
    menuitem,
    setmenuitem,
  } = formProvider();
  const [actCart, setActCart] = useState(null);
  const [newfeild, setNewfeild] = useState({
    fieldName: "",
    field: "",
    inputtype: "",
    regex: null,
    regext: null,
    errmessage: "",
  });

  const questions = {
    questionText: "what is the?",
    questionimage: null,
    questioninputName: "radio",
    questionType: "radio",
    questionregex: null,
    error: null,
    options: [
      { optiontext: "Ram" },
      { optiontext: "Shyam" },
      { optiontext: "Bharat" },
      { optiontext: "Sita" },
    ],
  };

  useEffect(() => {
    setform({ ...forms, formImg: img, formCat: cat });
  }, [img, cat]);

  const option = {
    optiontext: "New text",
  };

  useEffect(() => {
    setform({ ...forms, formImg: img });
  }, [img]);
  useEffect(() => {
    setform({ ...forms, formCat: cat });
  }, [category]);
  const [open, setopen] = useState(false);

  const handleClick = (event) => {
    setopen(event.currentTarget);
  };

  const handleClose = () => {
    setopen(false);
  };

  const [id, setId] = useState(null);

  const handleChange = (val, val2, val3, val4, index) => {
    console.log(val3);
    var que = [...category];
    que[index].Ans = null;
    que[index].questionType = val;
    que[index].questioninputName = val2;
    que[index].questionregex = val3;
    que[index].errmessage = val4;
    console.log(val);
    setcategory(que);
    setId(null);
    handleClose();
  };
  const handleque = (val, index) => {
    var que = [...category];

    que[index].questionText = val;
    setcategory(que);
  };
  const handleImg = (index, val) => {
    var que = [...category];
    que[index].questionimage = val;
    setId(null);
    setcategory(que);
  };

  const handleOptions = (val) => {
    var opt = [...category];
    opt[val].options.push(option);
    setcategory(opt);
  };
  const handleOptChange = (val, index, optindex) => {
    var optch = [...category];
    optch[index].options[optindex].optiontext = val;
    setcategory(optch);
  };

  const handledeleteopt = (index, val) => {
    var opt = [...category];
    opt[index].options.splice(val, 1);
    setcategory(opt);
  };
  const handleAns = (val, index) => {
    var que = [...category];

    que[index].Ans = val;
    setcategory(que);
  };
  const handleadd = () => {
    setcategory([...category, questions]);
  };

  console.log(category);

  const handleMenuItem = () => {
    var i = newfeild;
    i.regex = new RegExp(newfeild.regext);
    delete i.regext;
    delete i.inputtype;
    setNewfeild({
      fieldName: "",
      field: "",
      inputtype: "",
      regex: null,
      regext: null,
    });
    var j = menuitem;
    j.push(i);
    setmenuitem(j);
    console.log(menuitem);
  };

  const onDrop = (index) => {
    console.log(actCart, index);
    var datamoving = category[actCart];
    var data = category;
    const updated = data.filter((datas, index) => index !== actCart);
    updated.splice(index, 0, datamoving);
    setcategory(updated);
  };

  useEffect(() => {
    {
      toast((t) => (
        <span>
          Welcome to Form Editer here you can create Form for your organization
          <br />
          <Button variant="text" onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </Button>
        </span>
      ));
    }
  }, []);

  return (
    <div>
      <div className="form-editor">
        <div className="section">
          <div className={forms.formImg ? "form-top form-top-add" : "form-top"}>
            {forms.formImg && (
              <img
                src={URL.createObjectURL(forms?.formImg)}
                width={"550px"}
                height={150}
                style={{ borderRadius: 10, objectFit: "cover" }}
              />
            )}

            <input
              type="text"
              className="form-name"
              placeholder="Form Name"
              value={forms.formName}
              onChange={(e) => setform({ ...forms, formName: e.target.value })}
            />
            <input
              type="text"
              className="form-desc"
              placeholder="Form Desc"
              value={forms.formDesc}
              onChange={(e) => setform({ ...forms, formDesc: e.target.value })}
            />
          </div>
          <div className="questions">
            <Drop onDrop={() => onDrop(0)} />
            {category.map((data, index) => {
              return (
                <>
                  <div key={index}>
                    <div
                      className="quetions"
                      draggable
                      onDragStart={() => setActCart(index)}
                      onDragEnd={() => setActCart(null)}>
                      <div className="navigation-div">
                        <img
                          src="../image/dots.png"
                          className="navigation"
                          width={15}
                        />
                      </div>
                      <div className="quetion-header">
                        <input
                          className="NumberText"
                          readOnly
                          value={`${index + 1}.`}
                          style={{ width: 15 }}
                        />
                        <input
                          className="questionText"
                          value={data.questionText}
                          onChange={(e) => {
                            handleque(e.target.value, index);
                          }}
                        />
                        <input
                          type="file"
                          id="i"
                          style={{ display: "none" }}
                          onChange={(e) => handleImg(id, e.target.files[0])}
                        />
                        <div className="quetion-header-sec">
                          {!data.questionimage && (
                            <Tooltip title="Add Image">
                              <label
                                for="i"
                                className="inputQimage"
                                onClick={() => {
                                  setId(index);
                                }}>
                                <CiImageOn
                                  style={{ marginTop: -3 }}
                                  size={26}
                                />
                              </label>
                            </Tooltip>
                          )}
                          <div sx={{ minWidth: 120 }}>
                            <div
                              className="Question-Type"
                              onClick={handleClick}>
                              <Tooltip title="Question Types">
                                <button
                                  className="btn"
                                  onClick={() => {
                                    setId(index);
                                  }}>
                                  {data.questioninputName}
                                </button>
                              </Tooltip>
                              <IoIosArrowDown />
                            </div>
                            <Menu
                              anchorEl={open}
                              open={Boolean(open)}
                              onClose={handleClose}>
                              <div>
                                {menuitem.map((fields, i) => {
                                  return (
                                    <MenuItem
                                      onClick={() => {
                                        handleChange(
                                          fields.field,
                                          fields.fieldName,
                                          fields.regex,
                                          fields.errmessage,
                                          id
                                        );
                                      }}>
                                      {fields.fieldName}
                                    </MenuItem>
                                  );
                                })}
                              </div>
                            </Menu>
                          </div>
                        </div>
                      </div>
                      {data.questionimage && (
                        <img
                          src={
                            data.questionimage
                              ? URL.createObjectURL(data.questionimage)
                              : "./image/user.png"
                          }
                          width={120}
                          height={120}
                          style={{ padding: 10 }}
                        />
                      )}
                      <div className="quetion-option">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            console.log(e);
                          }}>
                          <div className="not-option">
                            {data.questionType === "text" && (
                              <input
                                className="discText"
                                name="text"
                                placeholder="Write ans.."
                                value={data.Ans}
                                onChange={(e) =>
                                  handleAns(e.target.value, index)
                                }
                              />
                            )}
                            {data.questionType === "date" && (
                              <input
                                className="date"
                                type="date"
                                value={data.Ans}
                                onChange={(e) =>
                                  handleAns(e.target.value, index)
                                }
                              />
                            )}
                            {data.questionType === "password" && (
                              <input
                                className="discText"
                                type="password"
                                value={data.Ans}
                                onChange={(e) =>
                                  handleAns(e.target.value, index)
                                }
                              />
                            )}
                            {data.questionType === "email" && (
                              <input
                                className="discText"
                                placeholder="Enter mail.."
                                value={data.Ans}
                                onChange={(e) =>
                                  handleAns(e.target.value, index)
                                }
                              />
                            )}
                            {data.questionType === "pdf" && (
                              <input
                                className="file"
                                type="file"
                                ans
                                value={data.Ans}
                                onChange={(e) =>
                                  handleAns(e.target.value, index)
                                }
                              />
                            )}
                            {data.questionType === "range" && (
                              <div
                                style={{
                                  width: 150,
                                  marginLeft: 20,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 15,
                                }}>
                                <Slider
                                  defaultValue={30}
                                  value={data.Ans}
                                  size="medium"
                                  onChange={(e) =>
                                    handleAns(e.target.value, index)
                                  }
                                />
                                {data.Ans}
                              </div>
                            )}
                            {data.questionType === "image" && (
                              <input
                                className="file"
                                type="file"
                                ans
                                value={data.Ans}
                                onChange={(e) =>
                                  handleAns(e.target.value, index)
                                }
                              />
                            )}
                            {data.questionType === "make yours" && (
                              <div className="new-field-div">
                                <InputBase
                                  className="new-field"
                                  value={newfeild.fieldName}
                                  placeholder="Enter New Field"
                                  onChange={(e) =>
                                    setNewfeild({
                                      ...newfeild,
                                      fieldName: e.target.value,
                                    })
                                  }
                                />
                                <InputBase
                                  className="new-field"
                                  value={newfeild.field}
                                  placeholder="Field type'"
                                  onChange={(e) =>
                                    setNewfeild({
                                      ...newfeild,
                                      field: e.target.value,
                                    })
                                  }
                                />
                                <InputBase
                                  className="new-field"
                                  value={newfeild.regext}
                                  placeholder="Regex if applied"
                                  onChange={(e) =>
                                    setNewfeild({
                                      ...newfeild,
                                      regext: e.target.value,
                                    })
                                  }
                                />
                                <InputBase
                                  className="new-field"
                                  value={newfeild.error}
                                  placeholder="Error for validation"
                                  onChange={(e) =>
                                    setNewfeild({
                                      ...newfeild,
                                      errmessage: e.target.value,
                                    })
                                  }
                                />
                                <Button
                                  className="new-field-btn"
                                  onClick={() => {
                                    handleMenuItem();
                                    console.log(newfeild);
                                    handleChange(
                                      newfeild.field,
                                      newfeild.fieldName,
                                      newfeild.regex,
                                      newfeild.errmessage,
                                      index
                                    );
                                  }}>
                                  Add
                                </Button>
                              </div>
                            )}
                          </div>
                          {(data.questionType === "radio" ||
                            data.questionType == "CheckBox") &&
                            data.options.map((optdata, optindex) => {
                              {
                                console.log(data.questionType);
                              }
                              return (
                                <div className="options">
                                  <div>
                                    <input
                                      type={data.questionType}
                                      name="fav_language"
                                      className="in"
                                    />
                                    <input
                                      type="text"
                                      className="optionText"
                                      value={data.options[optindex].optiontext}
                                      onChange={(e) =>
                                        handleOptChange(
                                          e.target.value,
                                          index,
                                          optindex
                                        )
                                      }
                                    />
                                  </div>
                                  <div>
                                    <RxCross2
                                      className="option-delete-btn"
                                      size={20}
                                      onClick={() =>
                                        handledeleteopt(index, optindex)
                                      }
                                      style={{ marginRight: 0 }}
                                    />
                                    <br />{" "}
                                  </div>
                                </div>
                              );
                            })}
                          {(data.questionType === "radio" ||
                            data.questionType == "CheckBox") && (
                            <div style={{ width: 550 }}>
                              {data.questionType != "text" ? (
                                <Button
                                  style={{ marginLeft: 10 }}
                                  variant="text"
                                  onClick={() => handleOptions(index)}>
                                  Add Options
                                </Button>
                              ) : (
                                <></>
                              )}
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                  <Drop onDrop={() => onDrop(index + 1)} />
                </>
              );
            })}
          </div>
          <Button onClick={() => handleadd()} className="add-field">
            Add Field
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
