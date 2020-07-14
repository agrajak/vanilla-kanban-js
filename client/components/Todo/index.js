export default class Todo {
    constructor() {
        this.$ = document.createElement("div");
        this.$.setAttribute('class', 'main-container')
        this.$.innerHTML = this.render();
        this.columns = []
    }
    mount(element){
        element.append(this.$)
    }
    render(){
        return `
        `
    }
    addColumn(column){
        this.columns.push(column)
        column.mount(this.$)
    }
}

