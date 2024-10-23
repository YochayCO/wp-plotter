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
	wp_interactivity_state( 'plotter-ts', array( 'urlBase' => '/' ) );
	
	// Initialize context
	$questionItems = array(
		array(
			'column' => 'v52a',
			'description' => 'What is your attitude toward each of the following people? / Benjamin Netanyahu',
			'type' => 'quantity',
			'range' => array(
				'0' => 'rejection/hatred',
				'10' => 'support/sympathy'
			)
		),
		array(
			'column' => 'v111',
			'description' => 'Where would you rank yourself along a left-right continuum, where 1 is the right end and 7 is the left end?',
			'type' => 'quantity',
			'range' => array(
				'1' => 'Right',
				'7' => 'Left'
			)
		),
	);

	$context = array(
		'xValue' => '',
		'yValue' => '',
		'questionItems' => $questionItems,
	);
?>

<div
	<?php echo get_block_wrapper_attributes() ?>
	data-wp-interactive="plotter-ts"
	<?php echo wp_interactivity_data_wp_context($context) ?>
	data-wp-watch="callbacks.loadGraph"
>
	<div style="margin: 8px; width: 100%;">
        <label for="select-x">Select X</label>
        <select id="select-x" name="select_value" style="width: 100%;" data-wp-on--change="actions.selectX">
            <option value="">Select X</option>
            <?php foreach ($context['questionItems'] as $item) : ?>
                <option value="<?php echo $item['column']; ?>">
                    <?php echo $item['description']; ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

	<div style="margin: 8px; width: 100%;">
        <label for="select-y">Select Y</label>
        <select id="select-y" name="select_value" style="width: 100%;" data-wp-on--change="actions.selectY">
            <option value="">Select Y</option>
            <?php foreach ($context['questionItems'] as $item) : ?>
                <option value="<?php echo $item['column']; ?>">
                    <?php echo $item['description']; ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

	<p data-wp-bind--hidden="!callbacks.isGraphVisible">
		A graph will be shown here
	</p>
</div>
