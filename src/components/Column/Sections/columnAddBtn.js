import { Component, Column } from "Components";

export default class ColumnAddBtn extends Component {
  constructor(parent) {
    super(parent, null, "add-column-btn");

    this.$.addEventListener("click", () => {
      const title = "제목을 입력하세요.";
      const ownerId = "agrajak";
      const writerId = "agrajak";
      this.parent.addColumn(
        new Column(this.parent, { id: +new Date(), title, ownerId, writerId })
      );
    });
  }

  render() {
    return "<p>+</p><p><label>컬럼을 추가할려면 클릭!</label></p>";
  }
}
