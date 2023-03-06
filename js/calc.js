const allPriceJson = {
    Кыргызстан: {
        "с.Ак-Тюз": {
            days: [1],
            1: {
                price: 900,
                childrenPrice: 900,
            },
        },
    },
    Казахстан: {
        Aлмата: {
            days: [1, 2],
            1: {
                price: 2000,
                childrenPrice: 1800,
            },
            2: {
                price: 5000,
                childrenPrice: 1800,
            },
        },
    },
    Узбекистан: {
        "Ташкент-Самарканд-Бухара": {
            days: [2, 3],
            2: {
                price: 5500,
                childrenPrice: 8000,
            },
            3: {
                price: 20000,
                childrenPrice: 8000,
            },
        },
    },
};

const listCountry = document.querySelector(".calc__card .calc__card__chekbox");
// console.log(listCountry)

for (const country in allPriceJson) {
    /* div country */

    const div = document.createElement("div");
    div.classList.add("cheakbox__item__btn");
    div.classList.add("place");

    /* input radio country */

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "place__radio";
    input.classList.add("calc__card__chekbox__item");
    input.id =
        "place" +
        (listCountry.querySelectorAll("div.cheakbox__item__btn").length + 1);
    div.append(input);

    /* label country */

    const label = document.createElement("label");
    label.setAttribute(
        "for",
        "place" +
            (listCountry.querySelectorAll("div.cheakbox__item__btn").length + 1)
    );
    label.innerHTML = country;
    label.setAttribute("full-info-data", "price");
    div.append(label);

    /* div city */

    for (const city in allPriceJson[country]) {
        const divCity = document.createElement("div");
        divCity.classList.add("city");
        divCity.classList.add("none");

        /* input radio city */

        const inputCity = document.createElement("input");
        inputCity.type = "radio";
        inputCity.name = "radio-city";
        inputCity.id =
            "city" +
            (listCountry.querySelectorAll("div.cheakbox__item__btn").length +
                1) +
            "-" +
            (div.querySelectorAll("div.city").length + 1);
        divCity.append(inputCity);

        /* label city */

        const labelCity = document.createElement("label");
        labelCity.setAttribute(
            "for",
            "city" +
                (listCountry.querySelectorAll("div.cheakbox__item__btn")
                    .length +
                    1) +
                "-" +
                (div.querySelectorAll("div.city").length + 1)
        );
        labelCity.innerHTML = city;
        divCity.append(labelCity);

        div.append(divCity);
    }

    //console.log(div)

    listCountry.append(div);
}

// console.log(listCountry.querySelectorAll('div.cheakbox__item__btn'))

// const country = document.querySelectorAll('.place label[full-info-data="price"]');
// const cityesCheckbox = document.querySelectorAll('.city')

// country.forEach((item) => {
//     item.addEventListener('click', cityOpenClose);

//     function cityOpenClose() {

//         cityesCheckbox.forEach((city) => {
//             city.classList.add('none')
//             city.querySelector('input').checked = false
//         })

//         item.parentElement.querySelectorAll('.city').forEach((city) => {
//             city.classList.remove('none')
//         })
//     }
// })

const country = document.querySelectorAll('.place label[full-info-data="price"]');
const cityesCheckbox = document.querySelectorAll('.city')

country.forEach((item) => {
    item.addEventListener('click', cityOpenClose);

    function cityOpenClose() {

        cityesCheckbox.forEach((city) => {
            city.classList.add('none')
            city.querySelector('input').checked = false
        })

        item.parentElement.querySelectorAll('.city').forEach((city) => {
            city.classList.remove('none')
        })
    }
})

const cityes = document.querySelectorAll(".city label");
const durations = document.querySelectorAll(".duration label");
const clacBtn = document.querySelector(".calculate__item");
const prise = document.querySelectorAll(".price__info__item");
const CountHuman = document.querySelector("#human__count").querySelectorAll("label");
const countChildren = document.querySelector("#children__count").querySelectorAll("label");
const inputNum = document.querySelectorAll(".inputCount");
const fullInfo = document.querySelectorAll(".full__information__list__item");

const apiLink ="https://api.currencyapi.com/v3/latest?apikey=Qxp3Wn03IF49AGKjKLMAeov0nO6Gr64RbE8TQrhw&currencies=USD%2CKZT&base_currency=KGS";

let dollar, tenge;

