import Component from 'Components/Component/component';
import { createColumn } from '@/api';
import Column from '../column';

export default class ColumnAddBtn extends Component {
  constructor(parent) {
    super(parent, null, 'add-column-btn');

    this.$.addEventListener('click', async () => {
      const title = '제목을 입력하세요.';
      const ownerId = 'agrajak';
      const writerId = 'agrajak';
      const column = await createColumn(title, ownerId, writerId);
      this.parent.addColumn(new Column(this.parent, { title: column.title }));
    });
  }

  render() {
    return '+';
  }
}
