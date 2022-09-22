const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

export class Cart {
    constructor() {
      this.prato = null
      this.bebida = null
      this.sobremesa = null
      this.total = 0
    }
    
    addProduct(object){
      const {type, name, price} =  object;
  
      this[type] = {
        name, 
        price
      }
      this.verify()
    }
    
    verify() {
      if(this.sobremesa && this.bebida && this.prato) {
        btnPedir.classList.add("ativo");
        btnPedir.disabled = false;
        btnPedir.innerHTML = "Fazer pedido";
        btnPedir.addEventListener("click", () => {
          this.confirm();
        });
        btnCancelar.addEventListener("click", () => {
          this.cancel();
        });
        btnConfirmar.addEventListener("click", () => {
          this.sendZap();
        });
      }
    }
  
    finishSum() {
      this.total = this.prato.price + this.bebida.price + this.sobremesa.price
      return this.total
    }
  
    confirm() {
      const modal = document.querySelector(".overlay");
      modal.classList.remove("escondido");
      document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
        this.prato.name;
      document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
        this.prato.price.toFixed(2);
      document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
        this.bebida.name;
      document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
        this.bebida.price.toFixed(2);
      document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
        this.sobremesa.name;
      document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
        this.sobremesa.price.toFixed(2);
      document.querySelector(".confirmar-pedido .total .preco").innerHTML =
      this.finishSum().toFixed(2);
    }
    cancel() {
      const modal = document.querySelector(".overlay");
      modal.classList.add("escondido");
    }
    sendZap() {
      const telefoneRestaurante = 55048996546409;
  
      let prato = this.prato.name;
      let bebida = this.bebida.name;
      let sobremesa = this.sobremesa.name;
      let total = this.total;
      const encodedText = encodeURIComponent(
        `Olá, gostaria de fazer o pedido: \n- Prato: ${
          prato
        } \n- Bebida: ${bebida} \n- Sobremesa: ${
          sobremesa
        } \nTotal: R$ ${total.toFixed(2)}`
      );
      const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
      window.open(urlWhatsapp);
    }
  }
  
export class Produto {
    constructor( cart ,type, name,image,description,price) {
      this.type = type
      this.name = name
      this.image = image 
      this.description = description
      this.price = price
      this.cart = cart
    }
    add() {
      const element = this.createElement();
      document.querySelector(`.opcoes.${this.type}`).appendChild(element)
    }
  
    createElement() {
      const view = document.createElement("div");
      const name = this.name
      const price = this.price
  
      view.classList.add("opcao");
      view.addEventListener("click", () => {
        this.selectProduct(view, {name, price});
      });
      view.innerHTML = `
            <img src="${this.image}" />
            <div class="titulo">${this.name}</div>
            <div class="descricao">${this.description}</div>
            <div class="fundo">
                <div class="preco">R$ ${this.price.toFixed(2)}</div>
                <div class="check">
                    <ion-icon name="checkmark-circle"></ion-icon>
                </div>
            </div>
        `;
        return view;
    }
  
    selectProduct(product, {name,price}) {
      const selecionado = document.querySelector(`.${this.type} .selecionado`);
      const type = this.type;
  
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
  
    product.classList.add("selecionado");
  
    this.cart.addProduct({type,name,price })
    }
  }