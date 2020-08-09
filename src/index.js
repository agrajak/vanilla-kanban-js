/* eslint-disable no-restricted-syntax */
import { Header, Todo, Column, Note, Menu } from "Components";
import "@/global.css";

const root = document.getElementById("root");
const header = new Header(root);
const todo = new Todo();
const menu = new Menu();
header.mount(root);
todo.mount(root);
menu.mount(root);
