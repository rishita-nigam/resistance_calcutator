const colorCodes = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    gray: 8,
    white: 9
  };
  
  function createBandSelector(count) {
    const bandColors = document.querySelector('.band-colors');
    bandColors.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const select = document.createElement('select');
      select.id = `band${i+1}`;
      for (const color in colorCodes) {
        const option = document.createElement('option');
        option.text = color;
        option.value = color;
        select.add(option);
      }
      bandColors.appendChild(select);
    }
  }
  
  function calculateResistance() {
    const bandCount = document.getElementById('band-count').value;
    const resistanceValue = document.getElementById('resistance-value');
    const toleranceValue = document.getElementById('tolerance-value');
    const heading = document.querySelector('h1');
  
    let resistance = 0;
    let multiplier = 1;
    let toleranceIndex;
  
    for (let i = 0; i < bandCount; i++) {
      const bandColor = document.getElementById(`band${i + 1}`).value;
      if (i < bandCount - 1) {
        resistance = resistance * 10 + colorCodes[bandColor];
      } else {
        if (bandColor === 'gold') {
          multiplier /= 10;
          toleranceIndex = 5; // Gold band represents tolerance of +/- 5%
        } else if (bandColor === 'silver') {
          multiplier /= 100;
          toleranceIndex = 10; // Silver band represents tolerance of +/- 10%
        } else {
          multiplier *= Math.pow(10, colorCodes[bandColor]);
          toleranceIndex = colorCodes[bandColor]; // Get tolerance index from color code
        }
      }
    }
  
    const resistanceWithMultiplier = resistance * multiplier;
  
    resistanceValue.textContent = resistanceWithMultiplier + ' Ω';
    toleranceValue.textContent = toleranceIndex + '%';
  
    // Set gradient color based on resistance value
    if (resistanceWithMultiplier < 1000) {
      heading.style.backgroundImage = 'linear-gradient(to right, #ffe4e1, #f0f8ff)';
    } else if (resistanceWithMultiplier < 10000) {
      heading.style.backgroundImage = 'linear-gradient(to right, #f0f8ff, #f0f0ff)';
    } else {
      heading.style.backgroundImage = 'linear-gradient(to right, #f0f0ff, #e6e6fa)';
    }
  }
  
  document.getElementById('band-count').addEventListener('change', function() {
    const count = parseInt(this.value);
    createBandSelector(count);
  });
  
  createBandSelector(4);
  