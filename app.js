

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
            let mudarBody = document.getElementById('bodyID')


            if(data.weather[0].description == 'broken clouds'){
                mudarBody.style.backgroundImage = 'url(https://img.freepik.com/fotos-gratis/nuvens-brancas-dramaticas-e-ceu-azul-da-vista-da-janela-do-aviao-fundo-colorido-do-por-do-sol-cloudscape_90220-1209.jpg?w=740&t=st=1699982934~exp=1699983534~hmac=abc5225783efd3631db6df8652f1e7dc7d16e37ac680cbf22d269df363775f5a)';
                mudarBody.style.backgroundSize = 'cover';

            } else if( data.weather[0].description == 'clear sky' || data.weather[0].description == 'few clouds'){
                mudarBody.style.backgroundImage = 'url(https://img.freepik.com/fotos-gratis/o-sol-nubla-se-o-ceu-durante-o-fundo-da-manha-ceu-azul-branco-e-pastel-lente-de-foco-suave-luz-solar-alargada-gradiente-ciano-borrado-abstrato-de-natureza-pacifica-abrir-vista-para-janelas-lindo-verao-primavera_1253-1092.jpg?w=740&t=st=1699983093~exp=1699983693~hmac=4fe05ad7dc23068661be941430ee24139ec8f792e998852d85a945b12530be39)';
                mudarBody.style.backgroundSize = 'cover';

            } else if(data.weather[0].description == 'overcast clouds' || data.weather[0].description == 'clouds'){
                mudarBody.style.backgroundImage = 'url(https://img.freepik.com/fotos-gratis/nuvens-de-tempestade_1122-2848.jpg?w=740&t=st=1699982570~exp=1699983170~hmac=3b32c92e25bd0ab91a96f0fe3d476d2d36880bd6716eeb0cc86bf19dce47619a)';
                mudarBody.style.backgroundSize = 'cover';     

            } else if (data.weather[0].description == 'light rain'){
                mudarBody.style.backgroundImage = 'url(https://w0.peakpx.com/wallpaper/250/815/HD-wallpaper-rainy-night-lamp-rain-road-posts-street-lights-night.jpg)';
                mudarBody.style.backgroundSize = 'cover';                
            }

            previsaoDiv.innerHTML = 
            `
              <span class="city-country">${data.name}, ${data.sys.country}</span>
              <p>Tempo: ${descricaoTempo} </p>
              <p>Temperatura: ${temperaturaCelsius.toFixed(0)}°C</p>
              <p>Umidade: ${data.main.humidity}%</p>
            `;
            console.log(data.weather[0].description)
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
              case 'clear sky':
                  return 'Céu Limpo';

              case 'clouds':
                  return 'Nuvens';

              case 'rain':
                  return 'Chuva';

              case 'moderate rain':
                  return 'Chuva moderada';

              case 'broken clouds':
                  return 'Nuvens quebradas';

              case 'thunderstorm':
                  return 'Tempestade / Trovoada';

              case 'few clouds':
                  return 'Poucas nuvens';  

              case 'overcast clouds':
                  return 'Nublado';  

              case 'thunderstorm with light rain':
                  return 'Tempestade com raios';       

              // Adicione mais casos conforme necessário
              default:
                  return descricao; // Retorna a descrição original se não houver correspondência
          }
        }

        