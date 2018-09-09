// the model for the app 
class Model {
    constructor () {
        this.cats = [
            {
                id: 1,
                name: 'Tiger',
                description: 'Cute',
                image: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350',
                clickCounter: 0
            },
            {
                id: 2,
                name: 'Lucy',
                description: 'Cute',
                image: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                clickCounter: 0
            },
            {
                id: 3,
                name: 'Missy',
                description: 'Cute',
                image: 'https://images.pexels.com/photos/62321/kitten-cat-fluffy-cat-cute-62321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                clickCounter: 0
            },
            {
                id: 4,
                name: 'Tom',
                description: 'Cute',
                image: '',
                clickCounter: 0
            }
        ];
        this.currentCat = {}
    }
}
// connection between the model and the views
class Octopus {
    constructor () {
        this.model = new Model();
        this.menuView = new MenuView();
        this.catDisplayerView = new CatDisplayerView();
    }
    getCats () {
        return this.model.cats;
    }
    getCurrentCat () {
        return this.model.currentCat;
    }
    setCurrentCat (id) {
        this.model.currentCat = this.model.cats.filter(cat => cat.id == id)[0];
        this.catDisplayerView.render();
    }
    incrementCounter () {
        let position = this.getCats().map(cat => cat.id).indexOf(this.getCurrentCat().id);
        this.model.cats[position].clickCounter ++
        this.catDisplayerView.render();
    }
    init () {
        this.menuView.render();
    }
}
// separating the app in two views
class MenuView {
    constructor () {
        // menu Template
        this.menuElement = document.querySelector('.cat-list');
        this.menuTemplate = document.querySelector('script[data-template="cat-menu"]').innerHTML;
    }
    render () {
        while(this.menuElement.firstChild) {
            this.menuElement.removeChild(this.menuElement.firstChild)
        }
        octopus.getCats().forEach((cat) => {
            let thisTemplate = this.menuTemplate.replace(/{{id}}/g, cat.id).replace(/{{name}}/g, cat.name).replace(/{{description}}/g, cat.description),
                domParser = new DOMParser(),
                parsedTemplate = domParser.parseFromString(thisTemplate, 'text/html');
            parsedTemplate.documentElement.addEventListener('click', (event) => {
                if (event.target.getAttribute("data-id")) {
                    octopus.setCurrentCat(event.target.getAttribute("data-id"))
                }
            })
            console.log('replaced string', thisTemplate, 'parsed', parsedTemplate)
            this.menuElement.appendChild(parsedTemplate.documentElement);
        })
    }
}
class CatDisplayerView {
    constructor () {
        // menu Template
        this.displayElement = document.querySelector('.cat-display')
        this.detailTemplate = document.querySelector('script[data-template="cat-detail"]').innerHTML;
    }
    render () {
        while(this.displayElement.firstChild) {
            this.displayElement.removeChild(this.displayElement.firstChild)
        }
        let thisTemplate = this.detailTemplate.replace(/{{id}}/g, octopus.getCurrentCat().id).replace(/{{name}}/g, octopus.getCurrentCat().name).replace(/{{description}}/g, octopus.getCurrentCat().description).replace(/{{image}}/g, octopus.getCurrentCat().image).replace(/{{clickCounter}}/g, octopus.getCurrentCat().clickCounter),
                domParser = new DOMParser(),
                parsedTemplate = domParser.parseFromString(thisTemplate, 'text/html');
                parsedTemplate.documentElement.addEventListener('click', (event) => {
                    if (event.target.getAttribute("data-id")) {
                        octopus.incrementCounter();
                    }
                })
        console.log('replaced string', thisTemplate, 'parsed', parsedTemplate);
        this.displayElement.appendChild(parsedTemplate.documentElement);
    }
}
// initializing app with the octopus 
let octopus = new Octopus();
octopus.init();