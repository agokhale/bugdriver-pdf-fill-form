fs = require('fs');
pdfFillForm=require('pdf-fill-form');
pdfFormFill=require('pdf-form-fill');

console.log("minifill"); 

const pdf_template_path = 'retiree.pdf'; 
//jjconst pdf_template_pathirs = 'irsf1099r2022p4.pdf';
const pdf_template_pathirs = 'irsf1099r2022p4.pdf';
var fields = { "Retiree Last Name" : 'fett' };
//var irsfields = {  'topmostSubform_0_.Copy1_0_.LeftCol_ReadOrderControl_0_.f2_1_0_':'stillfett' }; // this is what lifecycleD thinks the full name is
var irsfields = {  "f2_1[0]":'stillfett' }; // this is the form that pdftk seems to like
//var irsfields = {  'payer_addr':'stillfett' }; // we can change the alternate field name in lifecycle designer
//var irsfields = {  'topmostSubform[0].Page1[0].payer_addr[0]':'stillfett' }; // full path from pdftk dump_data_fields
var irsfields = {  'topmostSubform[0].CopyB[0].LeftCol_ReadOrderControl[0].f2_1[0]':'stillfett' }; // full path from pdftk dump_data_fields
var outpdf = pdfFillForm.writeSync(pdf_template_path, fields, { "savetype":"imgpdf"}); // this works
fs.writeFileSync( 'outret.pdf', outpdf); 

var outpdf = pdfFillForm.writeSync(pdf_template_pathirs, irsfields, { "savetype":"imgpdf"}); // this doesn't work, pdf is not filled out
fs.writeFileSync( 'outirs.pdf', outpdf); 

console.log ("pdf-form-fill");


const outpdfret2 = fs.createWriteStream("outret2.pdf"); // this works 
pdfFormFill.fill(pdf_template_path, fields, { "savetype":"imgpdf", "verbose":true}).then ( 
    stream => stream.pipe(outpdfret2)
  ).catch(err => console.error(err)); 



pdfFormFill.fields (pdf_template_pathirs).then( out => console.log(out));

const outpdf2 = fs.createWriteStream("outisr2.pdf"); // this is broken, pdf not filled out
pdfFormFill.fill(pdf_template_pathirs, irsfields, { "savetype":"imgpdf", "verbose":true}).then (
    stream => stream.pipe(outpdf2)
  ).catch(err => console.error(err)); 
console.log ("done-form-fill");
