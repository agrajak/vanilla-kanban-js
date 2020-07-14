import Component from "..";

export default class Todo extends Component{
    constructor(props) {
        super(props, 'main-container')
        this.columns = []
    }
    mount(element){
        super.mount(element)
    }
    render(){
        return ``
    }
    addColumn(column){
        this.columns.push(column)
        column.mount(this.$)
    }
}