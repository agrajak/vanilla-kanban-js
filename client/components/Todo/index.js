import Component from '..';

export default class Todo extends Component {
  constructor(props) {
    super(props, 'main-container');
    this.columns = [];
  }

  mount(element) {
    super.mount(element);
  }

  addColumn(column) {
    this.columns.push(column);
    column.mount(this.$);
  }

  render() {
    return '';
  }
}
