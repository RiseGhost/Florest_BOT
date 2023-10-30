function max(x, y) {
    return (x > y) ? x : y
}

function MaxTreeNodes(heigth) {
    return (heigth >= 0) ? 2 ** heigth + MaxTreeNodes(heigth - 1) : 0
}

function numerDigits(value) {
    return value.toString().length
}

function voidColumn(matrix) {
    var columns = []
    for (var row = 0; row < matrix.length; row++) {
        for (var column = 0; column < matrix[row].length; column++) {
            var index = columns.indexOf(column)
            //console.log("index", index, "element", matrix[row][column], "column", column)
            if (matrix[row][column] == null && index == -1) {
                if (columns.length > 0) {
                    if (columns[columns.length - 1] < column) columns.push(column)
                }
                else columns.push(column)
            }
            else
                if (index != -1 && matrix[row][column] != null)
                    columns.splice(index, 1)
        }
    }
    return columns
}

class Tree {
    #value
    #Rigth
    #Left
    constructor(value) {
        this.#value = value
        this.#Rigth = null
        this.#Left = null
    }

    isLeaf() {
        return (this.#Left == null && this.#Rigth == null) ? true : false
    }

    add(value) {
        if (value == this.#value) return
        if (value > this.#value)
            (this.#Rigth == null) ? this.#Rigth = new Tree(value) : this.#Rigth.add(value)
        else
            (this.#Left == null) ? this.#Left = new Tree(value) : this.#Left.add(value)
    }

    maxValue() {
        return (this.#Rigth == null) ? this.#value : this.#Rigth.maxValue()
    }

    minValue() {
        return (this.#Left == null) ? this.#value : this.#Left.minValue()
    }

    toStringGraph() {
        var str = ""
        var minv = this.minValue()
        var div = max(numerDigits(this.maxValue()), numerDigits(minv))
        var space = "-".repeat(div)
        var matrix = this.tomatrix()
        var invalidColumns = voidColumn(matrix)
        var fristIndex = 0
        matrix.forEach(row => {
            if (row.indexOf(minv) != -1) fristIndex = row.indexOf(minv)
        })
        for (var row = 0; row <= this.heigth(); row++) {
            for (var column = 0; column < MaxTreeNodes(this.heigth()); column++) {
                if (invalidColumns.indexOf(column) == -1) {
                    if (column == fristIndex && matrix[row][column] == null) str += space
                    else if (matrix[row][column] == null) str += space
                    else str += matrix[row][column] + "-".repeat(div - matrix[row][column].toString().length)
                }
            }
            str += "\n"
        }
        return str
    }

    show() {
        if (this.#Left != null) this.#Left.show()
        console.log(this.#value)
        if (this.#Rigth != null) this.#Rigth.show()
    }

    count() {
        if (this.isLeaf()) return 1
        else if (this.#Rigth == null) return 1 + this.#Left.count()
        else if (this.#Left == null) return 1 + this.#Rigth.count()
        else return 1 + this.#Left.count() + this.#Rigth.count()
    }

    heigth() {
        if (this.isLeaf()) return 0
        else if (this.#Left == null) return 1 + max(this.#Rigth.heigth(), 0)
        else if (this.#Rigth == null) return 1 + max(this.#Left.heigth(), 0)
        else return 1 + max(this.#Rigth.heigth(), this.#Left.heigth())
    }

    tolist() {
        if (this.isLeaf()) return [this.#value]
        else if (this.#Rigth == null) return [this.#value].concat(this.#Left.tolist())
        else if (this.#Left == null) return [this.#value].concat(this.#Rigth.tolist())
        else return this.#Left.tolist().concat([this.#value]).concat(this.#Rigth.tolist())
    }

    tolistHeigth(heigth) {
        if (heigth == 0) return [this.#value]
        else if (this.isLeaf() || heigth < 0) return []
        else if (this.#Rigth == null) return this.#Left.tolistHeigth(heigth - 1)
        else if (this.#Left == null) return this.#Rigth.tolistHeigth(heigth - 1)
        else return this.#Left.tolistHeigth(heigth - 1).concat(this.#Rigth.tolistHeigth(heigth - 1))
    }

    rotacionRigth() {
        if (this.#Left == null) return this
        if (this.#Rigth != null) {
            var root = new Tree(this.#Left.#value)
            root.#Left = this.#Left.#Left
            var left = this.#Left.#Rigth
            root.#Rigth = this
            root.#Rigth.#Left = left
            return root
        } else {
            var root = new Tree(this.#Left.#value)
            var left = this.#Left.#Left
            root.#Rigth = this
            root.#Rigth.#Left = null
            root.#Left = left
            return root
        }
    }

    rotacionLeft() {
        if (this.#Rigth == null) return this
        if (this.#Rigth != null) {
            var root = new Tree(this.#Rigth.#value)
            root.#Rigth = this.#Rigth.#Rigth
            var rigth = this.#Rigth.#Left
            root.#Left = this
            root.#Left.#Rigth = rigth
            return root
        } else {
            var root = new Tree(this.#Rigth.#value)
            var rigth = this.#Rigth.#Rigth
            root.#Left = this
            root.#Left.#Rigth = null
            root.#Rigth = rigth
            return root
        }
    }

    getFatherValue(value) {
        if (this.#value == value || this.isLeaf()) return null
        else if (value > this.#value) {
            if (this.#Rigth == null) return null
            else {
                if (this.#Rigth.#value == value) return this.#value
                else return this.#Rigth.getFatherValue(value)
            }
        } else {
            if (this.#Left == null) return null
            else {
                if (this.#Left.#value == value) return this.#value
                else return this.#Left.getFatherValue(value)
            }
        }
    }

    #fatherIndex(matrix, father) {
        var index = -1
        matrix.forEach(element => {
            if (index == -1) index = element.indexOf(father)
        });
        return index
    }

    tomatrix() {
        var heigth = this.heigth()
        var MaxNodes = MaxTreeNodes(heigth)
        var matrix = new Array(heigth + 1).fill().map(() => new Array(MaxNodes).fill(null))
        matrix[0][(MaxNodes - 1) / 2] = this.#value
        for (var row = 1; row <= heigth; row++) {
            var values = this.tolistHeigth(row)
            var deltaX = Math.round(MaxNodes / (2 ** (row + 1)))
            values.forEach(value => {
                var father = this.getFatherValue(value)
                var fatherIndex = this.#fatherIndex(matrix, father)
                if (value > father) {
                    matrix[row][fatherIndex + deltaX] = value
                }
                else {
                    matrix[row][fatherIndex - deltaX] = value
                }
            })
        }
        return matrix
    }
}

function StrToTree(str) {
    var string = str.replace(/tree|\s/g, "")
    if (string.length == 0) return "Erro ❌"
    var values = string.split(',').map(x => parseInt(x))
    var acacia = new Tree(values[0])
    values.forEach(v => {
        if (v != undefined) acacia.add(v)
    })
    return acacia.toStringGraph()
}
module.exports = { Tree, StrToTree }