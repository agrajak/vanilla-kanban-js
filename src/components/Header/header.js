/* eslint-disable no-restricted-syntax */
import { Component } from "Components";
import "./header.css";

export default class Header extends Component {
  constructor(parent) {
    super(parent, null, "header");
  }

  render() {
    return `
            <div class="title">
                TODO 서비스
            </div>
            <div class="menu-btn">
              &#9776; Menu
            </div>
        `;
  }
}
