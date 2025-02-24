const theBomb = {
    svgLink: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104l0 8c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-8c0-75.1 60.9-136 136-136l8 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-8 0z"/></svg>`,
};

const theJem = {
    svgLink:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M116.7 33.8c4.5-6.1 11.7-9.8 19.3-9.8l240 0c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4l-232 256c-4.5 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152zm38.5 39.8c-3.3 2.5-4.2 7-2.1 10.5l57.4 95.6L63.3 192c-4.1 .3-7.3 3.8-7.3 8s3.2 7.6 7.3 8l192 16c.4 0 .9 0 1.3 0l192-16c4.1-.3 7.3-3.8 7.3-8s-3.2-7.6-7.3-8L301.5 179.8l57.4-95.6c2.1-3.5 1.2-8.1-2.1-10.5s-7.9-2-10.7 1L256 172.2 165.9 74.6c-2.8-3-7.4-3.4-10.7-1z"/></svg>`,
};

const gameOptions = (endMsg) => {
    const boxContainer = document.querySelector(".box-container");
    boxContainer.innerHTML = ``;
    const container = document.querySelector(".difficulty");
    const restart = document.querySelector(".restart");
    const exit = document.querySelector(".exit")

    restart.addEventListener("click", () => {
        endMsg.style.display = "none";
        container.style.display = "flex";
    });
};

const imageFunc = (noOfTiles, noOfBombs) => {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile) => {
        const imgDiv = document.createElement("div")
        imgDiv.classList.add("tilePics")
        imgDiv.innerHTML = theJem.svgLink;
        tile.append(imgDiv)
    });

    let randomNum = Math.floor(Math.random() * noOfTiles) + 1;
    let prevNum = randomNum
    let bomb = document.getElementById(randomNum);
    window.bombList = [];
    bombList.push(randomNum)
    bomb.classList.add("tilePics")
    bomb.innerHTML = theBomb.svgLink
    console.log(`${randomNum} is a bomb`)

    for (let c = 2; c <= noOfBombs;) {
        let randomNum = Math.floor(Math.random() * noOfTiles) + 1;
        if (randomNum == prevNum) {
            continue
        }
        else {
            bomb = document.getElementById(randomNum);
            bombList.push(randomNum)
            bomb.classList.add("tilePics")
            bomb.innerHTML = theBomb.svgLink
            console.log(`${randomNum} is a bomb`)
        }
        c++;
    };
    console.log(bombList)
};

const tileFunc = (diffNum, tileWith, imgFnc, BombCount, option) => {
    //Accessing the box container section
    const gameContainer = document.querySelector('.box-container');
    //Creating the tiles.
    for (let i = 1; i <= diffNum; i++) {
        const tile = document.createElement("button");
        tile.classList.add("tile");
        tile.setAttribute("id", i);
        gameContainer.append(tile);
    }
    //Setting the width of the game container.
    gameContainer.style.width = tileWith;
    //Making the tiles function.
    imgFnc(diffNum, BombCount);

    for (let r = 1; r <= diffNum; r++) {
        const tileDiv = document.getElementById(r)
        window.idList = [];
        idList.push(tileDiv.id);

        const container = document.querySelector(".End")
        for (let item of idList) {
            for (let getBomb of bombList) {
                if (item == getBomb) {
                    tileDiv.addEventListener("click", () => {
                        tileDiv.style.backgroundColor = "white";
                        tileDiv.style.color = "white";
                        container.style.display = "flex";
                        option(container)
                    });
                
                }
                else {
                    tileDiv.addEventListener("click", () => {
                        tileDiv.style.backgroundColor = "white";
                        tileDiv.style.color = "white";
                    });
                };
            };
            break;
        };
    };

};



//Accessing the DOM in HTML
const diff = document.querySelector(".difficulty");
const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");

let diffNum;
//Easy mode event listener.
easy.addEventListener("click", () => {
    diff.style.display = "none";
    diffNum = 16;
    tileFunc(diffNum, "280px", imageFunc, 1, gameOptions, diff);
});
//Medium mode event listener.
medium.addEventListener("click", () => {
    diff.style.display = "none";
    let diffNum = 36;
    tileFunc(diffNum, "420px", imageFunc, 2, gameOptions, diff);
});
//Hard mode event listener.
hard.addEventListener("click", () => {
    diff.style.display = "none";
    let diffNum = 64;
    tileFunc(diffNum, "560px", imageFunc, 4, gameOptions, diff);
});



