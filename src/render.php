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
	
	// Stubs for state variables that will be determined in editor
	$surveyOptions = array( array( 'id' => '2022', 'name' => '2022 Survey' ) );
	
	// Add the global state.
	wp_interactivity_state( 'plotter-ts', array( 
		'urlBase' => '/', 
		'surveyOptions' => $surveyOptions,
	) );

	// Initialize context
	$context = array(
		'xValue' => '',
		'yValue' => '',
		'surveyId' => '',
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
			<template data-wp-each="state.surveyOptions">
				<option data-wp-bind--value="context.item.id" data-wp-text="context.item.name"></option>
			</template>
        </select>
    </div>
	
	<div class="default-invisible" data-wp-class--visible="extraContext.isSurveyLoaded">
		<div class="select-container">
			<label for="select-x">Select X</label>
			<select id="select-x" name="select_value" data-wp-bind--value="context.xValue" data-wp-on--change="actions.handleSelectX">
				<option value="">Select X</option>
				<template data-wp-each="extraContext.questionItems">
					<option data-wp-bind--value="context.item.column" data-wp-text="context.item.description"></option>
				</template>
			</select>
		</div>
	
		<div class="select-container">
			<label for="select-y">Select Y</label>
			<select id="select-y" name="select_value" data-wp-bind--value="context.yValue" data-wp-on--change="actions.handleSelectY">
				<option value="">Select Y</option>
				<template data-wp-each="extraContext.quantityQuestionItems">
					<option data-wp-bind--value="context.item.column" data-wp-text="context.item.description"></option>
				</template>
			</select>
		</div>
	
		<!-- TODO: create real interactive graph -->
		<div class="default-invisible" data-wp-class--visible="extraContext.isGraphVisible">
			<div id="plot-container">
				<svg width='100%' height=400px>
					<g transform="translate(50, 30)">
						<g data-wp-bind--transform="componentProps.translation">
							<line
								data-wp-bind--x1="componentProps.xScale.halfWidth"
								data-wp-bind--x2="componentProps.xScale.halfWidth"
								data-wp-bind--y1="componentProps.yScale.min"
								data-wp-bind--y2="componentProps.yScale.max"
								stroke="black"
								width=40
							/>
							<rect
								x="0"
								data-wp-bind--y="componentProps.yScale.q3"
								data-wp-bind--width="componentProps.xScale.width"
								data-wp-bind--height="componentProps.yScale.boxHeight"
								stroke="black"
								fill="#ead4f5"
							/>
							<line
								x1="0"
								data-wp-bind--x2="componentProps.xScale.width"
								data-wp-bind--y1="componentProps.yScale.median"
								data-wp-bind--y2="componentProps.yScale.median"
								stroke="black"
								width=40
							/>
						</g>
					</g>
				</svg>
			</div>
		</div>
	</div>
</div>
