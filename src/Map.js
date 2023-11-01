import { Box, Container } from '@mui/material';
import { useEffect, useRef } from 'react';

//https://4sii.tistory.com/424
function Map(){
  const mapElement = useRef(null);
  const naver = window.naver;

  useEffect(() => {
    console.log(mapElement);
    console.log(naver);
    console.log(window);
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);

  return (
    <Container component="map" ref={mapElement} maxWidth={false} sx={{width: 1, height: 1, m: 0, p: 0}}></Container>
  );
};


export default Map;