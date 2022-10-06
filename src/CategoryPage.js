import React, { Component } from "react";
import CategoryFetch from "./CategoryFetch";
import TrashIcon from "./TrashIcon";
import EditIcon from "./EditIcon";

export class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [{ id: " - ", name: " - " }],
      children: [],
    };
    this.willUnmount = false;
  }

  refresh() {
    CategoryFetch.getAll().then((res) => {
      if (!this.willUnmount) {
        this.setState({ categories: res });
      }
    });
  }

  componentDidMount() {
    this.willUnmount = false;
    this.refresh();
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    this.willUnmount = true;
  }

  openAddCategory() {
    const detailMenu = document.querySelector(".container :nth-child(1)");
    if (detailMenu.style.height === "0px") {
      return;
    }
    detailMenu.style.height = `${detailMenu.scrollHeight}px`;
    setTimeout(() => {
      detailMenu.style.height = "0px";
    }, 10);

    setTimeout(() => {
      detailMenu.style.opacity = "0";
    }, 300);
    setTimeout(() => {
      const addMenu = document.getElementsByClassName("container")[1];
      addMenu.style.height = `${addMenu.scrollHeight}px`;
      addMenu.style.padding = "0px";
      addMenu.style.opacity = "1";
    }, 400);
  }

  closeAddCategory() {
    const addMenu = document.getElementsByClassName("container")[1];
    if (addMenu.style.height === "0px") {
      return;
    }
    addMenu.style.height = "0px";
    addMenu.style.padding = "0px 0px";
    setTimeout(() => {
      addMenu.style.opacity = "0";
    }, 300);
    setTimeout(() => {
      const detailMenu = document.querySelector(".container :nth-child(1)");
      detailMenu.style.height = `${detailMenu.scrollHeight}px`;
      detailMenu.style.opacity = "1";
      this.refresh();
      setTimeout(() => {
        detailMenu.style.height = "auto";
      }, 400);
    }, 400);
  }

  openEdit(id) {
    const info = document.getElementById(id);
    const edit = document.querySelector(`#edit${id}`);
    if (info.style.height === "0px") {
      return;
    }
    info.style.height = "0px";
    info.style.padding = "0px";
    info.style.opacity = "0";
    setTimeout(() => {
      edit.style.height = `${edit.scrollHeight}px`;
      edit.style.padding = "10px";
    }, 500);
  }

  closeEdit(id) {
    const info = document.getElementById(id);
    const edit = document.querySelector(`#edit${id}`);
    if (edit.style.height === "0px") {
      return;
    }
    edit.style.height = "0px";
    edit.style.padding = "0px";
    setTimeout(() => {
      info.style.height = `${info.scrollHeight}px`;
      info.style.padding = "10px";
      info.style.opacity = "1";
    }, 500);
  }

  toggleDetails(id) {
    const info = document.getElementById(id);
    const edit = document.querySelector(`#edit${id}`);
    const controls = document.querySelector(`#a${id}`);
    if (info.style.height === "0px" && edit.style.height === "0px") {
      info.style.height = `${info.scrollHeight}px`;
      info.style.padding = "10px";
      info.style.opacity = "1";
      controls.style.transform = "scale(1)";
      controls.style.opacity = "1";
      return;
    }
    info.style.height = "0px";
    info.style.padding = "0px 10px";
    edit.style.height = "0px";
    edit.style.padding = "0px";
    controls.style.transform = "scale(0)";
    controls.style.opacity = "0";
  }

  openDeleteView(id) {
    const elem = document.querySelector(`#row-content${id}`);
    const controls = document.querySelector(`#delete-options${id}`);
    this.toggleDetails(id);
    controls.style.transform = "scale(1)";
    controls.style.padding = "10px 0px";
    controls.style.opacity = "1";
    elem.style.opacity = "0";
    elem.style.height = "0px";
    elem.style.padding = "0px";
  }

  closeDeleteView(id) {
    const elem = document.querySelector(`#row-content${id}`);
    const controls = document.querySelector(`#delete-options${id}`);

    if (elem.style.height !== "0px") {
      return;
    }

    this.toggleDetails(id);
    controls.style.opacity = "0";
    controls.style.transform = "scale(0)";
    controls.style.padding = "0px";
    elem.style.opacity = "1";
    elem.style.height = `${elem.scrollHeight}px`;
    setTimeout(() => {
      elem.style.height = "auto";
    }, 500);
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <h3>This is the home page</h3>
        <div className="actions">
          <button
            onClick={(e) => {
              this.refresh();
            }}>
            Update
          </button>
          <button
            id="add-category"
            style={{ margin: "0 10px" }}
            onClick={() => this.openAddCategory()}>
            Add Category
          </button>
        </div>
        <div className="container">
          <div
            style={{
              overflow: "hidden",
              transition: "all 0.4s ease",
              opacity: "1",
            }}>
            {/* ITEM ROW ---------------------------------- */}
            {this.state.categories.map((item) => (
              <div
                className="row"
                id={"row" + item.id}
                key={item.id}
                style={{
                  display: "grid",
                  height: "auto",
                  gridTemplate: "1fr / 1fr",
                }}>
                {/* ITEM ROW CONTENT ------------------------------*/}
                <div
                  id={"row-content" + item.id}
                  style={{
                    zIndex: "1",
                    display: "flex",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                    overflow: "hidden",
                    gridColumn: "1 / 1",
                    gridRow: "1 / 1",
                  }}
                  /*TOGGLE DETAIL VIEW -------------------------------------*/
                  onClick={(e) => {
                    this.setState((prevState) => {
                      // let children = Object.assign({}, prevState.children);
                      // children[item.id] = data;
                      // return { children };
                    });
                    this.toggleDetails(item.id);
                  }}>
                  {/*ITEM ROW INNER CONTENT --------------------------------*/}
                  <div style={{ display: "flex", width: "100%" }}>
                    <p className="cell title-label" style={{}}>
                      {item.id}
                      <sup style={{ fontSize: "12px", fontWeight: "500" }}>
                        id
                      </sup>
                    </p>
                    <div className="row-right">
                      <div className="property">
                        <h6>Type:</h6>
                        <p> {item.type}</p>
                      </div>
                      <div className="property">
                        <h6>Value:</h6>
                        <p> {item.value}</p>
                      </div>
                      <div className="property">
                        <h6>PersonId:</h6>
                        <p> {item.personId}</p>
                      </div>
                    </div>
                  </div>

                  {/*ITEM ROW CONTROLS --------------------------------------*/}
                  <div className="item-controls" id={"a" + item.id}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        this.openDeleteView(item.id);
                      }}>
                      <TrashIcon size="20" color="white" />
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        this.openEdit(item.id);
                      }}>
                      <EditIcon size="20" color="white" />
                    </div>
                  </div>
                </div>
                {/* ITEM DETAILS CONTAINER --------------------------------- */}
                <div>
                  <div
                    id={item.id}
                    style={{
                      padding: "0px",
                      height: "0px",
                      overflow: "hidden",
                      transition: "all 0.4s ease",
                    }}>
                    <div
                      style={{
                        padding: "5px 10px",
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}>
                      {/* DETAIL ROWS --------------------------------- */}
                      <p>Description: {item.description}</p>
                    </div>
                  </div>

                  {/*EDIT ITEM CONTAINER --------------------------------- */}
                  <div
                    style={{
                      height: "0px",
                      padding: "0px",
                      transition: "all 0.5s",
                      overflow: "hidden",
                    }}
                    id={"edit" + item.id}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}>
                      {/*EDIT INPUT ROWS ----------------------------------------------------*/}
                      <div style={{ display: "flex", gap: "10px" }}>
                        <p className="cell title-label input-label">Name</p>
                        <input type="text" style={{ width: "100%" }} />
                      </div>
                      {/*EDIT CONTROLS -----------------------------------------------------*/}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                          gap: "10px",
                        }}>
                        <button
                          onClick={(e) => {
                            this.closeEdit(item.id);
                          }}>
                          Cancel
                        </button>
                        <button>Done</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/*DELETE OPTIONS --------------------------------------*/}
                <div style={{ gridColumn: "1 / 1", gridRow: "1 / 1" }}>
                  <div
                    id={"delete-options" + item.id}
                    style={{
                      padding: "0px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: "scale(0)",
                      transition: "all 0.5s ease",
                    }}>
                    <button
                      style={{
                        marginRight: "10px",
                      }}
                      onClick={() => {
                        CategoryFetch.delete(item.id).then((res) => {
                          this.refresh();
                        });
                      }}>
                      Yes
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        this.closeDeleteView(item.id);
                      }}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ADD ITEM CONTAINER ------------------------------------- */}
        <div
          className="container"
          style={{
            display: "flex",
            padding: "10px",
            borderRadius: "10px",
            height: "0px",
            overflow: "hidden",
            opacity: "0",
            gap: "10px",
            transition:
              "padding 0.4s ease, height 0.4s ease, opacity 0.2s ease",
          }}>
          {/*INPUT ROW -----------------------------------------------*/}
          <div style={{ display: "flex", gap: "10px" }}>
            <p className="cell title-label input-label">Type</p>
            <input type="text" name="type" />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <p className="cell title-label input-label">Value</p>
            <input type="text" name="value" />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <p className="cell title-label input-label">Description</p>
            <input type="text" name="description" />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <p className="cell title-label input-label">PersonId</p>
            <input type="text" name="person-id" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}>
            <button
              onClick={() => {
                this.closeAddCategory();
              }}>
              Cancel
            </button>
            <button
              onClick={() => {
                CategoryFetch.post({
                  type: parseInt(
                    document.querySelector("input[name=type]").value
                  ),
                  value: parseFloat(
                    document.querySelector("input[name=value]").value
                  ),
                  description: document.querySelector("input[name=description]")
                    .value,
                  personId: parseInt(
                    document.querySelector("input[name=person-id]").value
                  ),
                });
                this.closeAddCategory();
              }}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryPage;
