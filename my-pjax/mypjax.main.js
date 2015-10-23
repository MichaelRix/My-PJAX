/*
 * Made by Michael on 17th,Oct. 2015
 */

var container = "#pjax",
	fragment = "#pjax",
	timeout = 3000;
(function($) {
	$(document).pjax("a[class!='post-edit-link'][class!='comment-edit-link']", container, {
		timeout: timeout,
		fragment: fragment,
		scrollTo: false
	});

	function pjaxinit() {
		$("form").each(function() {
			var form = $(this);
			if (form.hasClass('comment-form')) {
				form.on('submit', function() {
					var url = form.attr('action'),
						data = '';
					form.find('input,textarea').each(function() {
						var that = $(this);
						data += "&" + that.attr("name") + "=" + encodeURIComponent(that.val());
					});
					NProgress.start();
					$.post(url, data, function() {
						$.pjax({
							url: window.location.href,
							container: container,
							fragment: fragment,
							timeout: timeout
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
						url: url + "?s=" + encodeURIComponent(word),
						container: container,
						fragment: container,
						timeout: timeout
					});
					return false;
				});
			}
		});
	}
	$(document).on("pjax:send", function() {
		NProgress.start();
	});
	$(document).on("pjax:complete", function() {
		NProgress.done();
		pjaxinit();
	});
	$(document).ready(function() {
		$.ajaxSetup({
			cache: false
		});
		pjaxinit();
	});
})(jQuery);