/*
 * Created by Michael on 17th,Oct. 2015
 */

/* 配置項
 * 容器和超時（毫秒） */
var __container = '#pjax',
	__timeout = 3000;
(function($) {
	/* 對元素啓用 PJAX */
	$(document).pjax("a[target!='_blank'][class!='post-edit-link'][class!='comment-edit-link']", __container, {
		timeout: __timeout,
		fragment: __container,
		scrollTo: false
	});

	function pjaxinit() {
		/* 尋找所有的 form */
		$('form').each(function() {
			var form = $(this);
			/* 這是評論框麽？ */
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
					/* 阻止提交 */
					return false;
				});
			} else if (form.hasClass('search-form')) {
				/* 這是搜索框！ */
				var form = $(this);
				form.on('submit', function() {
					var url = form.attr('action'),
						word = form.find("[name='s']").val();
						/* 獲取關鍵詞、提交到的 URL */
					$.pjax({
						url: url + '?s=' + encodeURIComponent(word),
						container: __container,
						fragment: __container,
						timeout: __timeout
					});
					/* 阻止提交 */
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
		/* 如果定義了善後，就執行善後函式 */
		if (typeof(__func_afterm) == 'function') {
			__func_afterm();
		}
		pjaxinit();
	});

	$(document).ready(function() {
		/* 禁用緩存 */
		$.ajaxSetup({cache: false});
		/* 配置項
		 * NProgress */
		NProgress.configure({
			trickleRate: 0.03,
			trickleSpeed: 100
		});
		/* 第一次對元素啓用 PJAX */
		pjaxinit();
	});
})(jQuery);
