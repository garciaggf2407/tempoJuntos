import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Importe suas imagens aqui
import imagem1 from './assets/images/foto1.jpg';
import imagem2 from './assets/images/foto2.jpg';
import imagem3 from './assets/images/foto3.jpg';

function App() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const targetDate = new Date('2024-07-28T00:00:00');

    const updateTime = () => {
      const now = new Date();
      const difference = now - targetDate;

      // Se a data alvo ainda não chegou
      if (difference < 0) {
        const timeTo = Math.abs(difference);
        const days = Math.floor(timeTo / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeTo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeTo % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeTo % (1000 * 60)) / 1000);

        setTime({
          days,
          hours,
          minutes,
          seconds
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTime({
          days,
          hours,
          minutes,
          seconds
        });
      }
    };

    // Atualiza imediatamente e depois a cada segundo
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  const createHeart = () => {
    const heart = {
      id: Date.now(),
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 3}s`,
      fontSize: `${1 + Math.random() * 2}rem`
    };

    setHearts(prevHearts => [...prevHearts, heart]);

    // Remove o coração após a animação terminar
    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(h => h.id !== heart.id));
    }, 3000);
  };

  const handleClick = () => {
    // Cria vários corações em intervalos
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createHeart(), i * 100);
    }
  };

  const slides = [
    {
      id: 1,
      image: imagem1
    },
    {
      id: 2,
      image: imagem2
    },
    {
      id: 3,
      image: imagem3
    }
  ];

  return (
    <div className="container">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: heart.left,
            top: heart.top,
            animationDuration: heart.animationDuration,
            fontSize: heart.fontSize
          }}
        >
          ❤️
        </div>
      ))}
      <div className="card">
        <div className="card-content">
          <div className="content-top">
            <h2>Nosso Tempo Juntos ❤️</h2>
            <div className="time-grid">
              <div className="time-unit">
                <span className="time-value">{time.days}</span>
                <span className="time-label">Dias</span>
              </div>
              <div className="time-unit">
                <span className="time-value">{time.hours}</span>
                <span className="time-label">Horas</span>
              </div>
              <div className="time-unit">
                <span className="time-value">{time.minutes}</span>
                <span className="time-label">Minutos</span>
              </div>
              <div className="time-unit">
                <span className="time-value">{time.seconds}</span>
                <span className="time-label">Segundos</span>
              </div>
            </div>
          </div>
          <div className="content-bottom">
            <button className="small-button" onClick={handleClick}>Clique Aqui</button>
          </div>
        </div>
        <div className="carousel-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <img src={slide.image} alt="" className="slide-image" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default App;
