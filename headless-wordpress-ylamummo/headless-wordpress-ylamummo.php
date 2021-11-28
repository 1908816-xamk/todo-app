<?php
/*
Plugin Name: Headless Wordpress Ylämummo
Description: Tämä plugari luo uuden CPT-tyypin "To-do", sekä sille "States" -taksonomian. Tarkoitettu käytettäväksi yhdessä headless-demon kanssa: https://henritikkanen.info/temp/cm-headless-demo/app.
Version: 0.1
Author: Henri Tikkanen
License: GPLv2
*/

defined( 'ABSPATH' ) or die();

// Luodaan uusi CPT "To-do"

function todo_create_cpt() {

	$labels = array (
		'name' 			=> __( 'To-do','post type general name', 'todo' ),
		'singular_name' 	=> __( 'To-do', 'post type singular name', 'todo' ),
		'name_admin_bar'	=> __( 'To-dos', 'todo' ),
		'add_new' 		=> __( 'Add new To-do', 'todo' ),
		'add_new_item' 		=> __( 'Add new To-do', 'todo' ),
		'edit_item' 		=> __( 'Edit To-do', 'todo' ),
		'new_item' 		=> __( 'New To-do', 'todo' ),
		'view_item' 		=> __( 'View To-do', 'todo' )
	);

	$args = array (
		'labels' 		=> $labels,
    	'description'		=> 'To-do list',
		'public' 		=> true,
		'show_in_nav_menus' 	=> false,
		'menu_icon' 		=> 'dashicons-list-view',
		'supports' 		=> array( 'title' ),
		'show_in_rest' 		=> true,
		'register_meta_box_cb' => 'todo_add_custom_box'
		//'taxonomies'		=> array( 'category' )
	);

	register_post_type( 'to-do', $args );

}
add_action( 'init', 'todo_create_cpt' );

// Luodaan uusi epähierarkinen taksonomia "states" To-do CPT:lle

function create_states_nonhierarchical_taxonomy() {
 
  $labels = array(
    'name' => _x( 'States', 'taxonomy general name' ),
    'singular_name' => _x( 'State', 'taxonomy singular name' ),
    'search_items' =>  __( 'Search States' ),
    'popular_items' => __( 'Popular States' ),
    'all_items' => __( 'All States' ),
    'parent_item' => null,
    'parent_item_colon' => null,
    'edit_item' => __( 'Edit State' ), 
    'update_item' => __( 'Update State' ),
    'add_new_item' => __( 'Add New State' ),
    'new_item_name' => __( 'New State Name' ),
    'separate_items_with_commas' => __( 'Separate states with commas' ),
    'add_or_remove_items' => __( 'Add or remove states' ),
    'choose_from_most_used' => __( 'Choose from the most used states' ),
    'menu_name' => __( 'States' ),
  ); 
 
  register_taxonomy('states','to-do',array(
    'hierarchical' => false,
    'labels' => $labels,
    'show_ui' => true,
    'show_in_rest' => true,
    'show_admin_column' => true,
    'update_count_callback' => '_update_post_term_count',
    'query_var' => true,
    'rewrite' => array( 'slug' => 'topic' ),
  ));
}

add_action( 'init', 'create_states_nonhierarchical_taxonomy', 0 );