dollar = 0.011665;
tenge = 5.37;

// const fetchData = async () => {

//     const result = await fetch(`${apiLink}`);
//     const data = await result.json();

//     tenge = data.data.KZT.value;
//     dollar = data.data.USD.value;
// }

// fetchData()

let price, childrenPrice, countDays;
let humanCount = 0;
let childrenCount = 0;

inputHuman(CountHuman);
inputHuman(countChildren);

clacBtn.addEventListener("click", calculate);

inputNum.forEach((item) => {
    item.addEventListener("input", inputHumanCount);

    function inputHumanCount() {
        if (item.getAttribute("full-info-data") == "human__count") {
            humanCount = Number(item.value);
        } else if (item.getAttribute("full-info-data") == "children__count") {
            childrenCount = Number(item.value);
        }
    }
});

// const allPrice = JSON.parse('./allPrice.json')
// console.log(allPrice)

const allPrice = {
    Кыргызстан: {
        "с.Ак-Тюз": {
            days: [1],
            1: {
                price: 900,
                childrenPrice: 900,
            },
        },
    },
    Казахстан: {
        Aлмата: {
            days: [1, 2],
            1: {
                price: 2000,
                childrenPrice: 1800,
            },
            2: {
                price: 5000,
                childrenPrice: 1800,
            },
        },
    },
    Узбекистан: {
        "Ташкент-Самарканд-Бухара": {
            days: [2, 3],
            2: {
                price: 5500,
                childrenPrice: 8000,
            },
            3: {
                price: 20000,
                childrenPrice: 8000,
            },
        },
    },
};

function inputHuman(list) {
    list.forEach((item, index) => {
        if (index == 10) {
            item.addEventListener("click", inputOpen);
        } else {
            item.addEventListener("click", inputClose);
            item.addEventListener("click", getData);
        }

        function inputOpen() {
            item.parentElement.parentElement
                .querySelector(".input-human")
                .classList.remove("none");
        }

        function inputClose() {
            item.parentElement.parentElement
                .querySelector(".input-human")
                .classList.add("none");
        }

        function getData() {
            if (item.getAttribute("full-info-data") == "human__count") {
                humanCount = item.getAttribute("count");
            } else if (
                item.getAttribute("full-info-data") == "children__count"
            ) {
                childrenCount = item.getAttribute("count");
            }
        }
    });
}

function calculate() {
    cityes.forEach((item) => {
        if (item.parentElement.querySelector("input").checked) {
            durations.forEach((day) => {
                if (day.parentElement.querySelector("input").checked) {
                    countDays = day.getAttribute("duration");
                    // console.log(countDays)
                    let priceInfo =allPrice[item.parentElement.parentElement.querySelector("label").innerHTML][item.innerHTML][day.getAttribute("duration")];
                    price = priceInfo["price"];
                    childrenPrice = priceInfo["childrenPrice"];

                    prise[0].querySelector("span").innerHTML = price;
                    prise[1].querySelector("span").innerHTML = childrenPrice;

                    prise.forEach((priseItem) => {
                        priseItem.classList.remove("none");
                    });
                }
            });

            let dataForFullData = {
                place: undefined,
                city: undefined,
                duration: undefined,
                humanCount: 0,
                childrenCount: 0,
                totalPriceSom: undefined,
                totalPriceDollar: undefined,
                totalPriceTenge: undefined,
            };

            /* Город и страна*/
            cityes.forEach((placeItem) => {
                if (placeItem.parentElement.parentElement.querySelector("input").checked) {
                    dataForFullData.place =placeItem.parentElement.parentElement.querySelector("label").innerHTML;
                }
                if (placeItem.parentElement.querySelector("input").checked) {
                    dataForFullData.city = placeItem.innerHTML;
                }
            });

            /* Количество дней */
            durations.forEach((dur) => {
                if (dur.parentElement.querySelector("input").checked) {
                    dataForFullData.duration = dur.getAttribute("duration");
                }
            });

            /* Количество взрослых */
            CountHuman.forEach((humanItem, humanIndex) => {
                if (humanItem.parentElement.querySelector("input").checked) {
                    if (humanIndex == 10) {
                        dataForFullData.humanCount = Number(humanItem.parentElement.parentElement.querySelector(".input-human").querySelector("input").value);
                    } else {
                        dataForFullData.humanCount = Number(humanItem.getAttribute("count"));
                    }
                }
            });

            /* Количество детей */
            countChildren.forEach((childreItem, childrenIndex) => {
                if (childreItem.parentElement.querySelector("input").checked) {
                    if (childrenIndex == 10) {
                        dataForFullData.childrenCount = Number(
                            childreItem.parentElement.parentElement.querySelector(".input-human").querySelector("input").value);
                    } else {
                        dataForFullData.childrenCount = Number(childreItem.getAttribute("count"));
                    }
                }
            });

            /* Общая стоимость */

            priceSom =allPrice[dataForFullData.place][dataForFullData.city][dataForFullData.duration];

            dataForFullData.totalPriceSom = dataForFullData.humanCount * priceSom.price + dataForFullData.childrenCount * priceSom.childrenPrice;
            dataForFullData.totalPriceDollar = Number((dataForFullData.totalPriceSom * dollar).toFixed(2));
            //console.log(dollar)
            dataForFullData.totalPriceTenge = Number((dataForFullData.totalPriceSom * tenge).toFixed(2));

            document.querySelector(".total__price").querySelector("p").innerHTML = dataForFullData.totalPriceSom;

            /* Вывод информации */

            fullInfo.forEach((fullInfoItem) => {
                fullInfoItem.querySelector("span").innerHTML =dataForFullData[fullInfoItem.getAttribute("full-info-data")];
            });
        }
    });
}

