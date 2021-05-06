//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");


var templatestypes = {
    doc_1 : fs.readFileSync("./classes/template.html", "utf8")
}



class PdfGenerator {
    constructor(formtype){
        this.formtype = formtype;
        console.log(123)
    }


    generate(params){
        console.log(123)
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

        var users = [
            {
              name: "Shyam",
              age: "26",
            },
            {
              name: "Navjot",
              age: "26",
            },
            {
              name: "Vitthal",
              age: "26",
            },
          ];



          var document = {
            html: templatestypes[this.formtype],
            // Сюда пихаем информацию из базы данных, уже сформированную как нужно
            data: {users: users},
            // Так будет называться сохраненный PDF файл
            path: "./output.pdf",
            type: "",
          };

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