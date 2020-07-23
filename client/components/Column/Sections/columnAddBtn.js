import { Component, Column } from 'Components';
import { createColumn } from '@/api';

export default class ColumnAddBtn extends Component {
  constructor(parent) {
    super(parent, null, 'add-column-btn');

    this.$.addEventListener('click', async () => {
      const title = '제목을 입력하세요.';
      const ownerId = 'agrajak';
      const writerId = 'agrajak';
      const column = await createColumn(title, ownerId, writerId);
      this.parent.addColumn(new Column(this.parent, column));
    });
  }

  render() {
    return '<p>+</p><p><label>컬럼을 추가할려면 클릭!</label></p>';
  }
}
