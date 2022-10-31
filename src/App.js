import { Component } from "react";
import "./App.css";
import Navigation from "./navigation/navigatino";
import SignIn from "./signInForm/signIn";
import Register from "./register/register.js";
import Logo from "./Logo/logo";
import Rank from "./rank/rank.js";
import ImageLinkForm from "./imageLinkForm/imageLinkForm";
import FaceRecognition from "./faceRecognition/faceRecognition.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signIn",
      isSingnedIn: false,
    };
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
        this.displayImageBox(this.calculateFaceLocation(res));
      })
      .catch((err) => console.error(err));
  };
  onRouteChange = (route) => {
    route === "home"
      ? this.setState({ isSingnedIn: true })
      : this.setState({ isSingnedIn: false });
    this.setState({ route: route });
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
            <Rank />
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
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
