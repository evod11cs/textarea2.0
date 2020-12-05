class Editor{
    constructor(div, textarea){
        this.div = div
        this.textarea = textarea
        this.lines = 0
        this.ideValues = ""
        this.rawValues = ""
        this.ideValueList = []
        this.cursorEnd = this.textarea.selectionStart
        this.cursorLocation = this.locateCursor()
        this.rows = this.getRows()
        this.numberLine = false
    }

    setDiv(value){
        this.div.style.left = this.textarea.offsetLeft + "px"
        this.div.style.top = this.textarea.offsetTop + "px"
        this.div.innerHTML = value
        let x = this.div.innerHTML.replace(/&lt;(.*?)&gt;/g,"<font class='tag'>&lt;$1&gt;</font>")
        this.div.innerHTML = x
    }

    setValue(value){
        this.textarea.value = value
        this.start()
    }

    getRows(){
        return this.textarea.value.split(/\n/).length;
    }

    locateCursor(){
        let loc = this.textarea.selectionStart + 1
        let list = this.textarea.value.split(/\n/)
        let pLen = 0
        let line = 1
        for (var i = 0; i < list.length; i++) {
            let p = list[i]
            pLen += p.length + 1
            if (pLen  >= loc){
                let l2 = Math.abs((p.length + 1) - Math.abs((pLen  - (loc))))
                if (l2 != 0){
                    l2 --;
                }
                return [l2,i]
                break;
            }
            line++;
        }

    }
    currentLine(){
        return this.locateCursor()[1]
    }
    reLines() {
        this.lines = this.textarea.value.split(/\n/).length
        let v = this.textarea.value.split(/\n/)
        this.valueList = v
        this.ideValues = ""
        let newLine = ""
        this.rawValues = ""
        for (var i = 0; i < this.lines; i++) {
            this.rawValues += v[i]
            this.textarea.innerHTML = v[i]
            this.textarea.innerHTML = this.textarea.innerHTML.replace(/\s/g,"&nbsp;")
            this.ideValueList.push(newLine + `<span class="lol${i}">${this.textarea.innerHTML}</span>`)
            this.ideValues += `<span class="lol${i}">${this.textarea.innerHTML}</span>`
            newLine = "<br>"
            this.textarea.innerHTML = ""
        }
        this.cursorEnd = this.textarea.selectionStart
        return this.lines
    }

    start(){
        this.reLines()
        this.setDiv(this.ideValues)
        this.textarea.focus()
        this.textarea.oninput = (e) =>{
            this.reLines()
            this.setDiv(this.ideValues)
            this.createLineNumber()
        }

        this.textarea.onscroll = (e) =>{
            this.div.scrollTop = this.textarea.scrollTop 
            this.div.scrollLeft = this.textarea.scrollLeft
            if (this.numberLine){
                let lineElt = query("#numbers")
                lineElt[0].scrollTop = this.textarea.scrollTop
            }
        }
        this.textarea.onkeydown = (e)=>{
            setTimeout(()=>{
                if (this.numberLine){
                this.createLineNumber()
            }
            },10);
        }

        this.textarea.onclick = (e) =>{
            if (this.numberLine){
                this.createLineNumber()
            }
        }
    }
    createLineNumber(){
        this.numberLine = true
        let nums = this.getRows()
        let lineElt = query("#numbers")

        let newLine = ""
        lineElt[0].innerHTML = ""
        for (var i = 0; i < nums; i++) {
            let elt = document.createElement("span")
            elt.className = "num"
            if (this.currentLine() == i){
                elt.className += " active"
            }
            elt.innerHTML = i + 1
            lineElt[0].appendChild(elt)
            // lineElt[0].appendChild(document.createElement('br'))
        }
    }
}