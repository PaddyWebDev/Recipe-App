import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, Fragment } from "react";
import HeadSection from "./components/HeadSection";
import Navbar from "./components/Navbar";
import { Menu, Transition } from "@headlessui/react";
const apikey = "640063263d984a2ca21f0802f750c364";
import { useRouter } from "next/router";

export {
  Fragment,
  Menu,
  Transition,
  Navbar,
  Image,
  Link,
  React,
  useEffect,
  useState,
  axios,
  useRouter,
  HeadSection,
  apikey,
};
