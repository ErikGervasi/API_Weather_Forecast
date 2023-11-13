

function chamarPrevisao(){
    const cidade = document.getElementById("input-city").value;
    console.log(cidade)

    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cidade + ',br&APPID=6e33513cd63aa3f897890f1c47ee88a9'

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok){
                return response.json();
            } else {
                throw new Error('Erro na solicitação da API');
              }
        })

        .then(function(data) {
            const temperaturaCelsius = data.main.temp - 273.15; // Conversão de Kelvin para Celsius
            const previsaoDiv = document.getElementById('previsao');
            const descricaoTempo = traduzirDescricaoTempo(data.weather[0].description);
            previsaoDiv.innerHTML = 
            `
              <span class="city-country">${data.name}, ${data.sys.country}</span>
              <p>Tempo: ${descricaoTempo} </p>
              <p>Temperatura: ${temperaturaCelsius.toFixed(0)}°C</p>
              <p>Umidade: ${data.main.humidity}%</p>
            `;
          })

          .catch(function(error) {
            alert("Cidade não encontrada, por favor verifique sua pesquisa!");
          });

        };


        document.getElementById('input-city').addEventListener('keyup', function(event) {  
            if (event.key === 'Enter') {
              chamarPrevisao(); // Chama a função quando a tecla "Enter" é pressionada
            }
          }
        )

        function traduzirDescricaoTempo(descricao) {
          switch (descricao) {
              case 'Clear':
                  return 'Céu Limpo';
              case 'Clouds':
                  return 'Nuvens';
              case 'Rain':
                  return 'Chuva';
              case "moderate rain":
                  return "teste";
              // Adicione mais casos conforme necessário
              default:
                  return descricao; // Retorna a descrição original se não houver correspondência
          }
        }

        