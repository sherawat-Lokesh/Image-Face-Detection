import React from "react";
import './Register.css'

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      RegisterName: "",
      RegisteruserName: "",
      RegisterPassword: "",
    };
  }
  onRegisterName = (event) => {
    this.setState({ RegisterName: event.target.value });
  };
  onUsernameRegister = (event) => {
    this.setState({ RegisteruserName: event.target.value });
  };
  onPasswordRegister = (event) => {
    this.setState({ RegisterPassword: event.target.value });
  };
  onSubmitRegister = () => {
    fetch("https://shiny-hat-cod.cyclic.app/Register", {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.RegisterName,
        userName: this.state.RegisteruserName,
        password: this.state.RegisterPassword,
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
      <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l  mw6 shadow-5 center main-background">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onRegisterName}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="user-name">
                  user name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="user-name"
                  id="user-name"
                  onChange={this.onUsernameRegister}
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
                  onChange={this.onPasswordRegister}
                />
              </div>
              <div className="">
                <input
                  onClick={this.onSubmitRegister}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                />
              </div>
            </fieldset>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
