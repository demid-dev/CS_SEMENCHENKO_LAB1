export class TextAnalyzer {
    textArray = []
    symbolArray = []
    result = ''
    entropy = 0
    informationQuantity = 0

    getSymbolPairs(textArray) {
        textArray.forEach((value) => {
            const newSymbolPair = {
                symbol: value,
                quantity: 1
            }
            const existingSymbolPair = this.symbolArray
                .find(pair => pair.symbol === newSymbolPair.symbol)
            if (existingSymbolPair == null) {
                this.symbolArray.push(newSymbolPair)
            } else {
                existingSymbolPair.quantity++
            }
        })
    }

    getResults(symbolArray) {
        symbolArray.forEach((value) => {
            const frequency = value.quantity / this.textArray.length
            this.result += `"${value.symbol}" - ${frequency.toFixed(3)}\n`
            this.entropy += frequency * Math.log2(1 / frequency);
        })

        this.informationQantity = this.entropy * this.textArray.length / 8
    }

    analyseText(text) {
        text = text.replace(/(\r\n|\n|\r)/gm, "n")
        this.textArray = text.split('')
        this.getSymbolPairs(this.textArray)
        this.getResults(this.symbolArray)
        return {
            result: this.result,
            entropy: this.entropy,
            information: this.informationQantity
        }
    }
}