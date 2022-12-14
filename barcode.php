<?php
/**
 * A simple sequiential barcode generator plugin.
 * @package sequiential_barcode_generator
 * @version 0.1
 */

/*
Plugin Name: Sequential Barcode Generator
Plugin URI: https://gpl.bg/barcode-generator
Description: This is a simple custom barcode generator plugin, which was made as part of a school project in collaboration with students from PMG "Ivan Vazov" Dimitrovgrad, Bulgaria.
Author: SOFTWARE LIBRE PROJECT
Version: 0.1
Author URI: https://gpl.bg
*/
add_action('wp_enqueue_scripts',"load_scripts");
function load_scripts(){
	wp_enqueue_style( 'bgcss',plugin_dir_url(__FILE__).'barcode.css' );
	wp_enqueue_script('jq',plugin_dir_url(__FILE__).'jquery-3.3.1.js');
	wp_enqueue_script('jsbarcode',plugin_dir_url(__FILE__).'JsBarcode.all.min.js');
	wp_enqueue_script('htmlcanvas',plugin_dir_url(__FILE__).'html2canvas.min.js');
	wp_enqueue_script('jspdf',plugin_dir_url(__FILE__).'jspdf.min.js');
	wp_enqueue_script('bgjs',plugin_dir_url(__FILE__).'barcode.js');
}
function barcode_test(){
	$p = '   
<div id="sequential-barcode-generator">
    <section id="barcode-generator">
		<div class="input-group mb-3">
            <label for="startPoint">Barcodes start at:</label>
            <input type="number" id="startPoint" value="100000">
		</div>
		<div class="input-group mb-3">
            <label for="count">Amount of Barcodes:</label>
            <input type="number" id="count" value="16">
		</div>
	<!--
	<label for="columns">Amount of columns</label>
                <input type="number" oninput="whatever()" id="columns" placeholder="2" value="2">
-->
                
                <form>
                <label for="columns">Amount of columns</label>
		            <div class="input-group mb-3">
		                <input type="range" oninput="this.form.columnsInput.value=this.value;whatever()" id="columns" placeholder="2" value="2" class="form-control"  aria-label="columns" aria-describedby="columns" min="1" max="10">
		                <div class="input-group-append">
		                 <input type="number" oninput="this.form.columns.value=this.value;whatever()" name="columnsInput" min="1" max="10" value="2" aria-label="columns Input" aria-describedby="columns-input" id="columnsInput" />

		                    <span class="input-group-text" id="barcode-height">mm</span>
		                </div>
		            </div>
           </form>

                
            <label for="horizontal-spacing">Horizontal Spacing</label>
            <div class="input-group mb-3">
                <input type="number" oninput="whatever()" value="0" id="horizontalSpacing" class="form-control" placeholder="Horizontal Spacing" aria-label="Horizontal Spacing" aria-describedby="horizontal-spacing">
                <div class="input-group-append">
                    <span class="input-group-text" id="horizontal-spacing">mm</span>
                </div>
            </div>

            <label for="vertical-spacing">Vertical Spacing</label>
            <div class="input-group mb-3">
                <input type="number" oninput="whatever()" value="0" id="verticalSpacing" class="form-control" placeholder="Vertical Spacing" aria-label="Vertical Spacing" aria-describedby="vertical-spacing">
                <div class="input-group-append">
                    <span class="input-group-text" id="vertical-spacing">mm</span>
                </div>
            </div>
            
            
			<!--
<label for="barcode-height">Barcode Height</label>
            <div class="input-group mb-3">
                <input type="number" oninput="whatever()" value="37" id="barcodeHeight" class="form-control" placeholder="37(Default)" aria-label="Barcode Height" aria-describedby="barcode-height">
                <div class="input-group-append">
                    <span class="input-group-text" id="barcode-height">mm</span>
                </div>
            </div>
-->
            
			<form>
		            <label for="barcode-height">Barcode Height</label>
		            <div class="input-group mb-3">
		                <input type="range" oninput="this.form.heightInput.value=this.value;whatever()"value="37" id="barcodeHeight" class="form-control" placeholder="37(Default)" aria-label="Barcode Height" aria-describedby="barcode-height" min="5" max="297">
		                <div class="input-group-append">
		                 <input type="number" oninput="this.form.barcodeHeight.value=this.value;whatever()" name="heightInput" min="5" max="297" value="37" aria-label="height Input" aria-describedby="height-input" id="heightInput" />

		                    <span class="input-group-text" id="barcode-height">mm</span>
		                </div>
		            </div>
           </form>


			<form>
		            <label for="barcode-width">Barcode Width</label>
		            <div class="input-group mb-3">
		                <input type="range" oninput="this.form.widthInput.value=this.value;whatever()" value="105" id="barcodeWidth" name="barcodeWidth" class="form-control" placeholder="105(Default)" aria-label="Barcode Width" aria-describedby="barcode-width" min="5" max="210">
		                <div class="input-group-append">
		                 <input type="number" oninput="whatever();this.form.barcodeWidth.value=this.value" name="widthInput" min="5" max="210" value="105" aria-label="width Input" aria-describedby="width-input" id="widthInput" />

		                    <span class="input-group-text" id="barcode-width">mm</span>
		                </div>
		            </div>
           </form>
           
           

            <form>
                <div class="input-group mb-3">
                    <label for="borderRadius">Border Radius</label>
                    <input type="range" oninput="this.form.borderRadiusInput.value=this.value;whatever()" data-min="0" data-max="100" data-step="1" data-value="0" value = "0" class="form-control-range" id="borderRadius" name="borderRadius">
                </div>
                <div class="input-group mb-3">
                    <input type="number" oninput="this.form.borderRadius.value=this.value;whatever()" name="borderRadiusInput" min="0" max="100" value="0" aria-label="Barcode Radius" aria-describedby="barcode-radius"  />
                    <div class="input-group-append">
                        <span class="input-group-text" id="barcode-radius">mm</span>
                    </div>
                    <input type="checkbox" checked id="individualBorders" onclick="checkChange()"><label for="individualBorders" style="margin-top:7px;">&nbsp;Hide borders</label>
                </div>
            </form>

        <input type="button" class="btn btn-primary" id="generateButton" value="Generate" onclick="generate()">
        <a class="btn btn-success mt-3" href="javascript:pdf()" class="generate-pdf">Download PDF</a>
    </section>

    <section id="barcode-output">
        <!-- pdf stuff-->
    </section> 
</div>
<span class="btn btn-outline-secondary" style="position: fixed; top: 120px; right: 30px;">Media size: A4</span>
';
	return $p;
}
add_shortcode('barcode', 'barcode_test');