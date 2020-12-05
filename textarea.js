class Textarea{
	constructor(div,textarea){
		this.lines = 1;
		this.ideValues = "<span>hello</span>"
		this.rawValues = "hello"
		this.div = div
		this.textarea = textarea
		this.valueList = this.textarea.value.split(/\n/)
		this.cursor = this.createCursor()
		this.cursorColor = "white"
		this.cursorLocation = this.textarea.selectionStart
		this.cRow = this.div.offsetTop + 5
		this.cCol = this.div.offsetLeft

	}

	setDiv(value){
		this.div.style.left = this.textarea.offsetLeft + "px"
		this.div.style.top = this.textarea.offsetTop + "px"
		this.cRow = this.div.offsetTop + 5
		this.cCol = this.div.offsetLeft
		this.div.innerHTML = value
	}

	setCursor(x,y){
		this.cursor.style.left = x + "px"
		this.cursor.style.top = y + "px"
	}

	reSetCursor(){
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
				this.setCursor(this.cCol+10.3*(l2),this.cRow+(i) *27.6167)
				break;
			}
		    line++;
		}


	}

	createCursor(){
		let span = document.createElement("span")
		let body = document.querySelector("body")
		span.className = "cursor"
		span.style.backgroundColor = "white"
		body.appendChild(span)
		let status = true
		// setInterval(()=>{
		// 	if (status){
		// 		span.style.display = "none"
		// 		status = false
		// 	}else{
		// 		span.style.display = "flex"
		// 		status = true
		// 	}
		// },500);
		return span
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
			this.ideValues += newLine + `<span class="lol${i}">${this.textarea.innerHTML}</span>`
			newLine = "<br>"
			this.textarea.innerHTML = ""
		}
		return this.lines
    }

    start(){
    	this.setDiv(this.ideValues)
    	this.textarea.focus()
    	this.reSetCursor()
    	this.setCursor(this.cCol,this.cRow)
    	this.textarea.value = this.rawValues
		this.textarea.oninput = (e) =>{
			this.rechecker()
		}
		this.textarea.onclick = (e) =>{
			this.rechecker()
		}
		this.textarea.onkeyup = (e) =>{
			if (e.keyCode == 37 | e.keyCode == 38 | e.keyCode == 39 | e.keyCode == 40){
			this.rechecker()
		}
		}
		let selected = false
		this.div.ondrag = (e) =>{
			selected = true
			console.log("d");
			this.textarea.blur()
		}
		this.div.onclick = (e) =>{
			console.log(selected);
			if (!selected){
				this.rechecker()
			}
			selected = false
		}
		this.textarea.click()
	}

	rechecker(){
		this.textarea.focus()
		this.reSetCursor()
		this.reLines()
		this.setDiv(this.ideValues)
	}

}