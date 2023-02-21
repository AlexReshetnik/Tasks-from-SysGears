export class Poll {

    static db_poll = undefined

    constructor() {
        if (!Poll.db_poll) {
            throw new Error("Спочатку передайте конфігураційний файл")
        }
        this.last_qu_id = 1;
        this.history = [];
    }

    static async setConfig(name_file_conf) {
        return await fetch(name_file_conf)
            .then(response => response.json())
            .then(result => { Poll.db_poll = result })
            .catch(err => { console.log(err); })

    }
    ask(ansver) {

        let last_question = Poll.db_poll.questions.find((i) => { if (i.id == this.last_qu_id) return i })
        let present_question

        ansver && this.history.push({
            question: last_question.qu,
            ansver
        })

        if (ansver) {

            this.last_qu_id = last_question.ansvers.find((i) => { if (i.an == ansver) return i }).next

            present_question = Poll.db_poll.questions.find((i) => { if (i.id == this.last_qu_id) return i })

            if (!present_question) return

        } else {
            present_question = last_question
        }

        if (this.last_qu_id === "") return

        let ret = {
            question: present_question.qu,
            ansvers: []
        }

        present_question.ansvers.map((i) => { ret.ansvers.push(i.an) })

        return ret
    }
}