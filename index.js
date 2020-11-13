let shops = [
    {
        id:1 ,
        name: 'Апельсины',
        price: 5,
        src: "6XZSr6ddCl6cxfo0UchP.jpg"
    },
    {
        id: 2,
        name: 'Яблоки',
        price: 15,
        src: 'apple.jpg'
    },
    {
        id:3,
        name: 'Бананы',
        price: 34,
        src: 'banana.jfif'
    }
    
]
const toHtml = shops =>`
<div class="col"> 
<div class="card">
    <img src = "${shops.src}" class="card-img-top"  style = "height: 300px" alt="${shops.name}">
    <div class="card-body">
        <h5 class="card-title">${shops.name}</h5>
        <a class="btn btn-primary" data-btn = 'price' data-id =${shops.id}>Посмотреть на цену</a>
        <a class="btn btn-primary" data-btn = 'remove' data-id =${shops.id}>Удалить</a>
    </div>
</div>
</div>`

function render() {
 shops.map(toHtml).join('')
    document.querySelector('#fruits').innerHTML = shops.map(toHtml).join('') 
}
    render()
const modal =$.modl({
    title: 'Цена на товар',
    closable: false,
    width:'400px',
    footerButtons:[
        {text: 'Закрыть', type: 'primary', handler(){
            modal.close()
        }}
    ]
})
document.addEventListener('click', event => {
    event.preventDefault()
    const dataPrice = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fry = shops.find(s => s.id === id )
    if(dataPrice === 'price'){
        modal.open()
        modal.setContent( `
        <p>Цена на ${fry.name}: <strong>${fry.price}$</strong></p>
        `)
    }else if(dataPrice === 'remove' ){
        console.log('dad');
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете:<strong> ${fry.name}</strong> </p>
`      
        }
        ).then(()=> {shops = shops.filter(f=>f.id !== id)
             render()})
        .catch(()=>console.log('qq'))
    }
})