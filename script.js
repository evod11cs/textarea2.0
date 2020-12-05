
function query(selector) {

	return document.querySelectorAll(selector)
}

let ide = query("textarea")
let div = query("div")

// let ide1 = new Textarea(div,ide)
let ide1 = new Editor(div[0],ide[0])
ide1.setValue(`       <h1>hi      tom</h1>`)
ide1.createLineNumber()
ide1.start()	