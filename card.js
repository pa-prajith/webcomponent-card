const template = document.createElement("template");
template.innerHTML = `
    <style>
      .card {
        font-family: 'Arial', sans-serif;
        background: #f4f4f4;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 10px;
        margin-bottom: 15px;
        border-bottom: darkorchid 5px solid;
      }

      .card img {
        width: 100px;
      }

      .card button {
        cursor: pointer;
        background: darkorchid;
        color: #ffffff;
        border: 0;
        border-radius: 5px;
        padding: 5px 10px;
      }
    </style>
    <div class="card">
      <img />
      <div>
        <h3></h3>
        <div class="info">
          <p><slot name="email" /></p>
          <p><slot name="phone" /></p>
          <p><slot name="content" /></p>
        </div>
        <button id="toggle-info">Hide Info</button>
      </div>
    </div>
`;
// Create Custom Elment Class
class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.showInfo = true;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerHTML = this.getAttribute("name");
    this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");
    //    this.innerHTML = "This is custom content form the page";
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
    const info = this.shadowRoot.querySelector(".info");
    const btn = this.shadowRoot.querySelector("#toggle-info");
    if (this.showInfo) {
      info.style.display = "block";
      btn.innerText = "Hide Info";
    } else {
      info.style.display = "none";
      btn.innerText = "Show Info";
    }
  }

  connectedCallback() {
    const btn = this.shadowRoot.querySelector("#toggle-info");
    btn.addEventListener("click", () => this.toggleInfo());
  }

  disconnectedCallback() {
    const btn = this.shadowRoot.querySelector("#toggle-info");
    btn.removeEventListener();
  }
}

window.customElements.define("card-component", CardComponent);
