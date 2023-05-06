const textField = document.querySelector("#prompt");
const codeField = document.querySelector("#output");
const encryptButton = document.querySelector("#encrypt-button");
const decryptButton = document.querySelector("#decrypt-button");
const warningLabel = document.querySelector("#warning-label");


const copyText = document.querySelector("#copy-text");
const pasteText = document.querySelector("#paste-text");
const copyCode = document.querySelector("#copy-code");
const pasteCode = document.querySelector("#paste-code");

function copy(field1, field2 = undefined) {
    const text1 = field1.value.trim();
    const text2 = field2 ? field2.value.trim() : "";
    if (!(text1 && (text2 || !field2))) {
        warningLabel.textContent = "Invalid data to copy";
        warningLabel.style.visibility = "visible";
        return;
    }

    const text = text2 ? text1 + "\nkey: " + text2 : text1;

    const prom = navigator.clipboard.writeText(text);
    prom.then(() => {
        warningLabel.style.visibility = "hidden";
    })
    prom.catch(err => {
        warningLabel.textContent = "Unable to copy";
        warningLabel.style.visibility = "visible";
    });
}
function paste(field1, field2 = undefined) {
    const prom = navigator.clipboard.readText();
    prom.then(text => {
        if (text.includes("\nkey: ")) {
            const [codePaste, keyPaste] = text.split("\nkey: ");
            field1.value = codePaste.trim();
            field2.value = keyPaste.trim();
        } else {
            field1.value = text;
        }

        warningLabel.style.visibility = "hidden";
    });
    prom.catch(err => {
        warningLabel.textContent = "Unable to paste";
        warningLabel.style.visibility = "visible";
    });
}

copyText.onclick = function() {
    copy(textField);
}
pasteText.onclick = function() {
    paste(textField);
}
copyCode.onclick = function() {
    copy(codeField, keyField);
}



const button = document.getElementById('send');
button.addEventListener('click', async _ => {
    let temperature = document.getElementById("temperature").value
    let num_beams = document.getElementById("num_beams").value
    let num_beam_groups = document.getElementById("num_beam_groups").value
    let top_p = document.getElementById("top_p").value
    let prompt = document.getElementById("prompt").value 
    let a = (await fetch(`https://studious-giggle-six.vercel.app/api/generator?prompt=${prompt}&num_beams=${num_beams}&num_beam_groups=${num_beam_groups}&temperature=${temperature}&top_p=${top_p}`,
    { method: "POST" }).then(response => response.text())).trim()
    console.log(a)
    let k = "not ready"
    let b = async function() { while (k.includes("not ready")) { k = await fetch("https://studious-giggle-six.vercel.app/api/get_poem?token="+a).then(response => response.text())}; console.log(k); } ;
    await b()

    function brToNewLine(str) {
        return str.replaceAll("\\n", "<br />");
    }
    let result = brToNewLine(k);

    document.getElementById("output").innerHTML = result
});




!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(let t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(let t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function() {
    let modalButtons = document.querySelectorAll('.js-open-modal'),
       overlay      = document.querySelector('.js-overlay-modal'),
       closeButtons = document.querySelectorAll('.js-modal-close');

    modalButtons.forEach(function(item){
        item.addEventListener('click', function(e) {
            e.preventDefault();

            let modalId = this.getAttribute('data-modal'),
            modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

        modalElem.classList.add('active');
        overlay.classList.add('active');
      }); // end click

   }); // end foreach


   closeButtons.forEach(function(item){
    item.addEventListener('click', function(e) {
        let parentModal = this.closest('.modal');
            parentModal.classList.remove('active');
            overlay.classList.remove('active');
        });

    }); // end foreach


    document.body.addEventListener('keyup', function (e) {
        var key = e.keyCode;
        if (key == 27) {
            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        };
    }, false);

    overlay.addEventListener('click', function() {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });
});
