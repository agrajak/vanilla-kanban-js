import Note from "../Note";

export default class Column {
    constructor(props) {
        this.$ = document.createElement("div");
        this.$.setAttribute('class', 'col')
        this.$.innerHTML = this.render();
        
        this.$colTitle = this.$.querySelector('.col-title')
        this.$noteForm = this.$.querySelector('.note-form')
        this.$noteFormBtn = this.$.querySelector('.note-plus')
        this.$noteAddBtn = this.$.querySelector('.add-btn')

        this.notes = []
        this.props = props

        this.$noteFormBtn.addEventListener('click', this.showNoteForm);
        this.$noteAddBtn.addEventListener('click', this.appendNote);

    }
    mount(element){
        element.append(this.$)
        for(const elem in this.props){
            this[elem] = this.props[elem];
        }
    }
    get title(){
        return this.$colTitle.innerText;
    }
    set title(value){
        this.$colTitle.innerText = value;
    }
    get noteText(){
        return this.$noteForm.querySelector('.note-text').innerText;
    }
    set noteText(value){
        this.$noteForm.querySelector('.note-text').innerText = value;
    }
    showNoteForm = () => {
        this.$noteForm.classList.remove('hidden')
    }
    appendNote = () => {
        this.addNote(new Note({title: this.noteText, writer: 'agrajak'}));
    }
    addNote(note){
        this.notes.push(note)
        note.mount(this.$)
    }
    render(){
        return `
            <div class="col-header">
                <div class="note-counter">3</div>
                <div class="col-title">
                    해야할 일
                </div>
                <div class="col-btns">
                    <button class="note-plus">+</button>
                    <button class="col-edit">...</button>
                </div>
            </div>
            <div class="col-body">
                <!-- 노트 생성폼 -->
                <div class="note-form hidden">
                    <div class="note-form-body">
                        <textarea class="note-text"></textarea>
                    </div>
                    <div class="note-form-footer">
                        <button class="add-btn">Add</button>
                        <button class="cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>
        `
    }
}
