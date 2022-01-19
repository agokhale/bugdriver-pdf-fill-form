fs = require('fs');
pdfFillForm=require('pdf-fill-form');

console.log("minifill"); 

const pdf_template_path = 'retiree.pdf'; 
const pdf_template_path2 = 'irsf1099r2022p4.pdf';
var fields = { "Retiree Last Name" : 'fett' };
var irsfields = {  'f2_1[0]':'stillfett' };

var outpdf = pdfFillForm.writeSync(pdf_template_path, fields, { "savetype":"imgpdf"});
fs.writeFileSync( 'outret.pdf', outpdf); 

var outpdf = pdfFillForm.writeSync(pdf_template_path2, irsfields, { "savetype":"imgpdf"});
fs.writeFileSync( 'outirs.pdf', outpdf); 
