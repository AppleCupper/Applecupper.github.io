$(function(){
	var headImg=$('.headImg');
	var headImgId=1;
	setInterval(function(){
		var imgSrc="/assets/images/menhera/"+headImgId+".jpg";
		headImg.attr('src',imgSrc)
		headImgId=(headImgId>=99)?1:++headImgId;
	},2000);
});