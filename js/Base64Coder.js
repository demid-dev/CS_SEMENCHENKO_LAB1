export class Base64Coder {
    textProcessed = []
    result = []
    base64Alphabet = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
    ]
    overelements = 0

    codeText(text) {
        let utf8Encode = new TextEncoder();
        const textProcessed = utf8Encode.encode(text)
        return textProcessed
    }

    fillWithEmptyElements(arrayToFill) {
        let array = []
        arrayToFill.forEach((value, index) => {
            array[index] = arrayToFill[index]
        })
        this.overElements = 3 - arrayToFill.length % 3
        if (this.overElements != 3) {
            for (let x = 0; x < this.overElements; x++) {
                array.push(0)
            }
        }
        return array
    }

    binarizeArray(arrayToBinarize) {
        let array = []
        arrayToBinarize.forEach((value, index) => {
            if (value.toString(2).length < 8) {
                const lengthDifference = 8 - value.toString(2).length
                array[index] = arrayToBinarize[index].toString(2)
                for (let x = 0; x < lengthDifference; x++) {
                    array[index] = '0' + array[index]
                }
            } else {
                array[index] = arrayToBinarize[index].toString(2)
            }
        })
        return array
    }

    blocksResult(arrayToBlock) {
        let result = []
        for (let x = 0; x <= arrayToBlock.length - 3; x += 3) {
            const blockOf4 = arrayToBlock[x] + arrayToBlock[x + 1] + arrayToBlock[x + 2]
            const block1 = parseInt(blockOf4.substring(0, 6), 2)
            const block2 = parseInt(blockOf4.substring(6, 12), 2)
            const block3 = parseInt(blockOf4.substring(12, 18), 2)
            const block4 = parseInt(blockOf4.substring(18, 24), 2)
            result.push(block1, block2, block3, block4)
        }
        return result
    }

    encodeResult(resultToEncode) {
        resultToEncode.forEach((value, index) => {
            resultToEncode[index] = this.base64Alphabet[value]
        })
        switch (this.overElements) {
            case 1:
                resultToEncode[resultToEncode.length - 1] = '='
                break
            case 2:
                resultToEncode[resultToEncode.length - 1] = '='
                resultToEncode[resultToEncode.length - 2] = '='
                break
            default:
                break
        }
        resultToEncode = resultToEncode.join("")
        return resultToEncode
    }

    base64Encode(text) {
        this.textProcessed = this.codeText(text)
        this.textProcessed = this.fillWithEmptyElements(this.textProcessed)
        this.textProcessed = this.binarizeArray(this.textProcessed)
        this.result = this.blocksResult(this.textProcessed)
        this.result = this.encodeResult(this.result)
        return this.result
    }
}