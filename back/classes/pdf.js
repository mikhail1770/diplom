//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");
var moment = require('moment');


var templatestypes = {
    doc_1 : fs.readFileSync("./classes/template.html", "utf8"),
    courseworkszaochlist : fs.readFileSync("./classes/courseworkszaochlist.html", "utf8")
}



class PdfGenerator {
    constructor(formtype, alldata, discipline){
        this.formtype = formtype;
        this.alldata = alldata;
        this.discipline=discipline;
        console.log()
    }

    generate(params){
        console.log()
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "20mm",
            header: {height: '0mm'},
            footer: {
                height: "0mm",
                contents: {}
            }
        };

        
        var document = {
            html: templatestypes[this.formtype],
            // Сюда пихаем информацию из базы данных, уже сформированную как нужно
            data: {test:this.alldata, disciplne:this.discipline },
            // Так будет называться сохраненный PDF файл
            path: "./output.pdf",
            type: "",
          };
          console.log();

        // Ну и собсна создаем PDF, передаем объект document в котором указан шаблон и данные, 
        // и объект options в котором указана информация о PDF
        pdf.create(document, options).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error);
        });
    }
}

module.exports = PdfGenerator;