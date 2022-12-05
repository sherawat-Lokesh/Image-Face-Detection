import React from "react";
import "./signIn.css";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      SignInuserName: "",
      SignInPassword: "",
    };
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }
  onUsernameChange(event) {
    this.setState({ SignInuserName: event.target.value });
  }
  onPasswordChange(event) {
    this.setState({ SignInPassword: event.target.value });
  }
  onSubmitSignin = () => {
    fetch("https://shiny-hat-cod.cyclic.app/signIn", {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        userName: this.state.SignInuserName,
        password: this.state.SignInPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.onRouteChange("home");
        }
      });
  };
  render() {
    return (
      <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l  mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="user-name">
                  user name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="user-name"
                  id="user-name"
                  onChange={this.onUsernameChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                  onClick={this.onSubmitSignin}
                />
                <div
                  onClick={() => this.props.onRouteChange("Register")}
                  className="lh-copy mt3"
                >
                  <p className="f6 pointer text-white link dim black db">
                    Sign up
                  </p>
                </div>
              </div>
            </fieldset>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
