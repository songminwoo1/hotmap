import { Box, Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

//https://4sii.tistory.com/424
function Map(){
  const [markers, setMarkers] = useState();

  const mapElement = useRef(null);
  const naver = window.naver;

  useEffect(() => {
    console.log(mapElement);
    console.log(naver);
    console.log(window);
    if (!mapElement.current || !naver) return;


    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(36.3721427, 127.36039);
    console.log(location);
    const mapOptions = {
      center: location,
      minZoom: 13,
      scaleControlOptions: {  //https://navermaps.github.io/maps.js.ncp/docs/naver.maps.ScaleControl.html
          position: naver.maps.Position.BOTTOM_RIGHT
      },
      scrollWheel: true,
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: { position: naver.maps.Position.LEFT_BOTTOM }
    };

    //지도 생성
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    //마커 추가
    const datas = [{"lat": 36.3721427, "lng": 127.36039}, {"lat": 36.3731427, "lng": 127.36039}];
    for(var data of datas){
      console.log(data);
      new naver.maps.Marker({
        position: new naver.maps.LatLng(data.lat, data.lng),
        map,
      });
    }

  }, []);
  //https://navermaps.github.io/maps.js.ncp/docs/tutorial-Visualization.html

  return (
    <Container ref={mapElement} maxWidth={false} sx={{width: 1, height: 1, m: 0, p: 0}}></Container>
  );
};


export default Map;