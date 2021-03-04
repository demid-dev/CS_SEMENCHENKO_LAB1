import { TextAnalyzer } from './TextAnalyzer.js'

const input = document.getElementById('infoFile')
const textarea = document.getElementById('textInfo')
const entropy = document.getElementById('entropy')
const infoQuantity = document.getElementById('infoQuantity')
const fileSize = document.getElementById('fileSize')


input.addEventListener('change', async () => {
    let text = ''
    let file = input.files[0]
    let analysedText
    await readFileAsync(file).then(resolve => text = resolve)
    const analyzer = new TextAnalyzer()
    analysedText = analyzer.analyseText(text)
    textarea.value = analysedText.result
    entropy.textContent = 'Entropy: ' + analysedText.entropy.toFixed(3)
    infoQuantity.textContent = 'Information quantity: ' + analysedText.information.toFixed(3)
    fileSize.textContent = `File size: ${file.size} bytes`
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