function open(incoming_data) {

    for (let i = 0; i < 80; i++) {
        incoming_data.data.push({
            a: Math.round(Math.random() * 5),
            b: Math.round(Math.random() * 2),
            c: Math.round(Math.random() * 2)
        })

    }
    //include
    for (let item of incoming_data.condition.include) {
        let key = Object.keys(item)[0]

        for (const data of incoming_data.data) {
            if (data[key] == item[key]) {
                data.suitable = true
            }
        }
    }
    //exclude
    for (let item of incoming_data.condition.exclude) {
        let key = Object.keys(item)[0]

        for (const data of incoming_data.data) {
            if (data[key] == item[key]) {
                data.suitable = false
            }
        }
    }


    let out = {
        rezult: []
    }

    for (const item of incoming_data.data) {
        if (item.suitable === true) {
            delete item.suitable
            out.rezult.push(item)
        }
    }
    
    //sort_by
    for (const sort_by_key of incoming_data.condition.sort_by.reverse()) {
        out.rezult.sort((a, b) => {
            return a[sort_by_key] - b[sort_by_key]
        })
    }

    return out
}
let out = open({
    "data": [{ "user": "mike@mail.com", "rating": 3, "disabled": false },
    { "user": "mike@mail.com", "rating": 3, "disabled": false },
    { "user": "mike@mail.com", "rating": 10, "disabled": false },
    { "user": "mike@mail.com", "rating": 2, "disabled": false },
    { "user": "mike@mail.com", "rating": 0, "disabled": false },
    { "user": "greg@mail.com", "rating": 14, "disabled": false },
    { "user": "john@mail.com", "rating": 25, "disabled": true }],
    "condition": {
        "include": [{ "a": "1" }],
        "exclude": [{ "b": "1" }, { "rating": 14 }],
        "sort_by": ["rating", "a", "b", "c"]
    }
})
console.log(out);
