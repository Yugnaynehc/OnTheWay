// JavaScript Document
	m00=document.getElementById("box").getElementsByTagName("img");
	m01=m00.length;
	function images_loading_bar(){
		m02=0;for(i=0;i<m01;i++)m02+=(m00[i].complete)?1:0;
		document.getElementById("LB1").style.width=Math.round(m02/m01*100)+'px';
		if(m02==m01)setTimeout("document.getElementById('LB0').style.display='none'",128); 
		else setTimeout("images_loading_bar()", 64);
	};
	images_loading_bar();