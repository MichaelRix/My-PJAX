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

function mp_activate()
{
    $mp_js = plugin_dir_url(__FILE__) . 'mypjax.main.js';
    wp_enqueue_script('jquery-pjax', '//cdn.bootcss.com/jquery.pjax/1.9.6/jquery.pjax.min.js', array('jquery'), false, true);
    wp_enqueue_script('mypjax-main', $mp_js, array(), false, true);
    wp_enqueue_style('nprogress', 'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css');
    wp_enqueue_script('nprogress', 'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js', array('jquery'));
}

add_action('wp_head', 'mp_activate');