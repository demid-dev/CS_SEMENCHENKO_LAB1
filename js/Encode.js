import { Base64Coder } from './Base64Coder.js'

const input = document.getElementById('encoded')
const textarea = document.getElementById('encodedText')
const downloadLink = document.getElementById('downloadLink')
let a = document.createElement('a');
let linkText = document.createTextNode("Download file");
a.appendChild(linkText);
a.title = "Download file";

input.addEventListener('change', async () => {
    let text = ''
    let file = input.files[0]
    await readFileAsync(file).then(resolve => text = resolve)
    const coder = new Base64Coder()
    textarea.value = coder.base64Encode(text)
    const fileToDownload = new Blob([coder.base64Encode(text)], { type: "text/plain" })
    a.href = URL.createObjectURL(fileToDownload)
    a.download = file.name
    downloadLink.appendChild(a)
})


function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    })
}

