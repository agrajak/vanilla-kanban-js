import Component from 'Components/Component/component';
import Column from '../column';

export default class ColumnAddBtn extends Component {
  constructor(parent) {
    super(parent, null, 'add-column-btn');

    this.$.addEventListener('click', () => this.parent.addColumn(new Column(this, { title: '제목을 입력하세요.' })));
  }

  render() {
    return '+';
  }
}
