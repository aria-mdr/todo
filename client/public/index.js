const todo = {
    inputValue: '',
    items: [],
/**
 * this function adds input value to the items array
 * builds a checkbox for the items and adds it to list-container
 */
    addItem : () => {
        const item =  todo.inputValue
        todo.items.push(item)
        todo.saveItem(item) 
        todo.displayItem(item)
    },
    saveItem: async (itemName) => {
        const response = await fetch('/item/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({
                item: {
                    name: itemName,
                    done: false
                }
            })
        })

        if(response.status === 200) {
            console.log('Item saved successfully')
        }
    },
    displayItem: async (item) => {
        const inputid =  item.replace(' ', '-')

        const listContainer = document.getElementById('list-container')

        const formCheck = document.createElement('div')
        formCheck.classList.add('form-check')

        const input = document.createElement('input')
        input.classList.add('form-check-input')
        input.setAttribute('type', 'checkbox')
        input.setAttribute('value', '')
        input.setAttribute('id', inputid)

        const label = document.createElement('label')
        label.classList.add('form-check-label')
        label.setAttribute('for', inputid)
        label.innerHTML = item

        formCheck.appendChild(input)
        formCheck.appendChild(label)
        listContainer.appendChild(formCheck)
    },
/**
 * handels typing
 * @param event - event that trigged event handelrs
 *  - event.target.value: used to get what user has typed
 *  - event.keyCode: used to get what jey they entered
 * @returns 
 */
    handelType: (event) => {
        const value = event.target.value

        // user hit enter
        if(event.keyCode == 13 && value.length > 0) {
            todo.addItem()
            todo.inputValue = ''
            event.target.value = ''
            return;
        }

        todo.inputValue = value
    },

    getItems: async () => {
        const response = await fetch('/items')

        if(response.status === 200) {
            const items = await response.json() 
            console.log(items)
            items.map((item) => {
                todo.displayItem(item.item.name)
            })
        }
    },

    init: () => {
        const input = document.getElementById('input')
        input.addEventListener('keyup', todo.handelType)
        todo.getItems()
    }
}

todo.init()