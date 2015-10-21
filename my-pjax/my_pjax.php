<?php

/* jQuery PJAX from there
 * https://github.com/defunkt/jquery-pjax
 * And NProgress
 * https://github.com/rstacruz/nprogress
 * Very grateful for their work XD
 */

/*
 * Plugin Name:		My PJAX
 * Plugin URI:		https://nottres.com
 * Description:		Dream of my PJAX
 * Author:		Michael Luis
 * Author URI:		https://nottres.com
 * Version:		1.0
 * License:		GPL
 */

function mp_activate(){
	$mp_js=plugin_dir_url(__FILE__).'mypjax.main.js';
	echo "<script type='text/javascript' src='//cdn.bootcss.com/jquery.pjax/1.9.6/jquery.pjax.min.js'></script>
<script type='text/javascript' src='$mp_js'></script>
";
}
add_action('wp_footer','mp_activate');

function mp_nprogress(){
	wp_enqueue_style('nprogress','https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css');
	wp_enqueue_script('nprogress','https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',array('jquery'));
}
add_action('wp_head','mp_nprogress');

?>