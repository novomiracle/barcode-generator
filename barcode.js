//barcode
var bcbordersOn = true;
var bccount = $("#count").val();
var bcbarcodeWidth = $("#barcodeWidth").val();
var bcVerticalSpacing = $("#verticalSpacing").val();
var bcHorizontalSpacing = $("#horizontalSpacing").val();
var columns = $("#columns").val();
//pixels per mm
const ppmm = 0.264583333;

var bcbarcodeHeight = parseInt($("#barcodeHeight").val());

var doc = new jsPDF('p', 'mm', 'a4', true);
//pdf -  width
var bcwidth = doc.internal.pageSize.width;
//pdf heigh
var pdfHeight = doc.internal.pageSize.height;
// borcodes per line
var bpl = Math.floor(parseInt($("#barcode-output").width()) / (parseInt(bcVerticalSpacing / ppmm) + parseInt(bcbarcodeWidth / ppmm))) - bcVerticalSpacing;
//console.log($("#barcode-output").width(), parseInt(bcHorizontalSpacing) + parseInt(bcbarcodeWidth))
//lines per page
var lpp = Math.ceil(pdfHeight / (parseInt(bcbarcodeHeight) + parseInt(bcHorizontalSpacing)))
// image height
var bcheight = lpp * bcbarcodeHeight / ppmm;
// how many barcodes in a page;
var barcodesInPage = columns * lpp;
//how many pages in pdf.
var bcpages = Math.ceil(bccount / barcodesInPage);
// Функцията, генерираща баркодовете.
function generate() {
    // Зануляване на предишната заявка(изчистване на резултатите).
    $("#barcode-output").html("");
    $("#barcode-output").css("border", "");

    // Създаване на нужните променливи(всяка си отговаря на елемента в index.html).
    columns = $("#columns").val();
    bcbarcodeHeight = parseInt($("#barcodeHeight").val());
    bccount = $("#count").val();
    bcbarcodeWidth = $("#barcodeWidth").val();
    bcHorizontalSpacing = $("#horizontalSpacing").val();
    bcVerticalSpacing = $("#verticalSpacing").val();
    let borderRadius = $("#borderRadius").val();
    let startPoint = Number($("#startPoint").val());
    if (bcbarcodeWidth > 210 / columns - bcHorizontalSpacing * (columns - 1)) {
        bcbarcodeWidth = 210 / columns - bcHorizontalSpacing * (columns - 1)
        $("#barcodeWidth").val(210 / columns - bcHorizontalSpacing * (columns - 1))

    }

    //pdf
    bpl = Math.floor(parseInt($("#barcode-output").width()) / (parseInt((bcHorizontalSpacing) / ppmm) + ((bcbarcodeWidth) / ppmm)));
    //console.log($("#barcode-output").width())
    lpp = Math.floor(pdfHeight / (parseInt(bcbarcodeHeight) + parseInt(bcVerticalSpacing)))
    //console.log(bcbarcodeHeight+parseInt(bcVerticalSpacing))
    bcheight = lpp * bcbarcodeHeight / ppmm;
    barcodesInPage = columns * lpp;
    bcpages = Math.ceil(bccount / barcodesInPage);
    //console.log(columns, lpp, bccount, barcodesInPage, bccount / barcodesInPage)
    //console.log("barcodes per line " + bpl, "lines per page " + lpp, "image height" + bcheight, "pdf height " + pdfHeight, "barcodes in page" + barcodesInPage, "pages" + bcpages)
    // //console.log(bcpages, barcodesInPage, bpl)

    for (let i = 0; i < bcpages; i++) {
        $("#barcode-output").append(`<div class='barcode-container' id='barcode-container${i}'></div>`)
    }
    // Фор цикъл, който изписва баркодовете в .barcode-container.
    for (let i = 0; i < bccount; i++) {
        let barcodeContainer = "#barcode-container" + Math.floor(i / barcodesInPage);
        let number = startPoint + i;
        $(barcodeContainer).append("<svg id='barcode" + i + "'></svg>");
        JsBarcode("#barcode" + i, number);
    }
    $(".barcode-container").css("grid-template-columns", 'repeat(' + columns + ',1fr)')
    //JsBarcode("#barcode" + i, number);
    // Допълнителните проверки, които са нужни за optional ефектите.
    if (bcHorizontalSpacing !== "") {
        $(".barcode-container").css("grid-column-gap", bcHorizontalSpacing + "mm");
    }

    if (bcVerticalSpacing !== "") {
        $(".barcode-container").css("grid-row-gap", bcVerticalSpacing + "mm");
    }

    if (bcbarcodeWidth !== "") {
        $(".barcode-container svg").css("width", bcbarcodeWidth + "mm");
    }
    if (bcbarcodeHeight !== "") {
        $(".barcode-container svg").css("height", bcbarcodeHeight + "mm");
    }
    if (borderRadius !== "") {
        $(".barcode-container svg").css("border-radius", borderRadius + "mm");
    }
    if (bcbordersOn) {
        $(".barcode-container svg").css("border", "1px solid black");
    } else {
        $(".barcode-container svg").css("border", "1px solid transparent");
    }
    $(".barcode-container svg").css("box-sizing", "border-box");
}


