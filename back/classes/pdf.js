//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");
var moment = require('moment');
var randtoken = require('rand-token');

var templatestypes = {
    doc_1 : fs.readFileSync("./classes/template.html", "utf8"),
    courseworkszaochlist : fs.readFileSync("./classes/courseworkszaochlist.html", "utf8"),
    courseworksochlist : fs.readFileSync("./classes/courseworksochlist.html", "utf8"),
    practicereport : fs.readFileSync("./classes/practicereport.html","utf8"),
    profEvent : fs.readFileSync("./classes/profEvent.html","utf8"),
}



class PdfGenerator {
    constructor(formtype, alldata, discipline, orientation){
        this.formtype = formtype;
        this.alldata = alldata;
        this.discipline=discipline;
        this.orientation = orientation;
        console.log()
    }

    generate(params, callback){
        console.log()
        var options = {
            format: "A4",
            orientation: this.orientation,
            border: "20mm",
            header: {height: '0mm'},
            footer: {
                height: "0mm",
                contents: {}
            }
        };
        let pdfname = `${this.formtype}_${randtoken.generate(16)}.pdf`;
        var document = {
            html: templatestypes[this.formtype],
            // Сюда пихаем информацию из базы данных, уже сформированную как нужно
            data: {alldata:this.alldata, disciplne:this.discipline },
            // Так будет называться сохраненный PDF файл
            path: "./public/printdocs/"+pdfname,
            type: "",
          };
          
          console.log();

        // Ну и собсна создаем PDF, передаем объект document в котором указан шаблон и данные, 
        // и объект options в котором указана информация о PDF
        pdf.create(document, options).then((res) => {
            console.log(res);
            callback(pdfname);
        }).catch((error) => {
            console.error(error);
        });
    }
}

module.exports = PdfGenerator;
