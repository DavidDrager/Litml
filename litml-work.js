(
    /**
    * Function that when executed creates a HTML Custom Element that represents a literary work
    */
    function () {

        const template = document.createElement('template');

        template.innerHTML =
            '   <style> ' +
            ':host { display: block;  }' +
            ':host([hidden]) {  display: none;  } ' +
            '</style><slot></slot>';

        /**
         * Class representing a literary work
         * @extends HTMLElement
         */
        class Work extends HTMLElement {

            static get observedAttributes() {
                return ['litml-work-type'];
            }

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.shadowRoot.appendChild(template.content.cloneNode(true));
                this._slot = this.shadowRoot.querySelector('slot');
            }
            connectedCallback() {
                alert( 'Work is connected');
            }
        }
        window.customElements.define('litml-work', Work);

    }
)();