import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';

import { levels, calculateImc, Level } from './helpers/imc';
import { GridItem } from './components/GridItem';

const App = () => {
  const [heightField, setHeghtField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null)

  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert('Preencha todas os campos!');
    }
  }

  const handleBackClick = () => {
    setToShow(null);
    setHeghtField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>

      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt='' width={150}/>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Índice da Mass Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
          <input
            type='number'
            placeholder='Digite a sua altura. Ex: 1.75 (em metros)'
            value={heightField > 0 ? heightField : ''}
            onChange={ e => setHeghtField(parseFloat( e.target.value )) }
          />
          <input
            type='number'
            placeholder='Digite o seu peso. Ex: 76.5 (kg)'
            value={weightField > 0 ? weightField : ''}
            onChange={ e => setWeightField(parseFloat( e.target.value )) }
        />

        <button onClick={handleCalculateButton}>Calcular</button>

        </div>

        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
            {levels.map((item, index) => (
              <GridItem key={index} data={item}/>
            ))}
          </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackClick}>
                <img src={leftArrowImage} alt='' width={25}/>  
              </div>
              <GridItem data={toShow}/>
              </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;