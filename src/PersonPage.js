import React, { Component } from "react";
import PersonFetch from "./PersonFetch";
import TrashIcon from "./TrashIcon";
import EditIcon from "./EditIcon";
import RefreshIcon from "./RefreshIcon";
import CheckIcon from "./CheckIcon";

export class PersonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [{ id: " - ", name: "   -   " }],
      children: [],
      selected: [],
    };
    this.willUnmount = false;
  }

  refresh() {
    PersonFetch.getAll().then((res) => {
      if (!this.willUnmount) {
        this.setState({ people: res.people });
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

  checkBox(id) {
    const box = document.querySelector(`.checkbox#check${id}`);
    const icon = document.querySelector(`.checkbox>#check${id}`);
    const path = document.querySelector(`.checkbox>#check${id}>path`);
    const button = document.querySelectorAll(`#delete-selected,#uncheck`);

    icon.style.transformOrigin = "center";
    box.style.transition = "background-color 0.3s ease-in-out";
    icon.style.transition = "all 0.3s ease-in-out";
    path.style.transition = "all 0.3s ease-in-out";

    if (
      box.style.backgroundColor === "white" ||
      box.style.backgroundColor === ""
    ) {
      box.style.backgroundColor = "black";
      path.setAttribute("stroke", "white");
      icon.style.rotate = "0deg";
      if (this.state.selected.length === 0) {
        button.forEach((x) => {
          x.style.scale = "1";
          x.style.opacity = "1";
        });
      }
      this.state.selected.push(id);

      return;
    }
    box.style.backgroundColor = "white";
    path.setAttribute("stroke", "black");
    icon.style.rotate = "45deg";
    this.state.selected.splice(this.state.selected.indexOf(id), 1);
    if (this.state.selected.length === 0) {
      button.forEach((x) => {
        x.style.scale = "0";
        x.style.opacity = "0";
      });
    }
  }

  uncheckAll() {
    while (this.state.selected.length > 0) {
      this.checkBox(this.state.selected[0]);
    }
  }

  openAddPerson() {
    const detailMenu = document.querySelector(".container :nth-child(1)");
    const addMenu = document.querySelectorAll(".container")[1];
    const container = document.querySelector(".container");

    if (container.style.flexGrow === "0") {
      return;
    }

    container.style.height = "0px";
    container.style.flexGrow = "0";

    setTimeout(() => {
      detailMenu.style.opacity = "0";
    }, 300);

    setTimeout(() => {
      addMenu.style.height = "100%";
      addMenu.style.padding = "0px";
      addMenu.style.opacity = "1";
    }, 400);
  }

  closeAddPerson() {
    const addMenu = document.getElementsByClassName("container")[1];
    const container = document.querySelector(".container");
    const detailMenu = document.querySelector(".container :nth-child(1)");
    if (addMenu.style.height === "0px") {
      return;
    }
    addMenu.style.height = "0px";
    addMenu.style.padding = "0px 0px";
    setTimeout(() => {
      addMenu.style.opacity = "0";
    }, 300);
    setTimeout(() => {
      detailMenu.style.opacity = "1";
      container.style.flexGrow = "1";
      container.style.height = "100%";
      this.refresh();
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
    const check = document.querySelector(`.checkbox#check${id}`);
    if (info.style.height === "0px" && edit.style.height === "0px") {
      check.style.opacity = "0";
      check.style.scale = "0";
      check.style.width = "0px";
      info.style.height = `${info.scrollHeight}px`;
      info.style.padding = "10px";
      info.style.opacity = "1";
      controls.style.transform = "scale(1)";
      controls.style.opacity = "1";
      controls.style.width = "fit-content";
      return;
    }
    info.style.height = "0px";
    info.style.padding = "0px 10px";
    edit.style.height = "0px";
    edit.style.padding = "0px";
    controls.style.transform = "scale(0)";
    controls.style.opacity = "0";
    controls.style.width = "0px";
    check.style.opacity = "1";
    check.style.scale = "1";
    check.style.width = "fit-content";
  }

  openDeleteView(id) {
    const elem = document.querySelector(`#row-content${id}`);
    const controls = document.querySelector(`#delete-options${id}`);
    this.toggleDetails(id);
    controls.style.transform = "scale(1)";
    controls.style.padding = "10px";
    controls.style.opacity = "1";
    elem.style.opacity = "0";
    elem.style.height = "0px";
    elem.style.padding = "0px";
    elem.style.overflow = "hidden";
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
      <div className="main-container">
        <h1>Hello</h1>
        <h3>This is the home page</h3>
        <div className="actions">
          <div style={{ display: "flex" }}>
            <button
              onClick={(e) => {
                this.refresh();
              }}
              style={{ display: "flex", alignItems: "center" }}>
              <RefreshIcon size="20px" color="white"></RefreshIcon>
            </button>
            <button
              id="add-person"
              style={{ margin: "0 10px" }}
              onClick={() => this.openAddPerson()}>
              Add Person
            </button>
            <button
              id="delete-selected"
              onClick={() => {
                PersonFetch.delete({ idsToDelete: this.state.selected }).then(
                  () => {
                    this.refresh();
                    this.setState({ selected: [] });
                  }
                );
              }}>
              Delete
            </button>
          </div>
          <button
            id="uncheck"
            style={{
              backgroundColor: "white",
              border: "solid 1px black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "36px",
            }}
            onClick={() => {
              this.uncheckAll();
            }}>
            <CheckIcon size="20px" stroke="black"></CheckIcon>
          </button>
        </div>
        <div
          className="container"
          style={{ height: "100%", transition: "all 0.3s ease-out" }}>
          <div
            style={{
              transition: "all 0.4s ease",
              opacity: "1",
            }}>
            {/* ITEM ROW ---------------------------------- */}
            {this.state.people.map((item) => (
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
                    gridColumn: "1 / 1",
                    gridRow: "1 / 1",
                  }}
                  /*TOGGLE DETAIL VIEW -------------------------------------*/
                  onClick={(e) => {
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
                        <h6>Name:</h6>
                        <p> {item.name}</p>
                      </div>
                      <div className="property">
                        <h6>Age:</h6>
                        <p> {item.age}</p>
                      </div>
                      <div className="property">
                        <h6>Phone:</h6>
                        <p> {item.phone ?? "-"}</p>
                      </div>
                      <div className="property">
                        <h6>Email:</h6>
                        <p> {item.email ?? "-"}</p>
                      </div>
                    </div>
                  </div>

                  {/*ITEM ROW CHECKBOX --------------------------------*/}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      this.checkBox(item.id);
                    }}
                    className="checkbox"
                    id={"check" + item.id}>
                    <CheckIcon
                      size="20px"
                      stroke="black"
                      id={"check" + item.id}></CheckIcon>
                  </button>

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
                    <div className="detail-row">
                      {/* DETAIL ROWS --------------------------------- */}
                      <p>Revenue: {item.totalRevenue}</p>
                    </div>
                    <div className="detail-row">
                      {/* DETAIL ROWS --------------------------------- */}
                      <p>Expenses: {item.totalExpenses}</p>
                    </div>
                    <div className="detail-row">
                      {/* DETAIL ROWS --------------------------------- */}
                      <p>Balance: {item.totalBalance}</p>
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
                        <input
                          type="text"
                          id={"e-name" + item.id}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <p className="cell title-label input-label">Age</p>
                        <input
                          type="number"
                          id={"e-age" + item.id}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <p className="cell title-label input-label">Phone</p>
                        <input
                          type="number"
                          id={"e-phone" + item.id}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <p className="cell title-label input-label">Email</p>
                        <input
                          type="text"
                          id={"e-email" + item.id}
                          style={{ width: "100%" }}
                        />
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
                        <button
                          onClick={(e) => {
                            var age = document.querySelector(
                              "#e-age" + item.id
                            ).value;
                            var name = document.querySelector(
                              "#e-name" + item.id
                            ).value;
                            var email = document.querySelector(
                              "#e-email" + item.id
                            ).value;
                            var phone = document.querySelector(
                              "#e-phone" + item.id
                            ).value;
                            PersonFetch.put({
                              id: item.id,
                              age: age === "" ? null : parseInt(age),
                              name: name === "" ? null : name,
                              email: email === "" ? null : email,
                              phone: phone === "" ? null : phone,
                            }).then((data) => {
                              this.closeEdit(item.id);
                              this.refresh();
                            });
                          }}>
                          Done
                        </button>
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
                        PersonFetch.delete({ idsToDelete: [item.id] }).then(
                          (res) => {
                            this.refresh();
                          }
                        );
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
            height: "0px",
            opacity: "0",
            gap: "10px",
            flexGrow: "0",
            marginTop: "-50px",
            transition: "all 0.4s ease",
          }}>
          {/*INPUT ROW -----------------------------------------------*/}
          <div style={{ display: "flex", gap: "10px" }}>
            <p className="cell title-label input-label">Age</p>
            <input type="number" name="age" />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <p className="cell title-label input-label">Name</p>
            <input type="text" name="name" />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <p className="cell title-label input-label">Phone</p>
            <input type="number" name="phone" />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <p className="cell title-label input-label">Email</p>
            <input type="text" name="email" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}>
            <button
              onClick={() => {
                this.closeAddPerson();
              }}>
              Cancel
            </button>
            <button
              onClick={() => {
                var age = document.querySelector("input[name=age]").value;
                var name = document.querySelector("input[name=name]").value;
                var email = document.querySelector("input[name=email]").value;
                var phone = document.querySelector("input[name=phone]").value;
                if (age === "" || name === "") {
                  window.alert("Age and Name are required");
                  return;
                }
                PersonFetch.post({
                  age: parseFloat(
                    document.querySelector("input[name=age]").value
                  ),
                  name: document.querySelector("input[name=name]").value,
                  email: email === "" ? null : email,
                  phone: phone === "" ? null : phone,
                }).then(() => this.refresh());
                this.closeAddPerson();
              }}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonPage;
