<?php

/* jQuery PJAX from there
 * https://github.com/defunkt/jquery-pjax
 * And NProgress
 * https://github.com/rstacruz/nprogress
 * Very grateful for their work XD
 */

/*
 * Plugin Name:		My PJAX
 * Plugin URI:		https://www.nottres.com
 * Description:		Dream of my PJAX
 * Author:		Michael Luis
 * Author URI:		https://www.nottres.com
 * Version:		1.0
 * License:		GPL
 */

function mp_activate(){
	$root=plugin_dir_url(__FILE__);
	$pjax_js=$root.'jquery.pjax.min.js';
	$main_js=$root.'mypjax.main.js';
	echo "<script type='text/javascript' src='$pjax_js'></script>
<script type='text/javascript' src='$main_js'></script>
";
}
/* Enqueue scripts */
add_action('wp_footer','mp_activate');

function mp_nprogress(){
	$np_style='//cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css';
	$np_script='//cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js';
	wp_enqueue_style('nprogress',$np_style);
	/* NProgress requires jQuery */
	wp_enqueue_script('nprogress',$np_script,array('jquery'));
}
add_action('wp_head','mp_nprogress');

?>