class Modal extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set Meal(meal) {
    this._Meal = meal;

    this.render();
  }

  render() {
    const getIngredient = (meal) => {
      const listIngredient = {};
      for (let index = 1; index <= 20; index++) {
        const target = "strIngredient".concat(index);
        const target1 = "strMeasure".concat(index);
        const tmp = meal[target];
        const tmp1 = meal[target1];
        if (tmp == "" || tmp == null) {
          return listIngredient;
        }
        listIngredient[tmp] = tmp1;
      }
    };

    const tmpIngredient = getIngredient(this._Meal);

    this.shadowDOM.innerHTML = `
        <style>
        
        #modal{
          height: 100vh;
          width: 100vw;
          position: fixed;
          left: 0px;
          top: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgb(0,0,0,0.5);
          z-index: 50;
        }

        #modal_container{
            position: fixed;
            border-radius: 0.75rem;
            width: 66.67%;
            padding: 3%;
            max-height: 80vh;
            overflow: scroll;
            background-color: white;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        
        #modal_container::-webkit-scrollbar {
            display: none;
        }
        
        #modal_container > div {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            place-content: space-evently;
        }
        
        #modal_container > div > img{
            width: 100%;
            border-radius: 0.5rem;
            grid-column: span 2 / span 2;
        }
                
        #modal_container > * + * {
            margin-top: 1rem;
        }
        
        .judul{
            display: flex;
            justify-content: space-between;
            align-items: center;
            grid-column: span 2 / span 2;
        }
        
        .judul > h1{
            text-transform: capitalize;
            font-size: 1.25rem;
            line-height: 1.75rem;
        }
        
        .judul > a{
            font-size: 1.25rem;
            line-height: 1.75rem;
        }

        .judul > a > svg:hover{
          transform: scale(1.3,1.3);
          transition: all 0.3s;
        }
        
        .area {
          grid-column: span 1 / span 1;
            display: flex;
            flex-direction: column;
        }
        
        .area:nth-child(1){
          color : red;
        }
        
        .ingredient{
            /* large colspan 3 */
          grid-column: span 2 / span 2;
        }
        
        .ingredient > h4{
            font-size: 1.125rem;
            line-height: 1.75rem;
            font-weight: 700;
        }
        
        .ingredient > ul{
            
            padding-left: 1rem;
        }
        
        .ingredient > ul > li{
            line-height: 1.25rem;
        }
        
        .ingredient > ul > li > span{
            font-weight: 700;
        }
        
        .instruction{
          grid-column: span 2 / span 2;
        }
        
        .instruction > h4{
            font-size: 1.125rem;
            line-height: 1.75rem;
            font-weight: 700;
        }
        
        .instruction > p{
            padding-left: 1rem;
        }
        .hidden{
          display = none;
        }    
        @media screen and (min-width: 1024px) {
            #modal_container > div{
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }
        
            #modal_container > div > img{
                grid-column: span 3 / span 3;
            }
            .judul{
                grid-column: span 3 / span 3;
            }
            .ingredient{
                grid-column: span 3 / span 3;
            }
            .instruction{
                grid-column: span 3 / span 3;
            }
        
          }
        </style>
        <div id=modal>
          <div id="modal_container">
              <div>
                  <img src="${this._Meal.strMealThumb}" alt="">
                  <div class="judul">
                      <h1>${this._Meal.strMeal}</h1>
                      <a href="${this._Meal.strYoutube}"><svg xmlns="http://www.w3.org/2000/svg"width="1.13em" height="1em" viewBox="0 0 576 512">
                      <path
                        fill="#000000"
                        d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597c-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821c11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205l-142.739 81.201z"
                      />
                    </svg>
                    </a>
                  </div>
                  <div class="area">
                      <span>Area</span>
                      <span>${this._Meal.strArea}</span>
                  </div>
                  <div class="area">
                      <span>Category</span>
                      <span>${this._Meal.strCategory}</span>
                  </div>
                  <div class="area">
                      <span>Tag</span>
                      <span>${this._Meal.strTags}</span>
                  </div>
                  <div class="ingredient">
                      <h4>INGREDIENTS</h4>
                      <ul>
                          ${Object.keys(tmpIngredient)
                            .map((list) => {
                              return `<li>${tmpIngredient[list]} <span>${list}</span></li>`;
                            })
                            .join("")}
                      </ul>
                  </div>
                  <div class="instruction">
                      <h4>INSTRUCTION</h4>
                      <p>${this._Meal.strInstructions}</p>
                  </div>
              </div>
          </div>
        </div>
      `;

    const modal = this.shadowDOM.querySelector("#modal");

    modal.onclick = function (event) {
      console.log(`halo`);
      console.log(event.target);
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
}

customElements.define("simple-modal", Modal);
