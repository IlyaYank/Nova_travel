const form = document.forms["feedback__form"];
const button = form.elements["button"];

const inputArr = Array.from(form);
const validInputArr = [];

inputArr.forEach((el) => {
    if (el.hasAttribute("data-reg")) {
        el.setAttribute("is-valid", "0");
        validInputArr.push(el);
    }
});

console.log(validInputArr);

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck);

function inputHandler({target}) {
    if (target.hasAttribute("data-reg")) {
        inputCheck(target);
    }
}

function inputCheck (el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
    const reg = new RegExp(inputReg);
    console.log(inputValue, reg)
    if (reg.test(inputValue)) {
        el.style.border = "2px solid rgb(0, 196, 0)";
        el.setAttribute("is-valid", "1");
    } else {
        el.style.border = "2px solid rgb(255, 0 , 0)";
        el.setAttribute("is-valid", "0");
    }
}

function formCheck (e) {
    e.preventDefault();
    const isAllValid = [];
    validInputArr.forEach((el) => {
        isAllValid.push(el.getAttribute("is-valid"));
    });
    const isValid = isAllValid.reduce((acc, current) => {
        return acc && current;
    });
    if (!Boolean(Number(isValid))) {
        alert("Заполните поля правильно!");
        return;
    }
    FormSubmit();
}

async function FormSubmit () {
    const data = seralizeForm(form);
    const response = await sendData(data);
    if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formReset();
    } else {
        alert("Код ошибки: " + response.status)
    }
}

function seralizeForm (formNode) {
    return new FormData(form);
}

async function sendData (data) {
    return await fetch("./send_mail.php", {
        method: "POST",
        body: data,
    });
}

function formReset () {
    form.reset();
    validInputArr.forEach((el) => {
        el.setAttribute("is-valid", 0);
        el.style.border = "none";
        el.style = "border-bottom: 1px solid #FFFFFF";
    });
}