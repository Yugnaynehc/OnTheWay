// JavaScript Document
	document.onselectstart = new Function("return false");
	O    = new Array();
	box  = 0;
	img  = 0;
	txt  = 0;
	tit  = 0;
	W    = 0;
	H    = 0;
	nI   = 0;
	sel  = 0;
	si   = 0;
	ZOOM = 0;
	rImg = 0;
	//////////////////
	speed = .06; // animation speed
	delay = .5; // 1 = no delay
	//////////////////
	
	function dText(){
		txt.style.textAlign = tit.style.textAlign = (sel<nI/2)?"left":"right";
		txt.innerHTML = O[sel].tx;
		tit.innerHTML = O[sel].ti;
	}
	
	function CObj(n, s, x, tx, ti){
		this.n    = n;
		this.dim  = s;
		this.tx   = tx;
		this.ti   = ti;
		this.is   = img[n];
		this.vz   = 0;
		this.sx   = 0;
		this.x0   = x;
		this.x1   = 0;
		this.zo   = 0;
		this.over = function() {
			with(this){
				if(n!=sel){
					O[sel].dim = 100;
					O[n].dim = ZOOM * 100;
					sel = n;
					l = 0;
					for(k=0; k<nI; k++){
						O[k].x0 = l;
						l += O[k].dim;
					}
					txt.innerHTML = tit.innerHTML = "";
					setTimeout("dText()", 32);
				}
			}
		}
		this.anim = function () {
			with(this){
				vz  = speed*(vz+(x1-sx)*delay);
				x1 -= vz;
				sx  = (n==0)?0:O[n-1].x0+O[n-1].dim;
				zo -= (zo-dim)*speed;
				l   = (x1*si)+6*(n+1);
				w   = zo*si;
				is.style.left   = Math.round(l)+'px';
				is.style.top    = Math.round((H-w*rImg)*.5)+'px';
				is.style.width  = Math.round(w)+'px';
				is.style.height = Math.round(w*rImg)+'px';
				if(sel == n){
					if(sel<nI*.5) {
						tit.style.left = txt.style.left = Math.round(l+w+6)+'px';
					} else {
						tit.style.left = txt.style.left = Math.round(l-(nx*.25)-6)+'px';
					}
					txt.style.top = Math.round(-(w*rImg)*.25)+'px';
					tit.style.top = Math.round((w*rImg)*.33)+'px';
				}
			}
		}
	}
	
	function run(){
		for(j in O)O[j].anim();
		setTimeout("run()", 16);
	}
	
	function doResize(){
		tit.style.width = Math.round(nx*.25)+'px';
		txt.style.width = Math.round(nx*.25)+'px';
		tit.style.fontSize = (nx/30)+'px';
		txt.style.fontSize = (nx/70)+'px';
		with(box.style){
			width  = Math.round(W)+'px';
			height = Math.round(H)+'px';
			left   = Math.round(nx/2-W/2)+'px';
			top    = Math.round(ny/2-H/2)+'px';
		}
	}
	
	function resize(){
		nx = scr.offsetWidth;
		ny = scr.offsetHeight;
		W  =  nx*90/100;
		si = (W-((nI+1)*6))/((ZOOM*100)+((nI-1)*100));
		H  = (100*si*rImg)+14;
		doResize();
	}
	onresize = resize;
	
	onload = function(){
		scr = document.getElementById("screen");
		box = document.getElementById("box");
		tit = document.getElementById("tit");
		txt = document.getElementById("txt");
		img = box.getElementsByTagName("img");
	
		Lnk = document.getElementById("lnk").getElementsByTagName("a");
		nI  = img.length;
		ZOOM = nI;
		rImg = img[0].height/img[0].width;
		resize();
		s = ZOOM * 100;
		x = 0;
		tit.innerHTML = img[0].title;
		txt.innerHTML = img[0].alt;
		for(i=0; i<nI; i++) {
			var t = img[i].alt;
			if(Lnk[i].href!="") t+='<br><a href="'+Lnk[i].href+'">'+Lnk[i].innerHTML+'</a>';
			O[i] = new CObj(i, s, x, t, img[i].title);
			img[i].alt = "";
			img[i].title = "";
			img[i].onmousedown = new Function("return false;");
			img[i].onmouseover = new Function('O['+i+'].over();');
			if(Lnk[i].href!=""){
				/* ==== hyperlink ==== */
				img[i].onclick = new Function('window.open("'+Lnk[i].href+'","_blank");');
			}
			x += s;
			s = 100;
		}
		box.style.visibility = "visible";
		run();
	}