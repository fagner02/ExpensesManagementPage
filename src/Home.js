import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0,
      posx: -25,
      opacity: 0,
    };
  }

  componentDidMount() {}

  async setAnimation() {
    this.setState({ size: 1 });
    await new Promise(() =>
      setTimeout(() => {
        this.setState({ posx: 0, opacity: 1 });
      }, 300)
    );
  }

  render() {
    return (
      <div>
        <div>
          <h1>Home</h1>
          <h3>This is the test page</h3>
          <p>Here you can edit and access the test database</p>
          <button
            className="space-v"
            onClick={() => {
              this.setAnimation();
            }}>
            <b>try it</b>
          </button>
        </div>
        <div className="main" style={{ display: "flex", isolation: "isolate" }}>
          <div
            style={{
              background: "white",
              height: "10vw",
              left: "0",
              width: "10vw",
              zIndex: "0",
              position: "absolute",
            }}></div>
          <div
            className="table-container"
            style={{
              transform: `scale(${this.state.size})`,
              width: "10vw",
              background: "white",
              zIndex: "1",
            }}>
            <div>
              <p className="cell title-label full-w">database</p>
            </div>
            <div>
              <div className="cell full-w">tables</div>
            </div>
            <div>
              <div
                className="cell full-w"
                style={{ display: "flex", justifyContent: "end" }}>
                <div style={{ margin: "0 10px" }}>cells</div>
                <div>info</div>
              </div>
            </div>
            <div>
              <div className="cell full-w">data</div>
            </div>
          </div>
          <h3
            style={{
              transition: "all 0.5s ease",
              opacity: this.state.opacity,
              zIndex: -1,
              transform: `translateX(${this.state.posx}vw)`,
            }}>
            explore the menus <br />
            and see what you can do
          </h3>
        </div>
      </div>
    );
  }
}

export default Home;
