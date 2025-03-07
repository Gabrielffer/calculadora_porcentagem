import './App.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import '../node_modules/bootstrap/js/src/modal.js';
import {useState, useEffect} from 'react';
import {TypeAnimation} from 'react-type-animation';

export default function App(){

  const [porcentagem, atPorcentagem]   = useState(0);
  const [base, atBase]                 = useState(0);
  const [resultado, atResultado]       = useState(0);
  const [iniciar, atIniciar]           = useState(false);
  const [data, atData]                 = useState(['01', '01', '2025']);
  const [respostaInfo, atRespostaInfo] = useState(false);

  const controlarPorcentagem = (event) => {
    atPorcentagem((event.target.value === '') ? 0 : event.target.value);
    atIniciar(true);
  }

  const controlarbase = (event) => {
    atBase((event.target.value === '') ? 0 : event.target.value);
    atIniciar(true);
  }

  useEffect(() => {
    if(iniciar){
      atResultado((porcentagem * base) / 100);
    }
  }, [iniciar, porcentagem, base]);

  useEffect(() => {
    for(let c = 0; c <= 2; c++){
      contarNumero(data[c], c);
    }
  }, []);

  const contarNumero = (limite, indice) => {
    let c   = 0;
    let tmp = 70;
    if(indice === 2){
      c = limite - 25;
    }
    const i = setInterval(() => {
      if(c >= limite){
        clearInterval(i);
      }else{
        c++;
        atData((prevdata) => {
          const nvArr = [...prevdata];
          if(c < 10 && c > 0){
            nvArr[indice] = '0' + c;
          }else{
            nvArr[indice] = c;
          }
          return nvArr;
        });
      }
    }, tmp);
  }

  const MostrarRespostaInfo = () => {
    if(respostaInfo){
      return (
        <TypeAnimation sequence={[' Ambos estão corretas.']} speed={10} wrapper='span'></TypeAnimation>
      );
    }else{
      return false;
    }
  }

  return (
    <>

      <div className='modal' id='modal_info'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <article>
              <div className='modal-header'>
                <h2 className='modal-title'>SOBRE</h2>
                <button type='button' className='btn-close' data-bs-dismiss='modal'></button>
              </div>
              <div className='modal-body'>
                <h3>O Que É</h3>
                <p>A porcentagem é uma forma de representar uma parte de um todo em relação a 100.</p>
                <p>O termo por cento também pode ser abreviado com o símbolo %, que significa dividir por 100.</p>
                <h3>Como Fazer</h3>
                <p>Para saber a porcentagem de um valor é necessário multiplicar a porcentagem pelo valor total e depois dividir o resultado por 100.</p>
                <hr></hr>
                <p><span className='text-info' id='info_pergunta' onClick={() => atRespostaInfo(true)}><i className='bi bi-info-circle-fill'></i> Porcentagem ou percentagem?</span>{<MostrarRespostaInfo/>}</p>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-danger' data-bs-dismiss='modal'>Fechar</button>
              </div>
            </article>
          </div>
        </div>
      </div>

      <header className='container-fluid bg-danger text-center'>
        <TypeAnimation sequence={['Calculadora de Porcentagem']} wrapper='h1' cursor={false}></TypeAnimation>
      </header>

      <div className='container' id='div_form'>
        <form>
          <div id='div_entradas'>
            <div className='input-group'>
              <input type='number' id='porcentagem' onChange={controlarPorcentagem} value={porcentagem}></input>
              <span className='input-group-text'>%</span>
            </div>
            <div className='input-group'>
              <span className='input-group-text'>De</span>
              <input type='number' id='base' onChange={controlarbase} value={base}></input>
            </div>
          </div>
        </form>
        <div id='div_grafico'>
          <div id='div_grafico_pizza' style={{backgroundImage: 'conic-gradient(#ffc107 0% ' + `${porcentagem}%` + ', #dc3545 ' + `${porcentagem}%` + ' 100%)'}}></div>
          <div id='div_info'>
            <span className='badge bg-danger info' title='diferença'>{Math.abs(resultado - base).toFixed(2)}</span>
            <span className='badge bg-warning info' title='resultado'>{resultado.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <footer>
        <p>Desenvolvido por <a href='https://github.com/Gabrielffer' target='_blank' className='text-info'>Gabrielffer</a></p>
        <p>Ícone de favorito criado com <a href='https://favicon.io/' target='_blank' className='text-warning'>Favicon</a></p>
        <p>
          Última atualização&nbsp;
          <span>
            <span>{data[0]}</span><span>/</span>
            <span>{data[1]}</span><span>/</span>
            <span>{data[2]}</span>
          </span>
          <i className='bi bi-question-diamond-fill text-info' data-bs-toggle='modal' data-bs-target='#modal_info' id='icone_info'></i>
        </p>
      </footer>

    </>
  )
}