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

	$surveyOptions = array( array( 'id' => '2022', 'name' => '2022 Survey' ) );

	$context = array(
		'xValue' => '',
		'yValue' => '',
		'surveyId' => '',
		'questionItems' => $questionItems,
		'surveyOptions' => $surveyOptions,
		'survey' => null,
	);
?>

<div
	<?php echo get_block_wrapper_attributes() ?>
	data-wp-interactive="plotter-ts"
	<?php echo wp_interactivity_data_wp_context($context) ?>
	data-wp-watch="actions.updateGraph"
>

	<div class="select-container">
        <label for="select-x">Select survey</label>
        <select id="select-survey" name="select_value" data-wp-on--change="actions.handleSelectSurvey">
            <option value="">Select survey</option>
            <?php foreach ($context['surveyOptions'] as $option) : ?>
                <option value="<?php echo $option['id']; ?>">
                    <?php echo $option['name']; ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>
	
	<div class="default-invisible" data-wp-class--visible="extraContext.isSurveyLoaded">
		<div class="select-container">
			<label for="select-x">Select X</label>
			<select id="select-x" name="select_value" data-wp-bind--value="context.xValue" data-wp-on--change="actions.handleSelectX">
				<option value="">Select X</option>
				<?php foreach ($context['questionItems'] as $item) : ?>
					<option value="<?php echo $item['column']; ?>">
						<?php echo $item['description']; ?>
					</option>
				<?php endforeach; ?>
			</select>
		</div>
	
		<div class="select-container">
			<label for="select-y">Select Y</label>
			<select id="select-y" name="select_value" data-wp-bind--value="context.yValue" data-wp-on--change="actions.handleSelectY">
				<option value="">Select Y</option>
				<?php foreach ($context['questionItems'] as $item) : ?>
					<option value="<?php echo $item['column']; ?>">
						<?php echo $item['description']; ?>
					</option>
				<?php endforeach; ?>
			</select>
		</div>
	
		<p class="default-invisible" data-wp-class--visible="extraContext.isGraphVisible">
			A graph will be shown here
		</p>
	</div>
</div>
