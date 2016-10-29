var __container = '#pjax',
	__timeout = 3000;
(function($) {
	$(document).pjax("a[target!='_blank'][class!='post-edit-link'][class!='comment-edit-link']", __container, {
		timeout: __timeout,
		fragment: __container,
		scrollTo: false
	});

	function pjax_init() {
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
			} else if (form.find('input[name="s"]')) {
				var form = $(this);
				form.on('submit', function() {
					var url = form.attr('action'),
						word = form.find('input[name="s"]').val();
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
		hash = location.hash;
		if(hash.indexOf('#comment-') == 0) offset = $(hash).offset().top;
		$('html, body').animate({scrollTop: offset}, 1000);
		NProgress.done();
		if (typeof(__pjax_reinit) == 'function') {
			__pjax_reinit();
		}
		pjax_init();
	});

	$(document).ready(function() {
		$.ajaxSetup({cache: false});
		NProgress.configure({
			trickleRate: 0.03,
			trickleSpeed: 100
		});
		pjax_init();
	});
})(jQuery);
