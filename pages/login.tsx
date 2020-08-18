import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";
import cookie from "js-cookie";
import firebase from "../firebase";
import { useState, useEffect } from "react";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("submit");
      firebase
        .auth()
        .signInWithEmailAndPassword(login.email, login.password)
        .then(() => {
          setIsLogin(true);
        })
        .catch(function (error) {
          // Handle Errors here.
          // ...
        });
    } catch (e) {
      console.log("An error occured", e);
    }
  };
  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLogin(false);
        console.log("SignOut");
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user successfully login: ", user);
      } else {
        console.log("user successfully logout: ", user);
      }
    });
  }, isLogin);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isLogin && (
          <>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </>
        )}
        {isLogin && (
          <button type="submit" onClick={handleLogOut}>
            Logout
          </button>
        )}
      </div>
      <section className={utilStyles.headingMd}></section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
