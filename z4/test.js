import { Poll } from './poll.js';
import { create_node } from './tree.js';

await Poll.setConfig("./db.json")
// потрібно зробити валідацію файла

//масив опитувань
let polls = []


run_test()

function run_test() {

    let poll = new Poll()
    polls.push(poll)
    let question = poll.ask()
    let root = create_node(question)
    survey_process(root, poll)

    while (true) {
        let ar = search_undef(root)
        if (!ar) break;
        let poll2 = new Poll()
        polls.push(poll2)
        survey_process(root, poll2, ar)
    }



    //вивід історії
    let list = []
    for (const poll of polls) {
        let his_poll = []
        for (const iterator of poll.history) {
            his_poll.push({ [iterator.question]: iterator.ansver });
        }
        list.push(his_poll);
    }

    console.log({
        paths: {
            number: polls.length,
            list
        }
    })
}

//шукаються непройдений шлях
function search_undef(root) {

    if (root == "end") return "end";

    for (let i = 0; i < root.ansvers_node.length; i++) {
        if (root.ansvers_node[i].link == undefined) {

            return [root.ansvers_node[i].ansver]

        } else {

            let res = search_undef(root.ansvers_node[i].link)

            if (res != "end" && res) {

                let arr = [root.ansvers_node[i].ansver]
                Array.isArray(res) ? arr.push(...res) : arr.push(res)
                return arr

            }
        }
    }
}

function survey_process(root, poll, answers) {

    if (answers?.length == 0) answers = undefined

    if (answers) {

        let ansv = answers[0]
        let question = poll.ask(ansv)
        let node = root.ansvers_node.find((i) => { if (i.ansver == ansv) return i })

        if (!question) {
            node.link = "end"
            return
        }

        if (!node.link) node.link = create_node(question)

        survey_process(node.link, poll, answers.filter((it, i) => i > 0))

    } else {
        for (const item of root.ansvers_node) {
            if (!item.link) {

                let question = poll.ask(item.ansver)

                if (!question) {
                    item.link = "end"
                    return
                }

                item.link = create_node(question)
                survey_process(item.link, poll)
                break;
            }
        }
    }
}


