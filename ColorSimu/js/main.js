"use strict";

window.onload = ()=> {
	const result = document.getElementById("result");

	const params = document.querySelectorAll("[type="range"]");
	const code = document.getElementById("code");
	const check = document.getElementById("check");
	
	for( let i = 0 ; i < params.length ; i++ ){
		params[i].addEventListener("input",()=>{
			const rgb = [
				parseInt(params[0].value),
				parseInt(params[1].value),
				parseInt(params[2].value),
			];
			const cCode = toHex(rgb);
			setColor(rgb,cCode);
			params[i].nextElementSiblig.textContent = params[i].value;
			code.value = cCode.substring(1);
		});
	}

	check.addEventListener("click",()=>{
		const cCode = "#" + code.value;
		const rgb = toRGB(code.value);
		if( rgb === null ){
			code.value = "invavlid code!!";
			return ;
		}

		setColor(rgb,cCode);
		for( let i = 0 ; i < params.length ; i++ ){
			params[i].value = rgb[i];
			params[i].nextElementSibling.textContent = rgb[i];
		}
	});

	const toHex = (rgb)=>{
		let cCode = "#";
		for( let dec of rgb ){
			let hex = dec.toString(16);
			if(dec<16){
				hex = "0" + hex;
			}
			cCode += hex;
		}
		return cCode;
	}

	const toRGB =(code)=>{
		if(!/^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(code)){return null;}
		if( code.length===3 ){
			code = 
				code.charAt(0) +
				code.charAt(0) +
				code.charAt(1) +
				code.charAt(1) +
				code.charAt(2) +
				code.charAt(2);
		}
		let r = parseInt(code.subString(0,2),16);
		let g = parseInt(code.subString(2,4),16);
		let b = parseInt(code.subString(4,6),16);

		return [r,g,b] ;
	};

	const setColor =(rgb,cCode)=>{
		if( rgb[0] + rgb[1] + rgb[2] < 380 ){
			result.style.color = "white";
		}else{
			result.style.color = "black";
		}

		result.style.backgroundColor = cCode;
		result.textContent = cCodetoLowerCase();
	};
};
