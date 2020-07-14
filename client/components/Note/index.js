export default class Note  {
    constructor(props) {
        
        this.$ = document.createElement("div");
        this.$.setAttribute('class', 'note')
        
        this.$.innerHTML = this.render();
        this.$noteTitle = this.$.querySelector('.note-title')
        this.$noteContent = this.$.querySelector('.note-content')
        this.$noteFooter = this.$.querySelector('.note-footer')
        this.props = props
    }
    mount(element){
        element.append(this.$)
        const {title, writer, content=""} = this.props;
        this.noteTitle = title
        this.noteContent = content
        this.noteFooter = `Added by ${writer}...`
    }
    get noteTitle(){
        return this.$noteTitle.innerText;
    }
    set noteTitle(value){
        this.$noteTitle.innerText = value;
    }
    get noteContent(){
        return this.$noteContent.innerText;
    }
    set noteContent(value){
        this.$noteContent.innerText = value;
    }
    get noteFooter(){
        return this.$noteFooter.innerText;
    }
    set noteFooter(value){
        this.$noteFooter.innerText = value;
    }
    render(){
        return `
            <div class="note-header">
                <div class="note-icon"><img/></div>
                <div class="note-title">제목</div>
                    <button class="note-delete-btn">X</button>
                </div>
                <div class="note-body">
                    <div class="note-content">내용</div>
                <div class="note-footer">Added by ...</div>  
            </div>
        `
    }
}