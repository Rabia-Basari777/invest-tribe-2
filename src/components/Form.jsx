import React, { useRef } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import Styles from "./form.module.css";

function Form() {
  const form = useRef();
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2000/users", data)
      .then(function (response) {
        if (response.statusText === "OK") {
          alert("Account Created Succesfully");
          sendEmail(e);
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function sendEmail(e) {
    // e.preventDefault();
    emailjs
      .sendForm(
        "service_mi6mzx6",
        "template_9nz8gbn",
        form.current,
        "user_h40ncY3gXlhUfzuSDYbsa"
      )
      .then(
        (result) => {
          console.log(result.text, "mail sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <div className={Styles.loginform}>
      <div>
        <h1>Create An Account</h1>
      </div>
      <div>
        <form ref={form} action="/" onSubmit={handleSubmit}>
          <div className={Styles.divEle}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={data.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Styles.divEle}>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={data.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Styles.divEle}>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={data.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Styles.divEle}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Styles.divEle}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Form;