function pdf() {
    doc = new jsPDF('p', 'mm', 'a4', true);
    let i = 0;
    for (let i = 0; i < bcpages; i++) {
        html2canvas(
            document.getElementById(`barcode-container${i}`)
        ).then(function (canvas) {
            //console.log(document.getElementById(`barcode-container${i}`))
            let img = canvas.toDataURL("image/png");
            console.log($("#barcode-output").width() * ppmm)
            doc.addImage(img, "PNG", 0, 0, bcwidth, Math.ceil($(`#barcode-container${i} svg`).length / columns) * (bcbarcodeHeight + parseInt(bcVerticalSpacing)))
            console.log(Math.ceil($(`#barcode-container${i} svg`).length / columns) * (bcbarcodeHeight + parseInt(bcVerticalSpacing)), Math.ceil($(`#barcode-container${i} svg`).length / columns), parseInt(bcbarcodeHeight) + parseInt(bcVerticalSpacing))
            if (i == bcpages - 1) {
                doc.save()
            }
            doc.addPage();
        })
    }
}

function checkChange() {
    if (bcbordersOn) {
        bcbordersOn = false;
        console.log("Borders turned OFF!");
        $(".barcode-container svg").css("border", "1px solid transparent");
    } else {
        bcbordersOn = true;
        console.log("Border turned ON!");
        $(".barcode-container svg").css("border", "1px solid black");
    }
}


function whatever(){
	columns = $("#columns").val();
	let borderRadius = $("#borderRadius").val();
	bcbarcodeWidth = $("#barcodeWidth").val();
	bcVerticalSpacing = $("#verticalSpacing").val();
	bcHorizontalSpacing = $("#horizontalSpacing").val()
	bcbarcodeHeight = parseInt($("#barcodeHeight").val());
	if (bcbarcodeWidth > 210 / columns - bcHorizontalSpacing * (columns - 1)) {
        bcbarcodeWidth = 210 / columns - bcHorizontalSpacing * (columns - 1)
        $("#barcodeWidth").val(210 / columns - bcHorizontalSpacing * (columns - 1))
		$("#widthInput").val(210 / columns - bcHorizontalSpacing * (columns - 1))

    }
	if(bcbarcodeHeight > bcbarcodeWidth ){
		bcbarcodeHeight = bcbarcodeWidth;
		$("#barcodeHeight").val(bcbarcodeWidth)
		$("#heightInput").val(bcbarcodeWidth)
	}
	if (bcHorizontalSpacing !== "") {
        $(".barcode-container").css("grid-column-gap", bcHorizontalSpacing + "mm");
    }

    if (bcVerticalSpacing !== "") {
        $(".barcode-container").css("grid-row-gap", bcVerticalSpacing + "mm");
    }

    if (bcbarcodeWidth !== "") {
        $(".barcode-container svg").css("width", bcbarcodeWidth + "mm");
    }
    if (bcbarcodeHeight !== "") {
        $(".barcode-container svg").css("height", bcbarcodeHeight + "mm");
    }
    if (borderRadius !== "") {
        $(".barcode-container svg").css("border-radius", borderRadius + "mm");
    }
	$(".barcode-container").css("grid-template-columns", 'repeat(' + columns + ',1fr)')
}