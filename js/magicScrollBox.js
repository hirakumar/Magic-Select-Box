/*
*****************
MAGIC SELECT BOX
*****************
Version : 1.0.1
Date : 21th Sep 2018
Developer : Hira Kumar Maharjan

*/
class MagicScroll {
    constructor(selector) {
        try {
            this.allEle = document.querySelectorAll(selector);
            this.defaultData = 'Choose one of theme';

            this.createClone();
        } catch (err) {
            console.log(err);
        }

    }
    mydata() {
        return this.defaultData;
    }
    changeSelected() {

    }
    hideList(e) {
        e.currentTarget.classList.remove('showList');
    }
    passEventToSelectBox(e) {
        let patt = /fa-check-circle-o/g;
        var selectBox = e.currentTarget.parentElement.parentElement.querySelector('SELECT');
        var inputBox = e.currentTarget.parentElement.parentElement.querySelector('.selected');
        if (selectBox.type == "select-multiple") {
            if (patt.test(e.currentTarget.firstChild.className) == true) {
                e.currentTarget.firstChild.classList.add('fa-circle-o');
                e.currentTarget.firstChild.classList.remove('fa-check-circle-o');
            } else {
                e.currentTarget.firstChild.classList.remove('fa-circle-o');
                e.currentTarget.firstChild.classList.add('fa-check-circle-o');
            }
        }

        var index = e.currentTarget.dataset.index;
        selectBox[index].selected = (selectBox[index].selected) ? false : true;

        let ele = inputBox.querySelector('.innerCont');
        this.fillDataOnSelected(ele, selectBox.selectedOptions);
        selectBox.dispatchEvent(new Event('change'));
        if (selectBox.type == "select-one") {
            e.currentTarget.parentElement.parentElement.classList.remove('showList');
        }

    }
    removeMe(e) {
        let selectBox = e.currentTarget.parentElement.parentElement.parentElement.querySelector('SELECT');
        let targetLi = e.currentTarget.parentElement.parentElement.parentElement.querySelector(".clone").children[parseInt(e.currentTarget.dataset.index)];
        targetLi.firstChild.classList.add('fa-circle-o');
        targetLi.firstChild.classList.remove('fa-check-circle-o');
        selectBox[e.currentTarget.dataset.index].selected = false;
        e.currentTarget.parentElement.removeChild(e.currentTarget);
        selectBox.dispatchEvent(new Event('change'));
    }

    fillDataOnSelected(ele, data) {

        let selectBox = ele.parentElement.parentElement.querySelector('SELECT');
        let innerdata = '';
        let i = 0;

        // Making Empty while filling blocks
        ele.innerHTML = '';
        while (i < data.length) {

            if (data[i].value != undefined || data[i].value != null) {
                let block = document.createElement("DIV");
                block.addEventListener('click', this.removeMe)
                block.setAttribute("data-index", data[i].index);
                block.classList.add('block');

                // Check Box
                if (data[i].dataset.before != undefined) {
                    let before = document.createElement('DIV');
                    before.innerHTML = "<span class='before'>" + data[i].dataset.before + "</span>";
                    block.appendChild(before.firstChild);
                }

                // Main Text
                let mainData = document.createElement('DIV');
                mainData.innerHTML = "<span class='main'>" + data[i].innerHTML + "</span>";
                block.appendChild(mainData.firstChild);
                if (data[i].dataset.after != undefined) {
                    let afterDiv = document.createElement('DIV');
                    afterDiv.innerHTML = "<span class='after'>" + data[i].dataset.after + "</span>";
                    block.appendChild(afterDiv.firstChild);
                }

                if (selectBox.type == "select-multiple") {
                    let closeBtn = document.createElement('I');
                    closeBtn.className = "fa fa-close";
                    block.appendChild(closeBtn);
                }

                ele.appendChild(block);
            }

            i++
        }

    }
    showHideList(e) {
        let patt = /showList/;
        let parentEle = e.currentTarget.parentElement;
        let checkClass = patt.test(parentEle.className);
        if (checkClass) {
            parentEle.classList.remove('showList');
        } else {
            parentEle.classList.add('showList');
        }
    }
    createClone() {
        let j = 0;
        while (j < this.allEle.length) {
            this.allEle[j].addEventListener("mouseleave", this.hideList);
            this.allEle[j].classList.add(this.allEle[j].querySelector('SELECT').type);

            // InputBox
            let inputBox = document.createElement("DIV");
            inputBox.className = "selected";
            inputBox.addEventListener("click", this.showHideList);

            var selectedIndex = this.allEle[j].querySelector('select').selectedOptions;
            let selectBox = this.allEle[j].querySelector('select');
            //	let ele = inputBox.querySelector('.innerCont');
            //	selectBox.addEventListener("change",this.fillDataOnSelected(inputBox.querySelector('.innerCont'),selectBox.selectedOptions));

            let innerCont = document.createElement("SPAN");
            innerCont.className = "innerCont";
            inputBox.appendChild(innerCont);
            // Arrow Button
            let arrowBtn = document.createElement("I");
            arrowBtn.className = "fa fa-angle-down arrow";

            inputBox.appendChild(arrowBtn);
            this.allEle[j].appendChild(inputBox);


            let ul = document.createElement("UL");
            let i = 0;

            let selectedOptions = [];
            while (i < selectBox.children.length) {
                let li = document.createElement('LI');
                li.setAttribute('data-index', i);
                li.addEventListener('click', this.passEventToSelectBox.bind(this));


                //Check Box
                if (selectBox.type == "select-multiple") {
                    let checkbox = document.createElement('DIV');
                    checkbox.className = "fa checkbox";
                    if (selectBox[i].selected == false) {
                        checkbox.classList.add('fa-circle-o');
                        checkbox.classList.remove('fa-check-circle-o');
                    } else {
                        checkbox.classList.remove('fa-circle-o');
                        checkbox.classList.add('fa-check-circle-o');
                    }
                    li.appendChild(checkbox);
                }
                // before
                if (selectBox[i].dataset.before) {
                    let beforeEle = document.createElement('span');
                    beforeEle.className = "before";
                    beforeEle.innerHTML = selectBox[i].dataset.before;
                    li.appendChild(beforeEle);
                }
                // main
                let main = document.createElement('SPAN');
                main.className = "main";
                main.textContent = selectBox[i].innerHTML;

                li.appendChild(main);

                // after
                if (selectBox[i].dataset.after) {
                    let afterEle = document.createElement('span');
                    afterEle.className = "after";
                    afterEle.innerHTML = selectBox[i].dataset.after;
                    li.appendChild(afterEle);
                }

                // Seting Selected Value on Selected Box
                ul.appendChild(li);
                i++;
            }


            //inputBox.querySelector('.innerCont').innerHTML=selectedIndex;

            let ele = inputBox.querySelector('.innerCont');
            this.fillDataOnSelected(ele, selectedIndex);
            ul.className = "clone";
            this.allEle[j].appendChild(ul);
            j++;
        }



    }
}

// Fist load document then apply Magic Scroll Box
function magicScrollBox(selector) {
    function fn() {
        return new MagicScroll(selector);
    }
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();

    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
