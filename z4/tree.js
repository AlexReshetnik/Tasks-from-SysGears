
class Node {
    constructor(question) {
        this.question = question
        this.ansvers_node = []
    }
}

function create_node(question) {

    let node = new Node(question)
    for (let i = 0; i < question.ansvers.length; i++) {
        let ansver = question.ansvers[i]
        node.ansvers_node.push({
            ansver,
            link: undefined
        })
    }
    return node
}
export { create_node }
