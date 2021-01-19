(
    /**
    * Function that when executed creates a HTML Custom Element that represents an seperator character(s) in a line of poetry or song
    */
    function () {

        const template = document.createElement('template');

        template.innerHTML =
            '<style>:host { display: inline; } :host([hidden]) {  display: none;  } :host span { margin-left: 0em; margin-right: 0em;} </style><span></span><slot></slot>';

        /**
         * Class representing a stanza of poetry or a verse or chorus of song
         * @extends HTMLElement
         */
        class Seperator extends HTMLElement {

            static get observedAttributes() {
                return [ 'litml-seperator-type', 'litml-seperator-spacing'];
            }

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.shadowRoot.appendChild(template.content.cloneNode(true));
                this._slot = this.shadowRoot.querySelector('slot');
            }

            generateSeperator() {
                var seperatorTextA = null;
                var seperatorSpacing = null;    
                var seperatorText = "";
                var spanNode;

                seperatorTextA = this.getAttribute("litml-seperator-type");
                seperatorSpacing = this.getAttribute("litml-seperator-spacing"); 

                switch (seperatorTextA) {
                    case "em":
                        seperatorText = "&#8212;";
                        break;
                    case "/":
                        seperatorText = "&#47;";
                        break;
                    case "//":
                        seperatorText = "&#47;&#47;";
                        break;
                    case "|":
                        seperatorText = "&#124;";
                        break;
                    case "||":
                        seperatorText = "&#124;&#124;";
                        break;    
                    case "...":
                        seperatorText = "&#8230;"
                        break;                 
                }
                seperatorText = this.addSpaces(seperatorText,seperatorSpacing);               
                spanNode = this.shadowRoot.querySelector("span");
                spanNode.innerHTML = seperatorText;
            }


            addSpaces(seperatorText,seperatorSpacing) {
                var authorHObj;
                var titleHObj;
                var headerObj;

                switch (seperatorSpacing) {
                    case "left":
                        return "&nbsp;" + seperatorText;
                        break;
                    case "right":
                        return seperatorText + "&nbsp;";
                        break;
                    case "both":
                        return "&nbsp;" + seperatorText +  "&nbsp;"; 
                        break;
                    default:
                        return seperatorText;
                }
            }

            connectedCallback() {
                if (this.isConnected) {
                    this.generateSeperator();
                }
            }

        }
        window.customElements.define('litml-seperator', Seperator);

    }
)();