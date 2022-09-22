import { produtos } from './data.js';
import {Cart,Produto} from './classes.js';

window.onload = () => {
  const cart = new Cart()
  produtos.forEach(productType=>{
    const key = Object.keys(productType)[0]
    productType[key].forEach( product=>{
      const newElement = new Produto(cart,key,product.name,product.image,product.description,product.price)
      newElement.add()
    })
  })
} 