/* Открытие и скрытие чекбоксов дней */

cityes.forEach((item) => {
    const cityName = item.innerHTML;
    const country = item.parentElement.parentElement.querySelector("label").innerHTML;

    item.addEventListener("click", daysNone);

    function daysNone() {
        const daysList = allPrice[country][cityName]["days"];

        durations.forEach((duration) => {
            // console.log(duration)
            duration.parentElement.classList.add("none");
            duration.parentElement.querySelector("input").checked = false;

            daysList.forEach((day) => {
                if (day == duration.getAttribute("duration")) {
                    duration.parentElement.classList.remove("none");
                }
            });
        });
    }
});


const openCloseBtn = document.querySelectorAll(".calc__card__title button");

openCloseBtn.forEach((item) => {
    item.addEventListener("click", closeOpenCard);
    item.link = item;

    function closeOpenCard(item) {
        const btn = item.currentTarget.link;
        btn.parentElement.parentElement.querySelectorAll("div")[1].classList.toggle("none");
        if (btn.parentElement.parentElement.querySelectorAll("div")[1].getAttribute("card-name") == "human__count") {
            btn.parentElement.parentElement.querySelectorAll("div")[1].classList.toggle("calc__card__human__count");
        }

        if (btn.querySelector("img").getAttribute("src") == "./img/calc/btn-close.svg") {
            btn.querySelector("img").src = "./img/calc/btn-open.svg";
        } else {
            btn.querySelector("img").src = "./img/calc/btn-close.svg";
        }
    }
});



const resetBtn = document.querySelector('.price__reset');

resetBtn.addEventListener('click', calcReset);

function calcReset () {
    document.querySelectorAll('.cheakbox__item__btn.place').forEach((item) => {
        item.querySelector('input').checked = false;
        item.querySelector('.city').classList.add('none');
    });
    
    document.querySelectorAll('.cheakbox__item__btn.duration').forEach((item) => {
        item.querySelector('input').checked = false;
        item.classList.remove('none')
    });

    document.querySelectorAll('.prise').forEach((item) => {
        item.querySelector('span').innerHTML = ''
        // item.querySelector('li').classList.add('none')
    });

    document.querySelectorAll('.calc__card__human__count').forEach((list) => {
        list.querySelector('.input-human').classList.add('none')
        list.querySelector('.input-human').querySelector('input').value = 0

        list.querySelectorAll('input')[0].checked = true
        
    });

    document.querySelector('.total__price').querySelector('p').innerHTML = 0;


    let dataForFullData = {
        place: '',
        city: '',
        duration: 0,
        humanCount: '',
        childrenCount: '',
        totalPriceSom: 0,
        totalPriceDollar: 0,
        totalPriceTenge: 0
    };

    document.querySelector('.full__information__list').querySelectorAll('li').forEach((item) => {
        item.querySelector('span').innerHTML = dataForFullData[item.getAttribute('full-info-data')]
    });
}