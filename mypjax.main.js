/*
 * Made by Michael on 17th,Oct. 2015
 */

var __container = '#pjax',
	__timeout = 3000;
(function($) {
	$(document).pjax("a[class!='post-edit-link'][class!='comment-edit-link']", container, {
		timeout: __timeout,
		fragment: __container,
		scrollTo: false
	});

	function pjaxinit() {
		$('form').each(function() {
			var form = $(this);
			if (form.hasClass('comment-form')) {
				form.on('submit', function() {
					var url = form.attr('action'),
						data = '';
					form.find('input,textarea').each(function() {
						var that = $(this);
						data += '&' + that.attr('name') + '=' + encodeURIComponent(that.val());
					});
					NProgress.start();
					$.post(url, data, function() {
						$.pjax({
							url: window.location.href,
							container: __container,
							fragment: __container,
							timeout: __timeout
						});
					});
					NProgress.done();
					return false;
				});
			} else if (form.hasClass('search-form')) {
				var form = $(this);
				form.on('submit', function() {
					var url = form.attr('action'),
						word = form.find('.search-field').val();
					$.pjax({
						url: url + '?s=' + encodeURIComponent(word),
						container: __container,
						fragment: __container,
						timeout: __timeout
					});
					return false;
				});
			}
		});
	}
	$(document).on('pjax:send', function() {
		NProgress.start();
	});
	$(document).on('pjax:complete', function() {
		offset = $(__container).scrollTop();
		hash = window.location.hash;
		if(hash.indexOf('#comment-') == 0) offset = $(hash).offset().top;
		$('html, body').animate({scrollTop: offset}, 1000);
		NProgress.done();
		/* Do your things in this func: __func_afterm */
		__func_afterm();
		pjaxinit();
	});
	$(document).ready(function() {
		$.ajaxSetup({
			cache: false
		});
		NProgress.configure({
			trickleRate: 0.03,
			trickleSpeed: 100
		});
		pjaxinit();
	});
})(jQuery);
