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

	// Adds the global state.
	wp_interactivity_state(
		'plotter-ts',
		array(
			'urlBase' => '/',
		)
	);
	
	// Initialize context
	$ctx = array( 'isXSelected' => false, 'isYSelected' => false );
?>

<div
	<?php echo get_block_wrapper_attributes() ?>
	data-wp-interactive="plotter-ts"
	<?php echo wp_interactivity_data_wp_context($ctx) ?>
	data-wp-watch="callbacks.loadGraph"
>
	<p>
		X param:
		<input
			type="checkbox"
			aria-label="X param"
			data-wp-on--click="actions.toggleX"
		/>
		<span data-wp-bind--hidden="!context.isXSelected">X is selected</span>
	</p>
	
	<p>
		Y param:
		<input
			type="checkbox"
			aria-label="Y param"
			data-wp-on--click="actions.toggleY"
		/>
		<span data-wp-bind--hidden="!context.isYSelected">Y is selected</span>
	</p>

	<p data-wp-bind--hidden="!callbacks.isGraphVisible">
		A graph will be shown here
	</p>
</div>
