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
	changeSelected (e){
		let parentEle= e.target;
		//console.log(e.target.selectedIndex);
		console.log(this.selectedOptions);
	
		let ele = this.parentElement.querySelector('.selected .innerCont');
		let innerdata='';
				let k=0;
				while(k<this.selectedOptions.length){
					
					if(this.selectedOptions[k] != undefined) {
						let txt ='<div class="block">';
						
						if(this.selectedOptions[k].dataset.before!=undefined){
							txt+=this.selectedOptions[k].dataset.before;
						}
						txt+=this.selectedOptions[k].innerHTML;
						if(this.selectedOptions[k].dataset.after!=undefined){
							txt+=this.selectedOptions[k].dataset.after;
						}
						txt +='</div>';
						innerdata+=txt;
					}
					k++
				}
				
				ele.innerHTML=(innerdata=='') ? "Choose One" : innerdata;
			
				
				
		
	}
	hideList(e){
		e.currentTarget.classList.remove('showList');
	}
	passEventToSelectBox(e){
		
		var selectBox = e.currentTarget.parentElement.parentElement.querySelector('SELECT');
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
		
		selectBox.dispatchEvent(new Event('change'));
		e.currentTarget.parentElement.parentElement.classList.remove('showList');
		
		
	}
	fillDataOnSelected(ele,data){
				let innerdata='';
				let i=0;
				console.log("I have "+data.length);
				
				while(i<data.length){
						
						if(data[i].value!=undefined || data[i].value!=null) {
							let block = document.createElement("DIV");
							block.setAttribute("data-index",data[i].index);
							block.classList.add('block');
							/*block.addEventListener('click',function(e){
								let selectBox =e.currentTarget.parentElement.parentElement.parentElement.querySelector('SELECT');
								//selectBox[0].selected=false;
								console.log(e.target);
								selectBox[0].selected=false;
								selectBox.dispatchEvent(new Event('change'));
							})*/
							let myHTML='';
							
							
							if(data[i].dataset.before!=undefined){
								let before = document.createElement('DIV');
								before.innerHTML=data[i].dataset.before;
								block.appendChild(before.firstChild);
							}
							
							let mainData = document.createElement('DIV');
							mainData.innerHTML=data[i].innerHTML;
							
							block.appendChild(mainData.firstChild);
							
							if(data[i].dataset.after!=undefined){
								let afterDiv = document.createElement('DIV');
								afterDiv.innerHTML=data[i].dataset.after;
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
			
			console.log(this.allEle[j].children.length);
			this.allEle[j].addEventListener("mouseleave",this.hideList);
			console.log(this.allEle[j]);
			this.allEle[j].classList.add(this.allEle[j].querySelector('SELECT').type);
			var selectedIndex =this.allEle[j].querySelector('select').selectedOptions;
			console.log(selectedIndex);
			
			
			let selectBox=this.allEle[j].querySelector('select');
			
			selectBox.addEventListener("change",this.changeSelected);
			
			// InputBox
			let inputBox = document.createElement("DIV");
			inputBox.className="selected";
			inputBox.addEventListener("click",this.showHideList);
			
			let innerCont = document.createElement("SPAN");
			innerCont.className="innerCont";
			inputBox.appendChild(innerCont);
			
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
				li.addEventListener('click',this.passEventToSelectBox);
				
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
			console.log(ul);
			this.allEle[j].appendChild(ul);
			j++;
		}
		
	
		
	}
}

new MagicScroll('.magicScroll');
