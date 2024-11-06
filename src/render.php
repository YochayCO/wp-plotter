<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
	
	// Add the global state.
	wp_interactivity_state( 'plotter-ts', array( 'height' => '600' ) );
?>

<div
	<?php echo get_block_wrapper_attributes() ?>
	data-wp-interactive="plotter-ts"
>
	<iframe
		id="plot-container" 
		src="http://127.0.0.1:5173/"
		width="100%" 
		data-wp-bind--height="state.height"
		allow="fullscreen" 
	></iframe>
</div>

