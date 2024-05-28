<script>
  import { onMount } from 'svelte';

  let age = 30;
  let pclass = 3;
  let sex = 'male';
  let fare = 32;
  let embarked = 'S';
  let family = 0;
  let selectedModel = 'Model 1';
  let prediction1 = null;
  let prediction2 = null;
  let prediction3 = null;

  const coefficients_model_1 = {
    intercept: -0.6082,
    Age: -0.0168,
    Sex_male: -1.1836
  };

  const coefficients_model_2 = {
    intercept: -0.6747,
    Pclass: -0.8362,
    Fare: 0.0555,
    Age: -0.3262,
    Sex_male: -1.2096
  };

  const coefficients_model_3 = {
    intercept: -0.6694,
    Pclass: -0.7817,
    Fare: 0.1339,
    Age: -0.3926,
    Sex_male: -1.2868,
    Family: -0.3759,
    Embarked_Q: -0.0572,
    Embarked_S: -0.1950
  };

  function sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
  }

  function makePrediction() {
    // Reset predictions
    prediction1 = prediction2 = prediction3 = null;

    // Calculate based on selected model
    switch (selectedModel) {
      case 'Model 1':
        let z1 = coefficients_model_1.intercept +
                 coefficients_model_1.Age * age +
                 coefficients_model_1.Sex_male * (sex === 'male' ? 1 : 0);
        prediction1 = sigmoid(z1) * 100;
        break;
      case 'Model 2':
        let z2 = coefficients_model_2.intercept +
                 coefficients_model_2.Pclass * pclass +
                 coefficients_model_2.Fare * fare +
                 coefficients_model_2.Age * age +
                 coefficients_model_2.Sex_male * (sex === 'male' ? 1 : 0);
        prediction2 = sigmoid(z2) * 100;
        break;
      case 'Model 3':
        let z3 = coefficients_model_3.intercept +
                 coefficients_model_3.Pclass * pclass +
                 coefficients_model_3.Fare * fare +
                 coefficients_model_3.Age * age +
                 coefficients_model_3.Sex_male * (sex === 'male' ? 1 : 0) +
                 coefficients_model_3.Family * family +
                 (embarked === 'Q' ? coefficients_model_3.Embarked_Q : 0) +
                 (embarked === 'S' ? coefficients_model_3.Embarked_S : 0);
        prediction3 = sigmoid(z3) * 100;
        break;
    }
  }

  onMount(makePrediction);
</script>

<main>
  <h1>Titanic Survival Prediction</h1>
  <label for="model-select">Choose a Prediction Model:</label>
  <select id="model-select" bind:value={selectedModel} on:change={makePrediction}>
    <option value="Model 1">Model 1: Age and Sex</option>
    <option value="Model 2">Model 2: Pclass, Fare, Age, and Sex</option>
    <option value="Model 3">Model 3: Pclass, Fare, Age, Sex, Family, and Embarked</option>
  </select>

  {#if selectedModel !== 'Model 2' && selectedModel !== 'Model 3'}
    <div>
      <label>Age: </label>
      <input type="range" min="0" max="100" bind:value={age} on:change={makePrediction} />
      <span>{age}</span>
    </div>
    <div>
      <label>Sex: </label>
      <select bind:value={sex} on:change={makePrediction}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  {/if}

  {#if selectedModel == 'Model 2'}
    <div>
      <label>Age: </label>
      <input type="range" min="0" max="100" bind:value={age} on:change={makePrediction} />
      <span>{age}</span>
    </div>
    <div>
      <label>Sex: </label>
      <select bind:value={sex} on:change={makePrediction}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div>
      <label>Pclass: </label>
      <select bind:value={pclass} on:change={makePrediction}>
        <option value="1">1st Class</option>
        <option value="2">2nd Class</option>
        <option value="3">3rd Class</option>
      </select>
    </div>
    <div>
      <label>Fare: </label>
      <input type="range" min="0" max="100" bind:value={fare} on:change={makePrediction} />
      <span>{fare}</span>
    </div>
  {/if}

  {#if selectedModel == 'Model 3'}
    <div>
      <label>Age: </label>
      <input type="range" min="0" max="100" bind:value={age} on:change={makePrediction} />
      <span>{age}</span>
    </div>
    <div>
      <label>Sex: </label>
      <select bind:value={sex} on:change={makePrediction}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div>
      <label>Pclass: </label>
      <select bind:value={pclass} on:change={makePrediction}>
        <option value="1">1st Class</option>
        <option value="2">2nd Class</option>
        <option value="3">3rd Class</option>
      </select>
    </div>
    <div>
      <label>Fare: </label>
      <input type="range" min="0" max="100" bind:value={fare} on:change={makePrediction} />
      <span>{fare}</span>
    </div>
    <div>
      <label>Embarked: </label>
      <select bind:value={embarked} on:change={makePrediction}>
        <option value="S">Southampton</option>
        <option value="C">Cherbourg</option>
        <option value="Q">Queenstown</option>
      </select>
    </div>
    <div>
      <label>Family: </label>
      <input type="range" min="0" max="10" bind:value={family} on:change={makePrediction} />
      <span>{family}</span>
    </div>
  {/if}

  <!-- Display prediction based on the selected model -->
  {#if selectedModel === 'Model 1' && prediction1 !== null}
    <h2>Model 1 Prediction: {prediction1.toFixed(2)}% likelihood of survival</h2>
  {/if}
  {#if selectedModel === 'Model 2' && prediction2 !== null}
    <h2>Model 2 Prediction: {prediction2.toFixed(2)}% likelihood of survival</h2>
  {/if}
  {#if selectedModel === 'Model 3' && prediction3 !== null}
    <h2>Model 3 Prediction: {prediction3.toFixed(2)}% likelihood of survival</h2>
  {/if}
</main>
