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
	function mypj(){
		/* Search for forms */
		$("form").each(function(){
			var form=$(this);
			/* If comment form found */
			if(form.hasClass('comment-form')){
				/* Attach event for comment form */
				form.on('submit',function(){
					var url=form.attr('action'),data='';
					/* Parse all params */
					form.find('input,textarea').each(function(){
						var that=$(this);
						data+="&"+that.attr("name")+"="+encodeURIComponent(that.val());
					});
					/* Send ajax request */
					$.post(url,data,function(){
						$.pjax({
							url:window.location.href,
							container:container,
							fragment:fragment,
							timeout:timeout
						});
					});
					/* If error do nothing */
					return false;
				});
				/* If search form found */
			}else if(form.hasClass('search-form')){
				var form=$(this);
				form.on('submit',function(){
					/* Get arguments */
					var url=form.attr('action'),
						word=form.find('.search-field').val();
					/* Load pjax */
					$.pjax({
						url:url+"?s="+encodeURIComponent(word),
						container:container,
						fragment:container,
						timeout:timeout
					});
					/* Do nothing when error */
					return false;
				});
			}
		});
	}
	$(document).on("pjax:send",function(){
		/* Start progress bar */
		NProgress.start();
	});
	$(document).on("pjax:complete",function(){
		NProgress.done();
		/* Attach events */
		mypj();
	});
	$(document).ready(function(){
		/* Designed for Internet Explorer */
		$.ajaxSetup({cache:false});
		/* Initialize */
		mypj();
	});
})(jQuery);