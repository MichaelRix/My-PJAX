/*
 * Made by Michael on 17th,Oct. 2015
 */

var container="#pjax",
	fragment="#pjax",
	timeout=3000;
(function($){
	/* Main pjax entry */
	$(document).pjax("a[class!='post-edit-link'][class!='comment-edit-link']",container,{
		timeout:timeout,
		fragment:fragment,
		scrollTo:false
	});
	/* Handles comments fired for pjax */
	function pjcomment() {
		/* Comment form & elements */
		var form=$("form#commentform.comment-form");
		var url=form.attr("action");
		/* Post data */
		var data="";
		form.on("submit",function(){
			NProgress.start();
			form.find("input,textarea").each(function(){
				var that=$(this);
				/* Parse all post data */
				data+="&"+that.attr("name")+"="+encodeURIComponent(that.val())
			});
			/* Ajax request send */
			$.post(url,data,function(text,status,xhr){
				$.pjax({
					url:window.location.href,
					container:container,
					fragment:fragment
				});
			});
			/* When comment posting meets an error */
			return false;
		});
	}
	/* Search done by using pjax */
	function pjsearch(){
		var form=$("form.search-form");
		var url=form.attr("action");
		form.on("submit",function(){
			NProgress.start();
			var word=form.find(".search-field").val();
			$.pjax({
				/* Encode search keywords */
				url:url+"?s="+encodeURIComponent(word),
				container:container,
				fragment:container,
			});
			/* Do nothing */
			return false;
		});
	}
	$(document).on("pjax:send",function(){
		/* Start progress bar */
		NProgress.start();
	});
	$(document).on("pjax:complete",function(){
		NProgress.done();
		/* Attaches event for pjax-replaced comment forms */
		pjcomment();
		/* Event for pjax search */
		pjsearch();
	});
	$(document).ready(function(){
		/* Designed for Internet Explorer */
		$.ajaxSetup({cache:false});
		/* Initialize */
		pjcomment();
		pjsearch();
	});
})(jQuery);