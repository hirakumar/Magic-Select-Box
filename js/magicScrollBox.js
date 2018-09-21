class MagicScroll {
	constructor(selector){
		// Check if selector is found in DOM
		try {
			this.allEle=document.querySelectorAll(selector);
			this.defaultData='Choose one of theme';

			this.createClone();
		}catch(err){
			console.log(err);
		}

	}
	mydata(){
		return this.defaultData;
	}
	changeSelected (){
	
	}
	hideList(e){
		e.currentTarget.classList.remove('showList');
	}
	passEventToSelectBox(e){
		console.log("passEventToSelectBox");

		let patt = /fa-check-circle-o/g;
		var selectBox = e.currentTarget.parentElement.parentElement.querySelector('SELECT');
		var inputBox = e.currentTarget.parentElement.parentElement.querySelector('.selected');
	if(selectBox.type=="select-multiple") {
			if(patt.test(e.currentTarget.firstChild.className)==true){
				e.currentTarget.firstChild.classList.add('fa-circle-o');
				e.currentTarget.firstChild.classList.remove('fa-check-circle-o');
			}else{
				e.currentTarget.firstChild.classList.remove('fa-circle-o');
				e.currentTarget.firstChild.classList.add('fa-check-circle-o');
			}
	}

		var index=e.currentTarget.dataset.index;

		selectBox[index].selected = (selectBox[index].selected) ? false : true;

		let i=0;
		while(i<selectBox.selectedOptions.length){
			if(selectBox[e.currentTarget.dataset.index].selected==selectBox.selectedOptions[i]){
				console.log("I have found");
				console.log(selectBox.selectedOptions[i]);
			}
			i++;
		}
		let ele = inputBox.querySelector('.innerCont');
		this.fillDataOnSelected(ele,selectBox.selectedOptions);
		selectBox.dispatchEvent(new Event('change'));
		if(selectBox.type=="select-one") {
			e.currentTarget.parentElement.parentElement.classList.remove('showList');
		}


	}
	fillDataOnSelected(ele,data){
				console.log(data);
				let innerdata='';
				let i=0;
				console.log("I have "+data.length);
				// Making Empty while filling blocks
				ele.innerHTML='';
				while(i<data.length){

						if(data[i].value!=undefined || data[i].value!=null) {
							let block = document.createElement("DIV");
							block.addEventListener('click',function(e){
								console.log(e.currentTarget.dataset.index)
								let selectBox = e.currentTarget.parentElement.parentElement.parentElement.querySelector('SELECT');
							selectBox[e.currentTarget.dataset.index].selected=false;

							selectBox.dispatchEvent(new Event('change'));
							console.log(selectBox);
							})
							block.setAttribute("data-index",data[i].index);

							block.classList.add('block');

						 // Check Box
						 console.log(this)

							if(data[i].dataset.before!=undefined){
								let before = document.createElement('DIV');
								before.innerHTML="<span class='before'>"+data[i].dataset.before+"</span>";
								block.appendChild(before.firstChild);
							}

							let mainData = document.createElement('DIV');
							mainData.innerHTML="<span class='main'>"+data[i].innerHTML+"</span>";

							block.appendChild(mainData.firstChild);

							if(data[i].dataset.after!=undefined){
								let afterDiv = document.createElement('DIV');
								afterDiv.innerHTML="<span class='after'>"+data[i].dataset.after+"</span>";
								block.appendChild(afterDiv.firstChild);
							}

							ele.appendChild(block);
						}

					i++
				}

	}
	showHideList(e){
		let patt =/showList/;

		let parentEle = e.currentTarget.parentElement;
		let checkClass = patt.test(parentEle.className);

		if(checkClass){
			console.log("Passed");
			parentEle.classList.remove('showList');
		}else{
			console.log("Fail");
			parentEle.classList.add('showList');
		}
	}
	createClone(){
		console.log("Total Select Box :" + this.allEle.length);


		let j=0;
		while(j<this.allEle.length){

			this.allEle[j].addEventListener("mouseleave",this.hideList);
			this.allEle[j].classList.add(this.allEle[j].querySelector('SELECT').type);



			// InputBox
			let inputBox = document.createElement("DIV");
			inputBox.className="selected";
			inputBox.addEventListener("click",this.showHideList);

			var selectedIndex =this.allEle[j].querySelector('select').selectedOptions;
			let selectBox=this.allEle[j].querySelector('select');
		//	let ele = inputBox.querySelector('.innerCont');
		//	selectBox.addEventListener("change",this.fillDataOnSelected(inputBox.querySelector('.innerCont'),selectBox.selectedOptions));

			let innerCont = document.createElement("SPAN");
			innerCont.className="innerCont";
			inputBox.appendChild(innerCont);
			// Arrow Button
			let arrowBtn = document.createElement("I");
			arrowBtn.className="fa fa-angle-down arrow";

			inputBox.appendChild(arrowBtn);
			this.allEle[j].appendChild(inputBox);


			let ul = document.createElement("UL");
			let i=0;

			let selectedOptions=[];
			while(i<selectBox.children.length){
				console.log(selectBox[i].value);
				let li = document.createElement('LI');
				li.setAttribute('data-index',i);

				li.addEventListener('click',this.passEventToSelectBox.bind(this));


				//Check Box
				console.log(selectBox.type);
				if(selectBox.type=="select-multiple") {
					let checkbox = document.createElement('DIV');
					checkbox.className="fa checkbox";
					if(selectBox[i].selected==false){
						checkbox.classList.add('fa-circle-o');
						checkbox.classList.remove('fa-check-circle-o');
					}else{
						checkbox.classList.remove('fa-circle-o');
						checkbox.classList.add('fa-check-circle-o');
					}
					li.appendChild(checkbox);
				}
				// before
				if(selectBox[i].dataset.before){
					let beforeEle = document.createElement('span');
						beforeEle.className="before";
						beforeEle.innerHTML=selectBox[i].dataset.before;
					li.appendChild(beforeEle);
				}
				// main
				let main = document.createElement('SPAN');
					main.className="main";
					main.textContent =selectBox[i].innerHTML;

					li.appendChild(main);

				// after
				if(selectBox[i].dataset.after){
					let afterEle = document.createElement('span');
						afterEle.className="after";
						afterEle.innerHTML=selectBox[i].dataset.after;
					li.appendChild(afterEle);
				}

				// Seting Selected Value on Selected Box
				ul.appendChild(li);
				i++;
			}


			//inputBox.querySelector('.innerCont').innerHTML=selectedIndex;
			console.log(selectedIndex.length);
			let ele = inputBox.querySelector('.innerCont');
			this.fillDataOnSelected(ele,selectedIndex);
			ul.className="clone";

			this.allEle[j].appendChild(ul);
			j++;
		}



	}
}

function magicScrollBox(selector) {
	function fn(){
		return new MagicScroll(selector);
	}
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){

	fn();


  } else {

   document.addEventListener('DOMContentLoaded', fn);
  }
}
