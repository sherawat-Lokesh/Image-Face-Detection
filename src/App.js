import { Component } from "react";
import Navigation from "./navigation/navigatino";
import SignIn from "./signInForm/signIn";
import Register from "./register/register.js";
import Logo from "./Logo/logo";
import Rank from "./rank/rank.js";
import ImageLinkForm from "./imageLinkForm/imageLinkForm";
import FaceRecognition from "./faceRecognition/faceRecognition.js";
import "./App.css";
let set;
const initialstate = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signIn",
  isSingnedIn: false,

  user: {
    id: "",
    name: "",
    userName: "",
    joined: "",
    entries: 0,
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialstate;
  }
  componentDidMount() {
    fetch("https://shiny-hat-cod.cyclic.app")
      .then((res) => res.json())
      .then(resp=>set=resp)
  }

  calculateFaceLocation = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;

    const DomImage = document.querySelector("#inputImage");
    const WIDTH = +DomImage.width;
    const HEIGHT = +DomImage.height;
    return {
      leftcol: faceData.left_col * WIDTH,
      rightcol: WIDTH - faceData.right_col * WIDTH,
      toprow: faceData.top_row * HEIGHT,
      bottomrow: HEIGHT - faceData.bottom_row * HEIGHT,
    };
  };
  displayImageBox = (Box) => {
    this.setState({ box: Box });
    console.log(Box);
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    const raw = JSON.stringify({
      user_app_id: {
        user_id: "7bhoz5l8ln912",
        app_id: "Recognise",
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.input,
            },
          },
        },
      ],
    });

    fetch(
      "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key af5a54585af246268c4c47d1cb9bf816",
        },
        body: raw,
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          fetch("https://shiny-hat-cod.cyclic.app/image", {
            method: "put",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((res) => res.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.displayImageBox(this.calculateFaceLocation(res));
      })
      .catch((err) => console.error(err));
  };
  onRouteChange = (route) => {
    if (route === "home") {
      this.setState({ isSingnedIn: true });
    } else if (route === "signIn") {
      this.setState(initialstate);
    }
    this.setState({ route: route });
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        userName: data.userName,
        joined: data.joined,
        entries: data.entries,
      },
    });
  };
  render() {
    return (
      <div className="App">
        <Navigation
          isSignedIn={this.state.isSingnedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signIn" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
