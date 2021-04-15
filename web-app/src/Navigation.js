import React from "react";
import './App.css';

function Navigation() {
  return (
    <div className="App">
    	<div className="container backgroundNav">
        <div className="row margin_cat">
          <div className="col-md-3 category">
            <div><p>Регистрация работ студентов</p></div>
          </div>
          <div className="col-md-9 doc">
          <ul>
              <li className="borLi"><a href="#"> Учет контрольных и курсовых работ студентов заочной формы обучения</a></li>
              <li className="borLi"><a href="#">Учет курсовых работ студентов очной формы обучения</a></li>
              <li className="borLi"><a href="#">Учет отчетов по практике</a></li>
            </ul>
          </div>
        </div>
         <div className="row margin_cat">
          <div className="col-md-3 category">
            <div><p>Учет учебной нагрузки</p></div>
          </div>
          <div className="col-md-9 doc">
          <ul>
              <li className="borLi"><a href="#">Нагрузка преподавателей</a></li>
              <li className="borLi"><a href="#">Нагрузка преподавателей-почасовиков</a></li>
              <li className="borLi"><a href="#">Нагрузка преподавателей, работающих на условиях договора об оказании услуг</a></li>
              <li className="borLi"><a href="#">Учет дополнительной учебной нагрузки преподавателей</a></li>
              <li className="borLi"><a href="#">Заявление о приеме (почас.оплата)</a></li>
              <li className="borLi"><a href="#">Заявление на оплату (почас.оплата)</a></li>
              <li className="borLi"><a href="#">Договор оказания услуг</a></li>
              <li className="borLi"><a href="#">Отчет о выполнении дополнительного объема работ</a></li>
            </ul>
          </div>
        </div>
        <div className="row margin_cat">
          <div className="col-md-3 category">
            <div><p>Учет посещений мероприятий</p></div>
          </div>
          <div className="col-md-9 doc">
            <ul>
              <li className="borLi"><a href="#">Учет участия профессорско-преподавательского состава в мероприятиях</a></li>
              <li className="borLi"><a href="#">Учет взаимных посещений занятий преподавателями</a></li>
            </ul>
          </div>
        </div>
       
        <div className="row margin_cat">
          <div className="col-md-3 category">
            <div><p>Другое</p></div>
          </div>
          <div className="col-md-9 doc">
           <ul>
              <li className="borLi"><a href="#">Журнал оценки знаний студентов</a></li>
              <li className="borLi"><a href="#">Журнал регистрации приказов и распоряжений кафедры</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;